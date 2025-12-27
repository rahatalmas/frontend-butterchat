import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

const AiSocketContext = createContext(null);

export const useAiSocket = () => {
  const context = useContext(AiSocketContext);
  if (!context) {
    throw new Error("useAiSocket must be used within AiSocketProvider");
  }
  return context;
};

export const AiSocketProvider = ({ children, url }) => {
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);
  const reconnectAttempts = useRef(0);
  const mountedRef = useRef(false);
  
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const connect = useCallback(() => {
    // Prevent if already connected or connecting
    if (ws.current?.readyState === WebSocket.OPEN || ws.current?.readyState === WebSocket.CONNECTING) {
      console.log("Already connected or connecting, skipping...");
      return;
    }

    // Prevent if component unmounted
    if (!mountedRef.current) {
      console.log("Component unmounted, skipping connection...");
      return;
    }

    setIsConnecting(true);
    setConnectionError(null);
    console.log(`🔄 Connecting to WebSocket: ${url} (Attempt ${reconnectAttempts.current + 1})`);

    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        if (!mountedRef.current) return;
        
        console.log("✅ WebSocket CONNECTED successfully!");
        setConnected(true);
        setIsConnecting(false);
        setConnectionError(null);
        reconnectAttempts.current = 0;
        
        if (reconnectTimeout.current) {
          clearTimeout(reconnectTimeout.current);
          reconnectTimeout.current = null;
        }
      };

      ws.current.onclose = (event) => {
        if (!mountedRef.current) return;
        
        console.log(`❌ WebSocket DISCONNECTED (Code: ${event.code}, Reason: ${event.reason || 'none'})`);
        setConnected(false);
        setIsConnecting(false);
        
        // Different close codes
        if (event.code === 1006) {
          setConnectionError("Connection failed - Server might be down");
        } else if (event.code === 1000) {
          setConnectionError("Connection closed normally");
        } else {
          setConnectionError(`Connection closed (Code: ${event.code})`);
        }
        
        // // Auto-reconnect with exponential backoff
        // if (reconnectAttempts.current < 5) {
        //   const delay = Math.min(2000 * Math.pow(1.5, reconnectAttempts.current), 15000);
        //   console.log(`⏳ Will retry in ${delay / 1000}s...`);
          
        //   reconnectTimeout.current = setTimeout(() => {
        //     reconnectAttempts.current++;
        //     reconnectTimeout.current = null;
        //     connect();
        //   }, delay);
        // }
      };

      ws.current.onerror = (error) => {
        console.error("❌ WebSocket ERROR:", error);
        // Don't set connecting to false here - wait for onclose
      };

      ws.current.onmessage = (event) => {
        if (!mountedRef.current) return;
        
        let data;
        try {
          data = JSON.parse(event.data);
          console.log("📨 Message received:", data);
        } catch {
          console.error("Invalid JSON:", event.data);
          return;
        }

        // Handle the response format: {reply: "hi", role: "AI", used_resource: "greetings"}
        const { reply = "", role = "AI", used_resource, type } = data;

        // System messages
        if (type === "system") {
          console.log("ℹ️ System:", reply);
          return;
        }

        if (type === "error") {
          console.error("❌ Server error:", reply);
          return;
        }

        // If there's a reply, update or add the message
        if (reply !== undefined) {
          setMessages((prev) => {
            // Check if we're updating an existing AI message (streaming)
            if (prev.length > 0) {
              const lastMsg = prev[prev.length - 1];
              
              // If last message is from AI and has empty or partial reply, update it
              if (lastMsg?.role === 'AI' && (!lastMsg.reply || reply.startsWith(lastMsg.reply))) {
                const updated = [...prev];
                updated[updated.length - 1] = { 
                  role,
                  reply,
                  used_resource
                };
                return updated;
              }
            }
            
            // Otherwise, add as new message
            return [...prev, { role, reply, used_resource }];
          });
        }
      };
    } catch (error) {
      console.error("❌ WebSocket creation failed:", error);
      setIsConnecting(false);
      setConnectionError(error.message);
    }
  }, [url]);

  // Single connection on mount
  useEffect(() => {
    console.log("🎯 AiSocketProvider mounted");
    mountedRef.current = true;
    
    // Small delay to avoid React StrictMode double mount issues
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        connect();
      }
    }, 100);

    return () => {
      console.log("🧹 AiSocketProvider unmounting");
      mountedRef.current = false;
      
      clearTimeout(timer);
      
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
        reconnectTimeout.current = null;
      }
      
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [connect]);

  const sendMessage = useCallback((msg) => {
    if (!msg?.trim()) {
      console.warn("Empty message");
      return false;
    }

    if (!connected || !ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.warn("Not connected - cannot send");
      setConnectionError("Not connected");
      return false;
    }

    console.log("📤 Sending:", msg);

    // Add user message and placeholder AI message
    setMessages((prev) => [
      ...prev,
      { role: "user", reply: msg },
      { role: "AI", reply: "" }
    ]);

    try {
      ws.current.send(msg);
      return true;
    } catch (error) {
      console.error("❌ Send failed:", error);
      setConnectionError("Failed to send");
      return false;
    }
  }, [connected]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const reconnect = useCallback(() => {
    console.log("🔄 Manual reconnect triggered");
    reconnectAttempts.current = 0;
    setConnectionError(null);
    
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
    
    setTimeout(() => connect(), 500);
  }, [connect]);

  const value = {
    connected,
    isConnecting,
    messages,
    sendMessage,
    clearMessages,
    reconnect,
    connectionError
  };

  return (
    <AiSocketContext.Provider value={value}>
      {children}
    </AiSocketContext.Provider>
  );
};
export default function GoogleLoginButton(){
    const handleLogin = () =>{
        window.location.href = 'http://localhost:5599/google-auth/login';
    };

    return <button onClick={handleLogin} >G</button>
}
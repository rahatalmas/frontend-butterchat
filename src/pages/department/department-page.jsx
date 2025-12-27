import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Circle } from 'lucide-react';

const DepartmentPage = () => {
  const [activeTab, setActiveTab] = useState('members');

  // Mock data
  const members = [
    { id: 1, name: 'Demo Agent', email: 'agent@demo.com', role: 'Agents', status: 'Last seen: 18 hours ago', avatar: 'D', color: 'bg-pink-500' },
    { id: 2, name: 'Demo Admin', email: 'admin@admin.com', role: 'Admins', status: 'Accepting conversations', statusColor: 'text-emerald-400', avatar: 'D', color: 'bg-cyan-500' },
    { id: 3, name: 'Rhiannon Rosenbaum', email: 'cornelius.volkman@example.net', role: 'Agents', status: 'Last seen: 18 hours ago', avatar: 'R', color: 'bg-purple-500' },
    { id: 4, name: 'Jefferey West', email: 'oritz.jennifer@example.org', role: 'Agents', status: 'Last seen: 18 hours ago', avatar: 'J', color: 'bg-blue-500' },
    { id: 5, name: 'Robert White', email: 'ratke.allie@example.net', role: 'Agents', status: 'Last seen: 18 hours ago', avatar: 'R', color: 'bg-indigo-500' },
    { id: 6, name: 'Cleo Murphy', email: 'white.otto@example.com', role: 'Agents', status: 'Last seen: 18 hours ago', avatar: 'C', color: 'bg-teal-500' },
  ];

  const groups = [
    { id: 1, name: 'Onboarding Experts', members: 3, memberNames: 'Cleo Murphy + 2 more', online: '0 of 3 online', avatar: 'O', color: 'bg-red-500' },
    { id: 2, name: 'Client Relations', members: 3, memberNames: 'Cleo Murphy + 2 more', online: '0 of 3 online', avatar: 'C', color: 'bg-cyan-500' },
    { id: 3, name: 'Account Management', members: 2, memberNames: 'Robert White + 1 more', online: '0 of 2 online', avatar: 'A', color: 'bg-pink-500' },
    { id: 4, name: 'Product Guidance Team', members: 3, memberNames: 'Cleo Murphy + 2 more', online: '0 of 3 online', avatar: 'P', color: 'bg-rose-500' },
    { id: 5, name: 'Technical Support', members: 3, memberNames: 'Cleo Murphy + 2 more', online: '0 of 3 online', avatar: 'T', color: 'bg-blue-500' },
    { id: 6, name: 'General', members: 6, memberNames: 'Cleo Murphy + 5 more', online: '0 of 6 online', avatar: 'G', color: 'bg-teal-500', isDefault: true },
  ];

  const invites = [];

  const tabs = [
    { id: 'members', label: 'Members' },
    { id: 'groups', label: 'Groups' },
    { id: 'invites', label: 'Invites' },
  ];

  const renderMembers = () => (
    <div className="space-y-1">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 lg:px-6 py-4 hover:bg-zinc-900/50 transition-colors border-b border-zinc-800/30 gap-3 lg:gap-0"
        >
          <div className="flex items-center gap-3 lg:gap-4 flex-1">
            <div className={`w-10 h-10 flex-shrink-0 rounded-full ${member.color} flex items-center justify-center text-white font-semibold`}>
              {member.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm lg:text-base">{member.name}</h3>
              <p className="text-gray-400 text-xs lg:text-sm truncate">{member.email}</p>
            </div>
            <button className="lg:hidden text-gray-400 hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 ml-13 lg:ml-0">
            <div className="flex items-center">
              <span className="px-3 py-1 rounded-full bg-zinc-800/50 text-gray-300 text-xs lg:text-sm">
                {member.role}
              </span>
            </div>

            <div className="flex items-center gap-2 lg:min-w-[200px]">
              <Circle size={8} className={member.statusColor === 'text-emerald-400' ? 'text-emerald-400 fill-emerald-400' : 'text-gray-600 fill-gray-600'} />
              <span className={`text-xs lg:text-sm ${member.statusColor || 'text-gray-400'}`}>{member.status}</span>
            </div>

            <button className="hidden lg:block text-gray-400 hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGroups = () => (
    <div className="space-y-1">
      {groups.map((group) => (
        <div
          key={group.id}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 lg:px-6 py-4 hover:bg-zinc-900/50 transition-colors border-b border-zinc-800/30 gap-3 lg:gap-0"
        >
          <div className="flex items-center gap-3 lg:gap-4 flex-1">
            <div className={`w-10 h-10 flex-shrink-0 rounded-full ${group.color} flex items-center justify-center text-white font-semibold`}>
              {group.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm lg:text-base">{group.name}</h3>
              <p className="text-gray-400 text-xs lg:text-sm">{group.members} members</p>
            </div>
            <button className="lg:hidden text-gray-400 hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 ml-13 lg:ml-0">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(Math.min(3, group.members))].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-zinc-700 border-2 border-black flex items-center justify-center"
                  />
                ))}
              </div>
              <span className="text-gray-400 text-xs lg:text-sm ml-2">{group.memberNames}</span>
            </div>

            <div className="flex items-center gap-2 lg:min-w-[140px]">
              <Circle size={8} className="text-gray-600 fill-gray-600" />
              <span className="text-gray-400 text-xs lg:text-sm">{group.online}</span>
            </div>

            {group.isDefault && (
              <span className="px-3 py-1 rounded-full bg-zinc-800 text-gray-400 text-xs lg:text-sm w-fit">
                Default
              </span>
            )}

            <button className="hidden lg:block text-gray-400 hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderInvites = () => (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500">No pending invites</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800/50 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-zinc-800 rounded flex items-center justify-center">
              <div className="w-3 h-3 lg:w-4 lg:h-4 border-2 border-white rounded-sm"></div>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-white">Team</h1>
          </div>
          <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
              <span className="text-xs">?</span>
            </div>
            <span className="text-sm hidden sm:inline">Learn more</span>
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 lg:gap-8 border-b border-zinc-800/50 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 relative transition-colors whitespace-nowrap text-sm lg:text-base ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Action Bar */}
      <div className="px-4 lg:px-6 py-4 border-b border-zinc-800/30">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zinc-700 text-sm lg:text-base"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 rounded-lg font-medium transition-all text-sm lg:text-base whitespace-nowrap">
            <Plus size={18} />
            <span className="hidden sm:inline">{activeTab === 'groups' ? 'Add new group' : 'Invite teammates'}</span>
            <span className="sm:hidden">{activeTab === 'groups' ? 'Add group' : 'Invite'}</span>
          </button>
        </div>
      </div>

      {/* Table Header */}
      {activeTab !== 'invites' && (
        <div className="hidden lg:block px-6 py-3 border-b border-zinc-800/30">
          <div className="flex items-center justify-between text-gray-400 text-sm font-medium">
            <div className="flex-1">{activeTab === 'members' ? 'Teammate' : 'Group'}</div>
            <div className="flex items-center gap-8">
              <div className="min-w-[140px]">{activeTab === 'members' ? 'Role' : 'Members'}</div>
              <div className="min-w-[200px]">Status</div>
              <div className="w-10"></div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div>
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'groups' && renderGroups()}
        {activeTab === 'invites' && renderInvites()}
      </div>
    </div>
  );
};

export default DepartmentPage;
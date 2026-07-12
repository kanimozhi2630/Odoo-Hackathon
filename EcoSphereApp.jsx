import React, { useState } from "react";
import {
  Leaf, ChevronDown, ChevronRight, Menu, Search, Bell, UserCircle2,
  Settings as SettingsIcon, LogOut, ChevronDown as CaretDown
} from "lucide-react";
import { NAV, notifications } from "./mockData";
import { Avatar } from "./components";
import { LoginPage, PAGES } from "./pages";
function Sidebar({ active, onNavigate, openGroups, toggleGroup, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed lg:static z-40 top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center gap-2 px-5 h-16 border-b border-gray-200 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><Leaf className="w-4.5 h-4.5 text-white" /></div>
          <span className="font-semibold text-gray-900">EcoSphere</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {NAV.map(item => {
            const Icon = item.icon;
            if (item.children) {
              const isOpen = openGroups.includes(item.key);
              const childActive = item.children.some(c => c.key === active);
              return (
                <div key={item.key} className="mb-0.5">
                  <button onClick={() => toggleGroup(item.key)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${childActive ? "text-green-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                  {isOpen && (
                    <div className="ml-4 pl-3 border-l border-gray-100 mt-0.5 mb-1 space-y-0.5">
                      {item.children.map(c => (
                        <button key={c.key} onClick={() => { onNavigate(c.key); setMobileOpen(false); }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors
                            ${active === c.key ? "bg-green-50 text-green-700 font-medium" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}>
                          {c.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <button key={item.key} onClick={() => { onNavigate(item.key); setMobileOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium mb-0.5 transition-colors
                  ${active === item.key ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}>
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <Avatar initials="AS" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-800 truncate">Ananya Sharma</p>
              <p className="text-xs text-gray-400 truncate">ESG Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
function Navbar({ setMobileOpen, onLogout }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 lg:px-6 flex-shrink-0 relative z-20">
      <div className="flex items-center gap-3 flex-1">
        <button className="lg:hidden text-gray-500" onClick={() => setMobileOpen(true)}><Menu className="w-5 h-5" /></button>
        <div className="relative w-full max-w-sm hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input placeholder="Search departments, employees, policies..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-200 focus:bg-white" />
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="relative">
          <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }} className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-gray-800">Notifications</div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50">
                    <p className="text-xs text-gray-700 leading-snug">{n.text}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} className="flex items-center gap-2 p-1 pr-2 rounded-lg hover:bg-gray-100">
            <Avatar initials="AS" size="w-8 h-8" />
            <CaretDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"><UserCircle2 className="w-4 h-4" /> Profile</button>
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"><SettingsIcon className="w-4 h-4" /> Settings</button>
              <button onClick={onLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100"><LogOut className="w-4 h-4" /> Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default function EcoSphereApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [openGroups, setOpenGroups] = useState(["environmental"]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleGroup = (key) => setOpenGroups(g => g.includes(key) ? g.filter(k => k !== key) : [...g, key]);
  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;
  const PageComponent = PAGES[page] || PAGES["dashboard"];
  return (
    <div className="h-screen w-full flex bg-gray-50 font-sans overflow-hidden">
      <Sidebar active={page} onNavigate={setPage} openGroups={openGroups} toggleGroup={toggleGroup} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar setMobileOpen={setMobileOpen} onLogout={() => setLoggedIn(false)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <PageComponent />
        </main>
      </div>
    </div>
  );
}
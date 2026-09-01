import React, { useState } from 'react';
import { ViewType, ToolId } from '../types';
import { TOOLS } from '../data/toolsData';
import {
  FileText,
  Layers,
  Scissors,
  Minimize2,
  Menu,
  X,
  Code2,
  ChevronDown,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const handleNav = (view: ViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  const popularTools: { id: ToolId; name: string }[] = [
    { id: 'compress-pdf', name: 'Compress' },
    { id: 'pdf-to-word', name: 'PDF to Word' },
    { id: 'word-to-pdf', name: 'Word to PDF' },
    { id: 'merge-pdf', name: 'Merge' },
    { id: 'split-pdf', name: 'Split' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNav('home')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-md shadow-indigo-500/25 transition-transform group-hover:scale-105">
            <span className="font-extrabold text-white text-lg tracking-wider">PM</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                PDF<span className="text-indigo-600">Master</span>
              </span>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 border border-indigo-200">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">Free Online PDF Utility Suite</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <button
            id="nav-home-btn"
            onClick={() => handleNav('home')}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
              currentView === 'home'
                ? 'bg-slate-100 text-indigo-600'
                : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            Home
          </button>

          {/* All Tools Dropdown */}
          <div className="relative">
            <button
              id="nav-tools-dropdown-btn"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 250)}
              className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-indigo-600 focus:outline-none"
            >
              <span>All PDF Tools</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
                <div className="mb-2 px-2 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select a Utility
                </div>
                <div className="grid max-h-96 grid-cols-1 gap-1 overflow-y-auto">
                  {TOOLS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleNav(t.id)}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="font-semibold">{t.title}</span>
                      {t.badge && (
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                          {t.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {popularTools.map((t) => (
            <button
              key={t.id}
              id={`nav-tool-${t.id}-btn`}
              onClick={() => handleNav(t.id)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                currentView === t.id
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              {t.name}
            </button>
          ))}

          <button
            id="nav-about-btn"
            onClick={() => handleNav('about')}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              currentView === 'about'
                ? 'bg-slate-100 text-indigo-600'
                : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            About
          </button>

          <button
            id="nav-contact-btn"
            onClick={() => handleNav('contact')}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              currentView === 'contact'
                ? 'bg-slate-100 text-indigo-600'
                : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA / Backend Code Viewer Button */}
        <div className="hidden items-center gap-3 sm:flex">
          <button
            id="header-spring-boot-btn"
            onClick={() => handleNav('backend-code')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <Code2 className="h-4 w-4 text-indigo-600" />
            <span>Spring Boot 3.x Source</span>
          </button>

          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Free &amp; Secure</span>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleNav('home')}
              className={`rounded-lg px-3 py-2 text-left text-sm font-bold ${
                currentView === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-800'
              }`}
            >
              Home
            </button>
            <div className="my-1 border-t border-slate-100 pt-1">
              <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">PDF Tools</div>
              <div className="grid grid-cols-2 gap-1">
                {TOOLS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleNav(t.id)}
                    className={`rounded-lg px-3 py-2 text-left text-xs font-medium ${
                      currentView === t.id ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="my-1 border-t border-slate-100 pt-2 flex flex-col gap-1">
              <button
                onClick={() => handleNav('about')}
                className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                About Us
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Contact
              </button>
              <button
                onClick={() => handleNav('privacy-policy')}
                className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNav('backend-code')}
                className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-left text-sm font-bold text-indigo-700"
              >
                <Code2 className="h-4 w-4" />
                <span>Spring Boot 3.x Source Code</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

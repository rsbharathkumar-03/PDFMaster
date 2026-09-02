import React, { useState } from 'react';
import { ViewType, ToolId } from '../types';
import { TOOLS } from '../data/toolsData';
import {
  Menu,
  X,
  Code2,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  FileText,
  Minimize2,
  Layers,
  Scissors
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const handleNav = (view: ViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  const popularTools: { id: ToolId; name: string }[] = [
    { id: 'compress-pdf', name: 'Compress PDF' },
    { id: 'pdf-to-word', name: 'PDF to Word' },
    { id: 'word-to-pdf', name: 'Word to PDF' },
    { id: 'merge-pdf', name: 'Merge PDF' },
    { id: 'split-pdf', name: 'Split PDF' }
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all"
      aria-label="Main site header"
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <button
          id="brand-logo-btn"
          type="button"
          onClick={() => handleNav('home')}
          aria-label="PDFMaster - Free Online PDF Tools - Go to homepage"
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-xl"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-md shadow-indigo-500/25 transition-transform group-hover:scale-105">
            <span className="font-extrabold text-lg tracking-wider text-white">
              PM
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600">
                PDF<span className="text-indigo-600">Master</span>
              </span>

              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                PRO
              </span>
            </div>

            <p className="text-[11px] font-medium text-slate-400">
              Free Online PDF Tools
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {/* Home */}
          <button
            id="nav-home-btn"
            type="button"
            onClick={() => handleNav('home')}
            aria-current={currentView === 'home' ? 'page' : undefined}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              currentView === 'home'
                ? 'bg-slate-100 text-indigo-600'
                : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            Home
          </button>

          {/* All PDF Tools */}
          <div className="relative">
            <button
              id="nav-tools-dropdown-btn"
              type="button"
              aria-haspopup="true"
              aria-expanded={toolsDropdownOpen}
              onClick={() => setToolsDropdownOpen((open) => !open)}
              onBlur={() =>
                setTimeout(() => setToolsDropdownOpen(false), 250)
              }
              className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <span>All PDF Tools</span>

              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  toolsDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {toolsDropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150"
                role="menu"
                aria-label="PDF tools"
              >
                <div className="mb-2 flex items-center gap-2 px-2 py-1">
                  <FileText className="h-4 w-4 text-indigo-600" />

                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    PDF Tools
                  </span>
                </div>

                <div className="grid max-h-96 grid-cols-1 gap-1 overflow-y-auto">
                  {TOOLS.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      role="menuitem"
                      onClick={() => handleNav(tool.id)}
                      aria-label={`Open ${tool.title}`}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                        currentView === tool.id
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
                      }`}
                    >
                      <span className="font-semibold">
                        {tool.title}
                      </span>

                      {tool.badge && (
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                          {tool.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Popular PDF Tools */}
          {popularTools.map((tool) => (
            <button
              key={tool.id}
              id={`nav-tool-${tool.id}-btn`}
              type="button"
              onClick={() => handleNav(tool.id)}
              aria-current={currentView === tool.id ? 'page' : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                currentView === tool.id
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              {tool.name}
            </button>
          ))}

          {/* About */}
          <button
            id="nav-about-btn"
            type="button"
            onClick={() => handleNav('about')}
            aria-current={currentView === 'about' ? 'page' : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              currentView === 'about'
                ? 'bg-slate-100 text-indigo-600'
                : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            About
          </button>

          {/* Contact */}
          <button
            id="nav-contact-btn"
            type="button"
            onClick={() => handleNav('contact')}
            aria-current={currentView === 'contact' ? 'page' : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              currentView === 'contact'
                ? 'bg-slate-100 text-indigo-600'
                : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 sm:flex">

          {/* Backend Source */}
          <button
            id="header-spring-boot-btn"
            type="button"
            onClick={() => handleNav('backend-code')}
            aria-label="View Spring Boot source code"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Code2 className="h-4 w-4 text-indigo-600" />
            <span>Spring Boot 3.x Source</span>
          </button>

          {/* Free Badge */}
          <div className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Free PDF Tools</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={
              mobileMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          className="border-b border-slate-200 bg-white px-4 py-4 md:hidden animate-in slide-in-from-top-2"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">

            {/* Home */}
            <button
              type="button"
              onClick={() => handleNav('home')}
              aria-current={currentView === 'home' ? 'page' : undefined}
              className={`rounded-lg px-3 py-2 text-left text-sm font-bold ${
                currentView === 'home'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* PDF Tools */}
            <div className="my-1 border-t border-slate-100 pt-2">
              <div className="flex items-center gap-2 px-3 py-1">
                <FileText className="h-4 w-4 text-indigo-600" />

                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  PDF Tools
                </span>
              </div>

              <div className="mt-1 grid grid-cols-2 gap-1">
                {TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => handleNav(tool.id)}
                    aria-current={
                      currentView === tool.id ? 'page' : undefined
                    }
                    className={`rounded-lg px-3 py-2 text-left text-xs ${
                      currentView === tool.id
                        ? 'bg-indigo-50 font-bold text-indigo-600'
                        : 'font-medium text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {tool.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Tools */}
            <div className="my-1 border-t border-slate-100 pt-2">
              <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                Popular PDF Tools
              </div>

              <div className="grid grid-cols-1 gap-1">
                <button
                  type="button"
                  onClick={() => handleNav('compress-pdf')}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Minimize2 className="h-4 w-4 text-indigo-600" />
                  Compress PDF
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('merge-pdf')}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Layers className="h-4 w-4 text-indigo-600" />
                  Merge PDF
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('split-pdf')}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Scissors className="h-4 w-4 text-indigo-600" />
                  Split PDF
                </button>
              </div>
            </div>

            {/* Other Pages */}
            <div className="my-1 flex flex-col gap-1 border-t border-slate-100 pt-2">
              <button
                type="button"
                onClick={() => handleNav('about')}
                className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                About PDFMaster
              </button>

              <button
                type="button"
                onClick={() => handleNav('contact')}
                className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Contact PDFMaster
              </button>

              <button
                type="button"
                onClick={() => handleNav('privacy-policy')}
                className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Privacy Policy
              </button>

              <button
                type="button"
                onClick={() => handleNav('terms')}
                className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Terms of Service
              </button>

              <button
                type="button"
                onClick={() => handleNav('cookie-policy')}
                className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cookie Policy
              </button>

              <button
                type="button"
                onClick={() => handleNav('backend-code')}
                className="mt-1 flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-left text-sm font-bold text-indigo-700"
              >
                <Code2 className="h-4 w-4" />
                <span>Spring Boot 3.x Source Code</span>
              </button>
            </div>

            {/* Mobile Trust Message */}
            <div className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              Free Online PDF Tools
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

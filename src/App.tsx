import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdContainer } from './components/AdContainer';
import { FloatingBackButton } from './components/FloatingBackButton';
import { HomeView } from './views/HomeView';
import { ToolView } from './views/ToolView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { PrivacyView } from './views/PrivacyView';
import { TermsView } from './views/TermsView';
import { CookieView } from './views/CookieView';
import { BlogView } from './views/BlogView';
import { JavaCodeViewerModal } from './views/JavaCodeViewerModal';
import { toolsCatalog } from './data/toolsData';
import { ViewType } from './types';

const viewTitleMap: Record<string, string> = {
  home: 'Home',
  about: 'About Us',
  contact: 'Contact',
  'privacy-policy': 'Privacy Policy',
  terms: 'Terms of Service',
  'cookie-policy': 'Cookie Policy',
  blog: 'Guides & Blog',
  'backend-code': 'Spring Boot Architecture',
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [historyStack, setHistoryStack] = useState<ViewType[]>([]);
  const [showJavaModal, setShowJavaModal] = useState<boolean>(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Synchronize with browser Back/Forward navigation
  useEffect(() => {
    window.history.replaceState({ view: 'home' }, '');

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback(
    (view: ViewType) => {
      if (view === 'backend-code') {
        setShowJavaModal(true);
        return;
      }

      if (view !== currentView) {
        setHistoryStack((prev) => [...prev, currentView]);
        try {
          window.history.pushState({ view }, '');
        } catch (e) {
          // Fallback
        }
        setCurrentView(view);
      }
    },
    [currentView]
  );

  const handleBack = useCallback(() => {
    if (historyStack.length > 0) {
      const nextStack = [...historyStack];
      const previousView = nextStack.pop()!;
      setHistoryStack(nextStack);
      try {
        window.history.pushState({ view: previousView }, '');
      } catch (e) {
        // Fallback
      }
      setCurrentView(previousView);
    } else {
      // Graceful fallback to Home if no previous internal page
      if (currentView !== 'home') {
        try {
          window.history.pushState({ view: 'home' }, '');
        } catch (e) {
          // Fallback
        }
        setCurrentView('home');
      }
    }
  }, [historyStack, currentView]);

  const handleGoHome = useCallback(() => {
    if (currentView !== 'home') {
      setHistoryStack((prev) => [...prev, currentView]);
      try {
        window.history.pushState({ view: 'home' }, '');
      } catch (e) {
        // Fallback
      }
      setCurrentView('home');
    }
  }, [currentView]);

  // Helper to determine friendly label for the previous screen
  const previousViewKey = historyStack.length > 0 ? historyStack[historyStack.length - 1] : undefined;
  const previousTool = previousViewKey ? toolsCatalog.find((t) => t.id === previousViewKey) : undefined;
  const previousViewTitle = previousTool
    ? previousTool.title
    : previousViewKey
    ? viewTitleMap[previousViewKey] || 'Previous Screen'
    : 'Home';

  const currentTool = toolsCatalog.find((t) => t.id === currentView);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white relative">
      {/* Floating Side Back Navigation Button */}
      <FloatingBackButton
        currentView={currentView}
        historyLength={historyStack.length}
        previousViewTitle={previousViewTitle}
        onBack={handleBack}
        onGoHome={handleGoHome}
      />

      {/* Top Navigation Bar */}
      <Header currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 py-6 sm:py-8">
        {/* Top Header Ad Placement (Google AdSense 728x90 Banner) */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
          <AdContainer
            slotId="pdfmaster-top-leaderboard-728x90"
            format="horizontal"
            className="rounded-2xl"
          />
        </div>

        {/* View Router */}
        {currentView === 'home' && <HomeView onSelectTool={handleNavigate} />}

        {currentTool && (
          <ToolView
            tool={currentTool}
            onBack={handleBack}
            onNavigateTool={handleNavigate}
          />
        )}

        {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'privacy-policy' && <PrivacyView />}
        {currentView === 'terms' && <TermsView />}
        {currentView === 'cookie-policy' && <CookieView />}
        {currentView === 'blog' && <BlogView onNavigate={handleNavigate} />}
      </main>

      {/* Bottom Ad Placement */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <AdContainer
          slotId="pdfmaster-bottom-banner"
          format="horizontal"
          className="rounded-2xl"
        />
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onOpenBackendCode={() => setShowJavaModal(true)} />

      {/* Spring Boot Java Architecture Modal */}
      {showJavaModal && (
        <JavaCodeViewerModal onClose={() => setShowJavaModal(false)} />
      )}
    </div>
  );
}

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

/**
 * Convert an internal view ID into an SEO-friendly URL.
 *
 * Examples:
 * home           -> /
 * merge-pdf      -> /merge-pdf
 * compress-pdf   -> /compress-pdf
 * privacy-policy -> /privacy-policy
 */
const viewToPath = (view: string): string => {
  if (view === 'home') {
    return '/';
  }

  return `/${view}`;
};

/**
 * Convert the current browser URL into an internal view ID.
 *
 * Examples:
 * /              -> home
 * /merge-pdf     -> merge-pdf
 * /compress-pdf  -> compress-pdf
 */
const pathToView = (): ViewType => {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');

  // Homepage
  if (!path) {
    return 'home';
  }

  // Check whether the URL belongs to one of our PDF tools.
  const matchingTool = toolsCatalog.find(
    (tool) => tool.id === path
  );

  if (matchingTool) {
    return matchingTool.id;
  }

  // Check normal website pages.
  const validViews: ViewType[] = [
    'home',
    'about',
    'contact',
    'privacy-policy',
    'terms',
    'cookie-policy',
    'blog'
  ];

  if (validViews.includes(path as ViewType)) {
    return path as ViewType;
  }

  // Unknown URL -> Home
  return 'home';
};

const viewTitleMap: Record<string, string> = {
  home: 'Home',
  about: 'About Us',
  contact: 'Contact',
  'privacy-policy': 'Privacy Policy',
  terms: 'Terms of Service',
  'cookie-policy': 'Cookie Policy',
  blog: 'Guides & Blog',
  'backend-code': 'Spring Boot Architecture'
};

export default function App() {
  /**
   * Determine the initial page from the browser URL.
   *
   * This means directly visiting:
   *
   * https://pdf-master-ezhr.vercel.app/merge-pdf
   *
   * will open the Merge PDF tool.
   */
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    return pathToView();
  });

  const [historyStack, setHistoryStack] = useState<ViewType[]>([]);
  const [showJavaModal, setShowJavaModal] = useState<boolean>(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentView]);

  /**
   * Synchronize browser Back/Forward buttons with the application.
   */
  useEffect(() => {
    /**
     * Make sure the current browser URL contains the correct view.
     *
     * replaceState is used here so loading the application
     * does not create an unnecessary history entry.
     */
    const initialPath = viewToPath(currentView);

    window.history.replaceState(
      { view: currentView },
      '',
      initialPath
    );

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view as ViewType);
      } else {
        // If browser history doesn't contain our state,
        // determine the page from the URL.
        setCurrentView(pathToView());
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  /**
   * Navigate to another page or PDF tool.
   */
  const handleNavigate = useCallback(
    (view: ViewType) => {
      // Backend code opens as a modal rather than a page.
      if (view === 'backend-code') {
        setShowJavaModal(true);
        return;
      }

      if (view !== currentView) {
        // Save current page for the floating back button.
        setHistoryStack((prev) => [
          ...prev,
          currentView
        ]);

        const newPath = viewToPath(view);

        try {
          window.history.pushState(
            { view },
            '',
            newPath
          );
        } catch (error) {
          console.error(
            'Navigation error:',
            error
          );
        }

        setCurrentView(view);
      }
    },
    [currentView]
  );

  /**
   * Handle the custom floating Back button.
   */
  const handleBack = useCallback(() => {
    if (historyStack.length > 0) {
      const nextStack = [...historyStack];

      const previousView = nextStack.pop()!;

      setHistoryStack(nextStack);

      const previousPath = viewToPath(
        previousView
      );

      try {
        window.history.pushState(
          { view: previousView },
          '',
          previousPath
        );
      } catch (error) {
        console.error(
          'Back navigation error:',
          error
        );
      }

      setCurrentView(previousView);
    } else {
      // Fallback to Home
      if (currentView !== 'home') {
        try {
          window.history.pushState(
            { view: 'home' },
            '',
            '/'
          );
        } catch (error) {
          console.error(
            'Home navigation error:',
            error
          );
        }

        setCurrentView('home');
      }
    }
  }, [historyStack, currentView]);

  /**
   * Navigate to Home.
   */
  const handleGoHome = useCallback(() => {
    if (currentView !== 'home') {
      setHistoryStack((prev) => [
        ...prev,
        currentView
      ]);

      try {
        window.history.pushState(
          { view: 'home' },
          '',
          '/'
        );
      } catch (error) {
        console.error(
          'Home navigation error:',
          error
        );
      }

      setCurrentView('home');
    }
  }, [currentView]);

  // Determine friendly label for the previous screen.
  const previousViewKey =
    historyStack.length > 0
      ? historyStack[historyStack.length - 1]
      : undefined;

  const previousTool = previousViewKey
    ? toolsCatalog.find(
        (tool) => tool.id === previousViewKey
      )
    : undefined;

  const previousViewTitle = previousTool
    ? previousTool.title
    : previousViewKey
      ? viewTitleMap[previousViewKey] ||
        'Previous Screen'
      : 'Home';

  // Find the currently selected PDF tool.
  const currentTool = toolsCatalog.find(
    (tool) => tool.id === currentView
  );

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
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-6 sm:py-8">

        {/* Top Header Ad Placement */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
          <AdContainer
            slotId="pdfmaster-top-leaderboard-728x90"
            format="horizontal"
            className="rounded-2xl"
          />
        </div>

        {/* Home Page */}
        {currentView === 'home' && (
          <HomeView
            onSelectTool={handleNavigate}
          />
        )}

        {/* PDF Tool Pages */}
        {currentTool && (
          <ToolView
            tool={currentTool}
            onBack={handleBack}
            onNavigateTool={handleNavigate}
          />
        )}

        {/* About */}
        {currentView === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
          />
        )}

        {/* Contact */}
        {currentView === 'contact' && (
          <ContactView />
        )}

        {/* Privacy */}
        {currentView === 'privacy-policy' && (
          <PrivacyView />
        )}

        {/* Terms */}
        {currentView === 'terms' && (
          <TermsView />
        )}

        {/* Cookie Policy */}
        {currentView === 'cookie-policy' && (
          <CookieView />
        )}

        {/* Blog */}
        {currentView === 'blog' && (
          <BlogView
            onNavigate={handleNavigate}
          />
        )}

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
      <Footer
        onNavigate={handleNavigate}
        onOpenBackendCode={() =>
          setShowJavaModal(true)
        }
      />

      {/* Spring Boot Java Architecture Modal */}
      {showJavaModal && (
        <JavaCodeViewerModal
          onClose={() =>
            setShowJavaModal(false)
          }
        />
      )}

    </div>
  );
}

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

const SITE_URL = 'https://pdf-master-ezhr.vercel.app';

const HOME_TITLE =
  'Free Online PDF Tools - Merge, Compress, Split & Convert PDF | PDFMaster';

const HOME_DESCRIPTION =
  'PDFMaster offers free online PDF tools to merge, split, compress, convert, rotate, watermark, and protect PDF files quickly and easily.';

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

/**
 * Update the document metadata whenever the current page changes.
 *
 * This is especially important for individual PDF tool pages because
 * each tool already has its own seoTitle and metaDesc in toolsData.ts.
 */
const updatePageMetadata = (view: ViewType): void => {
  const currentTool = toolsCatalog.find(
    (tool) => tool.id === view
  );

  let title = HOME_TITLE;
  let description = HOME_DESCRIPTION;
  let canonicalUrl = SITE_URL;

  if (currentTool) {
    title = currentTool.seoTitle;
    description = currentTool.metaDesc;
    canonicalUrl = `${SITE_URL}/${currentTool.id}`;
  } else if (view === 'about') {
    title = 'About PDFMaster - Free Online PDF Tools';
    description =
      'Learn about PDFMaster, a free online platform providing useful PDF tools for everyday document tasks.';
    canonicalUrl = `${SITE_URL}/about`;
  } else if (view === 'contact') {
    title = 'Contact PDFMaster - Get in Touch';
    description =
      'Contact PDFMaster for questions, feedback, suggestions, or support regarding our online PDF tools.';
    canonicalUrl = `${SITE_URL}/contact`;
  } else if (view === 'privacy-policy') {
    title = 'Privacy Policy - PDFMaster';
    description =
      'Read the PDFMaster privacy policy to understand how information is handled when using our website and PDF tools.';
    canonicalUrl = `${SITE_URL}/privacy-policy`;
  } else if (view === 'terms') {
    title = 'Terms of Service - PDFMaster';
    description =
      'Read the PDFMaster terms of service for using our free online PDF tools.';
    canonicalUrl = `${SITE_URL}/terms`;
  } else if (view === 'cookie-policy') {
    title = 'Cookie Policy - PDFMaster';
    description =
      'Read the PDFMaster cookie policy and learn how cookies may be used on our website.';
    canonicalUrl = `${SITE_URL}/cookie-policy`;
  } else if (view === 'blog') {
    title = 'PDF Guides & Blog - PDFMaster';
    description =
      'Explore PDF guides, tips, tutorials, and useful information about working with PDF files.';
    canonicalUrl = `${SITE_URL}/blog`;
  }

  // Browser title
  document.title = title;

  // Description
  let descriptionTag = document.querySelector(
    'meta[name="description"]'
  ) as HTMLMetaElement | null;

  if (!descriptionTag) {
    descriptionTag = document.createElement('meta');
    descriptionTag.name = 'description';
    document.head.appendChild(descriptionTag);
  }

  descriptionTag.content = description;

  // Canonical
  let canonicalTag = document.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement | null;

  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.rel = 'canonical';
    document.head.appendChild(canonicalTag);
  }

  canonicalTag.href = canonicalUrl;

  // Open Graph title
  let ogTitle = document.querySelector(
    'meta[property="og:title"]'
  ) as HTMLMetaElement | null;

  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }

  ogTitle.content = title;

  // Open Graph description
  let ogDescription = document.querySelector(
    'meta[property="og:description"]'
  ) as HTMLMetaElement | null;

  if (!ogDescription) {
    ogDescription = document.createElement('meta');
    ogDescription.setAttribute(
      'property',
      'og:description'
    );
    document.head.appendChild(ogDescription);
  }

  ogDescription.content = description;

  // Open Graph URL
  let ogUrl = document.querySelector(
    'meta[property="og:url"]'
  ) as HTMLMetaElement | null;

  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }

  ogUrl.content = canonicalUrl;

  // Twitter title
  let twitterTitle = document.querySelector(
    'meta[name="twitter:title"]'
  ) as HTMLMetaElement | null;

  if (!twitterTitle) {
    twitterTitle = document.createElement('meta');
    twitterTitle.name = 'twitter:title';
    document.head.appendChild(twitterTitle);
  }

  twitterTitle.content = title;

  // Twitter description
  let twitterDescription = document.querySelector(
    'meta[name="twitter:description"]'
  ) as HTMLMetaElement | null;

  if (!twitterDescription) {
    twitterDescription = document.createElement('meta');
    twitterDescription.name = 'twitter:description';
    document.head.appendChild(twitterDescription);
  }

  twitterDescription.content = description;
};

export default function App() {
  /**
   * Determine the initial page from the browser URL.
   *
   * This allows direct URLs such as:
   *
   * https://pdf-master-ezhr.vercel.app/merge-pdf
   *
   * to open the Merge PDF tool.
   */
  const [currentView, setCurrentView] =
    useState<ViewType>(() => pathToView());

  const [historyStack, setHistoryStack] =
    useState<ViewType[]>([]);

  const [showJavaModal, setShowJavaModal] =
    useState<boolean>(false);

  /**
   * Update SEO metadata whenever the page changes.
   */
  useEffect(() => {
    updatePageMetadata(currentView);
  }, [currentView]);

  /**
   * Scroll to top on view change.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentView]);

  /**
   * Synchronize browser Back/Forward buttons
   * with the application.
   */
  useEffect(() => {
    const initialPath = viewToPath(currentView);

    window.history.replaceState(
      { view: currentView },
      '',
      initialPath
    );

    const handlePopState = (
      event: PopStateEvent
    ) => {
      if (
        event.state &&
        event.state.view
      ) {
        setCurrentView(
          event.state.view as ViewType
        );
      } else {
        setCurrentView(pathToView());
      }
    };

    window.addEventListener(
      'popstate',
      handlePopState
    );

    return () => {
      window.removeEventListener(
        'popstate',
        handlePopState
      );
    };
  }, []);

  /**
   * Navigate to another page or PDF tool.
   */
  const handleNavigate = useCallback(
    (view: ViewType) => {
      // Backend code opens as a modal.
      if (view === 'backend-code') {
        setShowJavaModal(true);
        return;
      }

      if (view !== currentView) {
        // Save current page for the custom back button.
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

      const previousPath =
        viewToPath(previousView);

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
    } else if (currentView !== 'home') {
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

  // Determine friendly label for previous screen.
  const previousViewKey =
    historyStack.length > 0
      ? historyStack[
          historyStack.length - 1
        ]
      : undefined;

  const previousTool = previousViewKey
    ? toolsCatalog.find(
        (tool) =>
          tool.id === previousViewKey
      )
    : undefined;

  const previousViewTitle = previousTool
    ? previousTool.title
    : previousViewKey
      ? viewTitleMap[
          previousViewKey
        ] || 'Previous Screen'
      : 'Home';

  // Find currently selected PDF tool.
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

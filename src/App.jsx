import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from './components/layout/DashboardLayout';
import GlobalEffects from './components/layout/GlobalEffects';
import LoadingScreen from './components/ui/LoadingScreen';
import NotFound from './pages/NotFound';
import { CardSkeleton, ChartSkeleton } from './components/ui/SkeletonLoader';

// Lazy load Pages (Step 25: Performance optimization)
const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ReportIssue = lazy(() => import('./pages/ReportIssue'));
const CityMap = lazy(() => import('./pages/CityMap'));
const Analytics = lazy(() => import('./pages/Analytics'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const Emergency = lazy(() => import('./pages/Emergency'));
const Profile = lazy(() => import('./pages/Profile'));

// Smooth Route Page Transitions (Step 24)
const AnimatedPage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -15, scale: 0.98 }}
    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    className="w-full min-h-screen"
  >
    {children}
  </motion.div>
);

// Fallback skeleton screen while components load (Step 26)
const PageLoaderFallback = () => (
  <div className="p-8 max-w-6xl mx-auto space-y-8 bg-[#070b19]/95 min-h-screen text-white">
    <div className="space-y-2">
      <div className="h-6 bg-slate-800 rounded-lg w-1/4 animate-pulse" />
      <div className="h-4 bg-slate-800 rounded-lg w-1/3 animate-pulse" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
    <ChartSkeleton />
  </div>
);

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Landing page — no sidebar */}
        <Route 
          path="/" 
          element={
            <Suspense fallback={<PageLoaderFallback />}>
              <AnimatedPage>
                <Landing />
              </AnimatedPage>
            </Suspense>
          } 
        />

        {/* Dashboard pages — shared sidebar layout */}
        <Route element={<DashboardLayout />}>
          <Route 
            path="/dashboard" 
            element={
              <Suspense fallback={<PageLoaderFallback />}>
                <AnimatedPage>
                  <Dashboard />
                </AnimatedPage>
              </Suspense>
            } 
          />
          <Route 
            path="/report" 
            element={
              <Suspense fallback={<PageLoaderFallback />}>
                <AnimatedPage>
                  <ReportIssue />
                </AnimatedPage>
              </Suspense>
            } 
          />
          <Route 
            path="/map" 
            element={
              <Suspense fallback={<PageLoaderFallback />}>
                <AnimatedPage>
                  <CityMap />
                </AnimatedPage>
              </Suspense>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <Suspense fallback={<PageLoaderFallback />}>
                <AnimatedPage>
                  <Analytics />
                </AnimatedPage>
              </Suspense>
            } 
          />
          <Route 
            path="/ai-assistant" 
            element={
              <Suspense fallback={<PageLoaderFallback />}>
                <AnimatedPage>
                  <AIAssistant />
                </AnimatedPage>
              </Suspense>
            } 
          />
          <Route 
            path="/emergency" 
            element={
              <Suspense fallback={<PageLoaderFallback />}>
                <AnimatedPage>
                  <Emergency />
                </AnimatedPage>
              </Suspense>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <Suspense fallback={<PageLoaderFallback />}>
                <AnimatedPage>
                  <Profile />
                </AnimatedPage>
              </Suspense>
            } 
          />
        </Route>

        {/* Wildcard 404 Route (Step 26) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  return (
    <Router>
      {/* 1. Global Particles and Spotlight Overlay Effects (Step 20 & 21) */}
      <GlobalEffects />

      {/* 2. Fullscreen Initial Mounting Loader (Step 26) */}
      <LoadingScreen onFinished={() => setInitialLoading(false)} />

      {!initialLoading && <AppRoutes />}
    </Router>
  );
}

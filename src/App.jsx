import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UserAnalyzer from './pages/UserAnalyzer';
import DevStudio from './pages/DevStudio';
import AdminPortal from './pages/AdminPortal';
import GitHubNews from './pages/GitHubNews';
import ResearchGuide from './pages/ResearchGuide';
import TrainedBotChat from './pages/TrainedBotChat';
import EngineersDirectory from './pages/EngineersDirectory';
import { ThemeProvider } from './context/ThemeContext';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <BrowserRouter>
          <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] flex selection:bg-indigo-500 selection:text-white transition-colors duration-200">
            {/* Sidebar Component */}
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            {/* Main Content Area dynamically adjusted for sidebar with buttery-smooth cubic-bezier */}
            <div 
              className={`flex-1 flex flex-col min-h-screen transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCollapsed ? 'lg:pl-[68px]' : 'lg:pl-64'
              }`}
            >
              <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16 lg:pt-8">
                <Routes>
                  <Route path="/" element={<UserAnalyzer />} />
                  <Route path="/trained-bot" element={<TrainedBotChat />} />
                  <Route path="/directory" element={<EngineersDirectory />} />
                  <Route path="/news" element={<GitHubNews />} />
                  <Route path="/research-guide" element={<ResearchGuide />} />
                  <Route path="/dev-studio" element={<DevStudio />} />
                  <Route path="/admin-portal" element={<AdminPortal />} />
                </Routes>
              </main>

              <footer className="border-t border-[var(--border-subtle)] py-6 text-center text-xs text-[var(--text-muted)] font-mono">
                <p>© 2026 PromptCraft AI Studio. Nền tảng phân tích, kiểm định & chia sẻ Prompt AI tiêu chuẩn.</p>
              </footer>
            </div>
          </div>
        </BrowserRouter>
      </SmoothScroll>
    </ThemeProvider>
  );
}

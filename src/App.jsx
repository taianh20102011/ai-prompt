import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import UserAnalyzer from './pages/UserAnalyzer';
import DevStudio from './pages/DevStudio';
import AdminPortal from './pages/AdminPortal';
import GitHubNews from './pages/GitHubNews';
import ResearchGuide from './pages/ResearchGuide';
import TrainedBotChat from './pages/TrainedBotChat';
import EngineersDirectory from './pages/EngineersDirectory';
import UserGuide from './pages/UserGuide';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import SmoothScroll from './components/SmoothScroll';
import LanguageSwitcher from './components/LanguageSwitcher';
import { Sparkles, HelpCircle } from 'lucide-react';

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <SmoothScroll>
          <BrowserRouter>
          <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] flex selection:bg-indigo-500 selection:text-white transition-colors duration-200">
            {/* Sidebar Component */}
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            {/* Main Content Area dynamically adjusted for sidebar with buttery-smooth cubic-bezier */}
            <div 
              className={`flex-1 flex flex-col min-h-screen min-w-0 w-full max-w-full overflow-x-hidden transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[padding] ${
                isCollapsed ? 'lg:pl-[68px]' : 'lg:pl-64'
              }`}
            >
              {/* Top Global Control Bar (Solid High-Contrast Surface, Zero Glassmorphism) */}
              <header className="sticky top-0 z-30 w-full bg-[var(--bg-page)] border-b border-[var(--border-subtle)] px-3 sm:px-6 lg:px-8 py-2.5 transition-colors">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 min-w-0">
                  <div className="flex items-center space-x-2 text-xs pl-10 lg:pl-0 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="font-semibold text-[var(--text-primary)] truncate">Prompt AI PNIT</span>
                    <span className="hidden sm:inline text-[var(--text-muted)] shrink-0">•</span>
                    <span className="hidden md:inline text-[var(--text-muted)] text-[11px] truncate">Viết câu lệnh AI dễ hiểu & tự nhiên hơn</span>
                  </div>

                  <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
                    <Link
                      to="/guide"
                      className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-[8px] border border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs transition-colors"
                      title="Xem hướng dẫn cách sử dụng"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                      <span className="hidden sm:inline">Cách dùng</span>
                    </Link>
                    <LanguageSwitcher compact={false} />
                    <Link
                      to="/inspector"
                      className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tối ưu câu lệnh</span>
                    </Link>
                  </div>
                </div>
              </header>

              <main className="flex-1 max-w-6xl w-full min-w-0 overflow-x-hidden mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <Routes>
                  {/* Trang Giới Thiệu Tổng Quan & Bắt Đầu */}
                  <Route path="/" element={<LandingPage />} />
                  {/* Hướng Dẫn Sử Dụng Chi Tiết */}
                  <Route path="/guide" element={<UserGuide />} />
                  <Route path="/user-guide" element={<UserGuide />} />
                  {/* Phân Hệ Kiểm Định Prompt 6D */}
                  <Route path="/inspector" element={<UserAnalyzer />} />
                  <Route path="/analyzer" element={<UserAnalyzer />} />
                  <Route path="/trained-bot" element={<TrainedBotChat />} />
                  <Route path="/directory" element={<EngineersDirectory />} />
                  <Route path="/news" element={<GitHubNews />} />
                  <Route path="/research-guide" element={<ResearchGuide />} />
                  <Route path="/dev-studio" element={<DevStudio />} />
                  <Route path="/admin-portal" element={<AdminPortal />} />
                </Routes>
              </main>

              {/* Chi Tiết Footer Toàn Diện */}
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </SmoothScroll>
    </LanguageProvider>
  </ThemeProvider>
  );
}

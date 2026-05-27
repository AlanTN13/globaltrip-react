import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import RouteTracker from './components/RouteTracker';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ServicesLanding from './pages/ServicesLanding';
import NewsHome from './pages/NewsHome';
import NewsArticle from './pages/NewsArticle';
import WhatsAppWidget from './components/WhatsAppWidget';

import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <RouteTracker />
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-white font-display text-slate-900 antialiased selection:bg-primary selection:text-white">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="/trabaja-con-nosotros" element={<About />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/servicios" element={<ServicesLanding />} />
              <Route path="/noticias" element={<NewsHome />} />
              <Route path="/noticias/contact" element={<Navigate to="/contacto" replace />} />
              <Route path="/noticias/contact/" element={<Navigate to="/contacto" replace />} />
              <Route path="/noticias/:slug" element={<NewsArticle />} />
            </Routes>
          </main>
        </div>
        <WhatsAppWidget />
      </Router>
    </LanguageProvider>
  );
}

export default App;

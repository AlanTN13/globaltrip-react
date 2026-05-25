import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import RouteTracker from './components/RouteTracker';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ServicesLanding from './pages/ServicesLanding';
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
              <Route path="/contacto" element={<Contact />} />
              <Route path="/servicios" element={<ServicesLanding />} />
            </Routes>
          </main>
        </div>
        <WhatsAppWidget />
      </Router>
    </LanguageProvider>
  );
}

export default App;

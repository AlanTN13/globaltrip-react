import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
    const { language, setLanguage, t } = useLanguage();

    const languages = [
        { code: 'es', flag: 'https://flagcdn.com/w40/ar.png', alt: 'Español' },
        { code: 'en', flag: 'https://flagcdn.com/w40/us.png', alt: 'English' },
        { code: 'pt', flag: 'https://flagcdn.com/w40/br.png', alt: 'Português' }
    ];

    const scrollToServices = (e) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById('servicios-bloque');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header className="bg-white px-6 md:px-12 py-2 flex items-center justify-between sticky top-0 z-[100] border-b border-slate-50 shadow-sm">
            <Link to="/" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
                <img
                    src="/logogt.png"
                    alt="GlobalTrip Logo"
                    className="h-16 md:h-20 w-auto object-contain block"
                />
            </Link>

            <div className="flex items-center gap-6">
                <nav className="hidden md:flex items-center gap-8">
                    <Link className="text-[15px] font-bold text-slate-600 hover:text-primary transition-colors" to="/">
                        {t('nav.home')}
                    </Link>
                    <a className="text-[15px] font-bold text-slate-600 hover:text-primary transition-colors cursor-pointer" onClick={scrollToServices} href="/#servicios-bloque">
                        {t('nav.services')}
                    </a>
                    <Link className="text-[15px] font-bold text-slate-600 hover:text-primary transition-colors" to="/noticias">
                        {t('nav.news')}
                    </Link>
                </nav>

                {/* Language Switcher with Flags */}
                <div className="flex items-center gap-4 px-4 border-x border-slate-100 mx-2">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={() => setLanguage(lang.code)}
                            style={{ cursor: 'pointer' }}
                            className={`w-7 h-5 transition-all duration-300 transform hover:scale-125 overflow-hidden rounded-sm ${language === lang.code ? 'ring-2 ring-blue-600 ring-offset-2 opacity-100 scale-110' : 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
                                }`}
                        >
                            <img
                                src={lang.flag}
                                alt={lang.alt}
                                className="w-full h-full object-cover pointer-events-none"
                            />
                        </button>
                    ))}
                </div>

                <Link to="/contacto" className="hidden sm:inline-block bg-[#0b4e89] text-white px-8 py-3 rounded-xl font-bold text-[15px] hover:bg-blue-800 transition-colors">
                    {t('nav.contact')}
                </Link>
            </div>
        </header>
    );
};

export default Header;

import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-bg.jpg"
                    alt="Global Logistics Background"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=2000";
                    }}
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
            </div>

            {/* Content centered over video/image */}
            <div className="relative z-10 container mx-auto px-6 text-center text-white pt-20">
                <div className="flex flex-col items-center animate-fade-in-up">
                    <span className="text-blue-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 opacity-90">
                        {t('hero.welcome')}
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-8">
                        {t('hero.title')}
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                        <span className="text-lg md:text-xl font-light tracking-[0.15em] text-slate-100 uppercase border-b border-blue-500/30 pb-2">
                            {t('hero.sub1')}
                        </span>

                        <span className="text-lg md:text-xl font-light tracking-[0.15em] text-slate-100 uppercase border-b border-blue-500/30 pb-2">
                            {t('hero.sub2')}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 mt-12">
                        <Link to="/contacto" className="bg-[#0b4e89] text-white px-10 py-3.5 rounded-full font-bold text-base hover:bg-blue-600 transition-all hover:scale-105 shadow-xl text-center">
                            {t('hero.cta_contact')}
                        </Link>
                        <Link to="/servicios" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-3.5 rounded-full font-bold text-base hover:bg-white/20 transition-all hover:scale-105 text-center">
                            {t('hero.cta_services')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

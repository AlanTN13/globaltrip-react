import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
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
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            </div>

            {/* Content centered over video/image */}
            <div className="relative z-10 container mx-auto px-6 text-center text-white">
                <div className="flex flex-col items-center animate-fade-in-up">
                    <span className="text-blue-400 font-bold uppercase tracking-[0.4em] text-xs md:text-sm mb-6 opacity-90">
                        {t('hero.welcome')}
                    </span>

                    <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-none mb-10">
                        {t('hero.title')}
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
                        <span className="text-xl md:text-3xl font-light tracking-[0.15em] text-slate-100 uppercase border-b border-blue-500/30 pb-2">
                            {t('hero.sub1')}
                        </span>

                        <span className="text-xl md:text-3xl font-light tracking-[0.15em] text-slate-100 uppercase border-b border-blue-500/30 pb-2">
                            {t('hero.sub2')}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 mt-16">
                        <Link to="/contacto" className="bg-[#0b4e89] text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all hover:scale-105 shadow-xl text-center">
                            {t('hero.cta_contact')}
                        </Link>
                        <Link to="/servicios" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all hover:scale-105 text-center">
                            {t('hero.cta_services')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient for smooth transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>
    );
};

export default Hero;

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';

const HERO_VIDEO = '/videos/globaltrip-hero.mp4';
const HERO_POSTER = '/videos/globaltrip-hero-poster.jpg';
const DESKTOP_VIDEO = '/videos/globaltrip-hero-desktop.mp4';
const DESKTOP_POSTER = '/videos/globaltrip-hero-desktop-poster.jpg';
const DESKTOP_QUERY = '(min-width: 768px)';
const VIDEO_LABELS = {
    es: { play: 'Reproducir video de fondo', pause: 'Pausar video de fondo' },
    en: { play: 'Play background video', pause: 'Pause background video' },
    pt: { play: 'Reproduzir vídeo de fundo', pause: 'Pausar vídeo de fundo' },
};

const Hero = () => {
    const { t, language } = useLanguage();
    const videoRef = useRef(null);
    const [isPaused, setIsPaused] = useState(true);
    const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);
    const videoLabels = VIDEO_LABELS[language] || VIDEO_LABELS.es;

    useEffect(() => {
        const viewport = window.matchMedia(DESKTOP_QUERY);
        const updateViewport = (event) => setIsDesktop(event.matches);
        viewport.addEventListener('change', updateViewport);
        return () => viewport.removeEventListener('change', updateViewport);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const applyMotionPreference = () => {
            if (motionPreference.matches) {
                video.pause();
            } else {
                video.play().catch(() => {});
            }
        };
        applyMotionPreference();
        motionPreference.addEventListener('change', applyMotionPreference);
        return () => {
            motionPreference.removeEventListener('change', applyMotionPreference);
            video.pause();
        };
    }, [isDesktop]);

    const toggleVideo = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    };

    return (
        <section className="relative mx-3 my-3 h-[85svh] min-h-[640px] w-[calc(100%-24px)] overflow-hidden rounded-2xl md:h-[840px] md:min-h-0 md:rounded-[30px] flex items-center justify-center">
            {/* Decorative background video with a static loading fallback. */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    src={isDesktop ? DESKTOP_VIDEO : HERO_VIDEO}
                    poster={isDesktop ? DESKTOP_POSTER : HERO_POSTER}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPaused(false)}
                    onPause={() => setIsPaused(true)}
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content centered over video/image */}
            <div className="relative z-10 container mx-auto px-6 text-center text-white pt-20">
                <div className="flex flex-col items-center animate-fade-in-up">
                    <span className="mb-6 inline-flex rounded-full border border-white/15 bg-[#0b0c49]/75 px-5 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-lg shadow-black/20 backdrop-blur-sm md:text-xs">
                        {t('hero.welcome')}
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-8">
                        {t('hero.title')}
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                        <span className="text-lg md:text-xl font-light tracking-[0.15em] text-slate-100 uppercase border-b border-[#0b0c49]/40 pb-2">
                            {t('hero.sub1')}
                        </span>

                        <span className="text-lg md:text-xl font-light tracking-[0.15em] text-slate-100 uppercase border-b border-[#0b0c49]/40 pb-2">
                            {t('hero.sub2')}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 mt-12">
                        <Link to="/contacto" className="bg-[#0b0c49] text-white px-10 py-3.5 rounded-full font-bold text-base hover:bg-[#161865] transition-all hover:scale-105 shadow-xl text-center">
                            {t('hero.cta_contact')}
                        </Link>
                        <Link to="/servicios" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-3.5 rounded-full font-bold text-base hover:bg-white/20 transition-all hover:scale-105 text-center">
                            {t('hero.cta_services')}
                        </Link>
                    </div>
                </div>
            </div>
            <button
                type="button"
                onClick={toggleVideo}
                aria-label={isPaused ? videoLabels.play : videoLabels.pause}
                className="absolute bottom-4 left-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white transition-colors hover:bg-black/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
                <span aria-hidden="true" className="material-symbols-outlined text-lg">
                    {isPaused ? 'play_arrow' : 'pause'}
                </span>
            </button>
        </section>
    );
};

export default Hero;

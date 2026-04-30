import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-white px-6 md:px-12 pb-8 pt-10">
            <div className="mx-auto max-w-7xl border-t border-slate-200 pt-8">
                <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-8">
                    <p className="text-center text-[10px] md:text-[11px] font-black uppercase tracking-[0.34em] text-slate-400 md:text-left">
                        {t('footer.copyright')}
                    </p>

                    <a
                        href="https://www.nexopstech.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('footer.poweredBy')}
                        className="inline-flex items-center gap-3 rounded-md border-2 border-[#2f6fd6] bg-white px-4 py-2 transition-transform duration-200 hover:scale-[1.02]"
                    >
                        <span className="text-[11px] font-black uppercase tracking-[0.32em] text-slate-400">
                            {t('footer.poweredBy')}
                        </span>
                        <img
                            src="/logo-powered-globaltrip.png"
                            alt="Global Trip"
                            className="h-6 w-auto object-contain"
                        />
                        <span className="text-[14px] font-black tracking-tight text-slate-900">
                            NexOps
                        </span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

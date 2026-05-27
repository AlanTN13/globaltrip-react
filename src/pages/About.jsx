import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/useLanguage';

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main>
                <section className="relative isolate overflow-hidden bg-slate-950 px-6 py-24 md:px-12 md:py-32">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=2000"
                            alt={t('aboutPage.heroAlt')}
                            className="h-full w-full object-cover opacity-30"
                            loading="eager"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.88)_0%,rgba(11,12,73,0.8)_52%,rgba(15,23,42,0.82)_100%)]" />
                    </div>

                    <div className="relative mx-auto max-w-5xl text-center">
                        <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.24em] text-white/80">
                            {t('aboutPage.eyebrow')}
                        </span>
                        <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                            {t('aboutPage.heroTitle')}
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/80 md:text-xl">
                            {t('aboutPage.heroText')}
                        </p>
                    </div>
                </section>

                <section className="bg-white px-6 py-20 md:px-12 md:py-24">
                    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.36fr_0.64fr] md:items-start">
                        <div className="border-l-4 border-[#0b0c49] pl-6">
                            <span className="text-[11px] font-black uppercase tracking-[0.24em] text-[#0b0c49]">
                                {t('aboutPage.content.eyebrow')}
                            </span>
                        </div>

                        <div className="max-w-3xl space-y-6 text-lg font-medium leading-relaxed text-slate-600 md:text-xl">
                            <p>{t('aboutPage.content.firstParagraph')}</p>
                            <p>{t('aboutPage.content.secondParagraph')}</p>
                            <p>
                                {t('aboutPage.content.thirdParagraphPrefix')}{' '}
                                <a
                                    href="mailto:cv@globaltriplog.com"
                                    className="font-black text-[#0b0c49] underline decoration-emerald-300 decoration-2 underline-offset-4 transition-colors hover:text-emerald-500"
                                >
                                    cv@globaltriplog.com
                                </a>{' '}
                                {t('aboutPage.content.thirdParagraphSuffix')}
                            </p>

                            <a
                                href="mailto:cv@globaltriplog.com?subject=Puesto%20de%20inter%C3%A9s%20-%20Global%20Trip"
                                className="mt-4 inline-flex rounded-full bg-[#0b0c49] px-8 py-3.5 text-sm font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#161865]"
                            >
                                {t('aboutPage.bottomBanner.text')}
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;

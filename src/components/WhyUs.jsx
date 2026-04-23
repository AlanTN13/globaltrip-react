import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const WhyUs = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-slate-50 overflow-hidden relative">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header Style Puma Cargo */}
                <div className="flex flex-col items-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight uppercase text-center">
                        {t('whyUs.title')}
                    </h2>
                    {/* Thin accent line */}
                    <div className="w-20 h-[2px] bg-blue-600 mt-4 mb-8"></div>

                    {/* Category bar - Inspired by Puma reference */}
                    <div className="hidden md:flex flex-wrap items-center justify-center gap-6 text-[11px] font-black text-slate-400 tracking-[0.25em] uppercase">
                        {t('whyUs.categories').map((cat, i) => (
                            <React.Fragment key={i}>
                                <span className="hover:text-blue-600 transition-colors cursor-default">{cat}</span>
                                {i < t('whyUs.categories').length - 1 && <span className="text-slate-200 font-light">/</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Content Block - Massive Image & Aligned Text */}
                <div className="grid lg:grid-cols-12 gap-16 items-stretch">
                    {/* Image Side - Now stretches to match text height */}
                    <div className="lg:col-span-7 relative group">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-blue-600/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                            <img
                                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200"
                                alt="Logística Internacional Global Trip"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=1200";
                                }}
                            />
                            {/* Overlay sutil para elegancia */}
                            <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>
                    </div>

                    {/* Text Content - Defines the height */}
                    <div className="lg:col-span-5 flex flex-col justify-between py-2">
                        <div>
                            <div className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-6 w-fit shadow-lg shadow-blue-600/20">
                                {t('whyUs.badge')}
                            </div>

                            <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1] uppercase">
                                {t('whyUs.subtitle')}
                            </h3>

                            <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium mb-8 space-y-2">
                                <p className="text-slate-900 font-black text-xl md:text-2xl leading-tight">
                                    {t('whyUs.highlight')}
                                </p>
                                <p>{t('whyUs.text')}</p>
                            </div>
                        </div>

                        <div className="hidden sm:grid grid-cols-2 gap-6 pt-4">
                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 group flex flex-col h-full">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300 mb-6">
                                    <span className="material-symbols-outlined text-blue-600 group-hover:text-white transition-colors duration-300 text-3xl">public</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em] mb-2">{t('whyUs.label_scope')}</h4>
                                    <p className="text-slate-500 text-sm font-bold leading-relaxed">{t('whyUs.val_scope')}</p>
                                </div>
                            </div>

                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 group flex flex-col h-full">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300 mb-6">
                                    <span className="material-symbols-outlined text-blue-600 group-hover:text-white transition-colors duration-300 text-3xl">gavel</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em] mb-2">{t('whyUs.label_mgmt')}</h4>
                                    <p className="text-slate-500 text-sm font-bold leading-relaxed">{t('whyUs.val_mgmt')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;

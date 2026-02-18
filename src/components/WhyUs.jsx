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

                {/* Content Block - More robust layout */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Image Side with Decorative Elements */}
                    <div className="lg:col-span-6 relative">
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -right-6 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl"></div>

                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-white p-3">
                            <div className="rounded-xl overflow-hidden aspect-[4/3]">
                                <img
                                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200"
                                    alt="Logística Internacional Global Trip"
                                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=1200";
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="lg:col-span-6 flex flex-col">
                        <div className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-6 w-fit">
                            Expertise
                        </div>

                        <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1] uppercase">
                            {t('whyUs.subtitle')}
                        </h3>

                        <div className="space-y-8">
                            <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                                {t('whyUs.text')}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-8 pt-4">
                                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                        <span className="material-symbols-outlined text-blue-600 group-hover:text-white transition-colors">public</span>
                                    </div>
                                    <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em] mb-2">{t('whyUs.label_scope')}</h4>
                                    <p className="text-slate-500 text-sm font-bold">{t('whyUs.val_scope')}</p>
                                </div>

                                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                        <span className="material-symbols-outlined text-blue-600 group-hover:text-white transition-colors">gavel</span>
                                    </div>
                                    <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em] mb-2">{t('whyUs.label_mgmt')}</h4>
                                    <p className="text-slate-500 text-sm font-bold">{t('whyUs.val_mgmt')}</p>
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

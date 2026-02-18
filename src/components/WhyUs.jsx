import { useLanguage } from '../context/LanguageContext';

const WhyUs = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header Style Puma Cargo */}
                <div className="flex flex-col items-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight uppercase text-center">
                        {t('whyUs.title')}
                    </h2>
                    {/* Thin accent line */}
                    <div className="w-20 h-[2px] bg-blue-600 mt-4 mb-8"></div>

                    {/* Category bar - Inspired by Puma reference */}
                    <div className="hidden md:flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-slate-500 tracking-[0.2em] uppercase">
                        {t('whyUs.categories').map((cat, i) => (
                            <React.Fragment key={i}>
                                <span>{cat}</span>
                                {i < t('whyUs.categories').length - 1 && <span className="text-slate-200">|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Content Block Style Puma Cargo */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    {/* Image Left */}
                    <div className="w-full lg:w-1/2">
                        <div className="aspect-[16/10] overflow-hidden rounded-sm shadow-xl border border-slate-100">
                            <img
                                src="/why-us-corporate.jpg"
                                alt="Logística Internacional Global Trip"
                                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1580674232502-146ca1a8d621?auto=format&fit=crop&q=80&w=1200";
                                }}
                            />
                        </div>
                    </div>

                    {/* Text Right */}
                    <div className="w-full lg:w-1/2 flex flex-col pt-2">
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 tracking-tight uppercase">
                            {t('whyUs.subtitle')}
                        </h3>

                        <div className="space-y-6">
                            <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light">
                                {t('whyUs.text')}
                            </p>

                            <div className="pt-8 grid grid-cols-2 gap-8">
                                <div className="border-l-4 border-blue-600 pl-4">
                                    <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-1">{t('whyUs.label_scope')}</h4>
                                    <p className="text-slate-500 text-sm">{t('whyUs.val_scope')}</p>
                                </div>
                                <div className="border-l-4 border-blue-600 pl-4">
                                    <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-1">{t('whyUs.label_mgmt')}</h4>
                                    <p className="text-slate-500 text-sm">{t('whyUs.val_mgmt')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

import React from 'react';
export default WhyUs;

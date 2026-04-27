import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const CONTACT_COUNTRY_CODE = '54';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        whatsapp: '',
        servicio: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const contactWebhookUrl = import.meta.env.VITE_NEWSLETTER_WEBHOOK_URL;
    const serviceOptions = [
        { value: 'import', label: t('contactPage.services.import') },
        { value: 'fletes', label: t('contactPage.services.fletes') },
        { value: 'aduana', label: t('contactPage.services.aduana') },
        { value: 'consultoria', label: t('contactPage.services.consultoria') }
    ];

    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

    const handleChange = (field) => (e) => {
        setFormData((current) => ({
            ...current,
            [field]: e.target.value
        }));

        if (success) setSuccess('');
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nombre = formData.nombre.trim();
        const email = formData.email.trim();
        const whatsapp = formData.whatsapp.trim();
        const servicio = formData.servicio;

        setSuccess('');
        setError('');

        if (!nombre) {
            setError(t('contactPage.errorName'));
            return;
        }

        if (!isValidEmail(email)) {
            setError(t('contactPage.errorEmail'));
            return;
        }

        if (!whatsapp) {
            setError(t('contactPage.errorWhatsapp'));
            return;
        }

        if (!servicio) {
            setError(t('contactPage.errorService'));
            return;
        }

        if (!contactWebhookUrl) {
            setError(t('contactPage.errorMissingConfig'));
            return;
        }

        const selectedService = serviceOptions.find((option) => option.value === servicio);

        setLoading(true);

        try {
            const response = await fetch(contactWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                    Accept: 'application/json, text/plain, */*'
                },
                body: JSON.stringify({
                    type: 'contacto',
                    nombre,
                    email: email.toLowerCase(),
                    whatsapp: `${CONTACT_COUNTRY_CODE} ${whatsapp}`,
                    servicio: selectedService ? selectedService.label : servicio
                })
            });

            const responseText = await response.text();
            let payload = {};

            if (responseText) {
                try {
                    payload = JSON.parse(responseText);
                } catch {
                    payload = { ok: response.ok };
                }
            }

            if (!response.ok || payload.ok === false) {
                throw new Error(payload.error || 'request_failed');
            }

            setFormData({
                nombre: '',
                email: '',
                whatsapp: '',
                servicio: ''
            });
            setSuccess(t('contactPage.success'));
        } catch (submitError) {
            console.error('Contact form submission failed', submitError);
            setError(t('contactPage.errorGeneric'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <Header />

            <main>
                <section className="relative h-[350px] md:h-[450px] flex flex-col items-center justify-center overflow-hidden text-center px-6">
                    <img
                        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000"
                        alt="Background Contacto"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c49]/90 to-[#0b0c49]/70 backdrop-blur-[2px]"></div>

                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
                            {t('contactPage.heroTitle')}
                        </h1>
                        <p className="text-white/80 text-[15px] md:text-lg font-medium tracking-wide">
                            {t('contactPage.heroSubtitle')}
                        </p>
                    </div>
                </section>

                <section className="relative -mt-10 z-20 bg-white rounded-t-[3rem] px-6 md:px-12 lg:px-24 pb-24">
                    <div className="max-w-4xl mx-auto pt-16">
                        <div className="grid md:grid-cols-2 gap-6 mb-20">
                            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-start gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-[#0b0c49]/8 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-[#0b0c49]">location_on</span>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black text-slate-900 tracking-widest uppercase mb-1">{t('contactPage.officeLabel')}</h4>
                                    <p className="text-[13px] text-slate-500 font-medium">{t('contactPage.officeValue')}</p>
                                </div>
                            </div>
                            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-start gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-[#0b0c49]/8 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-[#0b0c49]">schedule</span>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black text-slate-900 tracking-widest uppercase mb-1">{t('contactPage.hoursLabel')}</h4>
                                    <p className="text-[13px] text-slate-500 font-medium">{t('contactPage.hoursValue')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-[#0b0c49] tracking-tight mb-4">
                                {t('contactPage.formTitle')}
                            </h2>
                            <p className="text-slate-500 text-base font-medium leading-relaxed">
                                {t('contactPage.formText')}
                            </p>
                        </div>

                        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0b0c49] ml-1">{t('contactPage.nameLabel')}</label>
                                <input
                                    className="w-full h-16 px-6 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary transition-all font-bold text-base"
                                    placeholder={t('contactPage.namePlaceholder')}
                                    type="text"
                                    value={formData.nombre}
                                    onChange={handleChange('nombre')}
                                    disabled={loading}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0b0c49] ml-1">{t('contactPage.emailLabel')}</label>
                                <input
                                    className="w-full h-16 px-6 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary transition-all font-bold text-base"
                                    placeholder={t('contactPage.emailPlaceholder')}
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange('email')}
                                    disabled={loading}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0b0c49] ml-1">{t('contactPage.whatsappLabel')}</label>
                                <div className="flex gap-4">
                                    <div className="w-1/4 h-16 border border-slate-200 rounded-2xl flex items-center justify-center px-6 bg-white">
                                        <span className="font-bold text-slate-400">{CONTACT_COUNTRY_CODE}</span>
                                    </div>
                                    <input
                                        className="flex-grow h-16 px-6 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary transition-all font-bold text-base"
                                        placeholder={t('contactPage.whatsappPlaceholder')}
                                        type="tel"
                                        value={formData.whatsapp}
                                        onChange={handleChange('whatsapp')}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0b0c49] ml-1">{t('contactPage.serviceLabel')}</label>
                                <div className="relative">
                                    <select
                                        className="w-full h-16 px-6 rounded-2xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-primary transition-all font-bold text-base appearance-none cursor-pointer"
                                        value={formData.servicio}
                                        onChange={handleChange('servicio')}
                                        disabled={loading}
                                    >
                                        <option value="">{t('contactPage.servicePlaceholder')}</option>
                                        {serviceOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-300">keyboard_arrow_down</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="mt-4 w-full h-18 bg-[#0b0c49] hover:bg-[#161865] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#0b0c49]/10 flex items-center justify-center gap-4 transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="w-5 h-5 rounded-full border-2 border-white/35 border-t-white animate-spin" />
                                        {t('contactPage.submitting')}
                                    </>
                                ) : (
                                    <>
                                        {t('contactPage.submit')}
                                        <span className="material-symbols-outlined !text-2xl">send</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="min-h-[24px] mt-5">
                            {loading ? (
                                <p className="text-[14px] font-semibold text-slate-500">
                                    {t('contactPage.pending')}
                                </p>
                            ) : null}
                            {success ? (
                                <p className="text-[14px] font-semibold text-emerald-600">
                                    {success}
                                </p>
                            ) : null}
                            {error ? (
                                <p className="text-[14px] font-semibold text-red-500">
                                    {error}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;

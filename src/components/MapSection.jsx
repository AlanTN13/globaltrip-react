import { useLanguage } from '../context/LanguageContext';

const MapSection = () => {
    return (
        <section className="relative w-full bg-slate-50 py-24 px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
                        NUESTRAS <span className="text-blue-600">OFICINAS</span>
                    </h2>
                    <div className="w-16 h-1 bg-blue-600 mx-auto mt-4"></div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Map */}
                    <div className="lg:col-span-8 h-[450px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168878894065!2d-58.3793!3d-34.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacc364d979d%3A0x7d6f5f8b9e6e8e8!2sMaip%C3%BA%20231%2C%20C1084ABE%20CABA%2C%20Argentina!5e0!3m2!1sen!2sar!4v1710000000000!5m2!1sen!2sar"
                            className="absolute inset-0 w-full h-full border-0 transition-all duration-700"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    {/* Contact Details with Redirection */}
                    <div className="lg:col-span-4 flex flex-col gap-8 lg:pl-8">
                        <a
                            href="https://www.google.com/maps/dir//''/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x95bccacdf1a35f89:0x4e9f5f401f3af00d!3e0?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWMlEAEYASAB"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-5 group hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/20 group-hover:bg-blue-700 transition-colors">
                                <span className="material-symbols-outlined text-white">location_on</span>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">Dirección</h4>
                                <p className="text-sm text-slate-500 font-bold leading-relaxed">
                                    Maipú 231 - 5th floor - Office: B<br />
                                    C.A.B.A - Buenos Aires, Argentina (C1084ABE)
                                </p>
                            </div>
                        </a>

                        <a
                            href="tel:+5491139872891"
                            className="flex items-start gap-5 group hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:bg-blue-600 transition-colors">
                                <span className="material-symbols-outlined text-white">call</span>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">Teléfono Oficina</h4>
                                <p className="text-sm text-slate-500 font-bold leading-relaxed">
                                    (+54 9 11) 3987-2891
                                </p>
                            </div>
                        </a>

                        <a
                            href="https://wa.me/5491131411755"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-5 group hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-600/20 group-hover:bg-green-600 transition-colors">
                                <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-[#25D366] text-xs uppercase tracking-widest mb-1 group-hover:text-green-600 transition-colors">WhatsApp</h4>
                                <p className="text-sm text-slate-500 font-bold leading-relaxed">
                                    (+54 9 11) 3141-1755
                                </p>
                            </div>
                        </a>

                        <a
                            href="mailto:info@globaltriplog.com"
                            className="flex items-start gap-5 group hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#0b4e89]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0b4e89] transition-colors border border-blue-100">
                                <span className="material-symbols-outlined text-[#0b4e89]/70 group-hover:text-white">mail</span>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">Email</h4>
                                <p className="text-sm text-slate-500 font-bold leading-relaxed">
                                    info@globaltriplog.com
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;

import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div className="bg-white min-h-screen">
            <Header />

            <main>
                {/* HERO SECTION DE CONTACTO */}
                <section className="relative h-[350px] md:h-[450px] flex flex-col items-center justify-center overflow-hidden text-center px-6">
                    <img
                        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000"
                        alt="Background Contacto"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0b4e89]/90 to-[#0b4e89]/70 backdrop-blur-[2px]"></div>

                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
                            Contacto
                        </h1>
                        <p className="text-white/80 text-[15px] md:text-lg font-medium tracking-wide">
                            Lideramos su estrategia de comercio exterior
                        </p>
                    </div>
                </section>

                {/* FORM SECTION - White container with rounded top */}
                <section className="relative -mt-10 z-20 bg-white rounded-t-[3rem] px-6 md:px-12 lg:px-24 pb-24">
                    <div className="max-w-4xl mx-auto pt-16">

                        {/* Info Cards */}
                        <div className="grid md:grid-cols-2 gap-6 mb-20">
                            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-start gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-[#0b4e89]">location_on</span>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black text-slate-900 tracking-widest uppercase mb-1">SEDE CENTRAL</h4>
                                    <p className="text-[13px] text-slate-500 font-medium">Torre Logística, Distrito Financiero</p>
                                </div>
                            </div>
                            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-start gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-[#0b4e89]">schedule</span>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black text-slate-900 tracking-widest uppercase mb-1">OPERACIONES</h4>
                                    <p className="text-[13px] text-slate-500 font-medium">Lun - Vie, 09:00 - 18:00 (GMT-3)</p>
                                </div>
                            </div>
                        </div>

                        {/* Solicitar Asesoría Form */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-[#0b4e89] tracking-tight mb-4">
                                Solicitar Asesoría
                            </h2>
                            <p className="text-slate-500 text-base font-medium leading-relaxed">
                                Nuestro equipo de expertos analizará su requerimiento para ofrecerle una solución a medida.
                            </p>
                        </div>

                        <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                            {/* Field */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0b4e89] ml-1">NOMBRE Y APELLIDO</label>
                                <input className="w-full h-16 px-6 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary transition-all font-bold text-base" placeholder="Ej: Carlos Rodríguez" type="text" />
                            </div>

                            {/* Field */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0b4e89] ml-1">EMAIL CORPORATIVO</label>
                                <input className="w-full h-16 px-6 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary transition-all font-bold text-base" placeholder="c.rodriguez@empresa.com" type="email" />
                            </div>

                            {/* WhatsApp Field with code */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0b4e89] ml-1">WHATSAPP</label>
                                <div className="flex gap-4">
                                    <div className="w-1/4 h-16 border border-slate-200 rounded-2xl flex items-center justify-between px-6 bg-white cursor-pointer hover:border-blue-100 transition-colors">
                                        <span className="font-bold text-slate-400">+54</span>
                                        <span className="material-symbols-outlined text-slate-300">keyboard_arrow_down</span>
                                    </div>
                                    <input className="flex-grow h-16 px-6 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary transition-all font-bold text-base" placeholder="000 000 000" type="tel" />
                                </div>
                            </div>

                            {/* Field Select */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0b4e89] ml-1">SERVICIO DE INTERÉS</label>
                                <div className="relative">
                                    <select className="w-full h-16 px-6 rounded-2xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-primary transition-all font-bold text-base appearance-none cursor-pointer">
                                        <option value="">Seleccione una opción</option>
                                        <option value="import">Importación / Exportación</option>
                                        <option value="fletes">Fletes Internacionales</option>
                                        <option value="aduana">Despacho de Aduana</option>
                                        <option value="consultoria">Consultoría Técnica</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-300">keyboard_arrow_down</span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button className="mt-4 w-full h-18 bg-[#0b4e89] hover:bg-black text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-900/10 flex items-center justify-center gap-4 transition-all duration-300 active:scale-[0.98]" type="submit">
                                Enviar Solicitud
                                <span className="material-symbols-outlined !text-2xl">send</span>
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;

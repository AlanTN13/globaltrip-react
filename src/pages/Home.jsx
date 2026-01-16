import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-white min-h-screen">
            <Header />
            <main>
                <Hero />

                {/* Nuestro Enfoque Section */}
                <section className="px-6 md:px-12 py-16 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                Nuestro Enfoque de Servicio Integral
                            </h2>
                            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                                Actuamos como su departamento externo de comercio exterior, gestionando cada eslabón de la cadena de suministro con precisión quirúrgica.
                            </p>
                            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                                Nuestra metodología combina la experiencia técnica en aduanas con una visión estratégica de negocios, permitiendo a nuestros clientes enfocarse en su crecimiento mientras nosotros resolvemos la complejidad logística.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {[
                                { title: 'Optimización de Costos', desc: 'Análisis profundo para reducir aranceles y gastos logísticos evitables.' },
                                { title: 'Mitigación de Riesgos', desc: 'Cumplimiento total con normativas locales e internacionales vigentes.' },
                                { title: 'Agilidad Operativa', desc: 'Procesos estandarizados que reducen tiempos de despacho y tránsito.' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 md:p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="material-symbols-outlined text-[#0b4e89]">check_circle</span>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-[15px] mb-1">{item.title}</h4>
                                        <p className="text-[13px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Servicios Especializados Section */}
                <section className="px-6 md:px-12 py-20 bg-white">
                    <div className="flex flex-col items-center gap-12">
                        <div className="flex flex-col items-center">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                Servicios <span className="relative">Especializados
                                    <div className="absolute left-0 -bottom-2 w-full h-[3px] bg-[#0b4e89]"></div>
                                </span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 w-full">
                            {[
                                { title: 'Fletes Internacionales', icon: 'directions_boat', desc: 'Coordinación experta en transporte marítimo, aéreo y terrestre conectando mercados globales.' },
                                { title: 'Gestión Aduanera', icon: 'description', desc: 'Despacho de mercancías ágil con asesoramiento especializado en clasificación arancelaria.' },
                                { title: 'Auditoría Externa', icon: 'analytics', desc: 'Revisión preventiva de expedientes y procesos para asegurar el cumplimiento legal preventivo.' }
                            ].map((s, idx) => (
                                <div key={idx} className="p-8 border border-slate-50 rounded-3xl bg-white shadow-sm flex flex-col gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#0b4e89]">{s.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 mb-3">{s.title}</h3>
                                        <p className="text-[14px] text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Por qué elegir GlobalTrip Section */}
                <section className="px-6 md:px-12 py-24 bg-white">
                    <div className="max-w-6xl mx-auto bg-slate-50 rounded-[3rem] p-10 md:p-20">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center mb-16">
                            Por qué elegir GlobalTrip
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { title: 'Experiencia Comprobada', icon: 'verified', desc: 'Años en le mercado manejando operaciones de alta complejidad para industrias críticas.' },
                                { title: 'Transparencia Total', icon: 'visibility', desc: 'Informes detallados y comunicación constante sobre el estado de sus embarques.' },
                                { title: 'Respuesta Rápida', icon: 'bolt', desc: 'Capacidad de reacción ante imprevistos para mantener su cadena activa.' },
                                { title: 'Seguridad Legal', icon: 'security', desc: 'Protección jurídica en cada trámite ante las autoridades correspondientes.' }
                            ].map((w, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 flex gap-6">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#0b4e89] text-[20px]">{w.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-[16px] mb-2">{w.title}</h4>
                                        <p className="text-[14px] text-slate-500 font-medium leading-relaxed">{w.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 md:px-12 py-16">
                    <div className="bg-[#0b4e89] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
                                ¿Listo para escalar su logística?
                            </h2>
                            <p className="text-blue-100/80 text-lg font-medium">
                                Agende una consultoría estratégica con nuestros especialistas hoy mismo.
                            </p>
                        </div>
                        <Link to="/contacto" className="bg-white text-[#0b4e89] px-10 py-5 rounded-2xl font-black text-base hover:bg-gray-100 transition-colors">
                            Contactar Ahora
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;

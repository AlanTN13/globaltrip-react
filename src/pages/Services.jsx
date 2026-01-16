import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Services = () => {
    const mainServices = [
        {
            title: 'Courier Internacional',
            icon: 'local_shipping',
            desc: 'Gestión ágil de envíos puerta a puerta para muestras, repuestos y paquetería urgente con rastreo en tiempo real y tiempos de tránsito garantizados.'
        },
        {
            title: 'Fletes y Transporte',
            icon: 'directions_boat',
            desc: 'Coordinación multimodal: Marítimo (FCL/LCL), Aéreo y Terrestre. Alianzas estratégicas con las principales navieras y aerolíneas del mundo.'
        },
        {
            title: 'Gestión Aduanera',
            icon: 'gavel',
            desc: 'Clasificación arancelaria, tramitación de licencias y representatividad ante organismos oficiales para asegurar un despacho sin contratiempos.'
        }
    ];

    const specializedServices = [
        {
            title: 'Consultoría y Planeamiento',
            icon: 'analytics',
            desc: 'Auditorías preventivas y diseño de esquemas operativos eficientes. Analizamos su estructura de costos para maximizar beneficios fiscales y operativos en sus operaciones de comercio exterior.',
            bullets: ['Regímenes Especiales', 'Auditoría Normativa', 'Costos de Importación', 'Estudios de Mercado']
        },
        {
            title: 'Búsqueda de Proveedores (Trading)',
            icon: 'hub',
            desc: 'Actuamos como su brazo de compras internacional. Identificamos, validamos y negociamos con proveedores en mercados estratégicos (China, Europa, USA) asegurando calidad y cumplimiento.',
            bullets: ['Inspección de Fábrica', 'Gestión de Pagos', 'Control de Calidad', 'Consolidación de Carga']
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <Header />

            {/* HERO SECTION DE SERVICIOS - matching the dark blur style */}
            <section className="relative h-[400px] md:h-[500px] flex items-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=2000"
                    alt="Servicios Integrales"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0b4e89]/75 backdrop-blur-[1px]"></div>

                <div className="relative z-10 px-6 md:px-12 lg:px-24 w-full">
                    <div className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
                        <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">Estrategia Global</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
                        Servicios Integrales de<br />Logística y Consultoría
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                        Soluciones personalizadas para potenciar su competitividad en el mercado internacional.
                    </p>
                </div>
            </section>

            {/* EXPERTISE SECTION - Refined to match screenshot exactly */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-[32px] md:text-4xl font-black text-[#0b4e89] tracking-tight mb-8">
                        Expertise en cada etapa de su cadena de suministro
                    </h2>
                    <p className="text-slate-500 text-base md:text-[17px] font-medium leading-relaxed max-w-3xl">
                        Nos convertimos en su socio estratégico, brindando soluciones que minimizan riesgos y optimizan costos operativos mediante una gestión técnica de alta precisión.
                    </p>
                </div>

                {/* Main Services Grid (3 cards row) */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {mainServices.map((s, idx) => (
                        <div key={idx} className="p-10 bg-[#f8fafc] rounded-[2rem] flex flex-col gap-8 hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 group">
                            <div className="w-14 h-14 rounded-2xl bg-[#0b4e89]/5 flex items-center justify-center group-hover:bg-[#0b4e89] transition-colors duration-500">
                                <span className="material-symbols-outlined text-[#0b4e89] !text-3xl group-hover:text-white transition-colors duration-500">{s.icon}</span>
                            </div>
                            <div className="flex-grow flex flex-col gap-4">
                                <h3 className="text-[22px] font-black text-slate-900 tracking-tight leading-snug">{s.title}</h3>
                                <p className="text-[14.5px] text-slate-500 font-medium leading-relaxed">
                                    {s.desc}
                                </p>
                            </div>
                            <button className="text-[12px] font-black text-[#0b4e89] flex items-center gap-2 hover:gap-3 transition-all mt-2">
                                SABER MÁS <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Specialized Services Grid (2 wide cards row with left border) */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {specializedServices.map((s, idx) => (
                        <div key={idx} className="p-10 bg-[#f8fafc] rounded-[2rem] border-l-[4px] border-[#0b4e89] flex flex-col md:flex-row gap-10 items-start hover:shadow-xl hover:shadow-slate-100 transition-all duration-500">
                            <div className="w-16 h-16 rounded-2xl bg-[#0b4e89]/5 flex-shrink-0 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#0b4e89] !text-4xl">{s.icon}</span>
                            </div>
                            <div className="flex flex-col gap-8">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-4">{s.title}</h3>
                                    <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
                                        {s.desc}
                                    </p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                                    {s.bullets.map((b, i) => (
                                        <div key={i} className="flex items-center gap-3 text-slate-400 group">
                                            <span className="material-symbols-outlined !text-[18px] text-[#0b4e89]/30 group-hover:text-[#0b4e89] transition-colors">check_circle</span>
                                            <span className="text-[13px] font-bold text-slate-500">{b}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* STATS BAR (The dark bar from design) */}
            <section className="bg-[#1e293b] text-white py-20">
                <div className="px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center max-w-7xl mx-auto">
                        {[
                            { val: '+15', label: 'AÑOS DE TRAYECTORIA' },
                            { val: '+500', label: 'CLIENTES ACTIVOS' },
                            { val: '100%', label: 'COMPROMISO NORMATIVO' },
                            { val: '24/7', label: 'SOPORTE OPERATIVO' }
                        ].map((stat, idx) => (
                            <div key={idx} className="flex flex-col gap-3">
                                <span className="text-5xl md:text-6xl font-black tracking-tighter">{stat.val}</span>
                                <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION (The blue box from design) */}
            <section className="px-6 md:px-12 lg:px-24 py-32">
                <div className="max-w-6xl mx-auto rounded-[3.5rem] bg-[#0b4e89] p-12 md:p-24 relative overflow-hidden shadow-3xl text-center">
                    {/* Decorative radial gradient */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-10 leading-[1.1]">
                            ¿Listo para expandir sus fronteras?
                        </h2>
                        <p className="text-blue-100 text-lg md:text-xl font-medium max-w-3xl mb-14 opacity-90 leading-relaxed">
                            Agende una consultoría técnica sin cargo con nuestros expertos y descubra el potencial de su negocio en el mundo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link to="/contacto" className="bg-white text-[#0b4e89] px-12 py-5 rounded-2xl font-black text-base shadow-2xl hover:bg-slate-50 transition-all transform active:scale-95 flex items-center justify-center">
                                Agendar Consultoría
                            </Link>
                            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-2xl font-black text-base hover:bg-white/20 transition-all flex items-center justify-center">
                                Descargar Folleto
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Services;

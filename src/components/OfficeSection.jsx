import { useLanguage } from '../context/LanguageContext';

const OfficeSection = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text content - Robustness & Confidence */}
                    <div className="order-2 lg:order-1">
                        <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-8 w-fit shadow-lg">
                            Nuestra Sede
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-tight uppercase">
                            Infraestructura y <span className="text-blue-600">Confianza Global</span>
                        </h2>

                        <p className="text-slate-500 text-lg leading-relaxed font-medium mb-10">
                            Operamos desde el corazón financiero de Buenos Aires, contando con una infraestructura moderna y tecnológica que garantiza la seguridad y eficiencia de cada una de sus operaciones internacionales.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest border-l-4 border-blue-600 pl-4">Presencia Real</h4>
                                <p className="text-slate-500 text-sm pl-5">Oficinas propias en puntos estratégicos para un control total.</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest border-l-4 border-blue-600 pl-4">Respaldo Técnico</h4>
                                <p className="text-slate-500 text-sm pl-5">Sistemas de última generación para el seguimiento de carga en tiempo real.</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Side - Robust Office */}
                    <div className="order-1 lg:order-2 relative group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-slate-900/5 rounded-full blur-3xl"></div>

                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                                alt="Global Trip Central Office"
                                className="w-full aspect-[4/3] object-cover rounded-[2.5rem]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfficeSection;

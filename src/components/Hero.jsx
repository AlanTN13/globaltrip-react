import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="px-6 md:px-12 py-10 md:py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="flex flex-col gap-6">
                    <div className="px-4 py-1.5 bg-blue-50 rounded-full w-fit">
                        <span className="text-[11px] font-bold text-primary uppercase tracking-widest">
                            Consultoría Premium
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
                        Soluciones Estratégicas en Comercio Exterior
                    </h1>

                    <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                        Optimizamos la logística internacional para PyMES y grandes empresas con un enfoque integral y cumplimiento normativo riguroso.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Link to="/contacto" className="flex items-center justify-center bg-[#0b4e89] text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-blue-800 transition-colors">
                            Consultar Ahora
                        </Link>
                        <Link to="/servicios" className="flex items-center justify-center bg-white border border-slate-100 text-slate-900 px-10 py-4 rounded-xl font-bold text-base hover:bg-gray-50 transition-colors">
                            Ver Servicios
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-8 mt-8">
                        <div className="flex items-center gap-2 text-slate-500">
                            <span className="material-symbols-outlined text-[20px]">public</span>
                            <span className="text-[13px] font-semibold">Soporte 24/7</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <span className="material-symbols-outlined text-[20px]">trending_up</span>
                            <span className="text-[13px] font-semibold">Tracking Real-time</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <span className="material-symbols-outlined text-[20px]">gavel</span>
                            <span className="text-[13px] font-semibold">Regulatory Compliance</span>
                        </div>
                    </div>
                </div>

                {/* Right Image - LINKED TO THE USER'S PHOTO */}
                <div className="relative">
                    <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <img
                            src="/hero-logistica.jpg"
                            alt="Logística Integral GlobalTrip"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200";
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

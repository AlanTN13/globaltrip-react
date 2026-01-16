import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-50 pt-20 pb-12 px-6 md:px-12 border-t border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

                    {/* Brand & Social */}
                    <div className="flex flex-col gap-6">
                        <div className="text-[#0b4e89] text-2xl font-black tracking-tighter">
                            GlobalTrip
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">
                            Soluciones logísticas de clase mundial para empresas que buscan excelencia en sus operaciones internacionales.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors">
                                <span className="material-symbols-outlined !text-[18px]">share</span>
                            </button>
                            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors">
                                <span className="material-symbols-outlined !text-[18px]">mail</span>
                            </button>
                            {/* LinkedIn */}
                            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0077b5] hover:border-[#0077b5] transition-colors">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                            {/* TikTok */}
                            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-black hover:border-black transition-colors">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                            </a>
                            {/* Instagram */}
                            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#e1306c] hover:border-[#e1306c] transition-colors">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 1: Enlaces Útiles */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-[12px] font-black text-slate-900 tracking-widest uppercase">Enlaces Útiles</h4>
                        <nav className="flex flex-col gap-4">
                            <Link to="/servicios" className="text-slate-500 text-[14px] font-semibold hover:text-primary">Servicios</Link>
                            <Link to="/contacto" className="text-slate-500 text-[14px] font-semibold hover:text-primary">Contacto</Link>
                            <Link to="/" className="text-slate-500 text-[14px] font-semibold hover:text-primary">Nosotros</Link>
                        </nav>
                    </div>

                    {/* Column 2: Empresa */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-[12px] font-black text-slate-900 tracking-widest uppercase">Empresa</h4>
                        <nav className="flex flex-col gap-4">
                            <Link to="/" className="text-slate-500 text-[14px] font-semibold hover:text-primary">Trayectoria</Link>
                            <Link to="/" className="text-slate-500 text-[14px] font-semibold hover:text-primary">Blog</Link>
                            <Link to="/" className="text-slate-500 text-[14px] font-semibold hover:text-primary">Noticias</Link>
                        </nav>
                    </div>

                    {/* Column 3: Suscripción */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-[12px] font-black text-slate-900 tracking-widest uppercase">Suscripción</h4>
                        <p className="text-slate-500 text-[14px] font-medium leading-relaxed">
                            Reciba actualizaciones sobre normativas y comercio exterior.
                        </p>
                        <form className="relative" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full h-12 pl-4 pr-12 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary font-medium text-sm transition-all"
                            />
                            <button className="absolute right-1 top-1 w-10 h-10 bg-[#0b4e89] text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
                                <span className="material-symbols-outlined !text-[18px]">send</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-[13px] text-slate-400 font-medium text-center md:text-left w-full">
                        © 2026 GlobalTrip Services. Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

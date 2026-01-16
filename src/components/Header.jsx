import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-white px-6 md:px-12 py-2 flex items-center justify-between sticky top-0 z-[100] border-b border-slate-50 shadow-sm">
            <Link to="/" className="flex items-center">
                <img
                    src="/logogt.png"
                    alt="GlobalTrip Logo"
                    className="h-16 md:h-20 w-auto object-contain block"
                />
            </Link>

            <nav className="hidden md:flex items-center gap-10">
                <Link className="text-[15px] font-medium text-slate-600 hover:text-primary transition-colors" to="/">
                    Inicio
                </Link>
                <Link className="text-[15px] font-medium text-slate-600 hover:text-primary transition-colors" to="/servicios">
                    Servicios
                </Link>
                <Link className="text-[15px] font-medium text-slate-600 hover:text-primary transition-colors" to="/noticias">
                    Noticias
                </Link>
            </nav>

            <Link to="/contacto" className="bg-[#0b4e89] text-white px-8 py-3 rounded-xl font-bold text-[15px] hover:bg-blue-800 transition-colors">
                Contacto
            </Link>
        </header>
    );
};

export default Header;

import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            icon: 'flight_takeoff',
            title: 'Courier internacional',
            description: 'Soluciones rápidas para envíos urgentes de documentación y paquetería a nivel global con seguimiento dedicado.'
        },
        {
            icon: 'directions_boat',
            title: 'Fletes internacionales',
            description: 'Coordinación eficiente de transporte marítimo, aéreo y terrestre para todo tipo de carga industrial y comercial.'
        },
        {
            icon: 'swap_horiz',
            title: 'Importación y exportación',
            description: 'Gestión integral de operaciones de comercio exterior para expandir su presencia en los mercados más competitivos.'
        },
        {
            icon: 'gavel',
            title: 'Despacho de aduana',
            description: 'Trámites aduaneros ágiles y asesoría técnica para asegurar la liberación de su carga sin demoras ni costos extra.'
        },
        {
            icon: 'shopping_cart',
            title: 'Agentes de compra internacional',
            description: 'Búsqueda y auditoría de proveedores globales para garantizar calidad y optimizar sus costos de adquisición.'
        },
        {
            icon: 'radar',
            title: 'Seguimiento de carga',
            description: 'Monitoreo constante y reportes en tiempo real para que tenga el control total de sus envíos en todo momento.'
        },
        {
            icon: 'lightbulb',
            title: 'Asesoramiento experto',
            description: 'Estrategias personalizadas para optimizar procesos logísticos, fiscales y mejorar la rentabilidad de su negocio.'
        }
    ];

    return (
        <section className="px-4 py-8" id="servicios">
            <div className="pb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">NUESTROS SERVICIOS</h3>
            </div>

            <div className="flex flex-col border-t border-gray-100 dark:border-gray-800">
                {services.map((service, index) => (
                    <Link
                        key={index}
                        to="/servicios"
                        className="flex items-start gap-4 py-6 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                    >
                        <div className="text-primary dark:text-blue-300 mt-1">
                            <span className="material-symbols-outlined text-[28px]">{service.icon}</span>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-bold text-text-main dark:text-white leading-tight">
                                {service.title}
                            </h4>
                            <p className="text-text-light dark:text-gray-400 text-sm mt-1 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Services;

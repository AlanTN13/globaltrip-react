import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { serviceDetails } from '../data/serviceDetails';

const Services = () => {
    const { t } = useLanguage();

    const services = [
        {
            id: serviceDetails[0].id,
            title: t('services.s1'),
            image: '/services-images/despachantes-de-aduana.png',
            imageClassName: 'object-center',
            link: `/servicios#${serviceDetails[0].id}`
        },
        {
            id: serviceDetails[1].id,
            title: t('services.s2'),
            image: '/services-images/freight-forwarder.png',
            imageClassName: 'object-center',
            link: `/servicios#${serviceDetails[1].id}`
        },
        {
            id: serviceDetails[2].id,
            title: t('services.s3'),
            image: '/services-images/courier-internacional.png',
            imageClassName: 'object-[center_22%]',
            link: `/servicios#${serviceDetails[2].id}`
        },
        {
            id: serviceDetails[3].id,
            title: t('services.s4'),
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
            imageClassName: 'object-center',
            link: `/servicios#${serviceDetails[3].id}`
        },
        {
            id: serviceDetails[4].id,
            title: t('services.s5'),
            image: '/services-images/asesoramiento-comercio-exterior.png',
            imageClassName: 'object-center',
            link: `/servicios#${serviceDetails[4].id}`
        },
        {
            id: serviceDetails[5].id,
            title: t('services.s6'),
            subtitle: t('services.s6_sub'),
            image: '/services-images/agente-compras-china.png',
            imageClassName: 'object-[center_18%]',
            link: `/servicios#${serviceDetails[5].id}`
        }
    ];

    return (
        <section className="py-24 bg-slate-50 overflow-hidden" id="servicios-bloque">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
                        {t('services.title')}
                    </h2>
                    <div className="w-16 h-1 bg-[#0b0c49] mx-auto mt-4"></div>
                </div>

                {/* Grid de Cards (Estilo Central Cargo) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            to={service.link}
                            className="group relative h-72 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* Background Image with Zoom */}
                            <img
                                src={service.image}
                                alt={service.title}
                                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${service.imageClassName}`}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-100"></div>

                            {/* Text Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center text-white">
                                <h3 className="text-xl font-black uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform">
                                    {service.title}
                                </h3>
                                {service.subtitle && (
                                    <p className="text-xs text-slate-300 font-medium mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {service.subtitle}
                                    </p>
                                )}

                                {/* Hover Button Style */}
                                <div className="mt-4 border border-white/40 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    {t('services.ver_mas')}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer del bloque con CTA */}
                <div className="mt-20 text-center flex flex-col items-center gap-8">
                    <p className="max-w-3xl text-slate-600 text-lg md:text-xl font-light leading-relaxed">
                        {t('services.footer_text')}
                    </p>

                    <Link to="/contacto" className="bg-[#0b0c49] text-white px-12 py-4 rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-[#161865] transition-all hover:scale-105">
                        {t('services.cta')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;

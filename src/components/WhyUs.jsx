const WhyUs = () => {
    const values = [
        {
            icon: 'visibility',
            title: 'Transparencia',
            description: 'Visibilidad total en costos y procesos.'
        },
        {
            icon: 'bolt',
            title: 'Eficiencia',
            description: 'Tiempos optimizados de entrega.'
        },
        {
            icon: 'shield_lock',
            title: 'Seguridad',
            description: 'Protección integral de su carga.'
        },
        {
            icon: 'verified',
            title: 'Experiencia',
            description: 'Más de 15 años en el mercado.'
        }
    ];

    return (
        <section className="px-4 py-8">
            <h2 className="text-text-main dark:text-white text-2xl font-bold mb-8">Por qué elegirnos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {values.map((value, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-4 p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300"
                    >
                        <div className="text-primary dark:text-blue-400">
                            <span className="material-symbols-outlined text-3xl">{value.icon}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-text-main dark:text-white text-xl">
                                {value.title}
                            </h3>
                            <p className="text-sm text-text-light dark:text-gray-400 mt-2 leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyUs;

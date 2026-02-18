import { useLanguage } from '../context/LanguageContext';

const Team = () => {
    const { t } = useLanguage();

    const members = [
        {
            name: 'Cindy Santillan',
            role: t('team.role1'),
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
        },
        {
            name: 'Matias Principato',
            role: t('team.role2'),
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'
        },
        {
            name: 'German Jimenez',
            role: t('team.role3'),
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800'
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
                        {t('team.title')}
                    </h2>
                    <div className="w-16 h-1 bg-blue-600 mx-auto mt-4"></div>
                </div>

                {/* Team Grid Style Silver Freight */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {members.map((member, index) => (
                        <div key={index} className="flex flex-col items-center group">
                            {/* Photo Container */}
                            <div className="relative w-full aspect-square mb-8 overflow-hidden rounded-2xl bg-slate-100 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                />
                                {/* Soft Hover Overlay */}
                                <div className="absolute inset-0 bg-[#0b4e89]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Info */}
                            <div className="text-center">
                                <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                                    {member.name}
                                </h3>
                                <div className="w-8 h-[2px] bg-blue-600 mx-auto mb-4 opacity-30 group-hover:w-16 transition-all duration-500"></div>
                                <p className="text-slate-500 font-bold text-sm uppercase tracking-[0.15em]">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;

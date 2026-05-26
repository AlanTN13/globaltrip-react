import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/gtm';

const ServicesLanding = () => {
  const { t } = useLanguage();
  const landing = t('servicesLanding');
  const whatsappPhone = '5491131411755';
  const serviceImages = [
    {
      src: '/services-images/despachantes-de-aduana.png',
      className: 'object-center',
    },
    {
      src: '/services-images/freight-forwarder.png',
      className: 'object-center',
    },
    {
      src: '/services-images/courier-internacional.png',
      className: 'object-[center_22%]',
    },
    {
      src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
      className: 'object-center',
    },
    {
      src: '/services-images/asesoramiento-comercio-exterior.png',
      className: 'object-center',
    },
    {
      src: '/services-images/agente-compras-china.png',
      className: 'object-[center_18%]',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-slate-50 py-24">
          <div className="container relative z-10 mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center text-center">
              <span className="mb-5 inline-block rounded-full border border-[#0b0c49]/10 bg-[#0b0c49]/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#0b0c49]">
              {landing.eyebrow}
              </span>
              <h1 className="max-w-5xl text-4xl font-black uppercase tracking-tight text-slate-900 md:text-6xl">
                {landing.title}
              </h1>
              <div className="mt-4 h-[3px] w-20 bg-[#0b0c49]"></div>
              <p className="mt-8 max-w-4xl text-lg leading-relaxed text-slate-600 md:text-xl">
                {landing.intro}
              </p>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contacto"
                  className="rounded-full bg-[#0b0c49] px-8 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-[#161865]"
                >
                  {landing.cta_primary}
                </Link>
                <a
                  href="#detalle-servicios"
                  className="rounded-full border border-slate-200 bg-white px-8 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-slate-700 transition-all hover:border-[#0b0c49]/20 hover:text-[#0b0c49]"
                >
                  {landing.cta_secondary}
                </a>
              </div>

            </div>
          </div>
        </section>

        <section className="bg-white pt-8 pb-16" id="detalle-servicios">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {landing.sections.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition-all duration-300 hover:border-[#0b0c49]/20 hover:text-[#0b0c49]"
                >
                  {service.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="space-y-8">
              {landing.sections.map((service, index) => (
                (() => {
                  const whatsappMessage = `${landing.whatsapp_message} ${service.title}.`;
                  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;

                  return (
                <article
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)]"
                >
                  <div className="grid lg:grid-cols-12 lg:items-stretch">
                    <div className="relative min-h-[280px] lg:col-span-5">
                      <img
                        src={serviceImages[index].src}
                        alt={service.title}
                        className={`absolute inset-0 h-full w-full object-cover ${serviceImages[index].className}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                    </div>

                    <div className="grid gap-10 p-8 md:p-10 lg:col-span-7 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
                      <div>
                        <span className="mb-4 inline-block text-[11px] font-black uppercase tracking-[0.3em] text-[#0b0c49]">
                        {landing.service_label} {String(index + 1).padStart(2, '0')}
                        </span>
                        <h2 className="max-w-xl text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                          {service.title}
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed text-slate-600">{service.intro}</p>
                        <p className="mt-6 text-base font-semibold leading-relaxed text-slate-800">{service.closing}</p>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent('whatsapp_click', {
                            location: 'services_landing',
                            label: service.title
                          })}
                          className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-[#1fb85a]"
                        >
                          {landing.whatsapp_cta}
                          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                        </a>
                      </div>

                      <div className="rounded-[1.75rem] bg-slate-50 p-8">
                        <h3 className="text-sm font-black uppercase tracking-[0.22em] text-slate-900">{landing.includes_label}</h3>
                        <ul className="mt-6 space-y-4">
                          {service.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3 text-slate-600">
                              <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#0b0c49]"></span>
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
                  );
                })()
              ))}
            </div>

            <div className="mt-16 rounded-[2rem] bg-white px-8 py-12 text-center shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] md:px-12">
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">{landing.bottom_title}</h2>
              <div className="mx-auto mt-4 h-[3px] w-16 bg-[#0b0c49]"></div>
              <p className="mx-auto mt-6 max-w-3xl text-slate-600 md:text-lg">
                {landing.bottom_text}
              </p>
              <Link
                to="/contacto"
                className="mt-8 inline-block rounded-full bg-[#0b0c49] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-[#161865]"
              >
                {landing.bottom_cta}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesLanding;

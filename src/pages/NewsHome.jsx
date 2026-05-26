import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsletterSignup from '../components/NewsletterSignup';
import { useLanguage } from '../context/useLanguage';
import { newsPosts } from '../data/newsPosts';
import { formatNewsDate, getAllNewsPosts, getFeaturedNewsPost } from '../lib/news';

const allPosts = getAllNewsPosts(newsPosts);
const featuredPost = getFeaturedNewsPost(newsPosts);

const NewsHome = () => {
  const { language, t } = useLanguage();
  const newsPage = t('newsPage');
  const [activeCategory, setActiveCategory] = useState('all');

  const categoryIds = [...new Set(allPosts.map((post) => post.category))];
  const categories = [
    { id: 'all', label: newsPage.filters.all },
    ...categoryIds.map((categoryId) => ({
      id: categoryId,
      label: newsPage.categories[categoryId] || categoryId,
    })),
  ];

  const filteredPosts =
    activeCategory === 'all'
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  const latestPosts = featuredPost
    ? filteredPosts.filter((post) => post.slug !== featuredPost.slug)
    : filteredPosts;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&q=80&w=1800"
              alt={newsPage.heroAlt}
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,12,73,0.92)_0%,rgba(11,12,73,0.82)_52%,rgba(15,23,42,0.65)_100%)]" />
          </div>

          <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 text-white md:px-10 lg:px-12 lg:py-28">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm">
                {newsPage.eyebrow}
              </span>
              <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
                {newsPage.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-white/78 md:text-lg">
                {newsPage.intro}
              </p>
            </div>

            <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/96 p-6 text-slate-900 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)] backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0b0c49]">
                  {newsPage.newsletter.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
                  {newsPage.newsletter.title}
                </h2>
                <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                  {newsPage.newsletter.description}
                </p>
              </div>
              <NewsletterSignup
                source="news_hero_newsletter"
                variant="hero"
                className="flex flex-col justify-center gap-4"
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-8">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full border px-5 py-3 text-sm font-black uppercase tracking-[0.16em] transition-all ${
                      isActive
                        ? 'border-[#0b0c49] bg-[#0b0c49] text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-[#0b0c49]/20 hover:text-[#0b0c49]'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 pb-12 pt-6">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
            {featuredPost && (activeCategory === 'all' || featuredPost.category === activeCategory) ? (
              <article className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_30px_80px_-55px_rgba(15,23,42,0.45)]">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative min-h-[320px]">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                  </div>

                  <div className="p-8 md:p-10">
                    <span className="inline-flex rounded-full bg-[#0b0c49]/6 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#0b0c49]">
                      {newsPage.featuredLabel}
                    </span>
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                      <span>{newsPage.categories[featuredPost.category] || featuredPost.category}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      <span>{formatNewsDate(featuredPost.publishedAt, language)}</span>
                    </div>
                    <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-600 md:text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <Link
                      to={`/noticias/${featuredPost.slug}`}
                      className="mt-8 inline-flex rounded-full bg-[#0b0c49] px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#161865]"
                    >
                      {newsPage.readArticle}
                    </Link>
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0b0c49]">
                  {newsPage.latestEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  {newsPage.latestTitle}
                </h2>
              </div>
              <p className="hidden text-sm font-semibold text-slate-400 md:block">
                {filteredPosts.length} {filteredPosts.length === 1 ? newsPage.results.single : newsPage.results.plural}
              </p>
            </div>

            {latestPosts.length ? (
              <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {latestPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-[0_25px_60px_-50px_rgba(15,23,42,0.55)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Link to={`/noticias/${post.slug}`} className="block">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                      </div>
                      <div className="p-7">
                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
                          <span>{newsPage.categories[post.category] || post.category}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                          <span>{formatNewsDate(post.publishedAt, language)}</span>
                        </div>
                        <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                          {post.title}
                        </h3>
                        <p className="mt-4 line-clamp-4 text-sm font-medium leading-relaxed text-slate-600">
                          {post.excerpt}
                        </p>
                        <span className="mt-6 inline-flex text-sm font-black uppercase tracking-[0.16em] text-[#0b0c49]">
                          {newsPage.readMore}
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 px-8 py-16 text-center">
                <p className="text-xl font-black tracking-tight text-slate-900">
                  {newsPage.empty.title}
                </p>
                <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                  {newsPage.empty.description}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewsHome;

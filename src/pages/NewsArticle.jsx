import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/useLanguage';
import { newsPosts } from '../data/newsPosts';
import {
  formatNewsDate,
  getAllNewsPosts,
  getRelatedNewsPosts,
} from '../lib/news';

const renderBlock = (block, index) => {
  if (block.type === 'heading') {
    return (
      <h2 key={`${block.type}-${index}`} className="mt-12 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
        {block.text}
      </h2>
    );
  }

  if (block.type === 'list') {
    return (
      <ul key={`${block.type}-${index}`} className="mt-8 space-y-4 rounded-[1.75rem] bg-slate-50 p-8">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base font-medium leading-relaxed text-slate-600">
            <span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#0b0c49]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === 'quote') {
    return (
      <blockquote
        key={`${block.type}-${index}`}
        className="mt-10 rounded-[1.75rem] border border-[#0b0c49]/10 bg-[#0b0c49]/[0.03] px-8 py-8 text-xl font-black tracking-tight text-[#0b0c49] md:text-2xl"
      >
        “{block.text}”
      </blockquote>
    );
  }

  return (
    <p key={`${block.type}-${index}`} className="mt-8 text-base font-medium leading-8 text-slate-600 md:text-lg">
      {block.text}
    </p>
  );
};

const NewsArticle = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const newsPage = t('newsPage');
  const posts = getAllNewsPosts(newsPosts);
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="px-6 py-24">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-100 bg-slate-50 px-8 py-16 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0b0c49]">
              {newsPage.notFound.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
              {newsPage.notFound.title}
            </h1>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-500">
              {newsPage.notFound.description}
            </p>
            <Link
              to="/noticias"
              className="mt-8 inline-flex rounded-full bg-[#0b0c49] px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#161865]"
            >
              {newsPage.backToNews}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = getRelatedNewsPosts(newsPosts, post.slug);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.18)_0%,rgba(2,6,23,0.68)_45%,rgba(2,6,23,0.88)_100%)]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 py-24 text-white md:px-10 lg:px-12 lg:py-28">
            <Link
              to="/noticias"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              <span className="material-symbols-outlined !text-[18px]">west</span>
              {newsPage.backToNews}
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.24em] text-white/70">
              <span>{newsPage.categories[post.category] || post.category}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
              <span>{formatNewsDate(post.publishedAt, language)}</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-white/82 md:text-xl">
              {post.excerpt}
            </p>
          </div>
        </section>

        <section className="relative -mt-10 rounded-t-[2.5rem] bg-white px-6 pb-20 pt-12 md:px-10 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <article className="max-w-3xl">
              {post.content.map((block, index) => renderBlock(block, index))}

              {post.sourceUrl ? (
                <div className="mt-12 rounded-[1.75rem] border border-slate-100 bg-slate-50 p-8">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0b0c49]">
                    {newsPage.sourceLabel}
                  </p>
                  <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
                    {post.sourceName}
                  </p>
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex rounded-full border border-[#0b0c49]/15 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#0b0c49] transition-colors hover:border-[#0b0c49] hover:bg-[#0b0c49] hover:text-white"
                  >
                    {newsPage.openSource}
                  </a>
                </div>
              ) : null}
            </article>

            <aside className="lg:sticky lg:top-28">
              <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0b0c49]">
                  {newsPage.articleSidebar.eyebrow}
                </p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  {newsPage.articleSidebar.title}
                </h2>
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">
                  {newsPage.articleSidebar.description}
                </p>
                <Link
                  to="/contacto"
                  className="mt-8 inline-flex rounded-full bg-[#0b0c49] px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#161865]"
                >
                  {newsPage.articleSidebar.cta}
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0b0c49]">
                  {newsPage.relatedEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  {newsPage.relatedTitle}
                </h2>
              </div>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.slug}
                  className="overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-[0_25px_60px_-50px_rgba(15,23,42,0.55)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <Link to={`/noticias/${relatedPost.slug}`} className="block">
                    <div className="h-56 overflow-hidden">
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-7">
                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
                        <span>{newsPage.categories[relatedPost.category] || relatedPost.category}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                        <span>{formatNewsDate(relatedPost.publishedAt, language)}</span>
                      </div>
                      <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                        {relatedPost.title}
                      </h3>
                      <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewsArticle;

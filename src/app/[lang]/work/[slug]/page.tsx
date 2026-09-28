import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { hasLocale, locales, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { featured, getFeatured, type FeaturedProject } from "@/content/projects";
import { Device } from "@/components/device/Device";
import { Showcase } from "@/components/device/Showcase";
import { KilnDiagram, PayrollDiagram } from "@/components/work/Diagrams";
import { href, pad, t } from "@/lib/i18n";
import { site } from "@/lib/site";
import styles from "./case.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return featured.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getFeatured(slug);
  if (!hasLocale(lang) || !project) return {};
  const title = `${t(project.title, lang)} · ${project.name}`;
  const description = t(project.summary, lang);
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/work/${slug}`,
      languages: { en: `/en/work/${slug}`, es: `/es/work/${slug}`, "x-default": `/en/work/${slug}` },
    },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      url: `/${lang}/work/${slug}`,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const project = getFeatured(slug);
  if (!project) notFound();

  const dict = getDictionary(lang);
  const index = featured.indexOf(project);
  const next = featured[(index + 1) % featured.length];

  const article = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.name} — ${t(project.title, lang)}`,
    description: t(project.summary, lang),
    inLanguage: lang,
    dateCreated: project.year,
    author: { "@type": "Person", name: site.name, url: `${site.url}/${lang}` },
    url: `${site.url}/${lang}/work/${project.slug}`,
    keywords: project.stack.join(", "),
  };

  return (
    <article className={styles.case} aria-labelledby="case-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, "\\u003c") }} />
      <CaseHeader project={project} index={index} lang={lang} dict={dict} />

      <div className={`container ${styles.hero}`}>
        <Showcase showcase={project.showcase} locale={lang} area={0.9} eager className={styles.showcase} />
      </div>

      <div className={`container ${styles.body}`}>
        <Section n={1} title={dict.caseStudy.brief}>
          <div className={styles.prose}>
            {project.story.brief.map((p, i) => (
              <p key={i} className={i === 0 ? styles.lead : undefined} data-reveal>
                {t(p, lang)}
              </p>
            ))}
          </div>
        </Section>

        <Section n={2} title={dict.caseStudy.built}>
          <ul role="list" className={styles.built}>
            {project.story.built.map((b, i) => (
              <li key={i} data-reveal style={{ "--delay": `${(i % 2) * 70}ms` } as CSSProperties}>
                {t(b, lang)}
              </li>
            ))}
          </ul>
        </Section>

        {project.story.diagram && (
          <Section n={3} title={dict.caseStudy.architecture}>
            <div data-reveal>
              {project.story.diagram === "payroll" ? <PayrollDiagram locale={lang} /> : <KilnDiagram locale={lang} />}
            </div>
          </Section>
        )}

        <Section n={project.story.diagram ? 4 : 3} title={dict.caseStudy.engineering}>
          <ol role="list" className={styles.notes}>
            {project.story.engineering.map((note, i) => (
              <li key={i} className={styles.note} data-reveal style={{ "--delay": `${(i % 2) * 90}ms` } as CSSProperties}>
                <span className={styles.noteNo} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h3 className={styles.noteTitle}>{t(note.title, lang)}</h3>
                <p className={styles.noteBody}>{t(note.body, lang)}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section n={project.story.diagram ? 5 : 4} title={dict.caseStudy.gallery}>
          <div className={styles.gallery}>
            {project.story.gallery.map((shot, i) => (
              <figure key={i} className={styles.figure} data-kind={shot.device ?? "browser"}>
                <Device
                  shot={shot}
                  locale={lang}
                  sizes={i === 0 ? "(max-width: 900px) 100vw, 62vw" : "(max-width: 900px) 100vw, 32vw"}
                  style={{ "--delay": `${(i % 2) * 120}ms` } as CSSProperties}
                />
                {shot.caption && <figcaption className={`mono ${styles.caption}`}>{t(shot.caption, lang)}</figcaption>}
              </figure>
            ))}
          </div>
        </Section>

        <Section n={project.story.diagram ? 6 : 5} title={dict.caseStudy.outcome}>
          <div className={styles.prose}>
            {project.story.outcome.map((p, i) => (
              <p key={i} className={styles.lead} data-reveal>
                {t(p, lang)}
              </p>
            ))}
            {project.story.note && (
              <p className={`mono muted ${styles.note2}`} data-reveal>
                {t(project.story.note, lang)}
              </p>
            )}
          </div>
        </Section>
      </div>

      <NextCase project={next} lang={lang} dict={dict} />
    </article>
  );
}

function CaseHeader({ project: p, index, lang, dict }: { project: FeaturedProject; index: number; lang: Locale; dict: Dictionary }) {
  return (
    <header className={`container ${styles.header}`}>
      <div className={styles.topline}>
        <Link className="ink-link" href={`${href(lang)}#work`}>
          <span className="arrow" aria-hidden="true">
            ←
          </span>
          {dict.caseStudy.back}
        </Link>
        <span className="mono muted">
          {dict.caseStudy.case} {pad(index + 1)} / {pad(featured.length)}
        </span>
      </div>

      <div className={styles.titleBlock}>
        <p className={`mono ${styles.kicker}`}>
          {p.name} <span aria-hidden="true">·</span> {t(p.kind, lang)}
        </p>
        <h1 id="case-title" className={styles.title} data-reveal="lines">
          <span className="line">
            <span className="line__inner">{t(p.title, lang)}</span>
          </span>
        </h1>
        <span className={styles.jp} aria-hidden="true" lang="ja">
          事例
        </span>
      </div>

      <div className={styles.intro}>
        <div className={styles.introText}>
          <p className={styles.summary}>{t(p.summary, lang)}</p>
          <ul className={styles.highlights}>
            {p.highlights.map((h, i) => (
              <li key={i}>{t(h, lang)}</li>
            ))}
          </ul>
        </div>
        <dl className={styles.meta}>
          <div>
            <dt className="mono muted">{dict.work.client}</dt>
            <dd>{t(p.client, lang)}</dd>
          </div>
          <div>
            <dt className="mono muted">{dict.work.role}</dt>
            <dd>{t(p.role, lang)}</dd>
          </div>
          <div>
            <dt className="mono muted">{dict.work.year}</dt>
            <dd>
              {p.year} <span className="stamp" data-tone={p.status.tone}>{t(p.status.label, lang)}</span>
            </dd>
          </div>
          <div>
            <dt className="mono muted">{dict.work.stack}</dt>
            <dd>
              <ul className="tags">
                {p.stack.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          {(p.links.live || p.links.code) && (
            <div className={styles.metaLinks}>
              <dt className="visually-hidden">{dict.archive.link}</dt>
              <dd>
                {p.links.live && (
                  <a className="btn btn--solid" href={p.links.live} target="_blank" rel="noopener noreferrer">
                    {dict.work.visit}
                    <span className="visually-hidden"> ({dict.a11y.newTab})</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {p.links.code?.map((c, i) => (
                  <a key={c} className="btn" href={c} target="_blank" rel="noopener noreferrer">
                    {dict.work.source}
                    {p.links.code && p.links.code.length > 1 ? ` ${i + 1}` : ""}
                    <span className="visually-hidden"> ({dict.a11y.newTab})</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </header>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <span className="mono" aria-hidden="true">
          {pad(n)}
        </span>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function NextCase({ project: p, lang, dict }: { project: FeaturedProject; lang: Locale; dict: Dictionary }) {
  const cover = p.showcase.shots[0];
  return (
    <nav className={`container ${styles.next}`} aria-label={dict.caseStudy.next}>
      <Link href={href(lang, `/work/${p.slug}`)} className={styles.nextLink}>
        <span className={`mono ${styles.nextLabel}`}>{dict.caseStudy.next} →</span>
        <span className={styles.nextTitle}>{t(p.title, lang)}</span>
        <span className={styles.nextMeta}>
          {p.name} · {t(p.kind, lang)}
        </span>
        <span className={styles.nextImage} aria-hidden="true">
          <Image src={cover.src} alt="" placeholder="blur" sizes="(max-width: 900px) 100vw, 40vw" />
        </span>
      </Link>
    </nav>
  );
}

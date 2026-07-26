import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FeatureIcon } from './components/FeatureIcon';
import { DownloadButton, FadeIn, GlassCard, GitHubLink, RepoLink } from './components/ui';
import {
  CONTACT_EMAIL,
  FEATURES,
  GITHUB_PROFILE,
  GITHUB_RELEASES,
  GITHUB_REPO,
  GITHUB_STARS,
  GITHUB_USER,
  HOW_IT_WORKS,
  PROBLEM_POINTS,
  SOLUTION_POINTS,
} from './constants';

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-[#070709]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white">
          <img src="/favicon.png" alt="" className="h-6 w-6 rounded-md" />
          Spotlight
        </a>
        <div className="flex items-center gap-4">
          <GitHubLink />
          <DownloadButton className="!px-4 !py-2 !text-xs" />
        </div>
      </div>
    </nav>
  );
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioEnabledRef = useRef(false);
  const finishedRef = useRef(false);
  const [muted, setMuted] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [finished, setFinished] = useState(false);

  const unmute = () => {
    const video = videoRef.current;
    if (!video || finishedRef.current) return;
    video.muted = false;
    video.volume = 1;
    video.loop = false;
    audioEnabledRef.current = true;
    void video.play();
    setMuted(false);
    setAudioEnabled(true);
  };

  const handleEnded = () => {
    if (!audioEnabledRef.current || finishedRef.current) return;

    const video = videoRef.current;
    if (!video) return;

    video.pause();
    finishedRef.current = true;
    setFinished(true);
  };

  return (
    <FadeIn delay={0.15} className="relative mx-auto mt-16 max-w-4xl">
      <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-b from-[#6b8cff]/20 via-[#8b7cf6]/10 to-transparent blur-2xl" />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="spotlight-card relative overflow-hidden rounded-2xl p-2 shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
      >
        <video
          ref={videoRef}
          className="w-full rounded-xl"
          autoPlay
          muted
          loop={!audioEnabled}
          playsInline
          poster="/screenshots/spotlight-search.png"
          onEnded={handleEnded}
        >
          <source src="/spotlight-ad.mp4" type="video/mp4" />
        </video>
        {muted && !finished && (
          <button
            type="button"
            onClick={unmute}
            className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-white/12 bg-black/50 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl transition hover:border-white/20 hover:bg-black/65 hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5L6 9H3v6h3l5 4V5z" strokeLinejoin="round" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8 8 0 0 1 0 12" strokeLinecap="round" />
              <line x1="2" y1="2" x2="22" y2="22" strokeLinecap="round" />
            </svg>
            Tap for sound
          </button>
        )}
      </motion.div>
    </FadeIn>
  );
}

function InstallSteps() {
  return (
    <div className="mx-auto mt-16 max-w-6xl text-left">
      <FadeIn className="mb-10 text-center">
        <h2 className="text-3xl font-light tracking-[-0.02em] text-white md:text-4xl">
          Install. Allow. Launch.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base font-light text-white/45">
          Download, run the installer, click through the SmartScreen prompt if it appears, then hit{' '}
          <span className="font-medium text-white/65">Alt+Space</span> to open Spotlight.
        </p>
      </FadeIn>

      <div className="grid gap-4 lg:grid-cols-3">
        {HOW_IT_WORKS.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.08}>
            <GlassCard className="relative h-full p-6 md:p-8">
              <span className="text-xs font-medium tracking-[0.15em] text-[#8b9dff]">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-white/50">
                {item.description}
              </p>
            </GlassCard>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2} className="mx-auto mt-6 max-w-4xl">
        <GlassCard className="border-amber-400/10 px-6 py-5 md:px-8 md:py-6">
          <p className="text-sm font-medium text-amber-200/90">About the Windows popup</p>
          <p className="mt-2 text-sm font-light leading-relaxed text-white/50">
            Spotlight isn&apos;t code-signed yet — a proper certificate costs around{' '}
            <span className="text-white/65">$70/year</span>, and this is a free open-source build.
            If Windows SmartScreen warns you about an unknown publisher, click{' '}
            <span className="font-medium text-white/70">More info</span> →{' '}
            <span className="font-medium text-white/70">Run anyway</span>. The app is open source on{' '}
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b9dff] transition hover:text-[#a8b8ff]"
            >
              GitHub
            </a>{' '}
            — you can inspect every line before you install.
          </p>
        </GlassCard>
      </FadeIn>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full glow-orb hero-glow blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(107,140,255,0.12), transparent 60%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <FadeIn>
          <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-[#8b9dff]/25 bg-[#8b9dff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#a8b8ff]">
              Open Source
            </span>
          </div>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Fast, private, offline app launcher for Windows
          </p>
          <h1 className="mx-auto max-w-4xl text-5xl font-light leading-[1.05] tracking-[-0.03em] text-white md:text-7xl lg:text-[5.5rem]">
            Windows Search is broken.
            <br />
            <span className="font-semibold text-white">This isn&apos;t.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/55 md:text-xl">
            Spotlight is a fast, keyboard-first launcher for Windows. Search apps, files, folders,
            and settings instantly — no internet required.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-white/40">
            Install it, then press{' '}
            <span className="font-medium text-white/70">Alt+Space</span> — Spotlight launches from
            anywhere.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <DownloadButton size="large" />
              <RepoLink />
            </div>
            <p className="max-w-md text-xs font-light text-white/35">
              Open source on GitHub — review the code before you install. Built by{' '}
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition hover:text-white/75"
              >
                @{GITHUB_USER}
              </a>
            </p>
          </div>
        </FadeIn>

        <HeroVideo />
        <InstallSteps />
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl font-light tracking-[-0.02em] text-white md:text-5xl">
            You&apos;ve felt this.
          </h2>
          <ul className="mt-12 space-y-6">
            {PROBLEM_POINTS.map((point, i) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-lg font-light leading-relaxed text-white/45 md:text-xl"
              >
                {point}
              </motion.li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <GlassCard className="p-8 md:p-12">
            <h2 className="text-3xl font-light tracking-[-0.02em] text-white md:text-4xl">
              What Spotlight does instead
            </h2>
            <div className="mt-8 space-y-5">
              {SOLUTION_POINTS.map((point) => (
                <p key={point} className="text-base font-light leading-relaxed text-white/60 md:text-lg">
                  {point}
                </p>
              ))}
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-light tracking-[-0.02em] text-white md:text-4xl">
            Everything you need. Nothing you don&apos;t.
          </h2>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.06}>
              <GlassCard className="h-full p-6 transition hover:border-white/14">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/8">
                  <FeatureIcon name={feature.icon} />
                </div>
                <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/50">
                  {feature.description}
                </p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <GlassCard className="px-8 py-12 text-center md:px-12 md:py-16">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              <svg
                className="h-7 w-7 text-[#8b9dff]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 3l7 4v5c0 4.4-2.8 8.4-7 9-4.2-.6-7-4.6-7-9V7l7-4z" />
                <path d="M9.5 12.5l1.8 1.8 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-light tracking-[-0.02em] text-white md:text-3xl">
              Everything happens on your machine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-light leading-relaxed text-white/55 md:text-lg">
              No accounts, no cloud sync, no analytics, no ads.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm font-light leading-relaxed text-white/40">
              Spotlight never sends your search queries anywhere — unless you explicitly choose the
              web search row.
            </p>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

function Screenshot() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
            <img
              src="/screenshots/spotlight-empty.png"
              alt="Spotlight empty search bar on a dark desktop"
              className="w-full"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function DownloadCTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <GlassCard className="px-8 py-14 md:px-12 md:py-20">
            <h2 className="text-3xl font-light tracking-[-0.02em] text-white md:text-5xl">
              Free. Open source. No sign-up.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base font-light text-white/50">
              Download the latest installer from GitHub Releases. Install it, then press Alt+Space to
              launch.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5">
              <DownloadButton size="large" />
              <RepoLink />
              <p className="max-w-md text-sm font-light leading-relaxed text-white/40">
                After installing, press{' '}
                <span className="font-medium text-white/60">Alt+Space</span> from anywhere — Spotlight
                opens instantly.
              </p>
              <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                <img src={GITHUB_STARS} alt="GitHub stars" className="h-7" />
              </a>
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/45 transition hover:text-white/70"
              >
                @{GITHUB_USER} on GitHub →
              </a>
              <a
                href={GITHUB_RELEASES}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 transition hover:text-white/70"
              >
                View changelog on Releases →
              </a>
              <p className="mt-2 text-sm font-light text-white/40">
                Have a suggestion?{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-[#8b9dff] transition hover:text-[#a8b8ff]"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/6 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-white/35">
              © {new Date().getFullYear()} Spotlight. Built for Windows by{' '}
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition hover:text-white/75"
              >
                @{GITHUB_USER}
              </a>
            </p>
            <p className="mt-1 text-sm text-white/30">
              Suggestions?{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-white/45 transition hover:text-white/70"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 transition hover:text-white/60"
            >
              @{GITHUB_USER}
            </a>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 transition hover:text-white/60"
            >
              GitHub
            </a>
            <a
              href={GITHUB_RELEASES}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 transition hover:text-white/60"
            >
              Releases
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#070709]">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <Privacy />
        <Screenshot />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  );
}

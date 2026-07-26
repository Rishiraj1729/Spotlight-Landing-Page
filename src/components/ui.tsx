import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { DOWNLOAD_URL } from '../constants';

type FadeInProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
};

export function FadeIn({ children, delay = 0, className, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`spotlight-card rounded-2xl ${className}`}>{children}</div>
  );
}

type DownloadButtonProps = {
  className?: string;
  size?: 'default' | 'large';
};

export function DownloadButton({ className = '', size = 'default' }: DownloadButtonProps) {
  const sizeClasses =
    size === 'large'
      ? 'px-8 py-4 text-base'
      : 'px-6 py-3 text-sm';

  return (
    <a
      href={DOWNLOAD_URL}
      className={`cta-button inline-flex items-center justify-center rounded-full font-semibold text-white ${sizeClasses} ${className}`}
    >
      Download for Windows
    </a>
  );
}

export function GitHubLink({ className = '' }: { className?: string }) {
  return (
    <a
      href="https://github.com/Rishiraj1729/Spotlight"
      target="_blank"
      rel="noopener noreferrer"
      className={`text-sm font-medium text-white/55 transition hover:text-white/90 ${className}`}
    >
      Review on GitHub →
    </a>
  );
}

export function RepoLink({ className = '' }: { className?: string }) {
  return (
    <a
      href="https://github.com/Rishiraj1729/Spotlight"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/75 backdrop-blur-sm transition hover:border-white/16 hover:bg-white/8 hover:text-white ${className}`}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
      Review the source
    </a>
  );
}

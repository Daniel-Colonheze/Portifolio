"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Award, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const certifications = [
  {
    title: "Certificado Udemy",
    institution: "Udemy",
    year: "2026",
    image: "/images/certifications/udemy.png",
    link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-1400b521-d07e-47ab-abc7-0b5e666b2e77.pdf",
  },
  {
        title: "Certificado AWS",
        institution: "AWS",
        year: "2026",
        image: "/images/certifications/certificado-1.png",
        link: "/images/certifications/Certificado-1.png",
  },
];

const badges = [
  {
    title: "AWS Certified Cloud Practitioner",
    institution: "Amazon Web Services",
    year: "2026",
    image: "/images/certifications/aws-cloud-practitioner.png",
    link: "https://www.credly.com/badges/8a95ea71-9e29-4ea3-92e8-b96299dfc660/public_url",
  },
  {
    title: "AWS re/Start",
    institution: "Amazon Web Services",
    year: "2026",
    image: "/images/certifications/restart.png",
    link: "https://www.credly.com/badges/bbe03535-45aa-4fdf-848f-29057edc85e0/public_url",
  },
  {
    title: "Cisco",
    institution: "Cisco",
    year: "2026",
    image: "/images/certifications/cisco.png",
    link: "https://www.credly.com/badges/19618446-c95e-4984-a3e8-6a7eabf3db05/public_url",
  },
];

export function Certifications() {
  const { t } = useLanguage();

  return (
    <section
      id="certificacoes"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-16 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/[0.035] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-purple-400/70">
            {t.certifications.label}
          </p>

          <h2 className="mt-4 font-serif text-5xl text-white md:text-7xl">
            {t.certifications.title}
            <span className="text-purple-400">.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            {t.certifications.description}
          </p>

          <div className="mt-7 h-px w-24 bg-gradient-to-r from-purple-500/70 to-transparent" />
        </motion.div>

        {/* ==================== CERTIFICATIONS ==================== */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-6 flex items-center gap-3"
          >
            <Award className="h-4 w-4 text-purple-400" />

            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-purple-400/80">
              {t.certifications.certificationsTitle}
            </h3>
          </motion.div>

          {/* Limitado no desktop, largura total no mobile */}
          <div className="grid grid-cols-1 gap-5 md:max-w-3xl">
            {certifications.map((certification, index) => (
              <motion.article
                key={certification.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: false,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -5,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
                className="group relative overflow-hidden rounded-2xl border border-purple-500/10 bg-gradient-to-b from-purple-500/[0.045] to-transparent p-6 transition-colors duration-300 hover:border-purple-400/30"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-purple-600/[0.08] blur-[60px] transition-all duration-500 group-hover:bg-purple-500/[0.15]" />

                {/* Certificate image */}
                <div className="relative z-10 mb-6 overflow-hidden rounded-xl border border-purple-500/10 bg-black/40">
                  <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
                    <Image
                      src={certification.image}
                      alt={certification.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-500/[0.03]" />
                  </div>
                </div>

                {/* Certificate info */}
                <div className="relative z-10 flex items-start justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-400/15 bg-purple-500/[0.05] text-purple-400 transition-all duration-300 group-hover:border-purple-400/30 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.12)]">
                      <Award className="h-5 w-5" />
                    </div>

                    <div>
                      <h4 className="font-serif text-xl text-white transition-colors duration-300 group-hover:text-purple-300">
                        {certification.title}
                      </h4>

                      <p className="mt-1 text-sm text-gray-500">
                        {certification.institution}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 font-mono text-xs text-gray-600">
                    {certification.year}
                  </span>
                </div>

                {/* Certificate link */}
                <div className="relative z-10 mt-6">
                  <a
                    href={certification.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-purple-400 transition-colors hover:text-purple-300"
                  >
                    {t.certifications.viewCertificate}

                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-purple-500 to-transparent transition-all duration-500 group-hover:w-full" />
              </motion.article>
            ))}
          </div>
        </div>

        {/* ==================== BADGES ==================== */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-6 flex items-center gap-3"
          >
            <BadgeCheck className="h-4 w-4 text-purple-400" />

            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-purple-400/80">
              {t.certifications.badgesTitle}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {badges.map((badge, index) => (
              <motion.article
                key={badge.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: false,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -5,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
                className="group relative overflow-hidden rounded-2xl border border-purple-500/10 bg-gradient-to-b from-purple-500/[0.045] to-transparent p-6 transition-colors duration-300 hover:border-purple-400/30"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-purple-600/[0.08] blur-[60px] transition-all duration-500 group-hover:bg-purple-500/[0.15]" />

                {/* Badge image */}
                <div className="relative z-10 mb-6 flex h-40 items-center justify-center">
                  <div className="relative h-36 w-36 transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={badge.image}
                      alt={badge.title}
                      fill
                      sizes="144px"
                      className="object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                    />
                  </div>
                </div>

                {/* Badge info */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-400/15 bg-purple-500/[0.05] text-purple-400 transition-all duration-300 group-hover:border-purple-400/30 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.12)]">
                      <BadgeCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <h4 className="font-serif text-lg text-white transition-colors duration-300 group-hover:text-purple-300">
                        {badge.title}
                      </h4>

                      <p className="mt-1 text-xs text-gray-500">
                        {badge.institution}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 font-mono text-[10px] text-gray-600">
                    {badge.year}
                  </span>
                </div>

                {/* Badge link */}
                <div className="relative z-10 mt-6">
                  <a
                    href={badge.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-purple-400 transition-colors hover:text-purple-300"
                  >
                    {t.certifications.viewBadge}

                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-purple-500 to-transparent transition-all duration-500 group-hover:w-full" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

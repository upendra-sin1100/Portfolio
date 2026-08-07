import React from 'react'
import { motion } from 'framer-motion'

const PUBLICATIONS = [
  {
    title: 'Data-Driven Sustainability in Pharmaceutical Logistics',
    venue: 'IIP Series, Vol. 6',
    description:
      'Explores cognitive decision intelligence frameworks aimed at reducing medical waste across pharmaceutical supply chains.',
    pdf: 'Upendra Singh Tomar (Resarch Paper on Data-Driven Sustainability).pdf',
    certificate: 'Upendra Singh Tomar (Resarch Paper on Data-Driven Sustainability) Certificate.pdf',
    publisher: 'Iterative International Publishers',
    details: 'e-ISBN 978-93-7020-972-5',
  },
  {
    title: 'Inverse Design: Generative AI for Carbon Capture Materials (MOFs)',
    venue: 'IJAMRED',
    description:
      'Investigates generative AI approaches for designing Metal-Organic Frameworks optimized for carbon capture applications.',
    pdf: 'Upenrda Singh Tomar (Research Paper on Generative AI for Carbon Capture Materials(MOFs).pdf',
    certificate: 'Upenrda Singh Tomar (Research Paper on Generative AI for Carbon Capture Materials(MOFs) Certificate.pdf',
    publisher: 'International Journal of Advanced Multidisciplinary Research and Educational Development',
    details: 'Paper ID IJAMRED-V1I4P96',
  },
]

export default function Publications() {
  return (
    <div id="publications" className="section-shell">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <span className="section-kicker">
            Research
          </span>
          <h2 className="section-title">
            Published Research Papers
          </h2>
          <p className="section-lead mt-4">
            Two papers that sit between applied machine learning and practical systems thinking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {PUBLICATIONS.map((pub, i) => {
            const pdfHref = `/certificates/${encodeURIComponent(pub.pdf)}`
            const certificateHref = `/certificates/${encodeURIComponent(pub.certificate)}`

            return (
              <motion.article
                key={pub.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="rounded-[28px] surface-card p-7 hover:border-sapphire/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-mono font-bold tracking-wider text-amber-signal uppercase mb-2">
                    {pub.venue}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white leading-snug">{pub.title}</h3>
                  <p className="mt-3 text-sm font-sans text-steel leading-relaxed">{pub.description}</p>
                  <div className="mt-5 space-y-1 text-xs font-sans text-steel/80">
                    <p className="font-medium text-ice">{pub.publisher}</p>
                    <p className="font-mono text-steel/60">{pub.details}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 pt-4 border-t border-steel/10">
                  <a
                    href={pdfHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-sapphire px-4 py-2 text-xs font-sans font-semibold text-white hover:bg-sapphire-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
                  >
                    Read Paper ↗
                  </a>
                  <a
                    href={certificateHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-steel/20 bg-void/50 px-4 py-2 text-xs font-sans font-medium text-ice hover:bg-slate-deep hover:border-steel/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
                  >
                    View Certificate
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </div>
  )
}


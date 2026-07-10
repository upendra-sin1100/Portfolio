import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [selectedPublication, setSelectedPublication] = useState(null)

  useEffect(() => {
    if (!selectedPublication) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedPublication(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedPublication])

  return (
    <div id="publications" className="container-custom py-24 md:py-32">
      <div className="mb-14">
        <span className="inline-block text-xs font-bold tracking-[3px] text-purple-400/70 uppercase mb-3">Publications</span>
        <h2 className="text-4xl md:text-5xl font-black gradient-text">Published research</h2>
      </div>

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
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(6,182,212,0.3)' }}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-7"
            >
              <span className="inline-block text-[11px] font-bold tracking-[1.5px] text-cyan-300/70 uppercase mb-3">
                {pub.venue}
              </span>
              <h3 className="text-xl font-bold text-white leading-snug">{pub.title}</h3>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">{pub.description}</p>
              <div className="mt-5 space-y-3 text-sm text-white/55">
                <p>{pub.publisher}</p>
                <p className="text-white/40">{pub.details}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPublication({ ...pub, pdfHref, certificateHref })}
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  Preview
                </button>
                <a
                  href={pdfHref}
                  download={pub.pdf}
                  className="inline-flex items-center justify-center rounded-lg bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/25 hover:text-white"
                >
                  Download paper
                </a>
                <a
                  href={certificateHref}
                  download={pub.certificate}
                  className="inline-flex items-center justify-center rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  Certificate
                </a>
              </div>
            </motion.article>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedPublication ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedPublication.title} preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
            onClick={() => setSelectedPublication(null)}
          >
            <motion.div
              initial={{ scale: 0.97, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 18 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b12] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Publication preview</p>
                  <h3 className="mt-1 text-xl font-bold text-white">{selectedPublication.title}</h3>
                </div>
                <div className="flex gap-3">
                  <a
                    href={selectedPublication.pdfHref}
                    download={selectedPublication.pdf}
                    className="inline-flex items-center justify-center rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/30"
                  >
                    Download PDF
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedPublication(null)}
                    className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="h-[78vh] bg-black">
                <iframe
                  title={selectedPublication.title}
                  src={selectedPublication.pdfHref}
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

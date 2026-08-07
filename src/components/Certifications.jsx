import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Download, X } from 'lucide-react'

const CERTIFICATIONS = [
  {
    title: 'AI-ML Virtual Internship',
    issuer: 'Internship Certificate',
    file: 'UPENDRA SINGH TOMAR (AI-ML Virtual Internship).pdf',
  },
  {
    title: 'Android Developer Virtual Internship',
    issuer: 'Internship Certificate',
    file: 'UPENDRA SINGH TOMAR (Android Developer Virtual Internship).pdf',
  },
  {
    title: 'Data Analytic Virtual Internship',
    issuer: 'Internship Certificate',
    file: 'UPENDRA SINGH TOMAR (Data Analytic Virtual Internship).pdf',
  },
  {
    title: 'Data Analytics Process Automation Virtual Internship',
    issuer: 'Internship Certificate',
    file: 'UPENDRA SINGH TOMAR (Data Analytics Process Automation Virtual Internship).pdf',
  },
  {
    title: 'Python Full Stack Developer Virtual Internship',
    issuer: 'Internship Certificate',
    file: 'UPENDRA SINGH TOMAR (Python Full Stack Developer Virtual Internship).pdf',
  },
  {
    title: 'Research Paper on Data-Driven Sustainability',
    issuer: 'Certificate',
    file: 'Upendra Singh Tomar (Resarch Paper on Data-Driven Sustainability) Certificate.pdf',
  },
  {
    title: 'Research Paper on Generative AI for Carbon Capture Materials (MOFs)',
    issuer: 'Certificate',
    file: 'Upenrda Singh Tomar (Research Paper on Generative AI for Carbon Capture Materials(MOFs) Certificate.pdf',
  },
]

const COURSEWORK = [
  'Programming in Python',
  'Data Structures & Algorithms',
  'Machine Learning',
  'Deep Learning',
  'Data Science',
  'Artificial Intelligence',
]

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null)

  useEffect(() => {
    if (!selectedCert) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedCert(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedCert])

  return (
    <div id="certifications" className="section-shell">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <span className="section-kicker">
            Certifications
          </span>
          <h2 className="section-title">
            Verified Credentials & Coursework
          </h2>
          <p className="section-lead mt-4">
            Certificates, internship completions, and the coursework backbone that supports the ML and data work shown elsewhere.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, i) => {
            const href = `/certificates/${encodeURIComponent(cert.file)}`

            return (
              <motion.article
                key={cert.file}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileTap={{ scale: 0.98 }}
                className="shimmer-card group relative overflow-hidden flex flex-col justify-between rounded-[2rem] surface-card p-7 hover:border-sapphire/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
              >
                {/* Static hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-sapphire/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
                
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-white text-xl leading-tight group-hover:text-sapphire transition-colors duration-300">{cert.title}</h3>
                  <p className="text-xs font-sans text-steel mt-2">{cert.issuer}</p>
                </div>
                <div className="relative z-10 mt-8 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCert({ ...cert, href })}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-steel/20 bg-void/50 px-4 py-2.5 text-xs font-sans font-medium text-ice hover:bg-slate-deep hover:border-sapphire hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
                  >
                    <Eye className="w-4 h-4 text-steel group-hover:text-sapphire transition-colors" /> Preview
                  </button>
                  <a
                    href={href}
                    download={cert.file}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-sapphire/20 border border-sapphire/40 px-4 py-2.5 text-xs font-sans font-medium text-white hover:bg-sapphire transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 rounded-[2rem] surface-card p-8 relative overflow-hidden group hover:border-sapphire/40 transition-colors duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-mono font-bold tracking-[0.15em] text-sapphire uppercase mb-6">Relevant Academic Coursework</p>
            <div className="flex flex-wrap gap-3">
              {COURSEWORK.map(item => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs font-sans font-medium text-ice hover:border-white/20 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedCert ? (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedCert.title} preview`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm px-4 py-6"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.96, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 16 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-5xl overflow-hidden rounded-2xl border border-steel/20 bg-slate-deep shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex flex-col gap-3 border-b border-steel/15 p-5 sm:flex-row sm:items-center sm:justify-between bg-void/50">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-sapphire">Certificate Preview</p>
                    <h3 className="mt-1 text-lg font-display font-bold text-white">{selectedCert.title}</h3>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={selectedCert.href}
                      download={selectedCert.file}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-sapphire px-5 py-2.5 text-xs font-sans font-semibold text-white hover:bg-sapphire-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire shadow-lg"
                    >
                      <Download className="w-4 h-4" /> Download PDF
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedCert(null)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-steel/20 bg-slate-deep px-5 py-2.5 text-xs font-sans font-medium text-steel hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
                    >
                      <X className="w-4 h-4" /> Close
                    </button>
                  </div>
                </div>
                <div className="h-[75vh] bg-void">
                  <iframe
                    title={selectedCert.title}
                    src={selectedCert.href}
                    className="h-full w-full border-none"
                  />
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}


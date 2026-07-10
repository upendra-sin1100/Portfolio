import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    <div id="certifications" className="container-custom py-24 md:py-32">
      <div className="mb-14">
        <span className="inline-block text-xs font-bold tracking-[3px] text-purple-400/70 uppercase mb-3">Certifications</span>
        <h2 className="text-4xl md:text-5xl font-black gradient-text">Preview and download certificates</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CERTIFICATIONS.map((cert, i) => {
          const href = `/certificates/${encodeURIComponent(cert.file)}`

          return (
            <motion.article
              key={cert.file}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4, borderColor: 'rgba(139,92,246,0.35)' }}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6"
            >
              <p className="font-bold text-white leading-tight">{cert.title}</p>
              <p className="text-sm text-white/40 mt-1">{cert.issuer}</p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCert({ ...cert, href })}
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  Preview
                </button>
                <a
                  href={href}
                  download={cert.file}
                  className="inline-flex items-center justify-center rounded-lg bg-purple-500/15 px-4 py-2 text-sm font-medium text-purple-200 transition hover:bg-purple-500/25 hover:text-white"
                >
                  Download
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
        className="mt-10 rounded-2xl bg-white/[0.03] border border-white/[0.07] p-8"
      >
        <p className="text-sm text-white/40 mb-5">Relevant coursework supporting the work above.</p>
        <div className="flex flex-wrap gap-2.5">
          {COURSEWORK.map(item => (
            <span
              key={item}
              className="px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm font-medium text-white/70"
            >
              {item}
            </span>
          ))}
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
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
                  <p className="text-xs uppercase tracking-[0.3em] text-purple-300/70">Certificate preview</p>
                  <h3 className="mt-1 text-xl font-bold text-white">{selectedCert.title}</h3>
                </div>
                <div className="flex gap-3">
                  <a
                    href={selectedCert.href}
                    download={selectedCert.file}
                    className="inline-flex items-center justify-center rounded-lg bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-100 transition hover:bg-purple-500/30"
                  >
                    Download PDF
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="h-[78vh] bg-black">
                <iframe
                  title={selectedCert.title}
                  src={selectedCert.href}
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

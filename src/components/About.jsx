import React from 'react'
import { motion } from 'framer-motion'

// SVG Icons for skills
const ICONS = {
  Python: <path d="M12.33 21.83c-2.8.27-5.22-1.66-5.49-4.46s1.66-5.22 4.46-5.49 5.22 1.66 5.49 4.46c.27 2.8-1.66 5.22-4.46 5.49zM11.67 2.17c2.8-.27 5.22 1.66 5.49 4.46s-1.66 5.22-4.46 5.49-5.22-1.66-5.49-4.46S8.87 2.44 11.67 2.17zM12.33 10.17c-2.8.27-5.22-1.66-5.49-4.46S8.49-.51 11.29-.78s5.22 1.66 5.49 4.46c.27 2.8-1.66 5.22-4.46 5.49zM11.67 13.83c2.8-.27 5.22 1.66 5.49 4.46s-1.66 5.22-4.46 5.49-5.22-1.66-5.49-4.46c-.27-2.8 1.66-5.22 4.46-5.49z" />,
  JavaScript: <path d="M0 0h24v24H0V0h.01zM9.33 16.5h2.14c0 1.05.39 1.57 1.17 1.57.72 0 1.08-.42 1.08-1.26V10.5H15.9v6.05c0 1.89-1.02 2.8-2.97 2.8-1.89 0-3.01-.9-3.01-2.85zM1.5 10.5h2.14v6.3c0 .9.33 1.35 1.11 1.35.78 0 1.11-.45 1.11-1.35v-6.3H8.01v6.3c0 1.8-1.02 2.7-2.97 2.7-1.98 0-2.97-.9-2.97-2.7v-6.3z" />,
  React: <path d="M12.001 4.8A7.2 7.2 0 004.8 12.001a7.2 7.2 0 007.201 7.201 7.2 7.2 0 007.201-7.201A7.2 7.2 0 0012.001 4.8zm0 12.962a5.762 5.762 0 01-5.762-5.762 5.762 5.762 0 015.762-5.762 5.762 5.762 0 015.762 5.762 5.762 5.762 0 01-5.762 5.762zM12 10.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />,
  FastAPI: <path d="M12 2.163c-5.433 0-9.847 4.414-9.847 9.847s4.414 9.847 9.847 9.847 9.847-4.414 9.847-9.847S17.433 2.163 12 2.163zm0 17.694c-4.34 0-7.847-3.507-7.847-7.847s3.507-7.847 7.847-7.847 7.847 3.507 7.847 7.847-3.507 7.847-7.847 7.847zM12 6.863l-4.2 7.275h8.4L12 6.863z" />,
  TensorFlow: <path d="M3.93 2H20.07L12 14.07zM4.2 2.52h15.6L12 13.48zM12 15.1l-8.07-8.07H12zM12 15.1l8.07-8.07H12zM2 21.93L10.07 12 2 3.93zM2.52 21.8h.01L10.07 12 2.52 2.2zM22 21.93L13.93 12 22 3.93zM21.48 21.8h-.01L13.93 12l7.55-9.8z" />,
  HuggingFace: <path d="M21.08 13.89c-.3-1.05-.7-2.06-1.18-3.02-.49-.97-.97-1.9-1.45-2.79-.47-.89-1.02-1.7-1.57-2.45-.55-.75-1.1-1.43-1.65-2.02C14.68 3 14.13 2.32 13.58 1.67c-.55-.65-1.1-1.23-1.65-1.72C11.38-.5 10.83-1 10.28-1.45c-.55-.45-1.1-.83-1.65-1.12C8.08-2.86 7.53-3.07 7-3.18c-.55-.11-1.1-.11-1.65-.11s-1.1.0-1.65.11c-.55.11-1.1.32-1.65.61-.55.29-1.1.67-1.65 1.12-.55.45-1.1.9-1.65 1.45-.55.55-1.1 1.13-1.65 1.72-.55.65-1.1 1.33-1.65 2.02-.55.75-1.02 1.56-1.57 2.45-.48.89-.96 1.82-1.45 2.79-.48.96-.88 1.97-1.18 3.02-.3 1.05-.5 2.14-.5 3.23s.2 2.18.5 3.23c.3 1.05.7 2.06 1.18 3.02.49.97.97 1.9 1.45 2.79.47.89 1.02 1.7 1.57 2.45.55.75 1.1 1.43 1.65 2.02.55.65 1.1 1.23 1.65 1.72.55.45 1.1.9 1.65 1.45.55.45 1.1.83 1.65 1.12.55.29 1.1.5 1.65.61.55.11 1.1.11 1.65.11s1.1 0 1.65-.11c.55-.11 1.1-.32 1.65-.61.55-.29 1.1-.67 1.65-1.12.55-.45 1.1-.9 1.65-1.45.55-.55 1.1-1.13 1.65-1.72.55-.65 1.1-1.33 1.65-2.02.55-.75 1.02-1.56 1.57-2.45.48.89.96 1.82 1.45 2.79.48.96.88 1.97 1.18 3.02.3 1.05.5 2.14.5 3.23s-.2 2.18-.5 3.23z" />,
  GitHub: <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.25-.01-.9-.01-1.77-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.9-1.32 2.74-1.05 2.74-1.05.56 1.42.2 2.47.1 2.73.65.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />,
  Git: <path d="M22.52 13.85c-.34.34-.79.53-1.26.53-1 0-1.79-.8-1.79-1.79v-1.1h-4.99v4.99h1.1c.47 0 .92.19 1.26.53.34.34.53.79.53 1.26s-.19.92-.53 1.26c-.34.34-.79.53-1.26.53h-4.99c-.47 0-.92-.19-1.26-.53-.34-.34-.53-.79-.53-1.26s.19-.92.53-1.26c.34-.34.79-.53 1.26-.53h1.1v-4.99h-4.99v1.1c0 .47-.19.92-.53 1.26-.34.34-.79.53-1.26.53s-.92-.19-1.26-.53c-.34-.34-.53-.79-.53-1.26v-4.99c0-.47.19-.92.53-1.26.34-.34.79-.53 1.26-.53s.92.19 1.26.53c.34.34.53.79.53 1.26v1.1h4.99v-4.99h-1.1c-.47 0-.92-.19-1.26-.53-.34-.34-.53-.79-.53-1.26s.19-.92.53-1.26c.34-.34.79-.53 1.26-.53h4.99c.47 0 .92.19 1.26.53.34.34.53.79.53 1.26s-.19.92-.53 1.26c-.34-.34-.79-.53-1.26-.53h-1.1v4.99h4.99v-1.1c0-.47.19-.92.53-1.26.34-.34.79-.53 1.26-.53s.92.19 1.26.53c.34.34.53.79.53 1.26v4.99c0 .47-.19.92-.53 1.26z" />,
  PostgreSQL: <path d="M12.07 19.3c.4 0 .7-.1.9-.4.2-.2.4-.5.4-.9v-3.8h.9c.4 0 .7-.1.9-.4.2-.2.4-.5.4-.9v-1c0-.4-.1-.7-.4-.9-.2-.2-.5-.4-.9-.4h-.9v-1.8h.9c.4 0 .7-.1.9-.4.2-.2.4-.5.4-.9v-1c0-.4-.1-.7-.4-.9-.2-.2-.5-.4-.9-.4h-.9V3.8c0-.4-.1-.7-.4-.9-.2-.2-.5-.4-.9-.4s-.7.1-.9.4c-.2.2-.4.5-.4.9v2.9h-1.8V3.8c0-.4-.1-.7-.4-.9-.2-.2-.5-.4-.9-.4s-.7.1-.9.4c-.2.2-.4.5-.4.9v2.9H5.1c-.4 0-.7.1-.9.4-.2.2-.4.5-.4.9v1c0 .4.1.7.4.9.2.2.5.4.9.4h.9v1.8H5.1c-.4 0-.7.1-.9.4-.2.2-.4.5-.4.9v1c0 .4.1.7.4.9.2.2.5.4.9.4h.9v3.8c0 .4.1.7.4.9.2.2.5.4.9.4s.7-.1.9-.4c.2-.2.4-.5.4-.9v-3.8h1.8v3.8c0 .4.1.7.4.9zm-3.7-9.6h3.7v-1.8H8.37v1.8z" />,
  AWS: <path d="M3.06 13.342c0 .72.58 1.3 1.3 1.3h1.25v-2.6H4.36c-.72 0-1.3.58-1.3 1.3zm3.8 1.3h2.4v-2.6H6.86v2.6zm3.65 0h2.4v-2.6h-2.4v2.6zm3.65 0h2.4v-2.6h-2.4v2.6zm3.65 0h1.25c.72 0 1.3-.58 1.3-1.3s-.58-1.3-1.3-1.3H17.81v2.6zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.06 12.642c0 .72-.58 1.3-1.3 1.3h-1.25v1.25c0 .72-.58 1.3-1.3 1.3h-2.4c-.72 0-1.3-.58-1.3-1.3v-1.25H9.94v1.25c0 .72-.58 1.3-1.3 1.3h-2.4c-.72 0-1.3-.58-1.3-1.3v-1.25H3.76c-.72 0-1.3-.58-1.3-1.3v-2.4c0-.72.58-1.3 1.3-1.3h1.25V9.7c0-.72.58-1.3 1.3-1.3h2.4c.72 0 1.3.58 1.3 1.3v1.24h2.5v-1.24c0-.72.58-1.3 1.3-1.3h2.4c.72 0 1.3.58 1.3 1.3v1.24h1.25c.72 0 1.3.58 1.3 1.3v2.4z" />,
  Vercel: <path d="M12 2.16L24 22H0L12 2.16z" />,
  Supabase: <path d="M12 2.163c-5.433 0-9.847 4.414-9.847 9.847s4.414 9.847 9.847 9.847 9.847-4.414 9.847-9.847S17.433 2.163 12 2.163zm0 17.694c-4.34 0-7.847-3.507-7.847-7.847s3.507-7.847 7.847-7.847 7.847 3.507 7.847 7.847-3.507 7.847-7.847 7.847zM12 6.863l-4.2 7.275h8.4L12 6.863z" />,
}

const SKILLS = [
  {
    group: 'Languages',
    items: [
      { name: 'Python', icon: ICONS.Python },
      { name: 'JavaScript', icon: ICONS.JavaScript },
      { name: 'SQL', icon: null },
    ],
  },
  {
    group: 'Frameworks',
    items: [
      { name: 'React.js', icon: ICONS.React },
      { name: 'FastAPI', icon: ICONS.FastAPI },
      { name: 'Streamlit', icon: null },
    ],
  },
  {
    group: 'AI / Machine Learning',
    items: [
      { name: 'TensorFlow', icon: ICONS.TensorFlow },
      { name: 'Scikit-Learn', icon: null },
      { name: 'Hugging Face', icon: ICONS.HuggingFace },
      { name: 'Keras', icon: null },
      { name: 'Pandas', icon: null },
      { name: 'NumPy', icon: null },
      { name: 'Matplotlib', icon: null },
      { name: 'Seaborn', icon: null },
    ],
  },
  {
    group: 'Database',
    items: [
      { name: 'PostgreSQL', icon: ICONS.PostgreSQL },
      { name: 'Supabase', icon: ICONS.Supabase },
    ],
  },
  {
    group: 'Tools & Platforms',
    items: [
      { name: 'Git', icon: ICONS.Git },
      { name: 'GitHub', icon: ICONS.GitHub },
      { name: 'Vercel', icon: ICONS.Vercel },
      { name: 'AWS', icon: ICONS.AWS },
      { name: 'LaTeX', icon: null },
    ],
  },
];

const STATS = [
  { value: '3', label: 'Full-stack ML projects shipped' },
  { value: '78,670', label: 'Resumes classified in Resume Analyzer' },
  { value: '2', label: 'Published research papers' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
}

export default function About() {
  return (
    <div className="container-custom py-24 md:py-32">
      <div className="mb-14">
        <span className="inline-block text-xs font-bold tracking-[3px] text-purple-400/70 uppercase mb-3">About</span>
        <h2 className="text-4xl md:text-5xl font-black gradient-text">Who I am</h2>
      </div>

      <div className="grid md:grid-cols-5 gap-12 md:gap-16">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3"
        >
          <p className="text-lg text-white/70 leading-relaxed">
            I'm a Data Science undergraduate at the Institute of Technology of Management, Gwalior,
            currently in my third year. I build machine learning applications end to end — from data
            pipeline to deployed interface — using Python, TensorFlow, Scikit-Learn, PostgreSQL, and
            React.js.
          </p>
          <p className="mt-5 text-lg text-white/70 leading-relaxed">
            My project work spans healthcare analytics and automated resume classification, and I've
            co-authored published research on AI-driven sustainability in pharmaceutical logistics and
            generative AI for carbon capture materials. Outside of ML, I perform with my university
            theater group — a different kind of stage, but the same instinct for taking something raw
            and shaping it into something that lands.
          </p>
          <p className="mt-5 text-lg text-white/70 leading-relaxed">
            Right now I'm most interested in machine learning engineering and intelligent data systems
            — the layer between a trained model and something people can actually use.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-4"
              >
                <p className="text-2xl font-black gradient-text">{s.value}</p>
                <p className="mt-1 text-xs text-white/40 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <div className="md:col-span-2 space-y-6">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.group}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5"
            >
              <p className="text-[11px] font-bold tracking-[2px] text-white/35 uppercase mb-4">{group.group}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map(item => (
                  <motion.div
                    key={item.name}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-medium text-white/70"
                    whileHover={{
                      scale: 1.05,
                      color: '#fff',
                      borderColor: 'rgba(139, 92, 246, 0.3)',
                      boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
                      transition: { duration: 0.2 },
                    }}
                  >
                    {item.icon && (
                      <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        {item.icon}
                      </svg>
                    )}
                    <span>{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
import React from 'react'
import Marquee from 'react-fast-marquee'

const SKILLS = [
  'Python', 'JavaScript', 'SQL', 'React.js', 'FastAPI', 'Streamlit',
  'TensorFlow', 'Scikit-Learn', 'Hugging Face', 'Keras', 'Pandas', 'NumPy',
  'Matplotlib', 'Seaborn', 'PostgreSQL', 'Supabase', 'Git', 'GitHub',
  'Vercel', 'AWS', 'LaTeX'
]

const SkillsMarquee = () => {
  return (
    <div className="py-12 md:py-20">
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="overflow-y-hidden"
      >
        {SKILLS.map(skill => (
          <div
            key={skill}
            className="mx-12 text-5xl md:text-7xl font-display font-bold text-transparent"
            style={{ WebkitTextStroke: '1px var(--steel-color, #738496)' }}
          >
            {skill}
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default SkillsMarquee

'use client'

import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <h1 className='font-bold text-xl'>Framer Motion</h1>
      <h2>Keyframes</h2>
      <motion.div
        className='w-10 h-10 bg-indigo-500 rounded-full'
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ['20%', '20%', '50%', '50%', '20%'],
        }}
      />
    </>
  )
}

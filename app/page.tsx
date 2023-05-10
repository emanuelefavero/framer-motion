'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const dragParentRef = useRef(null)

  return (
    <>
      <h1>Framer Motion</h1>

      {/* KEYFRAMES */}
      <h2>Keyframes</h2>
      <motion.div
        className='w-10 h-10 bg-indigo-500 rounded-full'
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ['20%', '20%', '50%', '50%', '20%'],
        }}
      />

      {/* VARIANTS */}
      <h2>Variants</h2>
      <motion.nav
        className='opacity-0 -translate-x-full'
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
      >
        <p>Item 1</p>
        <p>Item 2</p>
      </motion.nav>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>

      {/* GESTURE ANIMATIONS */}
      <h2>Gesture Animations</h2>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        Button
      </motion.button>

      {/* The same button effect can be accomplished with tailwind or css like this: */}
      <button className='hover:scale-110 active:scale-90 transition-transform duration-200'>
        Button
      </button>

      {/* DRAG */}
      <h2>Drag</h2>

      <div
        ref={dragParentRef}
        className='w-16 h-16 bg-indigo-200 flex items-center justify-center'
      >
        <motion.div
          className='w-10 h-10 bg-indigo-500 rounded-full cursor-grab'
          drag
          dragConstraints={dragParentRef}
          // TIP: You can also use dragConstraints values instead of a parent ref to limit the drag area
          // dragConstraints={{
          //   top: -50,
          //   left: -50,
          //   right: 50,
          //   bottom: 50,
          // }}

          // TIP: You can also use dragElastic to make the drag more elastic (0 is no elasticity)
          dragElastic={0.3}
          whileDrag={{ opacity: '50%' }}
        />
      </div>
    </>
  )
}

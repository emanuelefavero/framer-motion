'use client'

import { useState, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
} from 'framer-motion'

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
}

export default function Home() {
  // VARIANTS
  const [isOpen, setIsOpen] = useState(false)

  // DRAG
  const dragParentRef = useRef(null)

  // MOTION VALUES
  const x = useMotionValue(0)
  const background = useTransform(
    x, // background will change based on x value
    [-50, 0, 50], // x values
    ['#ff0051', '#bd9aff', 'rgb(0, 255, 94)']
  )

  // SCROLL LINKED ANIMATIONS
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  })

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

      {/* MOTION VALUES */}
      <h2>Motion Values</h2>
      <motion.div style={{ background }}>
        <motion.div
          className='w-10 h-10 bg-indigo-600 rounded-full cursor-grab'
          drag='x'
          dragConstraints={{ left: -0, right: 0 }}
          // dragConstraints={{ left: -50, right: 50 }}

          style={{ x }} // this div will affect the parent div's background color
        ></motion.div>
      </motion.div>

      {/* SCROLL TRIGGERED ANIMATIONS */}
      <div className='w-full h-screen bg-indigo-100'></div>
      <motion.div
        className='w-32 h-32 bg-indigo-600 rounded-full cursor-grab'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 2 } }}
        viewport={{
          once: true, // only animate once
        }}
      ></motion.div>
      <div className='w-full h-screen bg-indigo-100'></div>
      <motion.div
        className='w-32 h-32 bg-indigo-600 cursor-grab'
        initial={{
          opacity: 0,
          y: 100,
          rotate: -10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: {
            type: 'spring',
            bounce: 0.5,
            duration: 0.8,
          },
        }}
        viewport={{
          amount: 0.5, // 0.5 means half of the element is visible
        }}
      ></motion.div>
      <div className='w-full h-screen bg-indigo-100'></div>

      {/* SCROLL LINKED ANIMATIONS */}
      <h2>Scroll Linked Animations</h2>
      <p>See Top Progress Bar</p>
      <motion.div
        className='fixed top-0 left-0 right-0 h-2 bg-indigo-500 transform origin-left'
        style={{ scaleX }}
      />
    </>
  )
}

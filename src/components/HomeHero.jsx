import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } },
}

const floatingImage = {
  animate: {
    y: [0, -18, 0],
    rotate: [-1, 1, -1],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function HomeHero({ product }) {
  return (
    <main className="pt-20">
      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid min-h-[calc(100svh-5rem)] items-center gap-4 px-7 pb-8 md:grid-cols-2 md:px-20 lg:px-28"
      >
        <motion.div variants={item}>
          <Link
            to={`/product/${product.handle}`}
            className="flex justify-center overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_86%)] [mask-image:linear-gradient(to_bottom,black_20%,transparent_86%)]"
          >
            <motion.img
              src={product.image}
              alt={product.imageAlt}
              className="max-h-[76svh] w-full object-contain object-bottom"
              variants={floatingImage}
              animate="animate"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
            />
          </Link>
        </motion.div>

        <motion.div variants={item} className="flex flex-col items-center justify-center gap-4 text-center">
          <motion.h1
            className="text-9xl font-semibold leading-none sm:text-[12rem] lg:text-[14rem] xl:text-[17rem]"
            variants={item}
          >
            {product.title}
          </motion.h1>
          <Button
            asChild
            size="lg"
            className="h-auto rounded-full bg-black px-10 py-3 font-mango text-3xl font-semibold text-white hover:bg-black/80"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to={`/product/${product.handle}`}>Get to know</Link>
            </motion.div>
          </Button>
        </motion.div>
      </motion.section>
    </main>
  )
}

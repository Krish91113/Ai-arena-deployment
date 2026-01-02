import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className='relative w-[95%] mx-auto mb-6 rounded-2xl overflow-hidden border border-border'>
      {/* Top Section with Logo and Social Links */}
      <div className='relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-primary text-primary-foreground rounded-t-2xl'>
        {/* Logo and Description */}
        <div className='flex items-center gap-4'>
          {/* Compact Logo Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='relative flex-shrink-0'
          >
            <div className='w-12 h-12 sm:w-14 sm:h-14 bg-primary-foreground rounded-lg relative before:absolute before:w-full before:h-full before:bg-primary-foreground/50 before:rounded-lg before:-top-2 before:-left-2 flex items-center justify-center'>
              <Sparkles className='w-6 h-6 sm:w-7 sm:h-7 text-primary' />
            </div>
          </motion.div>

          {/* Compact Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='max-w-xs'
          >
            <h1 className='font-display text-lg sm:text-xl font-bold mb-0.5'>AI ARENA</h1>
            <p className='text-xs opacity-90 leading-snug hidden sm:block'>
              Mistral AI vs Gemini. Best answer wins.
            </p>
          </motion.div>
        </div>

        {/* Compact Social Links */}
        <div className='flex gap-2'>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1, y: -2 }}
            href='https://github.com/Krish91113/Ai-arena-deployment'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-card w-12 h-12 sm:w-14 sm:h-14 grid place-content-center rounded-xl group transition-all hover:bg-card/90'
            aria-label='GitHub'
          >
            <Github className='w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform' />
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.1, y: -2 }}
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-card w-12 h-12 sm:w-14 sm:h-14 grid place-content-center rounded-xl group transition-all hover:bg-card/90'
            aria-label='Twitter'
          >
            <Twitter className='w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform' />
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1, y: -2 }}
            href='https://www.linkedin.com/in/krish9113/'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-card w-12 h-12 sm:w-14 sm:h-14 grid place-content-center rounded-xl group transition-all hover:bg-card/90'
            aria-label='LinkedIn'
          >
            <Linkedin className='w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform' />
          </motion.a>
        </div>
      </div>

      {/* Bottom Section with Animated Text */}
      <div className='relative bg-section-alt rounded-b-2xl overflow-hidden'>
        {/* Compact Animated Text */}
        <div className='hidden lg:block py-6 overflow-hidden'>
          <motion.div
            initial={{ x: '-10%' }}
            animate={{ x: '10%' }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            className='whitespace-nowrap'
          >
            <h2 className='font-display text-[6rem] xl:text-[8rem] font-bold text-foreground/5 select-none leading-none'>
              AI ARENA
            </h2>
          </motion.div>
        </div>

        {/* Compact Bottom Info */}
        <div className='px-4 sm:px-6 pb-4 pt-2 lg:pt-0'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 border-t border-border pt-3'>
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className='text-xs text-muted-foreground text-center sm:text-left'
            >
              © {new Date().getFullYear()} AI Arena. Built By Krish
            </motion.p>

            {/* Compact Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className='flex items-center gap-4 text-xs'
            >
              <a
                href='mailto:hello@aiarena.com'
                className='text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5'
              >
                <Mail className='w-3 h-3' />
                <span className='hidden sm:inline'>Contact</span>
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                Privacy
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                Terms
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
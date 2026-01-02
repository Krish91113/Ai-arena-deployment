import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Layers, Scale, Sparkles, History, Check } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: 'Compare Local Agents Side by Side',
    description: 'Agent A (Mistral AI) and Agent B (Gemini) answer your questions in parallel. See both perspectives instantly with different AI models providing unique insights.',
    highlights: ['Parallel processing', 'Different AI models', 'Privacy-first'],
    gradient: 'from-primary/20 via-primary/10 to-accent/20',
  },
  {
    icon: Scale,
    title: 'Referee Model for Judgement',
    description: 'The Referee (Gemini) evaluates both answers, scores them on correctness, clarity, and usefulness, then picks the winner for the best possible response.',
    highlights: ['Objective scoring', 'Detailed critique', 'Smart selection'],
    gradient: 'from-accent/20 via-primary/15 to-primary/20',
  },
  {
    icon: Sparkles,
    title: 'Enhancer Agent for Polished Output',
    description: 'The winning answer gets refined and enhanced for maximum clarity and detail. Get the best possible response with AI-powered enhancement.',
    highlights: ['Answer refinement', 'Improved clarity', 'Enhanced detail'],
    gradient: 'from-primary/15 via-accent/20 to-primary/10',
  },
  {
    icon: History,
    title: 'History & Feedback Loop',
    description: 'Track all your past queries, see referee decisions, and provide feedback to improve future responses. Full analytics and insights included.',
    highlights: ['Full history', 'Human feedback', 'Analytics dashboard'],
    gradient: 'from-accent/15 via-primary/20 to-accent/15',
  },
];

interface CardProps {
  i: number;
  title: string;
  description: string;
  icon: any;
  highlights: string[];
  gradient: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const FeatureCard: React.FC<CardProps> = ({
  i,
  title,
  description,
  icon: Icon,
  highlights,
  gradient,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0 px-4 sm:px-6 lg:px-8'
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] min-h-[550px] sm:min-h-[600px] lg:min-h-[650px] w-full max-w-7xl rounded-3xl origin-top shadow-2xl overflow-hidden bg-gradient-to-br ${gradient}`}
      >
        {/* Glass overlay */}
        <div className='absolute inset-0 bg-card/80 backdrop-blur-xl' />

        {/* Border glow */}
        <div className='absolute inset-0 rounded-3xl border border-primary/20' />

        {/* Content */}
        <div className='relative z-10 p-6 sm:p-8 lg:p-12 xl:p-16 h-full flex flex-col'>
          {/* Card Header */}
          <div className='flex items-center gap-4 mb-6 sm:mb-8'>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className='flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30'
            >
              <Icon className='h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-primary' />
            </motion.div>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground font-display'>
              {title}
            </h2>
          </div>

          {/* Card Content */}
          <div className='flex flex-col lg:flex-row flex-1 gap-6 lg:gap-12'>
            {/* Left Column - Description & Highlights */}
            <div className='lg:w-[45%] flex flex-col justify-center space-y-6'>
              <motion.p
                style={{ scale: imageScale }}
                className='text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed'
              >
                {description}
              </motion.p>

              {/* Highlights */}
              <div className='space-y-3 sm:space-y-4'>
                {highlights.map((highlight, idx) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className='flex items-center gap-3'
                  >
                    <div className='flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30'>
                      <Check className='w-3 h-3 sm:w-4 sm:h-4 text-primary' />
                    </div>
                    <span className='text-foreground/90 font-medium text-sm sm:text-base lg:text-lg'>
                      {highlight}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Learn More Link */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className='flex items-center gap-2 pt-4'
              >
                <a
                  href='#'
                  className='text-primary font-semibold hover:text-primary/80 transition-colors text-sm sm:text-base'
                >
                  Learn more
                </a>
                <svg
                  width='22'
                  height='12'
                  viewBox='0 0 22 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='text-primary'
                >
                  <path
                    d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                    fill='currentColor'
                  />
                </svg>
              </motion.div>
            </div>

            {/* Right Column - Visual Element */}
            <div className='lg:w-[55%] flex items-center justify-center'>
              <motion.div
                style={{ scale: imageScale }}
                className='relative w-full h-64 sm:h-80 lg:h-full rounded-2xl bg-card/40 backdrop-blur-md border border-border overflow-hidden'
              >
                {/* Feature-specific mockups */}
                {i === 0 && (
                  /* Agent Comparison Mockup */
                  <div className='h-full p-4 sm:p-6 flex flex-col gap-3'>
                    {/* Header */}
                    <div className='flex items-center justify-between'>
                      <div className='flex gap-2'>
                        <div className='w-2 h-2 rounded-full bg-red-500/60' />
                        <div className='w-2 h-2 rounded-full bg-yellow-500/60' />
                        <div className='w-2 h-2 rounded-full bg-green-500/60' />
                      </div>
                      <div className='text-xs text-muted-foreground px-2 py-1 bg-background/40 rounded'>
                        AI Arena
                      </div>
                    </div>

                    {/* Two Agent Cards Side by Side */}
                    <div className='grid grid-cols-2 gap-3 flex-1'>
                      {['Mistral AI', 'Gemini'].map((agent, idx) => (
                        <motion.div
                          key={agent}
                          initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className='bg-card/60 rounded-xl p-3 border border-primary/20 flex flex-col'
                        >
                          <div className='flex items-center gap-2 mb-2'>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                              className='w-2 h-2 rounded-full bg-primary'
                            />
                            <span className='text-xs font-semibold text-foreground'>{agent}</span>
                          </div>
                          <div className='space-y-1.5 flex-1'>
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${100 - i * 15}%` }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className='h-1.5 bg-primary/30 rounded-full'
                              />
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Processing indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className='flex items-center justify-center gap-2 py-2 bg-primary/10 rounded-lg'
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className='w-3 h-3 border-2 border-primary border-t-transparent rounded-full'
                      />
                      <span className='text-xs text-primary'>Processing...</span>
                    </motion.div>
                  </div>
                )}

                {i === 1 && (
                  /* Referee Scoring Mockup */
                  <div className='h-full p-4 sm:p-6 flex flex-col gap-3'>
                    <div className='text-xs font-semibold text-primary mb-2'>Referee Analysis</div>

                    {/* Score bars */}
                    {['Correctness', 'Clarity', 'Usefulness'].map((metric, idx) => (
                      <motion.div
                        key={metric}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className='space-y-1'
                      >
                        <div className='flex justify-between text-xs'>
                          <span className='text-muted-foreground'>{metric}</span>
                          <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className='text-primary font-semibold'
                          >
                            {95 - idx * 5}%
                          </motion.span>
                        </div>
                        <div className='h-2 bg-background/40 rounded-full overflow-hidden'>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${95 - idx * 5}%` }}
                            transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
                            className='h-full bg-gradient-to-r from-primary to-accent rounded-full'
                          />
                        </div>
                      </motion.div>
                    ))}

                    {/* Winner badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      className='mt-auto p-3 bg-primary/20 border border-primary/30 rounded-xl text-center'
                    >
                      <div className='text-xs text-muted-foreground mb-1'>Winner</div>
                      <div className='text-sm font-bold text-primary'>Agent A</div>
                    </motion.div>
                  </div>
                )}

                {i === 2 && (
                  /* Enhancement Process Mockup */
                  <div className='h-full p-4 sm:p-6 flex flex-col gap-3'>
                    <div className='text-xs font-semibold text-primary mb-2'>Enhancement Process</div>

                    {/* Before/After comparison */}
                    <div className='space-y-3 flex-1'>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className='p-3 bg-background/40 rounded-lg border border-border'
                      >
                        <div className='text-xs text-muted-foreground mb-1'>Original</div>
                        <div className='space-y-1'>
                          {[80, 60].map((width, idx) => (
                            <div key={idx} className={`h-1.5 bg-muted/30 rounded-full`} style={{ width: `${width}%` }} />
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className='flex justify-center'
                      >
                        <div className='text-primary text-xl'>↓</div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className='p-3 bg-primary/10 rounded-lg border border-primary/30'
                      >
                        <div className='text-xs text-primary mb-1 font-semibold'>Enhanced</div>
                        <div className='space-y-1'>
                          {[100, 95, 85].map((width, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${width}%` }}
                              transition={{ delay: 0.4 + idx * 0.1 }}
                              className='h-1.5 bg-primary/40 rounded-full'
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhancement badge */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className='flex items-center justify-center gap-2 py-2 bg-primary/10 rounded-lg'
                    >
                      <Sparkles className='w-3 h-3 text-primary' />
                      <span className='text-xs text-primary font-semibold'>+40% Clarity</span>
                    </motion.div>
                  </div>
                )}

                {i === 3 && (
                  /* History Dashboard Mockup */
                  <div className='h-full p-4 sm:p-6 flex flex-col gap-3'>
                    <div className='text-xs font-semibold text-primary mb-2'>Query History</div>

                    {/* History items */}
                    <div className='space-y-2 flex-1'>
                      {[...Array(4)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className='p-2 bg-card/60 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer'
                        >
                          <div className='flex items-center gap-2 mb-1'>
                            <History className='w-3 h-3 text-primary' />
                            <div className='h-1.5 bg-primary/30 rounded-full flex-1' style={{ width: `${80 - idx * 10}%` }} />
                          </div>
                          <div className='flex gap-1'>
                            {[...Array(2)].map((_, i) => (
                              <div key={i} className='h-1 bg-muted/20 rounded-full flex-1' />
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className='grid grid-cols-3 gap-2'
                    >
                      {['24', '18', '96%'].map((stat, idx) => (
                        <div key={idx} className='text-center p-2 bg-primary/10 rounded-lg'>
                          <div className='text-sm font-bold text-primary'>{stat}</div>
                          <div className='text-xs text-muted-foreground'>
                            {idx === 0 ? 'Queries' : idx === 1 ? 'Wins' : 'Accuracy'}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                )}

                {/* Glow Effect */}
                <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none' />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent' />
      </motion.div>
    </div>
  );
};

export function Features() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section id='features' ref={container} className='relative bg-section-alt'>
      {/* Hero Section */}
      <div className='relative min-h-[70vh] w-full bg-section-alt flex items-center justify-center overflow-hidden py-20 sm:py-24 lg:py-32'>
        {/* Background Grid */}
        <div className='absolute inset-0 bg-grid opacity-30' />

        {/* Gradient Orbs */}
        <div className='absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 right-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl' />

        {/* Header Content */}
        <div className='relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-6'
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className='w-4 h-4' />
            </motion.div>
            How It Works
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight'
          >
            One Question. Four Agents.{' '}
            <span className='text-primary'>Optimal Answer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className='text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'
          >
            Scroll down to explore how our AI Arena delivers the best answers 👇
          </motion.p>
        </div>
      </div>

      {/* Stacking Cards Section */}
      <div className='relative bg-section-alt pb-20'>
        {features.map((feature, i) => {
          const targetScale = 1 - (features.length - i) * 0.05;
          return (
            <FeatureCard
              key={`feature_${i}`}
              i={i}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              highlights={feature.highlights}
              gradient={feature.gradient}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
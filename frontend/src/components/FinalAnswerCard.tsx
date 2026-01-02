import { EnhancedAnswer } from '@/types/api';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FinalAnswerCardProps {
  enhancedAnswer: EnhancedAnswer;
  animationDelay?: string;
}

export function FinalAnswerCard({ enhancedAnswer, animationDelay = '0ms' }: FinalAnswerCardProps) {
  return (
    <motion.div
      className="animate-fade-in-up rounded-xl border-2 border-foreground/70 bg-foreground p-6 text-background opacity-0 shadow-lg card-spotlight"
      style={{ animationDelay }}
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-background/20 ring-1 ring-background/40">
          <Sparkles className="h-4 w-4 text-background" />
        </div>
        <h3 className="font-mono text-lg font-semibold tracking-tight">Final Enhanced Answer</h3>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="text-lg leading-relaxed mb-4 text-background">{children}</p>,
            h1: ({ children }) => <h1 className="text-xl font-bold mb-3 mt-4 text-background">{children}</h1>,
            h2: ({ children }) => <h2 className="text-lg font-bold mb-2 mt-3 text-background">{children}</h2>,
            h3: ({ children }) => <h3 className="text-base font-bold mb-2 mt-2 text-background">{children}</h3>,
            ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-background">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-background">{children}</ol>,
            li: ({ children }) => <li className="text-base leading-relaxed text-background">{children}</li>,
            code: ({ inline, children, ...props }: any) =>
              inline ? (
                <code className="bg-background/20 px-1.5 py-0.5 rounded text-sm font-mono text-background" {...props}>
                  {children}
                </code>
              ) : (
                <code className="block bg-background/20 p-3 rounded text-sm font-mono overflow-x-auto mb-4 text-background" {...props}>
                  {children}
                </code>
              ),
            strong: ({ children }) => <strong className="font-bold text-background">{children}</strong>,
            em: ({ children }) => <em className="italic text-background">{children}</em>,
          }}
        >
          {enhancedAnswer.answer}
        </ReactMarkdown>
      </div>

      <p className="font-mono text-xs text-background/60">
        Polished by Enhancer Agent ({enhancedAnswer.model})
      </p>
    </motion.div>
  );
}

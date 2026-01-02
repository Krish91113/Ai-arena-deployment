import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getHistory } from '@/lib/api';
import { HistoryItem } from '@/types/api';
import { HistoryItemCard } from '@/components/HistoryItem';
import { ErrorBanner } from '@/components/ErrorBanner';
import { Loader2, History, Inbox, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function HistorySection() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const fetchHistory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getHistory(user?.uid);
      setHistory(data);
    } catch (err) {
      setError('Unable to load history. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user?.uid]);

  const isAuthenticated = !!user;
  const hasHistory = history.length > 0;

  return (
    <section id="history" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {isAuthenticated ? 'Your History & ' : 'Example '}
            <span className="text-gradient">Judgements</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isAuthenticated
              ? 'Track all your past queries, see referee decisions, and review the debate outcomes.'
              : 'See how our multi-agent system works with these example debates. Sign in to save your own history.'
            }
          </p>
          {!isAuthenticated && hasHistory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              <Sparkles className="h-4 w-4" />
              Example debates - Sign in to create your own
            </motion.div>
          )}
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="text-center py-12 animate-fade-in">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card">
                <Inbox className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground max-w-md mx-auto">
                {error}
              </p>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}

          {!isLoading && !error && !hasHistory && isAuthenticated && (
            <div className="text-center py-12 animate-fade-in">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card">
                <History className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                No history yet. Start by asking a question in the Playground.
              </p>
            </div>
          )}

          {!isLoading && !error && hasHistory && (
            <div className="space-y-3">
              {history.map((item, index) => (
                <motion.div
                  key={item.turn_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <HistoryItemCard item={item} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
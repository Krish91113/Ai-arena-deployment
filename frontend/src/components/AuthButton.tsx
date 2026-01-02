import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function AuthButton() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (!user) {
        return (
            <button
                onClick={() => navigate('/signin')}
                className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-lg"
            >
                Sign In
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 transition-all hover:border-primary/50"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                    {user.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt={user.displayName || 'User'}
                            className="h-8 w-8 rounded-full"
                        />
                    ) : (
                        <UserIcon className="h-4 w-4 text-primary" />
                    )}
                </div>
                <span className="hidden text-sm font-medium md:block">
                    {user.displayName || user.email?.split('@')[0]}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg"
                        >
                            <div className="p-3 border-b border-border">
                                <p className="text-sm font-medium">{user.displayName || 'User'}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

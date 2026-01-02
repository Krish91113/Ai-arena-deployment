import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Chrome, ArrowLeft } from 'lucide-react';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signInWithGoogle, signInWithEmail } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            setError('');
            setLoading(true);
            await signInWithGoogle();
            navigate('/playground');
        } catch (error: any) {
            setError(error.message || 'Failed to sign in with Google');
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signInWithEmail(email, password);
            navigate('/playground');
        } catch (error: any) {
            setError(error.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-hero-pattern">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>

                <div className="glass-card rounded-2xl p-8 shadow-2xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to access AI Arena</p>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 rounded-lg border-2 border-border bg-card px-4 py-3 font-medium transition-all hover:border-primary/50 hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                    >
                        <Chrome className="h-5 w-5" />
                        Continue with Google
                    </button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleEmailSignIn} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

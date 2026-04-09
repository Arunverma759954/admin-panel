import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (email === 'arunverma7599@gmail.com' && password === 'admin123') {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify({
                    name: 'Arun Verma',
                    email: email,
                    role: 'School Administrator',
                    avatar: 'https://i.pinimg.com/564x/7f/6c/64/7f6c64f2d6c4f7f1f8c6f5c2cda6a0c4.jpg'
                }));
                navigate('/admin');
            } else {
                setError('Invalid email or password');
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-sans relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-indigo-200/20 blur-3xl dark:bg-sky-900/20"></div>
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-sky-200/20 blur-3xl dark:bg-sky-900/20"></div>
            </div>

            <div className="max-w-md w-full mx-4 z-10">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 md:p-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-sky-600 shadow-lg shadow-sky-200 mb-6 dark:shadow-none">
                            <GraduationCap className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                            St. Joseph's Convent School
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">Administration Portal login</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm text-center font-medium dark:bg-red-900/20 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 outline-none transition-all focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-50 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:ring-sky-900/20 dark:focus:border-sky-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 outline-none transition-all focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-50 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:ring-sky-900/20 dark:focus:border-sky-500"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-slate-300 text-sky-600 focus:ring-sky-600 w-4 h-4 cursor-pointer" />
                                <span className="text-slate-600 dark:text-slate-400">Remember me</span>
                            </label>
                            <a href="#" className="font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-sky-600 py-3.5 text-white font-bold shadow-lg shadow-sky-200 hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-300 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 dark:shadow-none"
                        >
                            {loading ? (
                                <span className="animate-pulse">Signing in...</span>
                            ) : (
                                <>
                                    Sign In <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-xs text-slate-400">
                        <p>
                            Authorized Technical Support: <a href="https://digitalsolution360.com" className="font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400">Digitalsolution360</a>
                        </p>
                    </div>
                </div>

                <p className="text-center mt-8 text-xs text-slate-400 dark:text-slate-600">
                    &copy; 2025 Amadeus Voyage Management System
                </p>
            </div>
        </div>
    );
};

export default Login;

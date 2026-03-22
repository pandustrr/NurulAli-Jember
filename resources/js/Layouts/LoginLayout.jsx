import { Link } from '@inertiajs/react';

export default function LoginLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans">
            {/* Background with Image and Emerald Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{
                    backgroundImage: `url('https://media.base44.com/images/public/69b91c829d049ca7a587c0d1/22fdad0af_generated_a4a0dfda.png')`,
                }}
            >
                <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-sm"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-md px-6 animate-fade-in">
                <div className="w-full bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
                    {/* Integrated Header */}
                    <div className="bg-emerald-900/5 p-10 pb-6 border-b border-slate-50 text-center">
                        <Link href="/" className="inline-flex flex-col items-center gap-4 group">
                            <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-emerald-200 group-hover:scale-105 transition-transform duration-500">
                                ن
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter leading-none">Nurul Ali</h1>
                                <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Sistem Informasi Admin</p>
                            </div>
                        </Link>
                    </div>

                    {/* Form Content */}
                    <div className="px-10 py-10">
                        {children}
                    </div>
                </div>

                <p className="mt-8 text-center text-white/40 text-[10px] font-black uppercase tracking-widest leading-none">
                    &copy; 2026 PP. Nurul Ali - Manajemen Sistem
                </p>
            </div>
        </div>
    );
}

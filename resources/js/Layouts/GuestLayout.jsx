import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
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
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex flex-col items-center gap-4 group">
                        <div className="bg-emerald-600 w-20 h-20 rounded-[2rem] flex items-center justify-center text-white font-bold text-4xl shadow-2xl shadow-emerald-900/40 group-hover:scale-110 transition-transform duration-500">
                            ن
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Nurul Ali</h1>
                            <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mt-1">Sistem Informasi</p>
                        </div>
                    </Link>
                </div>

                <div className="w-full bg-white/95 backdrop-blur-xl px-10 py-12 shadow-2xl rounded-[3.5rem] border border-white/20">
                    {children}
                </div>

                <p className="mt-8 text-center text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    &copy; 2026 Pondok Pesantren Nurul Ali
                </p>
            </div>
        </div>
    );
}

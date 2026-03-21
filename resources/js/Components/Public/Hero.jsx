import React from 'react';

export default function Hero() {
    return (
        <section id="beranda" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                style={{
                    backgroundImage: `url('https://media.base44.com/images/public/69b91c829d049ca7a587c0d1/22fdad0af_generated_a4a0dfda.png')`,
                }}
            >
                <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-[1px]"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <div className="mb-6 animate-fade-in-up">
                    <span className="text-amber-400 font-arabic text-3xl mb-4 block drop-shadow-lg">
                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                    </span>
                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                        Pondok Pesantren <br />
                        <span className="text-amber-400">Nurul Ali</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 mt-6 max-w-2xl mx-auto drop-shadow-md">
                        Membentuk Generasi Qurani, Berakhlak Mulia, dan Berwawasan Global
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 group">
                        Daftar Sekarang
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                    <button className="border-2 border-white/40 hover:border-white/80 text-white px-8 py-3.5 rounded-full font-bold transition-all backdrop-blur-sm hover:bg-white/10">
                        Lihat Profil
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}

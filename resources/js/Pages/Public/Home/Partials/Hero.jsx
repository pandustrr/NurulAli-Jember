import React from 'react';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Hero({ settings = {} }) {
    return (
        <section id="beranda" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay and Pattern */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{
                    backgroundImage: `url('https://media.base44.com/images/public/69b91c829d049ca7a587c0d1/22fdad0af_generated_a4a0dfda.png')`,
                }}
            >
                {/* Subtle Diamond Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>
                <div className="absolute inset-0 bg-emerald-950/65 backdrop-blur-[0.5px]"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <div className="mb-10 animate-fade-in-up">
                    <span className="text-amber-400/90 font-arabic text-xl md:text-2xl mb-6 block drop-shadow-sm tracking-widest opacity-80">
                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                    </span>

                    <div className="space-y-0 md:space-y-1">
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight drop-shadow-2xl tracking-tight">
                            Pondok Pesantren
                        </h1>
                        <span className="text-amber-400 text-6xl md:text-9xl font-black block drop-shadow-2xl tracking-tight">
                            {settings.site_name_short || 'Nurul Ali'}
                        </span>
                    </div>

                    <p className="text-base md:text-xl text-white/90 mt-10 max-w-4xl mx-auto drop-shadow-md font-medium tracking-wide">
                        {settings.site_tagline || 'Membentuk Generasi Qurani, Berakhlak Mulia, dan Berwawasan Global'}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
                    <a href="/pendaftaran" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-2xl shadow-emerald-900/40 flex items-center gap-3 group active:scale-95">
                        Daftar Sekarang
                        <div className="bg-white/20 rounded-lg p-1 group-hover:bg-white/30 transition-colors">
                            <ArrowRightIcon className="w-4 h-4" strokeWidth={3} />
                        </div>
                    </a>
                    <a href="/about" className="border-2 border-white/30 hover:border-white/90 text-white px-10 py-4 rounded-xl font-bold transition-all backdrop-blur-md hover:bg-white/10 active:scale-95">
                        Lihat Profil
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                <ChevronDownIcon className="w-8 h-8 text-white animate-bounce" strokeWidth={1.5} />
            </div>
        </section>
    );
}

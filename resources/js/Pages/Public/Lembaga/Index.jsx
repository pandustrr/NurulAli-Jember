import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import Programs from './Partials/Programs';

export default function Lembaga({ settings, lembagas }) {
    return (
        <PublicLayout title="Lembaga Pendidikan - Pondok Pesantren Nurul Ali">
            <main className="pt-0 pb-16 font-medium">
                {/* Header Hero - Matches Site Branding */}
                <div className="bg-emerald-950 h-[578px] flex items-center justify-center px-4 relative overflow-hidden text-center">
                    <div className="absolute inset-0">
                        <img 
                            src={settings.hero_lembaga || '/hero_lembaga.png'} 
                            className="w-full h-full object-cover opacity-40 transition-transform duration-1000 scale-105" 
                            alt="Hero Background"
                        />
                        <div className="absolute inset-0 bg-emerald-950/65 backdrop-blur-[0.5px]"></div>
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald-950/20 to-emerald-950"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <span className="inline-block px-5 py-2 bg-emerald-600/30 backdrop-blur-md rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-500/20">
                            Educational Units
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                            Lembaga <span className="text-emerald-500 underline decoration-8 decoration-emerald-500/20 underline-offset-8">Pendidikan</span>
                        </h1>
                        <p className="text-lg md:text-xl text-emerald-100/60 max-w-2xl mx-auto leading-relaxed font-bold">
                            Menyediakan berbagai jenjang pendidikan formal dan non-formal untuk mencetak generasi yang berdaya saing dan berakhlakul karimah.
                        </p>
                    </div>
                </div>

                <div className="-mt-16 relative z-30">
                    <Programs lembagas={lembagas} />
                </div>
            </main>
        </PublicLayout>
    );
}

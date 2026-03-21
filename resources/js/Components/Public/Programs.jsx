import React from 'react';

export default function Programs({ lembagas = [] }) {
    return (
        <section id="lembaga" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-emerald-700 font-bold tracking-widest text-sm uppercase block mb-4">Unit Pendidikan</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 font-display">Lembaga Pendidikan Kami</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-lg">
                        Ponpes Nurul Ali menaungi berbagai unit lembaga pendidikan formal dan non-formal yang terintegrasi untuk mencetak generasi unggul.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {lembagas.map((program, index) => (
                        <div key={index} className="group relative bg-slate-50 p-10 rounded-[3rem] border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-3">
                            <div className="absolute top-0 right-0 p-8 text-emerald-100 group-hover:text-emerald-500/20 transition-colors duration-500 pointer-events-none">
                                <span className="text-6xl font-bold opacity-10 italic">0{index + 1}</span>
                            </div>

                            <div className={`${program.color} w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 text-2xl`}>
                                {program.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">{program.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm lg:text-base mb-8">
                                {program.description}
                            </p>

                            <div className="pt-6 border-t border-slate-200/60 flex justify-between items-center">
                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Terakreditasi A</span>
                                <button className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-emerald-50 p-8 md:p-12 rounded-[3.5rem] border border-emerald-100 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-emerald-900 mb-4">Butuh Konsultasi Program Pendidikan?</h3>
                        <p className="text-emerald-700/80 mb-8 max-w-xl mx-auto italic">"Pilihlah pendidikan terbaik untuk masa depan buah hati Anda bersama bimbingan asatidz kami."</p>
                        <a href="/kontak" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                            Hubungi Admin Pendidikan
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

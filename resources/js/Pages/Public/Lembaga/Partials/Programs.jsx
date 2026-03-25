import React, { useState } from 'react';

export default function Programs({ lembagas = [] }) {
    const [selectedLembaga, setSelectedLembaga] = useState(null);

    // Predefined professional styles for automatic assignment
    const baseStyles = [
        { color: 'bg-emerald-50 text-emerald-600', icon: '📖' },
        { color: 'bg-orange-50 text-orange-600', icon: '🎓' },
        { color: 'bg-blue-50 text-blue-600', icon: '🏫' },
        { color: 'bg-purple-50 text-purple-600', icon: '🌐' },
        { color: 'bg-rose-50 text-rose-600', icon: '🌙' },
        { color: 'bg-amber-50 text-amber-600', icon: '👥' },
    ];

    const getStyle = (index) => baseStyles[index % baseStyles.length];

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
                    {lembagas.map((program, index) => {
                        const style = getStyle(index);
                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedLembaga(program)}
                                className="group relative bg-white p-10 rounded-2xl border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-3 cursor-pointer"
                            >
                                <div className="absolute top-0 right-0 p-8 text-slate-100 group-hover:text-emerald-500/20 transition-colors duration-500 pointer-events-none">
                                    <span className="text-6xl font-bold opacity-10">0{index + 1}</span>
                                </div>

                                <div className={`${style.color} w-16 h-16 rounded-xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 text-2xl`}>
                                    {program.icon || style.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{program.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm lg:text-base mb-8 line-clamp-3">
                                    {program.description}
                                </p>

                                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">Pelajari Detail</span>
                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Detailed Popup Modal */}
                {selectedLembaga && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
                        <div
                            className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in slide-in-from-bottom-10 duration-500 relative max-h-[90vh] flex flex-col md:flex-row"
                        >
                            {/* Close Button Moble */}
                            <button
                                onClick={() => setSelectedLembaga(null)}
                                className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white md:text-slate-400 md:hover:text-slate-600 p-2 rounded-full transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Image Section */}
                            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                                {selectedLembaga.image ? (
                                    <img src={selectedLembaga.image} alt={selectedLembaga.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-emerald-700 flex items-center justify-center">
                                        <span className="text-8xl opacity-20 text-white">🏢</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent md:hidden"></div>
                                <div className="absolute bottom-6 left-8 md:hidden">
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">{selectedLembaga.title}</h2>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                                <div className="hidden md:block mb-8">
                                    <span className="text-emerald-700 font-bold tracking-widest text-xs uppercase mb-2 block">Detail Program</span>
                                    <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">{selectedLembaga.title}</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Ringkasan</h4>
                                        <p className="text-slate-600 leading-relaxed font-medium">
                                            {selectedLembaga.description}
                                        </p>
                                    </div>

                                    {selectedLembaga.detailed_description && (
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Penjelasan Detail</h4>
                                            <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                                {selectedLembaga.detailed_description}
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-8 flex flex-col gap-4">
                                        <a href="/kontak" className="w-full py-4 bg-emerald-600 text-white text-center font-black rounded-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 uppercase tracking-widest text-sm">
                                            Tanya Admin
                                        </a>
                                        <button
                                            onClick={() => setSelectedLembaga(null)}
                                            className="w-full py-4 border-2 border-slate-100 text-slate-400 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm uppercase tracking-widest"
                                        >
                                            Tutup
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

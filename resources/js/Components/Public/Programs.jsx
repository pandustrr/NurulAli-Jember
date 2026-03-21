import React from 'react';

export default function Programs() {
    const programs = [
        {
            title: 'Tahfidz Al-Qur\'an',
            desc: 'Program unggulan hafalan Al-Qur\'an 30 juz dengan metode mutqin dan bimbingan intensif dari pengajar bersertifikat.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            color: 'bg-emerald-50 text-emerald-600'
        },
        {
            title: 'Madrasah Tsanawiyah (MTs)',
            desc: 'Setara SMP dengan kurikulum nasional terintegrasi pendidikan keislaman. Akreditasi A dari Kemenag.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            ),
            color: 'bg-orange-50 text-orange-600'
        },
        {
            title: 'Madrasah Aliyah (MA)',
            desc: 'Setara SMA dengan tiga jurusan: IPA, IPS, dan Keagamaan. Lulusan siap kuliah dalam & luar negeri.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            color: 'bg-blue-50 text-blue-600'
        },
        {
            title: 'Ma\'had Bahasa',
            desc: 'Program intensif Bahasa Arab dan Inggris untuk mempersiapkan santri bersaing di tingkat global.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5l-1.043 2.5M7 13l-3 1.5M10.751 5Q10.751 8 9 10" />
                </svg>
            ),
            color: 'bg-purple-50 text-purple-600'
        },
        {
            title: 'Kegiatan Keagamaan',
            desc: 'Sholat berjamaah, kajian kitab kuning, muhadharah, hadroh, dan berbagai kegiatan spiritual.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ),
            color: 'bg-rose-50 text-rose-600'
        },
        {
            title: 'Organisasi Santri (OSIS)',
            desc: 'Wadah pengembangan kepemimpinan, bakat, dan kreativitas santri melalui berbagai kegiatan organisasi.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: 'bg-indigo-50 text-indigo-600'
        }
    ];

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
                    {programs.map((program, index) => (
                        <div key={index} className="group relative bg-slate-50 p-10 rounded-[3rem] border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-3">
                            <div className="absolute top-0 right-0 p-8 text-emerald-100 group-hover:text-emerald-500/20 transition-colors duration-500 pointer-events-none">
                                <span className="text-6xl font-bold opacity-10 italic">0{index + 1}</span>
                            </div>

                            <div className={`${program.color} w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                {program.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">{program.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm lg:text-base mb-8">
                                {program.desc}
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
                    <div className="absolute top-0 right-0 text-emerald-200/20 translate-x-1/4 -translate-y-1/4 rotate-12">
                        <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

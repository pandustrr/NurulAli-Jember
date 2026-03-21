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
        <section id="lembaga" className="py-24 bg-slate-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-emerald-700 font-bold tracking-widest text-sm uppercase block mb-4">Lembaga</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Unit Lembaga Pendidikan</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Ponpes Nurul Ali menaungi berbagai unit lembaga pendidikan formal dan non-formal yang terintegrasi dalam satu lingkungan Islami.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100/60 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group duration-500">
                            <div className={`${program.color} w-16 h-16 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                {program.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">{program.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                                {program.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

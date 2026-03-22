import React from 'react';

export default function About() {
    const stats = [
        { label: 'Santri Aktif', value: '1.200+' },
        { label: 'Tenaga Pengajar', value: '85+' },
        { label: 'Alumni', value: '5.000+' },
    ];

    return (
        <section id="about" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Image with Badge */}
                    <div className="lg:w-1/2 relative">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://media.base44.com/images/public/69b91c829d049ca7a587c0d1/421d3603c_generated_07d4ed39.png"
                                alt="Santri Ngaji"
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                        {/* 25+ badge */}
                        <div className="absolute -bottom-6 -right-6 md:right-10 bg-emerald-800 text-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center min-w-[160px]">
                            <span className="text-4xl font-bold mb-1">25+</span>
                            <span className="text-sm font-medium opacity-90">Tahun Berdiri</span>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="lg:w-1/2">
                        <div className="mb-8">
                            <span className="text-emerald-700 font-bold tracking-widest text-sm uppercase block mb-4">About Kami</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                                Mengenal Lebih Dekat <span className="text-emerald-700">Ponpes Nurul Ali</span>
                            </h2>
                            <div className="space-y-6 text-slate-600 leading-relaxed">
                                <p>
                                    Pondok Pesantren Nurul Ali adalah lembaga pendidikan Islam terpadu yang berdiri dengan tekad kuat untuk mencetak generasi Qur'ani yang unggul dalam ilmu, mulia dalam akhlak, dan siap bersaing di era global.
                                </p>
                                <p>
                                    Berlandaskan nilai-nilai Ahlussunnah wal Jama'ah, kami mengintegrasikan pendidikan agama yang mendalam dengan kurikulum formal nasional, serta program pengembangan diri yang menyeluruh.
                                </p>
                                <p>
                                    Dengan lingkungan asrama yang kondusif dan Islami, santri kami tumbuh menjadi pribadi yang mandiri, berintegritas, dan bermanfaat bagi agama, bangsa, dan masyarakat.
                                </p>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <h4 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-1">{stat.value}</h4>
                                    <p className="text-xs md:text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

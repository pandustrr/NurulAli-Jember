import React from 'react';

export default function PPDB() {
    return (
        <section id="info-ppdb" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-emerald-700 font-bold tracking-widest text-sm uppercase block mb-4">Info PPDB</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Penerimaan Peserta Didik Baru</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Tahun Pelajaran 2026/2027 — Informasi lengkap jadwal, persyaratan, dan biaya pendidikan.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {/* Column 1: Jadwal */}
                    <div className="bg-slate-50/50 rounded-[2.5rem] p-10 border border-slate-100">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24 font-bold">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Jadwal PPDB</h3>
                        </div>

                        <div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                            {[
                                { label: 'Gelombang I', date: '1 Januari - 28 Februari 2026' },
                                { label: 'Gelombang II', date: '1 Maret - 30 April 2026', active: true },
                                { label: 'Gelombang III', date: '1 Mei - 30 Juni 2026' },
                                { label: 'Pengumuman', date: '15 Juli 2026' },
                                { label: 'Daftar Ulang', date: '16 - 31 Juli 2026' },
                                { label: 'Masa Orientasi', date: '1 Agustus 2026' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 relative z-10">
                                    <div className={`w-4 h-4 rounded-full mt-1 border-4 border-white shadow-sm ${item.active ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : 'bg-amber-400'}`}></div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h4 className="font-bold text-slate-900">{item.label}</h4>
                                            {item.active && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Aktif</span>}
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Persyaratan */}
                    <div className="bg-slate-50/50 rounded-[2.5rem] p-10 border border-slate-100">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="bg-amber-50 text-amber-600 p-3 rounded-2xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Persyaratan</h3>
                        </div>

                        <ul className="space-y-5">
                            {[
                                'Fotokopi Akta Kelahiran (2 lembar)',
                                'Fotokopi Kartu Keluarga (2 lembar)',
                                'Fotokopi Ijazah/SKHUN terlegalisir (2 lembar)',
                                'Pas foto 3x4 berlatar merah (4 lembar)',
                                'Surat Rekomendasi dari sekolah asal',
                                'Surat pernyataan kesanggupan orang tua',
                                'Mengisi formulir pendaftaran online',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 flex-shrink-0 bg-emerald-100 text-emerald-700 rounded-full p-0.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-slate-600 text-sm md:text-base leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Biaya */}
                    <div className="bg-slate-50/50 rounded-[2.5rem] p-10 border border-slate-100 flex flex-col">
                        <div className="flex items-center gap-4 mb-10 flex-shrink-0">
                            <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Informasi Biaya</h3>
                        </div>

                        <div className="space-y-6 flex-grow">
                            {[
                                { label: 'Uang Pangkal', price: 'Rp 3.500.000' },
                                { label: 'SPP Bulanan', price: 'Rp 850.000 / bulan' },
                                { label: 'Biaya Asrama', price: 'Rp 500.000 / bulan' },
                                { label: 'Biaya Seragam', price: 'Rp 750.000' },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-200 text-sm md:text-base">
                                    <span className="text-slate-500 font-medium">{item.label}</span>
                                    <span className="text-emerald-800 font-bold">{item.price}</span>
                                </div>
                            ))}

                            <div className="mt-8 bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
                                <div className="text-amber-600 flex-shrink-0 mt-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                                    Tersedia beasiswa bagi santri berprestasi & kurang mampu. Hubungi admin untuk informasi lebih lanjut.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

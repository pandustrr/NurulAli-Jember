import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Public/Navbar';
import Footer from '@/Components/Public/Footer';

export default function Pendaftaran() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title="Pendaftaran - Pondok Pesantren Nurul Ali" />

            <Navbar />

            <main className="pt-24 pb-20 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-emerald-900 -z-10 skew-y-3 origin-top-right"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/80 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] shadow-2xl border border-white/20">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Pendaftaran Online</span>
                            <h2 className="text-4xl font-bold text-slate-900">Formulir Santri Baru</h2>
                            <p className="mt-3 text-slate-600">Lengkapi data di bawah ini dengan benar untuk proses seleksi administrasi.</p>
                        </div>

                        <form className="space-y-10">
                            {/* Section 1: Data Diri */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
                                    Data Pribadi Calon Santri
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Nama Lengkap</label>
                                        <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="Masukkan nama sesuai Ijazah" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">NIK (Sesuai KK)</label>
                                        <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="16 digit nomor induk kependudukan" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Tempat Lahir</label>
                                        <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="Kota kelahiran" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Tanggal Lahir</label>
                                        <input type="date" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Data Orang Tua */}
                            <div className="pt-8 border-t border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
                                    Data Orang Tua / Wali
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Nama Ayah/Ibu</label>
                                        <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="Nama wali pendaftar" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Nomor WhatsApp Aktif</label>
                                        <input type="tel" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="0812xxxx" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
                                <span className="text-2xl">⚠️</span>
                                <p className="text-sm text-amber-800 leading-relaxed">
                                    Pastikan semua data yang Anda masukkan sudah benar sebelum menekan tombol kirim. Data yang sudah dikirim akan diverifikasi oleh tim administrasi kami dalam 2x24 jam.
                                </p>
                            </div>

                            <button type="submit" className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-900/10 transition-all transform hover:-translate-y-1 active:scale-95">
                                Kirim Formulir Pendaftaran
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

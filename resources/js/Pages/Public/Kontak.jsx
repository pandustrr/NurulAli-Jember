import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Public/Navbar';
import Footer from '@/Components/Public/Footer';

export default function Kontak() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title="Kontak - Pondok Pesantren Nurul Ali" />

            <Navbar />

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl underline decoration-emerald-500 decoration-4 underline-offset-8">
                            Hubungi Kami
                        </h2>
                        <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                            Punya pertanyaan atau ingin berkunjung? Silakan hubungi kami melalui saluran di bawah ini.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Informasi Kontak</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                                            📍
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">Alamat</p>
                                            <p className="text-slate-600 mt-1">Jl. Raya Jember No. 123, Kaliwates, Jember, Jawa Timur</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                                            📞
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">Telepon / WA</p>
                                            <p className="text-slate-600 mt-1">(0331) 1234567 / 0812-3456-7890</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                                            ✉️
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">Email</p>
                                            <p className="text-slate-600 mt-1">info@nurulali.sch.id</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-10 border-t border-slate-100">
                                    <p className="font-bold text-slate-900 mb-4">Media Sosial</p>
                                    <div className="flex gap-4">
                                        {['Instagram', 'YouTube', 'Facebook', 'Twitter'].map((social) => (
                                            <a key={social} href="#" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                                                <span className="text-xs font-bold uppercase tracking-tighter">{social.substring(0, 2)}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 h-80 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-slate-200 animate-pulse group-hover:bg-slate-300 transition-colors"></div>
                                <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 z-10">
                                    <span className="text-4xl">📍</span>
                                    <p className="font-bold text-slate-500">Google Maps Loading...</p>
                                    <button className="px-4 py-2 bg-white rounded-xl shadow-md text-slate-900 text-xs font-bold hover:bg-emerald-50 transition-colors">Buka Map</button>
                                </div>
                                <div className="absolute inset-0 border-[16px] border-white rounded-[2.5rem] pointer-events-none"></div>
                            </div>
                        </div>

                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-8">Kirim Pesan</h3>
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Anda</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="Nama Lengkap" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="nama@email.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Pesan</label>
                                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all h-32" placeholder="Tuliskan pesan Anda di sini..."></textarea>
                                </div>
                                <button type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-1">
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

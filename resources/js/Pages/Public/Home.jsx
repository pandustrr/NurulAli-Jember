import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Public/Navbar';
import Hero from '@/Components/Public/Hero';
import PhotoGallery from '@/Components/Public/PhotoGallery';
import Footer from '@/Components/Public/Footer';

export default function Home({ settings, lembagas }) {
    const whyUs = [
        {
            title: 'Kurikulum Terpadu',
            desc: 'Integrasi kurikulum pesantren, nasional, dan internasional untuk mencetak lulusan yang kompetitif.',
            icon: '📚'
        },
        {
            title: 'Pembinaan Akhlak',
            desc: 'Fokus pada pembentukan karakter islami melalui keteladanan dan pembiasaan ibadah harian.',
            icon: '🌙'
        },
        {
            title: 'Fasilitas Modern',
            desc: 'Asrama nyaman, laboratorium lengkap, dan area olahraga yang mendukung tumbuh kembang santri.',
            icon: '🏫'
        },
        {
            title: 'Tenaga Pendidik',
            desc: 'Dibimbing oleh asatidz dan pengajar profesional lulusan universitas ternama luar dan dalam negeri.',
            icon: '👨‍🏫'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Head title={`${settings.site_name || 'Pondok Pesantren Nurul Ali'} - Membentuk Generasi Qurani`} />

            <Navbar />

            <main>
                <Hero settings={settings} />

                {/* Why Choose Us Section */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-emerald-700 font-bold tracking-widest text-sm uppercase block mb-4">Keunggulan</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Mengapa Memilih Kami?</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                Kami berkomitmen memberikan lingkungan pendidikan terbaik bagi putra-putri Anda untuk berkembang secara intelektual dan spiritual.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {whyUs.map((item, index) => (
                                <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                    <div className="text-4xl mb-6">{item.icon}</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PhotoGallery />

                {/* CTA Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-emerald-800 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 -mt-20 -mr-20 bg-emerald-700 w-64 h-64 rounded-full opacity-20 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 bg-emerald-600 w-64 h-64 rounded-full opacity-20 blur-3xl"></div>

                            <div className="relative z-10 text-center max-w-3xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Siap Bergabung dengan Keluarga Besar Kami?</h2>
                                <p className="text-emerald-50 text-xl mb-10 opacity-90">
                                    Pendaftaran Santri Baru Tahun Ajaran Terbaru telah dibuka. Kuota terbatas!
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/pendaftaran" className="px-8 py-4 bg-white text-emerald-800 font-bold rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg">
                                        Daftar Sekarang
                                    </Link>
                                    <Link href="/info-ppdb" className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-2xl border border-emerald-600 hover:bg-emerald-600 transition-colors">
                                        Informasi Selengkapnya
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

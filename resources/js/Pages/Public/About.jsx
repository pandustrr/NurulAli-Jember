import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Public/Navbar';
import Footer from '@/Components/Public/Footer';
import Stats from '@/Components/Public/Stats';

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Tentang Kami - Pondok Pesantren Nurul Ali" />

            <Navbar />

            <main className="pt-24 pb-16">
                <Stats />

                {/* Nilai-Nilai Utama Section */}
                <section className="py-20 bg-emerald-900 text-white mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Nilai-Nilai Utama Kami</h2>
                            <p className="text-emerald-100 opacity-80">Prinsip yang menjadi landasan setiap langkah kami dalam mendidik santri.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-4xl mb-4">📖</div>
                                <h3 className="text-xl font-bold mb-2">Al-Qaman</h3>
                                <p className="text-emerald-50/70 text-sm">Menjadikan Al-Qur'an sebagai pedoman utama dalam berpikir dan bertindak.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-4xl mb-4">🤝</div>
                                <h3 className="text-xl font-bold mb-2">Akhlakul Karimah</h3>
                                <p className="text-emerald-50/70 text-sm">Mengutamakan adab di atas ilmu untuk membentuk pribadi yang santun.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-4xl mb-4">💡</div>
                                <h3 className="text-xl font-bold mb-2">Kemandirian</h3>
                                <p className="text-emerald-50/70 text-sm">Membekali santri dengan life skill untuk siap menghadapi tantangan zaman.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl underline decoration-emerald-500 decoration-4 underline-offset-8">
                            Profil Pondok Pesantren
                        </h2>
                        <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                            Mengenal lebih dekat sejarah, visi, dan misi Pondok Pesantren Nurul Ali dalam mencetak generasi Qurani.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-12">
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 text-2xl">🎯</div>
                                    <h3 className="text-2xl font-bold text-slate-900">Visi</h3>
                                </div>
                                <p className="text-slate-700 leading-relaxed text-lg">
                                    Menjadi lembaga pendidikan Islam terkemuka yang melahirkan generasi berakhlak mulia, cerdas, dan mandiri berlandaskan Al-Qur'an dan Sunnah.
                                </p>
                            </section>
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 text-2xl">🚀</div>
                                    <h3 className="text-2xl font-bold text-slate-900">Misi</h3>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        'Menyelenggarakan pendidikan tahfizh Al-Qur\'an dengan metode yang efektif.',
                                        'Membina karakter santri melalui pembiasaan ibadah dan akhlak islami.',
                                        'Mengembangkan potensi akademik dan kewirausahaan santri.',
                                        'Menjalin ukhuwah islamiyah dengan masyarakat sekitar.'
                                    ].map((misi, i) => (
                                        <li key={i} className="flex gap-4 text-slate-700 leading-relaxed">
                                            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">{i + 1}</span>
                                            {misi}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative">
                            <div className="absolute top-0 right-0 p-8 text-6xl opacity-5">📜</div>
                            <h3 className="text-2xl font-bold text-emerald-800 mb-6">Sejarah Singkat</h3>
                            <div className="space-y-6 text-slate-700 leading-relaxed">
                                <p>
                                    Pondok Pesantren Nurul Ali didirikan dengan semangat untuk memberikan akses pendidikan Islam yang berkualitas bagi masyarakat Jember dan sekitarnya.
                                </p>
                                <p>
                                    Berawal dari sebuah majelis ta'lim kecil, kini Nurul Ali terus berkembang menjadi pusat peradaban ilmu yang inklusiv dan modern namun tetap memegang teguh nilai-nilai kepesantrenan.
                                </p>
                                <div className="pt-6 border-t border-slate-100">
                                    <p className="font-semibold text-slate-900">"Semangat mencetak hafidz yang moderat dan berdaya saing global."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

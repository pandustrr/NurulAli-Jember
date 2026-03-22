import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import Stats from './Partials/Stats';
import { FlagIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function About({ settings }) {
    const missions = settings.mission ? JSON.parse(settings.mission) : [];

    return (
        <PublicLayout title="Tentang Kami - Pondok Pesantren Nurul Ali">
            <main className="pt-24 pb-16">
                <Stats />

                {/* Nilai-Nilai Utama Section */}
                <section className="py-20 bg-emerald-900 text-white mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Misi & Nilai Kami</h2>
                            <p className="text-emerald-100/70">Prinsip yang kami pegang teguh dalam mendidik setiap santri.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {missions.map((mission, i) => (
                                <div key={i} className="p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                    <div className="text-emerald-400 text-2xl font-bold mb-4">0{i + 1}</div>
                                    <p className="text-emerald-50/90 text-sm leading-relaxed">{mission}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl underline decoration-emerald-500 decoration-4 underline-offset-8">
                            Profil Pondok Pesantren
                        </h2>
                        <div className="mt-8 p-10 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-4 justify-center mb-6">
                                <FlagIcon className="w-10 h-10 text-emerald-600" />
                                <h3 className="text-2xl font-bold text-slate-900">Visi Kami</h3>
                            </div>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed italic">
                                "{settings.vision}"
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-20">
                        <div className="space-y-12">
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700">
                                        <DocumentTextIcon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Sejarah Singkat</h3>
                                </div>
                                <div className="prose prose-emerald lg:prose-lg text-slate-600 max-w-none leading-loose">
                                    {settings.history?.split('\n').map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="relative">
                            <div className="aspect-4/5 rounded-xl overflow-hidden shadow-2xl shadow-emerald-900/20 border-8 border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Pondok Pesantren"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-xl shadow-xl border border-slate-50 max-w-xs">
                                <p className="text-slate-500 italic text-sm leading-relaxed">
                                    "Membentuk santri yang tidak hanya alim secara intelektual, tapi juga mulia dalam akhlak dan mandiri dalam kehidupan."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}

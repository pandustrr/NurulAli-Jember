import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { site_settings } = usePage().props;

    return (
        <footer id="kontak" className="bg-slate-950 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                ن
                            </div>
                            <span className="text-2xl font-bold tracking-tight">{site_settings?.site_name || 'Nurul Ali'}</span>
                        </div>
                        <p className="text-slate-400 max-w-sm leading-relaxed">
                            {site_settings?.vision || 'Pondok Pesantren Nurul Ali berkomitmen mencetak generasi yang unggul dalam Imtaq dan Iptek, berakhlakul karimah, dan mandiri.'}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-emerald-500 uppercase tracking-widest text-sm">Tautan Cepat</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="/about" className="hover:text-emerald-500 transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/lembaga" className="hover:text-emerald-500 transition-colors">Lembaga Pendidikan</Link></li>
                            <li><Link href="/info-ppdb" className="hover:text-emerald-500 transition-colors">Informasi PPDB</Link></li>
                            <li><Link href="/pendaftaran" className="hover:text-emerald-500 transition-colors">Pendaftaran</Link></li>
                            <li><Link href="/kontak" className="hover:text-emerald-500 transition-colors">Kontak</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-emerald-500 uppercase tracking-widest text-sm">Hubungi Kami</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-start gap-3 leading-relaxed">
                                <span className="text-emerald-500 mt-1">📍</span>
                                {site_settings?.address || 'Loading address...'}
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-emerald-500">📞</span>
                                {site_settings?.phone || '-'}
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-emerald-500">✉️</span>
                                {site_settings?.email || '-'}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-sm">
                    <p>© {new Date().getFullYear()} {site_settings?.site_name || 'Pondok Pesantren Nurul Ali'}. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-emerald-500 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">YouTube</a>
                        <a href="#" className="hover:text-white transition-colors">Facebook</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

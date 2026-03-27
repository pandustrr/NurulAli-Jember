import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Footer() {
    const { site_settings } = usePage().props;

    return (
        <footer id="kontak" className="bg-slate-950 text-white py-6 md:py-20 border-t border-emerald-950/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 mb-6 md:mb-10">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <div className="bg-emerald-600 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-2xl shadow-lg shadow-emerald-500/20">
                                ن
                            </div>
                            <span className="text-lg md:text-2xl font-black tracking-tight uppercase leading-none">{site_settings?.site_name || 'Nurul Ali'}</span>
                        </div>
                        <p className="text-slate-500 max-w-sm leading-relaxed text-[10px] md:text-sm font-medium">
                            {site_settings?.vision || 'Pondok Pesantren Nurul Ali berkomitmen mencetak generasi yang unggul dalam Imtaq dan Iptek, berakhlakul karimah, dan mandiri.'}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black mb-3 md:mb-5 text-emerald-500 uppercase tracking-[0.2em] text-[10px]">Tautan Cepat</h4>
                        <ul className="space-y-2 md:space-y-3 text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-widest">
                            <li><Link href="/tentang" className="hover:text-emerald-500 transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/lembaga" className="hover:text-emerald-500 transition-colors">Lembaga Pendidikan</Link></li>
                            <li><Link href="/info-ppdb" className="hover:text-emerald-500 transition-colors">Informasi PPDB</Link></li>
                            <li><Link href="/pendaftaran" className="hover:text-emerald-500 transition-colors">Pendaftaran</Link></li>
                            <li><Link href="/kontak" className="hover:text-emerald-500 transition-colors">Kontak</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black mb-3 md:mb-5 text-emerald-500 uppercase tracking-[0.2em] text-[10px]">Hubungi Kami</h4>
                        <ul className="space-y-3 md:space-y-4 text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-widest">
                            <li className="flex items-start gap-3 leading-relaxed">
                                <MapPinIcon className="w-3.5 h-3.5 md:w-5 md:h-5 text-emerald-600 mt-1 shrink-0" />
                                <span className="normal-case tracking-normal">{site_settings?.address || 'Loading address...'}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <PhoneIcon className="w-3.5 h-3.5 md:w-5 md:h-5 text-emerald-600 shrink-0" />
                                <span className="normal-case tracking-normal">{site_settings?.phone || '-'}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <EnvelopeIcon className="w-3.5 h-3.5 md:w-5 md:h-5 text-emerald-600 shrink-0" />
                                <span className="normal-case tracking-normal lowercase">{site_settings?.email || '-'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 md:pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-700 text-[9px] font-bold uppercase tracking-widest leading-none">
                    <p>© {new Date().getFullYear()} {site_settings?.site_name || 'Nurul Ali'}. All rights reserved.</p>
                    <div className="flex gap-6 md:gap-8">
                        <a href="#" className="hover:text-emerald-500 transition-all hover:-translate-y-1">Instagram</a>
                        <a href="#" className="hover:text-white transition-all hover:-translate-y-1">YouTube</a>
                        <a href="#" className="hover:text-white transition-all hover:-translate-y-1">Facebook</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

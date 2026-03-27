import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    PhoneIcon, 
    ChatBubbleBottomCenterTextIcon as MessageSquareIcon, 
    InformationCircleIcon as InfoIcon, 
    ShieldCheckIcon 
} from '@heroicons/react/24/outline';

export default function SantriFooter() {
    const { site_settings } = usePage().props;

    return (
        <footer className="bg-slate-900 text-white py-12 md:py-16 border-t border-emerald-950/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -ml-32 -mt-32"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-600 w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20">
                                ن
                            </div>
                            <span className="text-xl font-black tracking-tight uppercase leading-none">Nurul Ali Portal</span>
                        </div>
                        <p className="text-slate-500 max-w-sm leading-relaxed text-[11px] font-bold uppercase tracking-widest italic">
                            Akses Portal Terintegrasi untuk Seluruh Calon Santri dan Wali Santri Pesantren Nurul Ali Jember.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 col-span-2 gap-8 md:gap-12">
                        {/* Help Section */}
                        <div className="space-y-6">
                            <h4 className="font-black text-emerald-500 uppercase tracking-[0.2em] text-[10px] mb-4">Pusat Bantuan PPDB</h4>
                            <ul className="space-y-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <li className="flex items-center gap-3 hover:text-white transition-colors">
                                    <PhoneIcon className="w-4 h-4 text-emerald-500" />
                                    <span>Hotline: {site_settings?.phone || '-'}</span>
                                </li>
                                <li className="flex items-center gap-3 hover:text-white transition-colors">
                                    <MessageSquareIcon className="w-4 h-4 text-emerald-500" />
                                    <span>WhatsApp Admin (Chat Only)</span>
                                </li>
                                <li className="flex items-center gap-3 hover:text-white transition-colors">
                                    <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
                                    <span>Keamanan Data Terjamin</span>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Action */}
                        <div className="space-y-6">
                            <h4 className="font-black text-emerald-500 uppercase tracking-[0.2em] text-[10px] mb-4">Navigasi Portal</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/info-ppdb" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-center border border-white/5">
                                    Info PPDB
                                </Link>
                                <Link href="/kontak" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-center border border-white/5">
                                    Kontak Kami
                                </Link>
                                <Link href="/" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-center border border-white/5 col-span-2">
                                    Kembali ke Beranda Utama
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} {site_settings?.site_name || 'Nurul Ali'}. Portal Santri v1.0</p>
                    <div className="flex gap-8">
                        <Link href="/" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link>
                        <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

import React, { useState } from 'react';
import { 
    CheckCircleIcon, 
    InformationCircleIcon, 
    QuestionMarkCircleIcon, 
    ChevronDownIcon,
    PaperClipIcon,
    ArrowRightIcon,
    CalendarDaysIcon,
    BanknotesIcon,
    ClipboardDocumentListIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export default function PPDBInfo({ ppdb_settings = {}, settings = {} }) {
    const [activeFaq, setActiveFaq] = useState(null);

    // Parse Settings Data
    const faqs = ppdb_settings?.faqs ? JSON.parse(ppdb_settings.faqs) : [];
    const schedule = ppdb_settings?.schedule ? JSON.parse(ppdb_settings.schedule) : [];
    const requirements = ppdb_settings?.requirements ? JSON.parse(ppdb_settings.requirements) : [];
    const fees = ppdb_settings?.fees ? JSON.parse(ppdb_settings.fees) : [];
    const infoText = ppdb_settings?.ppdb_info || "Informasi pendaftaran belum tersedia.";

    return (
        <section className="bg-slate-50/50 min-h-screen font-medium">
            {/* Header Hero */}
            <div className="bg-emerald-950 h-[578px] flex items-center justify-center px-4 relative overflow-hidden text-center">
                <div className="absolute inset-0">
                    <img 
                        src={settings.hero_ppdb || '/hero_ppdb_info.png'} 
                        className="w-full h-full object-cover opacity-40 transition-transform duration-1000 scale-105" 
                        alt="Hero Background"
                    />
                    <div className="absolute inset-0 bg-emerald-950/65 backdrop-blur-[0.5px]"></div>
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald-950/20 to-emerald-950"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <span className="inline-block px-5 py-2 bg-emerald-600/30 backdrop-blur-md rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-500/20">
                        Enrollment Center
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                        Informasi <span className="text-emerald-500 underline decoration-8 decoration-emerald-500/20 underline-offset-8">Pendaftaran</span>
                    </h1>
                    <p className="text-lg md:text-xl text-emerald-100/60 max-w-2xl mx-auto leading-relaxed font-medium">
                        Temukan seluruh detail yang Anda butuhkan untuk bergabung menjadi keluarga besar Pondok Pesantren Nurul Ali Jember.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
                    
                    {/* Main Content Area */}
                    <div className="xl:col-span-8 space-y-12">
                        
                        {/* 1. Jadwal Gelombang */}
                        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-slate-200/40 border border-white">
                            <div className="flex items-center gap-4 border-b border-slate-50 pb-6 mb-8">
                                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                                    <CalendarDaysIcon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase">Jadwal Gelombang</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Masa pendaftaran santri baru aktif</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {schedule.length === 0 && (
                                    <div className="col-span-full py-12 text-center text-slate-300 font-black uppercase text-[10px] tracking-widest">
                                        Data jadwal belum tersedia
                                    </div>
                                )}
                                {schedule.map((item, i) => (
                                    <div key={i} className={`p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${item.active ? 'bg-emerald-50/50 border-emerald-100 shadow-lg shadow-emerald-900/5 ring-1 ring-emerald-500/20' : 'bg-slate-50/50 border-slate-100 opacity-60'}`}>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-black text-slate-800 text-lg tracking-tight truncate">{item.label}</h4>
                                                {item.active && (
                                                    <span className="bg-emerald-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Aktif</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500 font-bold text-xs tracking-tight">
                                                <ClockIcon className="w-3.5 h-3.5" />
                                                <span>{item.date}</span>
                                            </div>
                                        </div>
                                        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${item.active ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                                            <CalendarDaysIcon className="w-5 h-5" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. Informasi Umum */}
                        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-slate-200/40 border border-white">
                            <div className="flex items-center gap-4 border-b border-slate-50 pb-6 mb-8">
                                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                                    <InformationCircleIcon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase">Informasi Umum</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Alur dan panduan pendaftaran</p>
                                </div>
                            </div>
                            <div className="prose prose-emerald max-w-none text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line font-bold">
                                {infoText}
                            </div>
                        </div>

                        {/* 3. Persyaratan Berkas */}
                        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-slate-200/40 border border-white">
                            <div className="flex items-center gap-4 border-b border-slate-50 pb-6 mb-8">
                                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                                    <ClipboardDocumentListIcon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase">Dokumen Persyaratan</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Berkas wajib yang harus disiapkan</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {requirements.length === 0 && (
                                    <div className="col-span-full py-12 text-center text-slate-300 font-black uppercase text-[10px] tracking-widest">
                                        Data persyaratan belum tersedia
                                    </div>
                                )}
                                {requirements.map((req, i) => (
                                    <div key={i} className="flex gap-4 p-5 bg-slate-50/50 rounded-2xl border border-slate-100 items-start group hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
                                        <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-lg shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            <CheckCircleIcon className="w-4 h-4" />
                                        </div>
                                        <span className="text-slate-700 font-black text-[13px] leading-tight transition-colors">
                                            {req}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Rincian Biaya */}
                        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-slate-200/40 border border-white">
                            <div className="flex items-center gap-4 border-b border-slate-50 pb-6 mb-8">
                                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                                    <BanknotesIcon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase">Rincian Biaya</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Estimasi administrasi pendaftaran</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {fees.length === 0 && (
                                    <div className="py-12 text-center text-slate-300 font-black uppercase text-[10px] tracking-widest">
                                        Data rincian biaya belum tersedia
                                    </div>
                                )}
                                {fees.map((fee, i) => (
                                    <div key={i} className="flex justify-between items-center bg-slate-50/50 p-5 rounded-2xl border border-slate-100 hover:bg-emerald-50/30 hover:border-emerald-100 transition-all duration-300">
                                        <h4 className="font-black text-slate-700 text-sm">{fee.label}</h4>
                                        <span className="font-black text-emerald-700 text-lg tracking-tighter">{fee.price}</span>
                                    </div>
                                ))}
                            </div>
                            {fees.length > 0 && (
                                <p className="mt-8 p-4 bg-emerald-900/5 rounded-2xl text-[11px] text-emerald-800 font-bold leading-relaxed border border-emerald-100 text-center">
                                    * Biaya pendaftaran di atas bersifat estimasi dan dapat berubah sewaktu-waktu sesuai kebijakan pengasuh.
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Sidebar Area */}
                    <div className="xl:col-span-4 space-y-8 lg:sticky lg:top-32 h-fit">
                        
                        {/* Action Card */}
                        <div className="bg-emerald-900 p-8 rounded-[40px] shadow-2xl shadow-emerald-950/20 text-white relative overflow-hidden group">
                            <div className="absolute -right-16 -top-16 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                            <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight uppercase">Siap Menjadi Santri Kami?</h4>
                            <p className="text-emerald-100/60 mb-8 text-sm leading-relaxed font-bold">
                                Klik tombol di bawah ini untuk mengisi formulir pendaftaran secara online.
                            </p>
                            <a 
                                href="/pendaftaran" 
                                className="w-full bg-white text-emerald-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-50 transition-all active:scale-95 group shadow-lg shadow-emerald-950/20"
                            >
                                Daftar Sekarang <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* FAQ Sidebar */}
                        <div className="bg-white p-8 rounded-[40px] shadow-xl shadow-slate-200/40 border border-white overflow-hidden">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                                    <QuestionMarkCircleIcon className="w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-black text-slate-800 tracking-tighter uppercase">Pertanyaan Umum</h4>
                            </div>
                            <div className="space-y-3">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="border border-slate-50 rounded-2xl overflow-hidden hover:border-emerald-100 transition-colors">
                                        <button 
                                            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                            className="w-full text-left p-5 flex justify-between items-center gap-4 bg-slate-50/50 hover:bg-emerald-50/20 transition-colors"
                                        >
                                            <span className="text-[11px] font-black text-slate-700 tracking-tight leading-snug">{faq.q}</span>
                                            <ChevronDownIcon className={`w-3.5 h-3.5 text-emerald-500 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-64' : 'max-h-0'}`}>
                                            <div className="p-5 text-[11px] text-slate-500 leading-relaxed font-bold bg-white border-t border-slate-50">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="p-8 bg-white border-white rounded-[40px] shadow-xl shadow-slate-200/40 space-y-6">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bantuan & Kontak</h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                                        <PaperClipIcon className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Butuh Bantuan?</p>
                                        <p className="text-sm font-black text-slate-800 tracking-tight truncate">Hubungi Admin PPDB</p>
                                    </div>
                                </div>
                            </div>
                            <a href="/kontak" className="w-full bg-slate-50 flex items-center justify-center p-4 rounded-2xl text-emerald-700 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-colors border border-slate-100 hover:border-emerald-100">
                                Lihat Kontak Kami &rarr;
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

import React, { useState } from 'react';
import { 
    BookOpenIcon, 
    BuildingLibraryIcon, 
    BuildingOfficeIcon, 
    AcademicCapIcon, 
    BriefcaseIcon,
    InformationCircleIcon,
    UserGroupIcon,
    BeakerIcon,
    RectangleGroupIcon
} from '@heroicons/react/24/outline';
import Modal from '@/Components/Fragments/Modal';

const iconMap = {
    AcademicCapIcon,
    BuildingLibraryIcon,
    BuildingOfficeIcon,
    BriefcaseIcon,
    BookOpenIcon,
    UserGroupIcon,
    BeakerIcon,
    RectangleGroupIcon
};

export default function SelectionSection({ data, toggleLembaga, lembagas = [] }) {
    const selectedIds = data.lembaga_ids || [];
    const [detailLembaga, setDetailLembaga] = useState(null);

    const openDetails = (e, lib) => {
        e.stopPropagation();
        setDetailLembaga(lib);
    };

    return (
        <div className="bg-white/80 backdrop-blur-2xl p-6 md:p-10 rounded-[1.5rem] shadow-2xl shadow-emerald-950/20 border border-white ring-1 ring-slate-200/50">
            <div className="space-y-10">
                <div className="space-y-8">
                    <div className="ml-1 flex flex-col md:flex-row justify-between md:items-end gap-4">
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none uppercase">Pilih Jenjang Pendidikan</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3">Silakan tentukan lembaga atau jenjang tujuan santri baru</p>
                        </div>
                        <div className="bg-emerald-50 px-5 py-2.5 rounded-2xl border border-emerald-100/50 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <p className="text-[10px] text-emerald-700 font-black uppercase tracking-widest">Minimal 1, Maksimal 3 Pilihan</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        {lembagas.map((lib) => {
                            const selectionIndex = (selectedIds || []).map(id => Number(id)).indexOf(Number(lib.id));
                            const isSelected = selectionIndex > -1;
                            const Icon = iconMap[lib.icon] || BuildingLibraryIcon;
                            
                            return (
                                <button
                                    key={lib.id}
                                    type="button"
                                    onClick={() => toggleLembaga(lib.id)}
                                    className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 text-center flex flex-col items-center gap-4 ${isSelected ? 'bg-emerald-600 border-emerald-600 shadow-2xl shadow-emerald-600/20 -translate-y-2' : 'bg-white border-slate-100 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-950/5 hover:-translate-y-1'}`}
                                >
                                    {/* Info Icon Button */}
                                    <div 
                                        onClick={(e) => openDetails(e, lib)}
                                        className={`absolute top-4 right-4 p-1.5 rounded-full transition-all duration-300 z-10 ${isSelected ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-slate-300 hover:text-emerald-600 hover:bg-emerald-50'}`}
                                    >
                                        <InformationCircleIcon className="w-4 h-4" />
                                    </div>

                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-white/20 text-white scale-110' : 'bg-emerald-50 text-emerald-600 shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white'}`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <span className={`block text-[15px] font-black uppercase tracking-tight leading-none ${isSelected ? 'text-white' : 'text-slate-800'}`}>{lib.title}</span>
                                        <span className={`block text-[7px] font-bold uppercase tracking-widest mt-2 leading-tight ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>{lib.subtitle || ''}</span>
                                    </div>
                                    
                                    {isSelected && (
                                        <div className="absolute -top-2 -right-2 flex flex-col items-center animate-in zoom-in-50 duration-300">
                                            <div className="bg-white w-9 h-9 rounded-full flex items-center justify-center border-4 border-emerald-600 shadow-xl">
                                                <span className="text-[12px] font-extrabold text-emerald-600">{selectionIndex + 1}</span>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <Modal show={!!detailLembaga} onClose={() => setDetailLembaga(null)} maxWidth="xl">
                {detailLembaga && (
                    <div className="relative overflow-hidden bg-white">
                        {/* 1. Subtle Radial Background Gradient */}
                        <div className="absolute top-0 left-0 w-full h-[300px] bg-linear-to-b from-emerald-50/50 to-transparent pointer-events-none"></div>
                        
                        <div className="relative p-7 md:p-12">
                            {/* Close Button - Floating & Subtle */}
                            <button 
                                onClick={() => setDetailLembaga(null)}
                                className="absolute top-6 right-6 p-2.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all active:scale-90 border border-slate-100 shadow-sm z-20"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* 2. Header Section - More Premium */}
                            <div className="flex flex-col items-center text-center mb-10">
                                <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-600/30 mb-6 ring-8 ring-emerald-50">
                                    {React.createElement(iconMap[detailLembaga.icon] || BuildingLibraryIcon, { className: "w-10 h-10" })}
                                </div>
                                <div className="space-y-1">
                                    <span className="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-black uppercase tracking-[0.25em] border border-emerald-100/50 mb-2">
                                        Detail Lembaga
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-3">
                                        {detailLembaga.title}
                                        <span className="text-slate-300 font-light text-2xl">|</span>
                                        <span className="text-slate-400 font-bold text-lg leading-none mt-1">
                                            {detailLembaga.subtitle}
                                        </span>
                                    </h3>
                                </div>
                            </div>

                            {/* 3. Description & Pricing - Grouped Elegantly */}
                            <div className="space-y-10">
                                {/* Tentang */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4 flex items-center gap-4">
                                        Tentang Program
                                        <div className="h-px bg-emerald-100 grow"></div>
                                    </h4>
                                    <div className="text-[14px] text-slate-500 leading-relaxed font-semibold text-center italic px-4 whitespace-pre-wrap">
                                        "{detailLembaga.detailed_description || detailLembaga.description}"
                                    </div>
                                </div>

                                {/* Pricing List - Slimmer & Clean */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 flex items-center gap-4">
                                        Rincian Biaya
                                        <div className="h-px bg-slate-100 grow"></div>
                                    </h4>
                                    
                                    <div className="bg-slate-50/50 rounded-3xl border border-slate-100 p-2">
                                        <div className="bg-white rounded-[1.25rem] border border-slate-100 overflow-hidden shadow-sm">
                                            {(detailLembaga.prices || []).map((price, idx) => (
                                                <div key={idx} className={`flex justify-between items-center px-6 py-4 transition-colors ${idx !== 0 ? 'border-t border-slate-50' : ''}`}>
                                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{price.label}</span>
                                                    <span className="text-sm font-black text-slate-700 tabular-nums">{price.value}</span>
                                                </div>
                                            ))}
                                                <div className="bg-emerald-600 px-6 py-5 flex justify-between items-center text-white">
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Total Estimasi Awal</p>
                                                    <p className="text-[8px] font-bold opacity-60 uppercase tracking-widest mt-0.5">* Biaya Administrasi & Seragam</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xl font-black tabular-nums tracking-tight">
                                                        Rp {(detailLembaga.prices || []).reduce((sum, p) => sum + parseInt((p.value || '0').replace(/[^0-9]/g, '') || 0), 0).toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 4. Unified Action Button Area */}
                            <div className="mt-12 flex flex-col gap-4">
                                <button
                                    onClick={() => {
                                        if (selectedIds.indexOf(detailLembaga.id) === -1) {
                                            toggleLembaga(detailLembaga.id);
                                        }
                                        setDetailLembaga(null);
                                    }}
                                    className={`relative group w-full py-5 rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.3em] transition-all active:scale-[0.97] overflow-hidden ${
                                        selectedIds.indexOf(detailLembaga.id) > -1 
                                        ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-100 cursor-default shadow-inner' 
                                        : 'bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:bg-slate-800'
                                    }`}
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                        {selectedIds.indexOf(detailLembaga.id) > -1 ? (
                                            <>
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                Sudah Terpilih
                                            </>
                                        ) : (
                                            `Pilih Jenjang ${detailLembaga.title}`
                                        )}
                                    </div>
                                </button>
                                
                                <button 
                                    onClick={() => setDetailLembaga(null)}
                                    className="w-full py-2 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-400 transition-colors"
                                >
                                    Nanti Saja
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

        </div>
    );
}


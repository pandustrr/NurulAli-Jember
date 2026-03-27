import React from 'react';
import { 
    BookOpenIcon, 
    BuildingLibraryIcon, 
    BuildingOfficeIcon, 
    AcademicCapIcon, 
    BriefcaseIcon 
} from '@heroicons/react/24/outline';

const dummyLembagas = [
    { id: 'mi', title: 'MI', sub: 'Madrasah Ibtidaiyah', icon: BookOpenIcon },
    { id: 'mts', title: 'MTs', sub: 'Madrasah Tsanawiyah', icon: BuildingLibraryIcon },
    { id: 'smp', title: 'SMP', sub: 'Sekolah Menengah Pertama', icon: BuildingOfficeIcon },
    { id: 'ma', title: 'MA', sub: 'Madrasah Aliyah', icon: AcademicCapIcon },
    { id: 'sma', title: 'SMA', sub: 'Sekolah Menengah Atas', icon: AcademicCapIcon },
    { id: 'smk', title: 'SMK', sub: 'Sekolah Menengah Kejuruan', icon: BriefcaseIcon },
];

export default function SelectionSection({ data, toggleLembaga }) {
    const selectedIds = data.lembaga_ids || [];

    return (
        <div className="bg-white/80 backdrop-blur-2xl p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-emerald-950/20 border border-white ring-1 ring-slate-200/50">
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
                        {dummyLembagas.map((lib) => {
                            const selectionIndex = selectedIds.indexOf(lib.id);
                            const isSelected = selectionIndex > -1;
                            
                            return (
                                <button
                                    key={lib.id}
                                    type="button"
                                    onClick={() => toggleLembaga(lib.id)}
                                    className={`group relative p-6 rounded-4xl border-2 transition-all duration-500 text-center flex flex-col items-center gap-4 ${isSelected ? 'bg-emerald-600 border-emerald-600 shadow-2xl shadow-emerald-600/20 -translate-y-2' : 'bg-white border-slate-100 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-950/5 hover:-translate-y-1'}`}
                                >
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-white/20 text-white scale-110' : 'bg-emerald-50 text-emerald-600 shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white'}`}>
                                        <lib.icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <span className={`block text-[15px] font-black uppercase tracking-tight leading-none ${isSelected ? 'text-white' : 'text-slate-800'}`}>{lib.title}</span>
                                        <span className={`block text-[7px] font-bold uppercase tracking-widest mt-2 leading-tight ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>{lib.sub.replace('Madrasah ', '').replace('Sekolah Menengah ', '')}</span>
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
        </div>
    );
}

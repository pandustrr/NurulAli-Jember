import React, { useEffect } from 'react';
import { 
    XMarkIcon, 
    UserGroupIcon, 
    IdentificationIcon,
    AdjustmentsHorizontalIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { useForm } from '@inertiajs/react';

const IDSantriGenerator = ({ isOpen, onClose, selectedIds, studentNames = [] }) => {
    const { data, setData, post, processing, errors } = useForm({
        ids: selectedIds,
        prefix: `SNT-${new Date().getFullYear()}-`,
        start_number: 1,
    });

    useEffect(() => {
        setData('ids', selectedIds);
    }, [selectedIds]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.pendaftar.bulk-generate'), {
            onSuccess: () => {
                onClose();
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-xl rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-100 flex flex-col max-h-[90vh]">
                
                <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                            <UserGroupIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase leading-none mb-1">Generate Akun Massal</h3>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Memproses {selectedIds.length} Santri Terpilih</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-transform hover:rotate-90">
                        <XMarkIcon className="w-6 h-6 text-slate-300" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 overflow-y-auto no-scrollbar pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-4xl border border-slate-100">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 flex items-center gap-2">
                                <IdentificationIcon className="w-3 h-3" /> Prefix ID
                            </label>
                            <input 
                                type="text"
                                value={data.prefix}
                                onChange={e => setData('prefix', e.target.value)}
                                className="w-full px-5 py-4 bg-white border-none rounded-2xl text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-100 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                                placeholder="CONTOH: SNT-2026-"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 flex items-center gap-2">
                                <AdjustmentsHorizontalIcon className="w-3 h-3" /> Nomor Mulai
                            </label>
                            <input 
                                type="number"
                                value={data.start_number}
                                onChange={e => setData('start_number', e.target.value)}
                                className="w-full px-5 py-4 bg-white border-none rounded-2xl text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-100 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                                placeholder="001"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-emerald-600 tracking-widest ml-1">Pratinjau Format Akun</h4>
                        <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-500 font-black text-xs">01</div>
                            <div>
                                <p className="text-sm font-black text-emerald-900 tracking-tight">
                                    {data.prefix}{String(data.start_number).padStart(3, '0')}
                                </p>
                                <p className="text-[9px] font-bold text-emerald-600/60 uppercase tracking-widest">Format yang akan digunakan</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Daftar Terpilih ({studentNames.length})</label>
                         <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border border-slate-50 rounded-2xl bg-white">
                            {studentNames.map((name, i) => (
                                <span key={i} className="px-3 py-1.5 bg-slate-100 rounded-lg text-[9px] font-bold text-slate-600 uppercase tracking-tight truncate max-w-[150px]">
                                    {name}
                                </span>
                            ))}
                         </div>
                    </div>

                    <div className="pt-4 space-y-4">
                         <button 
                            type="submit"
                            disabled={processing || selectedIds.length === 0}
                            className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-emerald-200 hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                         >
                            <SparklesIcon className="w-5 h-5" /> Generate {selectedIds.length} Akun Sekarang
                         </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IDSantriGenerator;

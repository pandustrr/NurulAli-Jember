import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { EyeIcon, MagnifyingGlassIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import StatusBadge from '@/Components/Fragments/StatusBadge';
import StudentDetailModal from '@/Components/Fragments/StudentDetailModal';
import IDSantriGenerator from '@/Components/Fragments/IDSantriGenerator';
import { 
    UserPlusIcon, 
    SparklesIcon, 
    CheckCircleIcon,
    TableCellsIcon 
} from '@heroicons/react/24/outline';

export default function Index({ pendaftars }) {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

    const toggleSelect = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredPendaftars.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredPendaftars.map(p => p.id));
        }
    };

    const studentNames = useMemo(() => {
        return pendaftars.filter(p => selectedIds.includes(p.id)).map(p => p.name);
    }, [pendaftars, selectedIds]);

    const updateStatus = (id, status, payment_status) => {
        router.post(route('admin.pendaftar.status', id), {
            status,
            payment_status,
        }, {
            onSuccess: () => {
                const updated = pendaftars.find(p => p.id === id);
                if (updated) setSelectedStudent({ ...updated, status, payment_status });
            }
        });
    };

    const deletePendaftar = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data pendaftar ini? Seluruh data dan berkas akan hilang permanen.')) {
            router.delete(route('admin.pendaftar.destroy', id), {
                onSuccess: () => setSelectedStudent(null)
            });
        }
    };

    const filteredPendaftars = useMemo(() => {
        return pendaftars.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            p.reg_id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [pendaftars, searchTerm]);

    return (
        <AdminLayout 
            header="Data Pendaftar PPDB"
            description="Manajemen data calon santri yang telah melakukan pendaftaran online."
            icon={EyeIcon}
        >
            <Head title="Admin - Pendaftar" />

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative group max-w-sm w-full">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Cari Nama atau ID Reg..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border-none rounded-2xl shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium transition-all"
                    />
                </div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Total: <span className="text-slate-900">{filteredPendaftars.length} / {pendaftars.length}</span> Pendaftar
                </div>
            </div>

            {/* Minimalist Quick Actions Card */}
            <div className="mb-6 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm inline-flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <UserPlusIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-tight">Generate ID Santri</h4>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            Pilih atau checklist pendaftar untuk buat ID otomatis
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button 
                        onClick={() => {
                            if (selectedIds.length === 1) {
                                const student = pendaftars.find(p => p.id === selectedIds[0]);
                                if (student) setSelectedStudent(student);
                            } else if (selectedIds.length > 1) {
                                window.dispatchEvent(new CustomEvent('toast', { detail: { message: "Fitur 'Buat Satuan' hanya untuk 1 santri. Gunakan 'Generate Otomatis' untuk banyak data sekaligus.", type: 'warning' } }));
                            } else {
                                window.dispatchEvent(new CustomEvent('toast', { detail: { message: "Silakan klik kotak centang pada salah satu pendaftar terlebih dahulu.", type: 'error' } }));
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all active:scale-95 border border-emerald-100/50"
                    >
                        <UserPlusIcon className="w-3.5 h-3.5" />
                        Buat Satuan
                    </button>
                    <button 
                        onClick={() => {
                            if (selectedIds.length === 0) {
                                window.dispatchEvent(new CustomEvent('toast', { detail: { message: "Silakan klik kotak centang di tabel pendaftar terlebih dahulu.", type: 'error' } }));
                            } else {
                                setIsBulkModalOpen(true);
                            }
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-100 active:scale-95"
                    >
                        <SparklesIcon className="w-3.5 h-3.5" />
                        Generate Otomatis
                    </button>

                    {selectedIds.length > 0 && (
                        <div className="px-3 py-2 bg-emerald-50 rounded-xl flex items-center gap-2 animate-in zoom-in-95 duration-300 ml-1 border border-emerald-100">
                            <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">
                                {selectedIds.length} Terpilih
                            </span>
                            <button onClick={() => setSelectedIds([])} className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline border-l border-emerald-200/50 pl-2">Reset</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden text-slate-900">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-6 text-center w-10">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedIds.length === filteredPendaftars.length && filteredPendaftars.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-5 h-5 rounded-lg border-2 border-slate-200 text-emerald-600 focus:ring-emerald-500/20 transition-all cursor-pointer"
                                    />
                                </th>
                                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400">ID Reg / Akun</th>
                                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400">Nama Lengkap</th>
                                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400">WhatsApp</th>
                                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Status</th>
                                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Pembayaran</th>
                                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPendaftars.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-20 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                                <EyeIcon className="w-8 h-8 opacity-20" />
                                            </div>
                                            <p className="font-bold">Data pendaftar tidak ditemukan.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredPendaftars.map((p) => (
                                    <tr key={p.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors group ${selectedIds.includes(p.id) ? 'bg-emerald-50/30' : ''}`}>
                                        <td className="p-6 text-center">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedIds.includes(p.id)}
                                                onChange={() => toggleSelect(p.id)}
                                                className="w-5 h-5 rounded-lg border-2 border-slate-200 text-emerald-600 focus:ring-emerald-500/20 transition-all cursor-pointer"
                                            />
                                        </td>
                                        <td className="p-6">
                                            <p className="font-mono text-[10px] font-black text-slate-400 mb-1 leading-none uppercase tracking-tighter">{p.reg_id}</p>
                                            {p.username ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-sm"></div>
                                                    <p className="text-[11px] font-black text-emerald-700 tracking-tight uppercase leading-none">{p.username}</p>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                                                    <p className="text-[10px] font-bold text-slate-300 tracking-tighter uppercase leading-none italic">Belum Ada Akun</p>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-6">
                                            <p className="font-black text-slate-900 leading-none mb-1">{p.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Sekolah: {p.school_origin || '-'}</p>
                                        </td>
                                        <td className="p-6 font-bold text-slate-600 text-sm">{p.whatsapp || '-'}</td>
                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                <StatusBadge status={p.status} />
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                <StatusBadge status={p.payment_status} />
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedStudent(p);
                                                        setIsEditMode(false);
                                                    }}
                                                    className="w-8 h-8 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm shadow-emerald-100"
                                                    title="Lihat Detail"
                                                >
                                                    <EyeIcon className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedStudent(p);
                                                        setIsEditMode(true);
                                                    }}
                                                    className="w-8 h-8 flex items-center justify-center bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all shadow-sm shadow-amber-100"
                                                    title="Edit Data"
                                                >
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deletePendaftar(p.id)}
                                                    className="w-8 h-8 flex items-center justify-center bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm shadow-rose-100"
                                                    title="Hapus Data"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <StudentDetailModal 
                student={selectedStudent} 
                isOpen={!!selectedStudent} 
                initialEditMode={isEditMode}
                onClose={() => setSelectedStudent(null)} 
                onUpdateStatus={updateStatus}
            />

            <IDSantriGenerator
                isOpen={isBulkModalOpen}
                onClose={() => {
                    setIsBulkModalOpen(false);
                    setSelectedIds([]);
                }}
                selectedIds={selectedIds}
                studentNames={studentNames}
            />
        </AdminLayout>
    );
}

import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { EyeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import StatusBadge from '@/Components/Fragments/StatusBadge';
import StudentDetailModal from '@/Components/Fragments/StudentDetailModal';

export default function Index({ pendaftars }) {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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

            <div className="bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden text-slate-900">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400">ID Reg</th>
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
                                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-6 font-mono text-[10px] font-black text-slate-400">{p.reg_id}</td>
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
                                            <button
                                                onClick={() => setSelectedStudent(p)}
                                                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-3 ml-auto shadow-lg shadow-slate-900/10"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                                View & Edit
                                            </button>
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
                onClose={() => setSelectedStudent(null)} 
                onUpdateStatus={updateStatus}
            />
        </AdminLayout>
    );
}

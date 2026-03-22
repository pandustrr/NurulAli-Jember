import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import StatusBadge from '@/Components/Fragments/StatusBadge';
import StudentDetailModal from '@/Components/Fragments/StudentDetailModal';

export default function DataPendaftar({ pendaftars }) {
    const [selectedStudent, setSelectedStudent] = useState(null);

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

    return (
        <AdminLayout header="Data Pendaftar PPDB">
            <Head title="Admin - Pendaftar" />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden text-slate-900">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-6 font-bold text-slate-700">ID Reg</th>
                            <th className="p-6 font-bold text-slate-700">Nama Lengkap</th>
                            <th className="p-6 font-bold text-slate-700">WhatsApp</th>
                            <th className="p-6 font-bold text-slate-700">Status</th>
                            <th className="p-6 font-bold text-slate-700">Pembayaran</th>
                            <th className="p-6 font-bold text-slate-700 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendaftars.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-12 text-center text-slate-400">Belum ada pendaftar.</td>
                            </tr>
                        )}
                        {pendaftars.map((p) => (
                            <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 font-mono text-xs font-bold text-slate-400">{p.reg_id}</td>
                                <td className="p-6 font-bold text-slate-900">{p.name}</td>
                                <td className="p-6 text-sm text-slate-500">{p.whatsapp || '-'}</td>
                                <td className="p-6">
                                    <StatusBadge status={p.status} />
                                </td>
                                <td className="p-6">
                                    <StatusBadge status={p.payment_status} />
                                </td>
                                <td className="p-6 text-right">
                                    <button
                                        onClick={() => setSelectedStudent(p)}
                                        className="bg-slate-900 text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2 ml-auto"
                                    >
                                        <EyeIcon className="w-4 h-4" />
                                        Detail & Verifikasi
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

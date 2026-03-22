import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function DataPendaftar({ pendaftars }) {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const updateStatus = (id, status, payment_status) => {
        router.post(route('admin.pendaftar.status', id), {
            status,
            payment_status,
        }, {
            onSuccess: () => {
                // Find and update local state for the modal
                const updated = pendaftars.find(p => p.id === id);
                if (updated) setSelectedStudent({ ...updated, status, payment_status });
            }
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'verified': return 'bg-emerald-100 text-emerald-700';
            case 'rejected': return 'bg-rose-100 text-rose-700';
            default: return 'bg-amber-100 text-amber-700';
        }
    };

    return (
        <AdminLayout header="Data Pendaftar PPDB">
            <Head title="Admin - Pendaftar" />

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden text-slate-900">
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
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(p.status)}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.payment_status === 'verified' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {p.payment_status}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <button
                                        onClick={() => setSelectedStudent(p)}
                                        className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                                    >
                                        Detail & Verifikasi
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Detail */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-slate-900">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-1">Detail Pendaftar</h3>
                                <p className="text-slate-400 font-mono text-sm">{selectedStudent.reg_id}</p>
                            </div>
                            <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600">🗙</button>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-slate-400">Nama Lengkap</label>
                                    <p className="font-bold">{selectedStudent.name}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-slate-400">NIK</label>
                                    <p className="font-bold">{selectedStudent.nik || '-'}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-slate-400">Tempat, Tgl Lahir</label>
                                    <p className="font-bold">{selectedStudent.place_birth}, {selectedStudent.date_birth}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-slate-400">Orang Tua/Wali</label>
                                    <p className="font-bold">{selectedStudent.parent_name}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-slate-400">Sekolah Asal</label>
                                    <p className="font-bold">{selectedStudent.school_origin}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-slate-400">Metode Bayar</label>
                                    <p className="font-bold uppercase">{selectedStudent.payment_method}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-3xl space-y-6">
                            <h4 className="font-bold text-slate-700">Update Verifikasi</h4>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500">Status Pendaftaran</label>
                                    <select
                                        value={selectedStudent.status}
                                        onChange={(e) => updateStatus(selectedStudent.id, e.target.value, selectedStudent.payment_status)}
                                        className="w-full bg-white border-none rounded-xl text-sm font-bold focus:ring-emerald-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="verified">Verified (Diterima)</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500">Status Pembayaran</label>
                                    <select
                                        value={selectedStudent.payment_status}
                                        onChange={(e) => updateStatus(selectedStudent.id, selectedStudent.status, e.target.value)}
                                        className="w-full bg-white border-none rounded-xl text-sm font-bold focus:ring-emerald-500"
                                    >
                                        <option value="unpaid">Unpaid</option>
                                        <option value="paid">Paid (Butuh Verifikasi)</option>
                                        <option value="verified">Verified (Lunas)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <button className="flex-grow py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors">Cetak Data Santri (PDF)</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

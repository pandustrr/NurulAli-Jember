import React from 'react';
import { 
    XMarkIcon, 
    DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const StudentDetailModal = ({ student, isOpen, onClose, onUpdateStatus }) => {
    if (!isOpen || !student) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-slate-900">
            <div className="bg-white w-full max-w-2xl rounded-2xl p-10 shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                            <DocumentMagnifyingGlassIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-1">Detail Pendaftar</h3>
                            <p className="text-slate-400 font-mono text-sm">{student.reg_id}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Nama Lengkap</label>
                            <p className="font-bold">{student.name}</p>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">NIK</label>
                            <p className="font-bold">{student.nik || '-'}</p>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Tempat, Tgl Lahir</label>
                            <p className="font-bold">{student.place_birth}, {student.date_birth}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Orang Tua/Wali</label>
                            <p className="font-bold">{student.parent_name}</p>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Sekolah Asal</label>
                            <p className="font-bold">{student.school_origin}</p>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Metode Bayar</label>
                            <p className="font-bold uppercase">{student.payment_method}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl space-y-6">
                    <h4 className="font-bold text-slate-700">Update Verifikasi</h4>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500">Status Pendaftaran</label>
                            <select
                                value={student.status}
                                onChange={(e) => onUpdateStatus(student.id, e.target.value, student.payment_status)}
                                className="w-full bg-white border-none rounded-lg text-sm font-bold focus:ring-emerald-500"
                            >
                                <option value="pending">Menunggu</option>
                                <option value="verified">Terverifikasi (Diterima)</option>
                                <option value="rejected">Ditolak</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500">Status Pembayaran</label>
                            <select
                                value={student.payment_status}
                                onChange={(e) => onUpdateStatus(student.id, student.status, e.target.value)}
                                className="w-full bg-white border-none rounded-lg text-sm font-bold focus:ring-emerald-500"
                            >
                                <option value="unpaid">Belum Bayar</option>
                                <option value="paid">Sudah Bayar (Butuh Verifikasi)</option>
                                <option value="verified">Terverifikasi (Lunas)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex gap-4">
                    <button className="grow py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">Cetak Data Santri (PDF)</button>
                </div>
            </div>
        </div>
    );
};

export default StudentDetailModal;

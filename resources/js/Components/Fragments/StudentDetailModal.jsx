import React, { useState, useEffect } from 'react';
import { 
    XMarkIcon, 
    DocumentMagnifyingGlassIcon,
    PencilSquareIcon,
    TrashIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useForm, router } from '@inertiajs/react';
import ConfirmModal from './ConfirmModal';

const StudentDetailModal = ({ student, isOpen, onClose, onUpdateStatus }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    
    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        nik: '',
        place_birth: '',
        date_birth: '',
        parent_name: '',
        whatsapp: '',
        address: '',
        school_origin: '',
        payment_method: 'cash',
        status: 'pending',
        payment_status: 'unpaid',
    });

    useEffect(() => {
        if (student) {
            setData({
                name: student.name || '',
                nik: student.nik || '',
                place_birth: student.place_birth || '',
                date_birth: student.date_birth || '',
                parent_name: student.parent_name || '',
                whatsapp: student.whatsapp || '',
                address: student.address || '',
                school_origin: student.school_origin || '',
                payment_method: student.payment_method || 'cash',
                status: student.status || 'pending',
                payment_status: student.payment_status || 'unpaid',
            });
        }
    }, [student]);

    if (!isOpen || !student) return null;

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('admin.pendaftar.update', student.id), {
            onSuccess: () => {
                setIsEditing(false);
            }
        });
    };

    const handleDelete = () => {
        router.delete(route('admin.pendaftar.destroy', student.id), {
            onSuccess: () => {
                setIsConfirmDeleteOpen(false);
                onClose();
            }
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-slate-900 leading-normal">
                <div className="bg-white w-full max-w-2xl rounded-[3rem] p-6 md:p-10 shadow-[0_50px_100px_rgba(30,41,59,0.25)] ring-1 ring-slate-100 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto no-scrollbar relative z-50">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-emerald-100/50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                                <DocumentMagnifyingGlassIcon className="w-9 h-9" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-1">Detail Pendaftar</h3>
                                <p className="text-slate-400 font-mono text-[10px] font-black uppercase tracking-widest">{student.reg_id}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {!isEditing && (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="p-3 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-2xl transition-all hover:scale-110 active:scale-95"
                                >
                                    <PencilSquareIcon className="w-5 h-5" />
                                </button>
                            )}
                            <button 
                                onClick={() => setIsConfirmDeleteOpen(true)}
                                className="p-3 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-2xl transition-all hover:scale-110 active:scale-95"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={onClose} 
                                className="p-3 hover:bg-slate-50 rounded-full text-slate-300 hover:text-slate-900 transition-all hover:rotate-90"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleUpdate}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nama Lengkap</label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-slate-700 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)} 
                                    />
                                ) : (
                                    <p className="font-black text-slate-900 text-lg px-1">{student.name}</p>
                                )}
                                {errors.name && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.name}</p>}
                            </div>

                            {/* NIK */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">NIK</label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        maxLength={16}
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-slate-700 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all" 
                                        value={data.nik} 
                                        onChange={e => setData('nik', e.target.value)} 
                                    />
                                ) : (
                                    <p className="font-black text-slate-900 text-lg px-1">{student.nik || '-'}</p>
                                )}
                                {errors.nik && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.nik}</p>}
                            </div>

                            {/* Birth Data */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tempat Lahir</label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-slate-700 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all" 
                                        value={data.place_birth} 
                                        onChange={e => setData('place_birth', e.target.value)} 
                                    />
                                ) : (
                                    <p className="font-bold text-slate-700 px-1">{student.place_birth}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tanggal Lahir</label>
                                {isEditing ? (
                                    <input 
                                        type="date" 
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-slate-700 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all" 
                                        value={data.date_birth} 
                                        onChange={e => setData('date_birth', e.target.value)} 
                                    />
                                ) : (
                                    <p className="font-bold text-slate-700 px-1">{student.date_birth}</p>
                                )}
                            </div>

                            {/* Parents & School */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Wali/Orang Tua</label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-slate-700 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all" 
                                        value={data.parent_name} 
                                        onChange={e => setData('parent_name', e.target.value)} 
                                    />
                                ) : (
                                    <p className="font-bold text-slate-700 px-1">{student.parent_name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Sekolah Asal</label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-slate-700 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all" 
                                        value={data.school_origin} 
                                        onChange={e => setData('school_origin', e.target.value)} 
                                    />
                                ) : (
                                    <p className="font-bold text-slate-700 px-1">{student.school_origin}</p>
                                )}
                            </div>

                            {/* Contacts */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">No. WhatsApp</label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-slate-700 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all" 
                                        value={data.whatsapp} 
                                        onChange={e => setData('whatsapp', e.target.value)} 
                                    />
                                ) : (
                                    <p className="font-black text-emerald-600 px-1">{student.whatsapp}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Metode Bayar</label>
                                {isEditing ? (
                                    <select 
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-slate-700 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all" 
                                        value={data.payment_method} 
                                        onChange={e => setData('payment_method', e.target.value)}
                                    >
                                        <option value="cash">PAGUYUBAN (CASH)</option>
                                        <option value="transfer">TRANSFER BANK</option>
                                    </select>
                                ) : (
                                    <p className="font-black text-slate-900 px-1 uppercase tracking-widest text-[11px]">{student.payment_method}</p>
                                )}
                            </div>

                            <div className="col-span-full space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Alamat Lengkap</label>
                                {isEditing ? (
                                    <textarea 
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-slate-700 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all h-24" 
                                        value={data.address} 
                                        onChange={e => setData('address', e.target.value)} 
                                    />
                                ) : (
                                    <p className="font-bold text-slate-700 px-1 leading-relaxed">{student.address}</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-slate-50/50 p-8 md:p-10 rounded-4xl space-y-10 border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-2.5 h-10 bg-emerald-500 rounded-full shadow-lg shadow-emerald-200"></div>
                                <h4 className="font-black text-slate-900 uppercase tracking-tighter text-xl leading-none">Status & Verifikasi</h4>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Status Pendaftaran</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-700 focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500/20 py-4 px-6 transition-all appearance-none text-xs"
                                    >
                                        <option value="pending">🟡 Menunggu Verifikasi</option>
                                        <option value="verified">🟢 Terverifikasi (Diterima)</option>
                                        <option value="rejected">🔴 Ditolak / Dibatalkan</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Status Pembayaran</label>
                                    <select
                                        value={data.payment_status}
                                        onChange={(e) => setData('payment_status', e.target.value)}
                                        className="w-full bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-700 focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500/20 py-4 px-6 transition-all appearance-none text-xs"
                                    >
                                        <option value="unpaid">⚪ Belum Ada Pembayaran</option>
                                        <option value="paid">🟡 Menunggu Konfirmasi Bank</option>
                                        <option value="verified">🟢 Lunas Terverifikasi</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col md:flex-row gap-5">
                            {isEditing ? (
                                <>
                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="grow py-5 bg-emerald-600 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-3xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-emerald-200 active:scale-95 disabled:opacity-50"
                                    >
                                        <CheckCircleIcon className="w-5 h-5" /> Simpan Perubahan
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="grow py-5 bg-slate-100 text-slate-500 font-black uppercase tracking-[0.2em] text-[11px] rounded-3xl hover:bg-slate-200 transition-all active:scale-95"
                                    >
                                        Batalkan
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        type="button"
                                        onClick={() => onUpdateStatus(student.id, data.status, data.payment_status)}
                                        disabled={processing}
                                        className="grow py-5 bg-emerald-600 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-3xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-emerald-200 active:scale-95 disabled:opacity-50"
                                    >
                                        Perbarui Status Saja
                                    </button>
                                    <button 
                                        type="button"
                                        className="grow py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-3xl hover:bg-slate-800 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-200 active:scale-95"
                                    >
                                        Cetak Dokumen PDF
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <ConfirmModal 
                isOpen={isConfirmDeleteOpen}
                onClose={() => setIsConfirmDeleteOpen(false)}
                onConfirm={handleDelete}
                title="Hapus Data Pendaftar"
                message="Data pendaftar ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan."
                confirmText="Ya, Hapus Data"
                type="danger"
            />
        </>
    );
};

export default StudentDetailModal;

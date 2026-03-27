import React, { useState, useEffect } from 'react';
import { 
    XMarkIcon, 
    DocumentMagnifyingGlassIcon,
    PencilSquareIcon,
    TrashIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useForm, router } from '@inertiajs/react';

const StudentDetailModal = ({ student, isOpen, onClose, onUpdateStatus }) => {
    const [isEditing, setIsEditing] = useState(false);
    
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
        if (confirm('Apakah Anda yakin ingin menghapus data pendaftar ini?')) {
            router.delete(route('admin.pendaftar.destroy', student.id), {
                onSuccess: () => onClose()
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-slate-900 leading-normal">
            <div className="bg-white w-full max-w-2xl rounded-2xl p-6 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">
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
                    <div className="flex items-center gap-2">
                        {!isEditing && (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="p-2 bg-slate-100 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors"
                            >
                                <PencilSquareIcon className="w-5 h-5" />
                            </button>
                        )}
                        <button 
                            onClick={handleDelete}
                            className="p-2 bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {/* Name */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Nama Lengkap</label>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-emerald-500" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                />
                            ) : (
                                <p className="font-bold border-b border-transparent py-1">{student.name}</p>
                            )}
                            {errors.name && <p className="text-rose-500 text-[10px] font-bold">{errors.name}</p>}
                        </div>

                        {/* NIK */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">NIK</label>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    maxLength={16}
                                    className="w-full bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-emerald-500" 
                                    value={data.nik} 
                                    onChange={e => setData('nik', e.target.value)} 
                                />
                            ) : (
                                <p className="font-bold border-b border-transparent py-1">{student.nik || '-'}</p>
                            )}
                            {errors.nik && <p className="text-rose-500 text-[10px] font-bold">{errors.nik}</p>}
                        </div>

                        {/* Birth Data */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tempat Lahir</label>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-emerald-500" 
                                    value={data.place_birth} 
                                    onChange={e => setData('place_birth', e.target.value)} 
                                />
                            ) : (
                                <p className="font-bold border-b border-transparent py-1">{student.place_birth}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tanggal Lahir</label>
                            {isEditing ? (
                                <input 
                                    type="date" 
                                    className="w-full bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-emerald-500" 
                                    value={data.date_birth} 
                                    onChange={e => setData('date_birth', e.target.value)} 
                                />
                            ) : (
                                <p className="font-bold border-b border-transparent py-1">{student.date_birth}</p>
                            )}
                        </div>

                        {/* Parents & School */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Wali/Orang Tua</label>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-emerald-500" 
                                    value={data.parent_name} 
                                    onChange={e => setData('parent_name', e.target.value)} 
                                />
                            ) : (
                                <p className="font-bold border-b border-transparent py-1">{student.parent_name}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sekolah Asal</label>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-emerald-500" 
                                    value={data.school_origin} 
                                    onChange={e => setData('school_origin', e.target.value)} 
                                />
                            ) : (
                                <p className="font-bold border-b border-transparent py-1">{student.school_origin}</p>
                            )}
                        </div>

                        {/* Contacts */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">No. WhatsApp</label>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-emerald-500" 
                                    value={data.whatsapp} 
                                    onChange={e => setData('whatsapp', e.target.value)} 
                                />
                            ) : (
                                <p className="font-bold border-b border-transparent py-1">{student.whatsapp}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Metode Bayar</label>
                            {isEditing ? (
                                <select 
                                    className="w-full bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-emerald-500" 
                                    value={data.payment_method} 
                                    onChange={e => setData('payment_method', e.target.value)}
                                >
                                    <option value="cash">PAGUYUBAN (CASH)</option>
                                    <option value="transfer">TRANSFER BANK</option>
                                </select>
                            ) : (
                                <p className="font-bold border-b border-transparent py-1 uppercase">{student.payment_method}</p>
                            )}
                        </div>

                        <div className="col-span-full space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Alamat Lengkap</label>
                            {isEditing ? (
                                <textarea 
                                    className="w-full bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-emerald-500 h-24" 
                                    value={data.address} 
                                    onChange={e => setData('address', e.target.value)} 
                                />
                            ) : (
                                <p className="font-bold border-b border-transparent py-1">{student.address}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 md:p-8 rounded-4xl space-y-8 border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                            <h4 className="font-black text-slate-800 uppercase tracking-tighter">Status & Verifikasi</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Status Pendaftaran</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl text-sm font-black focus:ring-emerald-500 focus:border-emerald-500 py-3 px-4 transition-all"
                                >
                                    <option value="pending">🟡 Menunggu</option>
                                    <option value="verified">🟢 Terverifikasi (Diterima)</option>
                                    <option value="rejected">🔴 Ditolak</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Status Pembayaran</label>
                                <select
                                    value={data.payment_status}
                                    onChange={(e) => setData('payment_status', e.target.value)}
                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl text-sm font-black focus:ring-emerald-500 focus:border-emerald-500 py-3 px-4 transition-all"
                                >
                                    <option value="unpaid">⚪ Belum Bayar</option>
                                    <option value="paid">🟡 Sudah Bayar (Butuh Cek)</option>
                                    <option value="verified">🟢 Terverifikasi (Lunas)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col md:flex-row gap-4">
                        {isEditing ? (
                            <>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="grow py-4 bg-emerald-600 text-white font-black uppercase tracking-widest text-[11px] rounded-3xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/10 active:scale-95"
                                >
                                    <CheckCircleIcon className="w-5 h-5" /> Simpan Perubahan
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="grow py-4 bg-slate-100 text-slate-500 font-black uppercase tracking-widest text-[11px] rounded-3xl hover:bg-slate-200 transition-all active:scale-95"
                                >
                                    Batal
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    type="button"
                                    onClick={() => onUpdateStatus(student.id, data.status, data.payment_status)}
                                    disabled={processing}
                                    className="grow py-4 bg-emerald-600 text-white font-black uppercase tracking-widest text-[11px] rounded-3xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/10 active:scale-95"
                                >
                                    Update Status Saja
                                </button>
                                <button 
                                    type="button"
                                    className="grow py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-3xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95"
                                >
                                    Cetak PDF
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentDetailModal;

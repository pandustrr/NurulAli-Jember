import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    PhotoIcon, 
    TrashIcon, 
    PlusIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import ConfirmModal from '@/Components/Fragments/ConfirmModal';
import Toast from '@/Components/Fragments/Toast';

export default function ContohGambar({ gambar }) {
    // Form for New Gambar Document
    const { data: gambarData, setData: setGambarData, post: postGambar, reset: resetGambar, processing: processingGambar, errors: gambarErrors } = useForm({
        title: '',
        image: null,
    });

    const submitGambar = (e) => {
        e.preventDefault();
        postGambar(route('admin.ppdb-examples.store'), {
            onSuccess: () => resetGambar(),
            forceFormData: true,
        });
    };

    // Confirmation Modal States
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        onConfirm: () => {},
        title: '',
        message: '',
    });

    const openConfirm = (title, message, onConfirm) => {
        setConfirmModal({ isOpen: true, title, message, onConfirm });
    };

    const deleteGambar = (id) => {
        openConfirm(
            'Hapus Contoh Berkas',
            'Apakah Anda yakin ingin menghapus panduan gambar ini?',
            () => router.delete(route('admin.ppdb-examples.destroy', id))
        );
    };

    return (
        <AdminLayout 
            header="Contoh Gambar PPDB"
            icon={PhotoIcon}
            description="Manajemen gambar panduan dokumen pendaftaran untuk calon pendaftar."
        >
            <Head title="Admin - Contoh Gambar" />

            <div className="max-w-6xl mx-auto space-y-6 pb-20 font-medium">
                
                {/* 1. Header & Upload Form */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100/60 shadow-sm shadow-slate-200/20">
                    <div className="mb-8 pb-4 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                            <PlusIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">Upload Contoh Berkas</h3>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Tambahkan panduan gambar pendaftaran</p>
                        </div>
                    </div>

                    <form onSubmit={submitGambar} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-end">
                        <div className="space-y-3">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama / Label Berkas</label>
                            <input 
                                type="text"
                                value={gambarData.title}
                                onChange={e => setGambarData('title', e.target.value)}
                                className="w-full bg-slate-50/50 px-5 py-3.5 rounded-2xl text-[13px] border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all text-slate-700 outline-none font-bold"
                                placeholder="Misal: Contoh Scan Ijazah"
                            />
                            {gambarErrors.title && <p className="text-rose-500 text-[10px] font-bold ml-2 uppercase tracking-tight">{gambarErrors.title}</p>}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-stretch lg:items-end grow font-medium">
                            <div className="grow space-y-3 font-medium">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Pilih File (Gambar)</label>
                                <div className="relative group overflow-hidden rounded-2xl font-medium">
                                    <input 
                                        type="file"
                                        onChange={e => setGambarData('image', e.target.files[0])}
                                        className="w-full opacity-0 absolute inset-0 cursor-pointer z-10"
                                    />
                                    <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 px-5 py-3.5 rounded-2xl text-center group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all duration-300">
                                        <span className="text-[11px] font-black text-slate-400 group-hover:text-emerald-600 uppercase tracking-widest truncate block">
                                            {gambarData.image ? gambarData.image.name : 'Klik Untuk Cari Foto...'}
                                        </span>
                                    </div>
                                </div>
                                {gambarErrors.image && <p className="text-rose-500 text-[10px] font-bold ml-2 uppercase tracking-tight">{gambarErrors.image}</p>}
                            </div>

                            <button 
                                type="submit"
                                disabled={processingGambar}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-emerald-200/50 transition-all active:scale-95 disabled:opacity-50 shrink-0 h-[46px]"
                            >
                                {processingGambar ? 'Sedang Mengunggah...' : 'Upload Berkas'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* 2. Gallery Section */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100/60 shadow-sm shadow-slate-200/20">
                    <div className="mb-8 pb-4 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                            <PhotoIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">Daftar Gambar Dokumentasi</h3>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Koleksi panduan berkas saat ini</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {gambar.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center font-medium">
                                <PhotoIcon className="w-12 h-12 text-slate-200 mb-4" />
                                <span className="text-slate-300 font-black uppercase text-[10px] tracking-widest">Belum ada contoh gambar tersimpan</span>
                            </div>
                        )}
                        {gambar.map((g) => (
                            <div key={g.id} className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-500">
                                <div className="aspect-square overflow-hidden relative">
                                    <img 
                                        src={g.image} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                                        alt={g.title} 
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <button 
                                            onClick={() => deleteGambar(g.id)}
                                            className="w-full bg-rose-500/90 text-white py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all backdrop-blur-md flex items-center justify-center gap-2 transform translate-y-3 group-hover:translate-y-0 duration-300 shadow-lg"
                                        >
                                            <TrashIcon className="w-3.5 h-3.5" /> Hapus Berkas
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 text-center">
                                    <h4 className="text-[11px] font-black text-slate-700 uppercase tracking-widest truncate">{g.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <ConfirmModal 
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                type="danger"
            />

            <Toast />
        </AdminLayout>
    );
}

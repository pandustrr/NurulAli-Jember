import React from 'react';

export default function LembagaInfoModal({ isOpen, onClose, data, setData, onSubmit, editData, processing, errors }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-slate-900 overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300 my-8">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                        {editData ? 'Edit Info Lembaga' : 'Tambah Lembaga Baru'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 p-2 rounded-lg text-xs font-bold uppercase tracking-widest">Tutup</button>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Nama Lembaga Pendidikan</label>
                        <input
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            type="text"
                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-bold placeholder:font-normal"
                            placeholder="Contoh: Madrasah Aliyah (MA)"
                        />
                        {errors.title && <p className="text-rose-500 text-[10px] mt-1 font-bold">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Foto / Gambar Unggulan</label>
                            <input
                                onChange={e => setData('image', e.target.files[0])}
                                type="file"
                                accept="image/*"
                                className="w-full px-5 py-3 rounded-xl bg-slate-50 text-xs transition-all outline-none font-semibold text-slate-500"
                            />
                            {errors.image && <p className="text-rose-500 text-[10px] mt-1 font-bold">{errors.image}</p>}
                        </div>
                        <div className="h-14 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200 overflow-hidden">
                            {(data.image || editData?.image) ? (
                                <img
                                    src={data.image ? URL.createObjectURL(data.image) : editData.image}
                                    className="h-full w-full object-cover opacity-80"
                                    alt="preview"
                                />
                            ) : <span className="text-slate-300 text-[10px] uppercase font-bold tracking-widest italic">Preview Foto</span>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Deskripsi Singkat (Tampil di Beranda)</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            rows="2"
                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm placeholder:italic"
                            placeholder="Ringkasan tentang lembaga ini..."
                        />
                        {errors.description && <p className="text-rose-500 text-[10px] mt-1 font-bold">{errors.description}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Detail Lengkap (Tampil di Popup)</label>
                        <textarea
                            value={data.detailed_description}
                            onChange={e => setData('detailed_description', e.target.value)}
                            rows="5"
                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm placeholder:italic"
                            placeholder="Jelaskan secara mendalam tentang kurikulum, fasilitas, visi misi, dll..."
                        />
                        {errors.detailed_description && <p className="text-rose-500 text-[10px] mt-1 font-bold">{errors.detailed_description}</p>}
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="grow py-4 border border-slate-200 text-slate-600 font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-slate-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="grow py-4 bg-emerald-600 text-white font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-xl shadow-emerald-200/50"
                        >
                            {editData ? 'Simpan Info' : 'Tambah Lembaga'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ lembagas }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const { data, setData, post, reset, processing, errors } = useForm({
        title: '',
        description: '',
        detailed_description: '',
        image: null,
    });

    const openModal = (lembaga = null) => {
        if (lembaga) {
            setEditData(lembaga);
            setData({
                title: lembaga.title,
                description: lembaga.description,
                detailed_description: lembaga.detailed_description || '',
                image: null, // Don't set file input value
            });
        } else {
            setEditData(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();

        // Use post for both since we're sending files
        if (editData) {
            post(route('admin.lembaga.update', editData.id), {
                forceFormData: true,
                _method: 'PUT',
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.lembaga.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus lembaga ini?')) {
            post(route('admin.lembaga.destroy', id), {
                _method: 'DELETE'
            });
        }
    };

    return (
        <AdminLayout header="Kelola Lembaga Pendidikan">
            <Head title="Admin - Lembaga" />

            <div className="flex justify-between items-center mb-8">
                <div>
                    <p className="text-slate-500">Daftar semua unit lembaga pendidikan yang tampil di halaman publik.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all flex items-center gap-2"
                >
                    <span>➕</span> Tambah Lembaga
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lembagas.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            {item.image ? (
                                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover shadow-md" />
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-2xl text-slate-400">
                                    🏢
                                </div>
                            )}
                            <div className="flex gap-2">
                                <button onClick={() => openModal(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">✏️</button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors">🗑️</button>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">{item.title}</h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                        {item.detailed_description && (
                            <div className="mt-auto pt-4 border-t border-slate-50">
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">Punya Detail Popup</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-slate-900 overflow-y-auto">
                    <div className="bg-white w-full max-w-2xl rounded-2xl p-10 shadow-2xl animate-in fade-in zoom-in duration-300 my-8">
                        <h3 className="text-2xl font-bold mb-6">{editData ? 'Edit Lembaga' : 'Tambah Lembaga Baru'}</h3>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Nama Lembaga</label>
                                <input
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    type="text"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                                    placeholder="Contoh: Madrasah Aliyah (MA)"
                                />
                                {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Foto Lembaga (untuk Popup)</label>
                                    <input
                                        onChange={e => setData('image', e.target.files[0])}
                                        type="file"
                                        accept="image/*"
                                        className="w-full px-5 py-3 rounded-xl bg-slate-50 text-sm transition-all outline-none"
                                    />
                                    {errors.image && <p className="text-rose-500 text-xs mt-1">{errors.image}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Preview</label>
                                    <div className="h-12 flex items-center">
                                        {(data.image || editData?.image) ? (
                                            <img
                                                src={data.image ? URL.createObjectURL(data.image) : editData.image}
                                                className="h-full rounded-lg object-cover"
                                                alt="preview"
                                            />
                                        ) : <span className="text-slate-400 text-xs italic">Belum ada foto</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Deskripsi Singkat (Tampil di Card)</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="2"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                                    placeholder="Muncul di halaman utama lembaga..."
                                />
                                {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Deskripsi Lengkap (Tampil di Popup)</label>
                                <textarea
                                    value={data.detailed_description}
                                    onChange={e => setData('detailed_description', e.target.value)}
                                    rows="5"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                                    placeholder="Jelaskan secara detail tentang fasilitas, kurikulum, dll..."
                                />
                                {errors.detailed_description && <p className="text-rose-500 text-xs mt-1">{errors.detailed_description}</p>}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="grow py-4 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="grow py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-lg shadow-emerald-200"
                                >
                                    {editData ? 'Simpan Perubahan' : 'Tambah Lembaga'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

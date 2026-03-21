import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ lembagas }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        title: '',
        description: '',
        icon: '',
        color: '',
    });

    const openModal = (lembaga = null) => {
        if (lembaga) {
            setEditData(lembaga);
            setData({
                title: lembaga.title,
                description: lembaga.description,
                icon: lembaga.icon,
                color: lembaga.color,
            });
        } else {
            setEditData(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editData) {
            put(route('admin.lembaga.update', editData.id), {
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
            destroy(route('admin.lembaga.destroy', id));
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
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-200 transition-all flex items-center gap-2"
                >
                    <span>➕</span> Tambah Lembaga
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-6 font-bold text-slate-700">Icon</th>
                            <th className="p-6 font-bold text-slate-700">Nama Lembaga</th>
                            <th className="p-6 font-bold text-slate-700">Deskripsi</th>
                            <th className="p-6 font-bold text-slate-700">Warna</th>
                            <th className="p-6 font-bold text-slate-700 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lembagas.map((item) => (
                            <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="p-6">
                                    <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-xl`}>
                                        {item.icon}
                                    </div>
                                </td>
                                <td className="p-6 font-bold text-slate-900">{item.title}</td>
                                <td className="p-6 text-slate-500 text-sm max-w-xs truncate">{item.description}</td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.color}`}>{item.color}</span>
                                </td>
                                <td className="p-6 text-right space-x-2">
                                    <button onClick={() => openModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">✏️</button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-slate-900">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <h3 className="text-2xl font-bold mb-6">{editData ? 'Edit Lembaga' : 'Tambah Lembaga Baru'}</h3>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Nama Lembaga</label>
                                <input
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    type="text"
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                                    placeholder="Contoh: Madrasah Aliyah (MA)"
                                />
                                {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Deskripsi Singkat</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="3"
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                                />
                                {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Icon / Emoji</label>
                                    <input
                                        value={data.icon}
                                        onChange={e => setData('icon', e.target.value)}
                                        type="text"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                                        placeholder="📝"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Warna (Tailwind Class)</label>
                                    <input
                                        value={data.color}
                                        onChange={e => setData('color', e.target.value)}
                                        type="text"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                                        placeholder="bg-blue-50 text-blue-600"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-grow py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-grow py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
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

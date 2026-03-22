import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import LembagaCard from './Partials/LembagaCard';
import LembagaInfoModal from './Partials/LembagaInfoModal';
import { BuildingLibraryIcon, PlusIcon } from '@heroicons/react/24/outline';

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
                image: null,
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
        if (confirm('Apakah Anda yakin ingin menghapus lembaga ini? Seluruh data terkait akan hilang.')) {
            post(route('admin.lembaga.destroy', id), {
                _method: 'DELETE'
            });
        }
    };

    return (
        <AdminLayout 
            header="Kelola Lembaga Pendidikan" 
            icon={BuildingLibraryIcon}
            description="Pengaturan informasi visual dan profil lembaga pendidikan."
        >
            <Head title="Admin - Lembaga" />

            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mb-10">
                <button
                    onClick={() => openModal()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-200/50 transition-all flex items-center gap-3 active:scale-95"
                >
                    <PlusIcon className="w-4 h-4" /> Tambah Lembaga
                </button>
            </div>

            {lembagas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lembagas.map((item) => (
                        <LembagaCard 
                            key={item.id} 
                            item={item} 
                            onEdit={openModal} 
                            onDelete={handleDelete} 
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-16 flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                    <div className="bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-4">🏢</div>
                    <h3 className="font-bold text-slate-400">Belum ada lembaga pendidikan yang terdaftar.</h3>
                    <p className="text-slate-300 text-sm mt-1">Silakan klik tombol tambah untuk memulai.</p>
                </div>
            )}

            <LembagaInfoModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={data}
                setData={setData}
                onSubmit={submit}
                editData={editData}
                processing={processing}
                errors={errors}
            />
        </AdminLayout>
    );
}

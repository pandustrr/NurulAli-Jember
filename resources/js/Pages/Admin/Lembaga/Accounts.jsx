import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import LembagaAccountModal from './Partials/LembagaAccountModal';
import { 
    UserIcon, 
    EnvelopeIcon, 
    PhoneIcon, 
    PencilSquareIcon, 
    MagnifyingGlassIcon, 
    XMarkIcon, 
    PlusIcon, 
    IdentificationIcon 
} from '@heroicons/react/24/outline';

export default function Accounts({ lembagas }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all'); // all, completed, incomplete

    const { data, setData, post, reset, processing, errors } = useForm({
        admin_name: '',
        username: '',
        email: '',
        password: '',
        contact: '',
        title: '', // For potential quick add
        description: '', // For potential quick add
    });

    // Reactive Filter Logic
    const filteredLembagas = useMemo(() => {
        let items = lembagas.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.admin_name && item.admin_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.username && item.username.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        if (activeFilter === 'completed') {
            items = items.filter(item => item.username && item.password);
        } else if (activeFilter === 'incomplete') {
            items = items.filter(item => !item.username || !item.password);
        }

        return items;
    }, [searchQuery, activeFilter, lembagas]);

    const openAddModal = () => {
        setEditData(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (lembaga) => {
        setEditData(lembaga);
        setData({
            admin_name: lembaga.admin_name || '',
            username: lembaga.username || '',
            email: lembaga.email || '',
            password: '',
            contact: lembaga.contact || '',
        });
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

    return (
        <AdminLayout 
            header="Akun Pengelola Lembaga" 
            icon={IdentificationIcon}
            description="Manajemen akses administratif dan kredensial login setiap lembaga."
        >
            <Head title="Admin - Akun Lembaga" />

            <div className="mb-10 flex flex-col xl:flex-row xl:items-end justify-end gap-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Quick Filters */}
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                        <button 
                            onClick={() => setActiveFilter('all')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === 'all' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Semua ({lembagas.length})
                        </button>
                        <button 
                            onClick={() => setActiveFilter('completed')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === 'completed' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Sudah Set
                        </button>
                        <button 
                            onClick={() => setActiveFilter('incomplete')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === 'incomplete' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Belum Lengkap
                        </button>
                    </div>

                    <button 
                        onClick={openAddModal}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-200/50 flex items-center gap-2 transition-all active:scale-95"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Tambah Lembaga
                    </button>
                </div>
            </div>

            <div className="mb-6">
                {/* Search Bar */}
                <div className="relative w-full group max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ketik nama lembaga atau admin..."
                        className="block w-full pl-11 pr-10 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-300 hover:text-slate-700 transition-colors">
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-5 pl-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Lembaga</th>
                                <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Kepala / Admin</th>
                                <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Username Login</th>
                                <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Kontak & Email</th>
                                <th className="p-5 pr-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredLembagas.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="p-5 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-black">
                                                {item.title.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="block font-bold text-slate-800 tracking-tight">{item.title}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">ID: #{item.id.toString().padStart(3, '0')}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-sm font-bold text-slate-600">
                                        {item.admin_name || '-'}
                                    </td>
                                    <td className="p-5">
                                        <code className="bg-emerald-50 px-2.5 py-1 rounded-lg text-[11px] font-black text-emerald-700 tracking-tight border border-emerald-100 shadow-sm">
                                            {item.username || '(belum set)'}
                                        </code>
                                    </td>
                                    <td className="p-5">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                                                <EnvelopeIcon className="w-3.5 h-3.5 text-slate-400" />
                                                <span>{item.email || '-'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-slate-700 font-black">
                                                <PhoneIcon className="w-3.5 h-3.5 text-emerald-500" />
                                                <span>{item.contact || '-'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 pr-8 text-right">
                                        <button 
                                            onClick={() => openEditModal(item)}
                                            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm flex items-center gap-2 ml-auto active:scale-95"
                                        >
                                            <PencilSquareIcon className="w-3.5 h-3.5" />
                                            <span>Update Akun</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <LembagaAccountModal 
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

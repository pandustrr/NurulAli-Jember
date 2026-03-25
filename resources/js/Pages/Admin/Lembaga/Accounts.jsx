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

            <div className="max-w-6xl mx-auto space-y-6 pb-20 font-medium">
                {/* Static Filter & Search Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-100/30 p-5 rounded-2xl border border-slate-100 mb-8 font-bold">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 grow">
                        {/* Quick Filters (Pill Style) */}
                        <div className="flex bg-slate-200/50 p-1 rounded-xl border border-slate-200/50 font-bold shrink-0">
                            {[
                                { id: 'all', label: `Semua (${lembagas.length})` },
                                { id: 'completed', label: 'Lengkap' },
                                { id: 'incomplete', label: 'Belum Set' }
                            ].map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeFilter === filter.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/40'}`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {/* Modern Search Input */}
                        <div className="relative group grow max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className={`h-4 w-4 transition-colors duration-300 ${searchQuery ? 'text-emerald-500' : 'text-slate-400 group-focus-within:text-emerald-500'}`} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari lembaga atau nama pengelola..."
                                className="block w-full pl-10 pr-10 py-2.5 bg-white border border-slate-100 rounded-xl text-[11px] font-bold text-slate-700 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/30 outline-none transition-all"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')} 
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-300 hover:text-rose-500 transition-colors focus:outline-none"
                                >
                                    <XMarkIcon className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    <button 
                        onClick={openAddModal}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-slate-200/50 flex items-center justify-center gap-2.5 transition-all active:scale-95 shrink-0"
                    >
                        <PlusIcon className="w-4 h-4" />
                        <span>Tambah Lembaga</span>
                    </button>
                </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100/50">
                                <th className="p-4 pl-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lembaga Terdaftar</th>
                                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pengelola / Admin</th>
                                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Username Login</th>
                                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Informasi Kontak</th>
                                <th className="p-4 pr-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Opsi Pengelolaan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredLembagas.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/20 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 flex items-center justify-center text-base font-black transition-colors border border-slate-100">
                                                {item.title.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="block font-bold text-slate-800 tracking-tight text-[13px]">{item.title}</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Registered ID: #{item.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-[13px] font-bold text-slate-600">
                                        {item.admin_name || '-'}
                                    </td>
                                    <td className="p-4">
                                        <code className="bg-slate-50 group-hover:bg-emerald-50 px-2.5 py-1 rounded text-[10px] font-black text-slate-500 group-hover:text-emerald-700 tracking-tight border border-slate-100 group-hover:border-emerald-100 shadow-sm transition-all">
                                            {item.username || '(belum set)'}
                                        </code>
                                    </td>
                                    <td className="p-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                                                <EnvelopeIcon className="w-3.5 h-3.5 text-slate-300" />
                                                <span>{item.email || '-'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-700 font-black">
                                                <PhoneIcon className="w-3.5 h-3.5 text-emerald-500" />
                                                <span>{item.contact || '-'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <button 
                                            onClick={() => openEditModal(item)}
                                            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm flex items-center gap-2 ml-auto active:scale-95"
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

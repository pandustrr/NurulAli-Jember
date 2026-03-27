import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    CalendarDaysIcon, 
    ClipboardDocumentCheckIcon, 
    BanknotesIcon,
    PlusIcon,
    TrashIcon,
    TableCellsIcon,
    CalendarIcon,
    ClipboardDocumentListIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';
import ConfirmModal from '@/Components/Fragments/ConfirmModal';
import Toast from '@/Components/Fragments/Toast';

export default function Registration({ settings }) {
    const [activeTab, setActiveTab] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const t = params.get('tab');
        // Fallback to info if no tab or if tab was 'form' (since we removed it)
        return (t && t !== 'form') ? t : 'info'; 
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const t = params.get('tab');
        if (t && t !== activeTab && t !== 'form') setActiveTab(t);
    }, [window.location.search]);

    const { data, setData, post, processing } = useForm({
        ppdb_info: settings.ppdb_info || '',
        schedule: settings.schedule ? JSON.parse(settings.schedule) : [
            { label: 'Gelombang I', date: '1 Januari - 28 Februari 2026', active: true },
            { label: 'Gelombang II', date: '1 Maret - 30 April 2026', active: false },
            { label: 'Gelombang III', date: '1 Mei - 30 Juni 2026', active: false },
        ],
        requirements: settings.requirements ? JSON.parse(settings.requirements) : [],
        fees: settings.fees ? JSON.parse(settings.fees) : [],
    });

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

    // Schedule Helpers
    const addSchedule = () => setData('schedule', [...data.schedule, { label: '', date: '', active: false }]);
    const removeSchedule = (i) => setData('schedule', data.schedule.filter((_, index) => index !== i));
    const updateSchedule = (i, field, val) => {
        const next = [...data.schedule];
        next[i][field] = val;
        setData('schedule', next);
    };

    // Requirement Helpers
    const addReq = () => setData('requirements', [...data.requirements, '']);
    const removeReq = (i) => setData('requirements', data.requirements.filter((_, index) => index !== i));
    const updateReq = (i, val) => {
        const next = [...data.requirements];
        next[i] = val;
        setData('requirements', next);
    };

    // Fee Helpers
    const addFee = () => setData('fees', [...data.fees, { label: '', price: '' }]);
    const removeFee = (i) => setData('fees', data.fees.filter((_, index) => index !== i));
    const updateFee = (i, field, val) => {
        const next = [...data.fees];
        next[i][field] = val;
        setData('fees', next);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.ppdb-settings.update'));
    };

    return (
        <AdminLayout 
            header="Pengaturan Pendaftaran"
            icon={TableCellsIcon}
            description="Konfigurasi alur, jadwal, syarat, dan rincian biaya pendaftaran."
        >
            <Head title="Admin - Pengaturan Pendaftaran" />

            <div className="max-w-4xl mx-auto space-y-6 pb-20 font-medium">
                
                {/* Static Tab Navigation */}
                <div className="flex justify-center pb-8 border-b border-slate-100/60 mb-8 overflow-x-auto no-scrollbar">
                    <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50 font-bold shrink-0">
                        {[
                            { id: 'info', label: 'Informasi Umum', icon: InformationCircleIcon },
                            { id: 'schedule', label: 'Jadwal Gelombang', icon: CalendarDaysIcon },
                            { id: 'requirements', label: 'Persyaratan Berkas', icon: ClipboardDocumentCheckIcon },
                            { id: 'fees', label: 'Rincian Biaya', icon: BanknotesIcon },
                        ].map((tab) => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 shrink-0 ${activeTab === tab.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/40'}`}
                            >
                                <tab.icon className="w-3.5 h-3.5" /> 
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={submit} className="pb-10">
                    <div className="space-y-6">
                        {activeTab === 'info' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100/60">
                                <div className="mb-8 pb-4 border-b border-slate-50">
                                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Penjelasan / Alur Pendaftaran</h3>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Gunakan tab ini untuk menjelaskan tata cara & deskripsi pendaftaran</p>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Deskripsi Pendaftaran</label>
                                    <textarea 
                                        rows="12"
                                        value={data.ppdb_info}
                                        onChange={e => setData('ppdb_info', e.target.value)}
                                        className="w-full bg-slate-50/50 px-5 py-4 rounded-2xl text-[13px] border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all text-slate-700 outline-none font-bold leading-relaxed"
                                        placeholder="Tuliskan alur atau informasi penting di sini..."
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'schedule' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100/60">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-slate-50 gap-4">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                                            <CalendarIcon className="w-5 h-5 text-emerald-600" /> Jadwal Gelombang
                                        </h3>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Atur masa aktif pendaftaran santri baru</p>
                                    </div>
                                    <button type="button" onClick={addSchedule} className="w-full sm:w-auto bg-slate-900 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                        <PlusIcon className="w-4 h-4" /> Tambah Gelombang
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    {data.schedule.length === 0 && (
                                        <div className="text-center py-16 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200/60 text-slate-300 font-black uppercase text-[10px] tracking-widest font-medium">
                                            Belum ada jadwal gelombang dibuat.
                                        </div>
                                    )}
                                    {data.schedule.map((item, i) => (
                                        <div key={i} className="group relative flex flex-col md:flex-row gap-4 md:items-end bg-slate-50/30 p-5 rounded-2xl border border-slate-100/50 hover:bg-white hover:border-emerald-100 transition-all duration-300">
                                            <button 
                                                type="button" 
                                                onClick={() => openConfirm(
                                                    'Hapus Jadwal',
                                                    `Apakah Anda yakin ingin menghapus ${item.label || 'jadwal ini'}?`,
                                                    () => removeSchedule(i)
                                                )} 
                                                className="absolute top-4 right-4 text-rose-300 hover:text-rose-500 transition-colors"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                            
                                            <div className="grow space-y-2">
                                                <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1">Nama Gelombang</label>
                                                <input 
                                                    value={item.label} 
                                                    onChange={e => updateSchedule(i, 'label', e.target.value)} 
                                                    className="w-full bg-white md:bg-transparent px-4 py-3 rounded-xl md:rounded-none md:px-0 md:py-1.5 border border-slate-100 md:border-0 md:border-b-2 md:border-slate-200 md:focus:border-emerald-500 outline-none font-bold text-slate-700 text-[13px] transition-all" 
                                                    placeholder="Contoh: Gelombang I (Reguler)" 
                                                />
                                            </div>
                                            
                                            <div className="grow space-y-2">
                                                <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1">Rentang Tanggal</label>
                                                <input 
                                                    value={item.date} 
                                                    onChange={e => updateSchedule(i, 'date', e.target.value)} 
                                                    className="w-full bg-white md:bg-transparent px-4 py-3 rounded-xl md:rounded-none md:px-0 md:py-1.5 border border-slate-100 md:border-0 md:border-b-2 md:border-slate-200 md:focus:border-emerald-500 outline-none text-slate-600 text-[12px] font-medium transition-all" 
                                                    placeholder="Contoh: 1 Januari - 31 Maret" 
                                                />
                                            </div>

                                            <div className="flex items-center gap-3 h-10 px-4 bg-white/80 rounded-xl border border-slate-100 shadow-sm">
                                                <input 
                                                    type="checkbox" 
                                                    checked={item.active} 
                                                    onChange={e => updateSchedule(i, 'active', e.target.checked)} 
                                                    className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4 border-slate-200" 
                                                />
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest select-none cursor-pointer">Aktifkan</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'requirements' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100/60">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-slate-50 gap-4">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                                            <ClipboardDocumentListIcon className="w-5 h-5 text-emerald-600" /> Persyaratan Berkas
                                        </h3>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Daftar dokumen wajib yang harus diunggah</p>
                                    </div>
                                    <button type="button" onClick={addReq} className="w-full sm:w-auto bg-slate-900 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                        <PlusIcon className="w-4 h-4" /> Tambah Dokumen
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.requirements.length === 0 && (
                                        <div className="col-span-full text-center py-16 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200/60 text-slate-300 font-black uppercase text-[10px] tracking-widest font-medium">
                                            Belum ada persyaratan berkas ditambahkan.
                                        </div>
                                    )}
                                    {data.requirements.map((req, i) => (
                                        <div key={i} className="group flex gap-3 items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100/50 hover:bg-white hover:border-emerald-100 transition-all duration-300">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-black shrink-0">
                                                {i + 1}
                                            </div>
                                            <input 
                                                value={req} 
                                                onChange={e => updateReq(i, e.target.value)} 
                                                className="grow bg-transparent outline-none text-[13px] text-slate-600 font-bold tracking-tight placeholder:text-slate-300" 
                                                placeholder="Contoh: Kartu Keluarga (Asli)" 
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => openConfirm(
                                                    'Hapus Syarat',
                                                    'Apakah Anda yakin ingin menghapus persyaratan ini?',
                                                    () => removeReq(i)
                                                )} 
                                                className="text-rose-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <TrashIcon className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'fees' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100/60 font-medium">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-slate-50 gap-4">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                                            <BanknotesIcon className="w-5 h-5 text-emerald-600" /> Rincian Biaya
                                        </h3>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Estimasi biaya administrasi pendaftaran</p>
                                    </div>
                                    <button type="button" onClick={addFee} className="w-full sm:w-auto bg-slate-900 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                        <PlusIcon className="w-4 h-4" /> Tambah Item Biaya
                                    </button>
                                </div>
                                
                                <div className="space-y-3">
                                    {data.fees.length === 0 && (
                                        <div className="text-center py-16 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200/60 text-slate-300 font-black uppercase text-[10px] tracking-widest font-medium">
                                            Belum ada rincian biaya dibuat.
                                        </div>
                                    )}
                                    {data.fees.map((fee, i) => (
                                        <div key={i} className="group relative flex flex-col sm:flex-row gap-4 sm:items-center bg-slate-50/30 p-4 rounded-xl border border-slate-100/50 hover:bg-white hover:border-emerald-100 transition-all duration-300">
                                            <div className="grow">
                                                <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1">Komponen Biaya</label>
                                                <input 
                                                    value={fee.label} 
                                                    onChange={e => updateFee(i, 'label', e.target.value)} 
                                                    className="w-full bg-transparent font-black text-slate-700 outline-none text-[15px] tracking-tight" 
                                                    placeholder="Contoh: Infaq Gedung" 
                                                />
                                            </div>
                                            <div className="sm:w-48 sm:text-right">
                                                <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest sm:mr-1">Besaran Nominal</label>
                                                <input 
                                                    value={fee.price} 
                                                    onChange={e => updateFee(i, 'price', e.target.value)} 
                                                    className="w-full bg-transparent sm:text-right font-black text-emerald-600 outline-none text-[18px] tracking-tighter" 
                                                    placeholder="Rp 0" 
                                                />
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => openConfirm(
                                                    'Hapus Biaya',
                                                    `Hapus rincian biaya ${fee.label || 'ini'}?`,
                                                    () => removeFee(i)
                                                )} 
                                                className="absolute top-4 right-4 sm:static sm:p-2 text-rose-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Static Action Bar */}
                    <div className="flex justify-center pt-8">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-emerald-200/50 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            {processing ? 'Sedang Memproses...' : 'Simpan Seluruh Perubahan'}
                        </button>
                    </div>
                </form>
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

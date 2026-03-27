import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { 
    QuestionMarkCircleIcon, 
    PlusIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import ConfirmModal from '@/Components/Fragments/ConfirmModal';
import Toast from '@/Components/Fragments/Toast';

export default function Info({ settings }) {
    const [activeTab, setActiveTab] = useState('list'); // 'list', 'add'

    // Form for FAQ only
    const { data: settingsData, setData: setSettingsData, post: postSettings, processing: processingSettings } = useForm({
        faqs: settings.faqs ? JSON.parse(settings.faqs) : [],
    });

    // FAQ Handlers
    const addFaq = () => {
        setSettingsData('faqs', [...settingsData.faqs, { q: '', a: '' }]);
        setActiveTab('list');
    };
    
    const removeFaq = (i) => setSettingsData('faqs', settingsData.faqs.filter((_, index) => index !== i));
    
    const updateFaq = (i, field, val) => {
        const next = [...settingsData.faqs];
        next[i][field] = val;
        setSettingsData('faqs', next);
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

    const submitSettings = (e) => {
        e.preventDefault();
        postSettings(route('admin.ppdb-settings.update'));
    };

    return (
        <AdminLayout 
            header="Pusat FAQ PPDB"
            icon={QuestionMarkCircleIcon}
            description="Manajemen tanya jawab seputar pendaftaran santri baru."
        >
            <Head title="Admin - FAQ PPDB" />

            <div className="max-w-4xl mx-auto space-y-6 pb-20 font-medium">
                
                {/* FAQ Management Section */}
                <form onSubmit={submitSettings} className="pb-20">
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        
                        {/* Header & Add Button */}
                        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg shadow-emerald-200">
                                    <QuestionMarkCircleIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase">Daftar Tanya Jawab</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3 leading-none">Total {settingsData.faqs.length} FAQ Aktif</p>
                                </div>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => setSettingsData('faqs', [...settingsData.faqs, { q: '', a: '' }])}
                                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-slate-100/50 flex items-center gap-2.5"
                            >
                                <PlusIcon className="w-4 h-4" /> Tambah FAQ Baru
                            </button>
                        </div>

                        {/* FAQ List */}
                        <div className="space-y-4">
                            {settingsData.faqs.length === 0 && (
                                <div className="text-center py-24 bg-white rounded-[2.5rem] border border-slate-100/60 shadow-sm text-slate-300">
                                    <QuestionMarkCircleIcon className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                                    <p className="font-black uppercase text-[10px] tracking-[0.2em]">Belum ada data tanya jawab</p>
                                </div>
                            )}
                            {settingsData.faqs.map((faq, i) => (
                                <div key={i} className="group relative p-6 md:p-8 bg-white rounded-[2.5rem] border border-slate-100/60 hover:border-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500">
                                    <button 
                                        type="button" 
                                        onClick={() => openConfirm(
                                            'Hapus FAQ',
                                            'Apakah Anda yakin ingin menghapus tanya jawab ini?',
                                            () => removeFaq(i)
                                        )} 
                                        className="absolute top-8 right-8 text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition-all"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 ml-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pertanyaan #{i + 1}</label>
                                            </div>
                                            <input 
                                                value={faq.q} 
                                                onChange={e => updateFaq(i, 'q', e.target.value)} 
                                                className="w-full bg-slate-50/50 px-6 py-4 rounded-2xl font-bold border border-slate-100/60 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-slate-800 text-[14px]" 
                                                placeholder="Berikan pertanyaan yang sering diajukan..." 
                                            />
                                        </div>
                                        <div className="space-y-3 font-medium">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Jawaban Lengkap</label>
                                            <textarea 
                                                value={faq.a} 
                                                onChange={e => updateFaq(i, 'a', e.target.value)} 
                                                rows="3" 
                                                className="w-full bg-slate-50/50 px-6 py-4 rounded-2xl text-[13px] font-medium border border-slate-100/60 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-slate-600 leading-relaxed font-bold" 
                                                placeholder="Tuliskan jawaban informatif di sini..." 
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Static Action Bar at bottom */}
                    <div className="flex justify-center pt-8">
                        <button
                            type="submit"
                            disabled={processingSettings}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-emerald-200/50 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            {processingSettings ? 'Sedang Memproses...' : 'Simpan Seluruh Perubahan'}
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

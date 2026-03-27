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
                
                {/* Static Tab Navigation */}
                <div className="flex justify-center pb-8 border-b border-slate-100/60 mb-8">
                    <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50 font-bold shrink-0">
                        <button 
                            onClick={() => setActiveTab('list')}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'list' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/40'}`}
                        >
                            <QuestionMarkCircleIcon className="w-4 h-4" /> Daftar FAQ ({settingsData.faqs.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('add')}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'add' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/40'}`}
                        >
                            <PlusIcon className="w-4 h-4" /> Tambah FAQ
                        </button>
                    </div>
                </div>

                {/* Content Sections */}
                <form onSubmit={submitSettings} className="pb-10">
                    <div className="space-y-6">
                        {activeTab === 'list' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100/60 font-medium text-slate-700">
                                    <div className="mb-8 pb-4 border-b border-slate-50 flex items-center gap-4">
                                        <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                                            <QuestionMarkCircleIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-800 tracking-tight">Daftar Tanya Jawab</h3>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">FAQ yang akan tampil di halaman utama</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {settingsData.faqs.length === 0 && (
                                            <div className="text-center py-20 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200/60 text-slate-300 font-black uppercase text-[10px] tracking-widest font-medium">
                                                <QuestionMarkCircleIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                                Belum ada FAQ yang dibuat.
                                            </div>
                                        )}
                                        {settingsData.faqs.map((faq, i) => (
                                            <div key={i} className="group relative p-5 md:p-6 bg-slate-50/30 rounded-2xl border border-slate-100/50 hover:border-emerald-100 hover:bg-white transition-all duration-300 shadow-sm">
                                                <button 
                                                    type="button" 
                                                    onClick={() => openConfirm(
                                                        'Hapus FAQ',
                                                        'Apakah Anda yakin ingin menghapus tanya jawab ini?',
                                                        () => removeFaq(i)
                                                    )} 
                                                    className="absolute top-5 right-5 text-rose-300 hover:text-rose-500 transition-colors"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Pertanyaan #{i + 1}</label>
                                                        <input 
                                                            value={faq.q} 
                                                            onChange={e => updateFaq(i, 'q', e.target.value)} 
                                                            className="w-full bg-white px-5 py-3.5 rounded-xl font-bold border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-slate-800 text-[13px]" 
                                                            placeholder="Misal: Berapa biaya pendaftaran?" 
                                                        />
                                                    </div>
                                                    <div className="space-y-2 font-medium">
                                                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Jawaban</label>
                                                        <textarea 
                                                            value={faq.a} 
                                                            onChange={e => updateFaq(i, 'a', e.target.value)} 
                                                            rows="3" 
                                                            className="w-full bg-white px-5 py-3.5 rounded-xl text-[12px] font-medium border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-slate-600 leading-relaxed font-bold" 
                                                            placeholder="Tuliskan jawaban lengkap di sini..." 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'add' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100/60 text-center py-24 font-medium">
                                <div className="bg-emerald-50 w-20 h-20 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                                    <PlusIcon className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2 uppercase">Tambah Tanya Jawab</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-10 max-w-xs mx-auto">Sediakan informasi singkat bagi calon santri</p>
                                <button 
                                    type="button" 
                                    onClick={addFaq}
                                    className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-slate-200"
                                >
                                    Klik Untuk Tambah Slot FAQ
                                </button>
                            </div>
                        )}
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

import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Info({ settings }) {
    const { data, setData, post, processing } = useForm({
        faqs: settings.faqs ? JSON.parse(settings.faqs) : [],
    });

    const addFaq = () => setData('faqs', [...data.faqs, { q: '', a: '' }]);
    const removeFaq = (i) => setData('faqs', data.faqs.filter((_, index) => index !== i));
    const updateFaq = (i, field, val) => {
        const next = [...data.faqs];
        next[i][field] = val;
        setData('faqs', next);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.ppdb-settings.update'));
    };

    return (
        <AdminLayout header="Info PPDB (FAQ)">
            <Head title="Admin - Info PPDB" />

            <form onSubmit={submit} className="max-w-4xl space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Daftar Pertanyaan Umum (FAQ)</h3>
                            <p className="text-sm text-slate-500 mt-1">Kelola pertanyaan yang sering diajukan oleh wali santri.</p>
                        </div>
                        <button 
                            type="button" 
                            onClick={addFaq} 
                            className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-colors"
                        >
                            + Tambah FAQ
                        </button>
                    </div>
                    
                    <div className="space-y-6">
                        {data.faqs.length === 0 && (
                            <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
                                Belum ada FAQ. Klik "+ Tambah FAQ" untuk memulai.
                            </div>
                        )}
                        {data.faqs.map((faq, i) => (
                            <div key={i} className="space-y-3 p-6 bg-slate-50/50 rounded-xl relative group border border-transparent hover:border-emerald-100 hover:bg-white transition-all shadow-sm hover:shadow-md">
                                <button 
                                    type="button" 
                                    onClick={() => removeFaq(i)} 
                                    className="absolute top-4 right-4 text-rose-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider"
                                >
                                    🗑️ Hapus
                                </button>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Pertanyaan</label>
                                    <input 
                                        value={faq.q} 
                                        onChange={e => updateFaq(i, 'q', e.target.value)} 
                                        className="w-full bg-white px-5 py-3 rounded-xl font-bold border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700" 
                                        placeholder="Tulis pertanyaan..." 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Jawaban</label>
                                    <textarea 
                                        value={faq.a} 
                                        onChange={e => updateFaq(i, 'a', e.target.value)} 
                                        rows="3" 
                                        className="w-full bg-white px-5 py-3 rounded-xl text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-600" 
                                        placeholder="Tulis jawaban..." 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-emerald-200 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Info PPDB'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

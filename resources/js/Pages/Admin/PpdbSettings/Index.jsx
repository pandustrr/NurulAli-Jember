import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ settings }) {
    const { data, setData, post, processing } = useForm({
        schedule: settings.schedule ? JSON.parse(settings.schedule) : [],
        requirements: settings.requirements ? JSON.parse(settings.requirements) : [],
        fees: settings.fees ? JSON.parse(settings.fees) : [],
        faqs: settings.faqs ? JSON.parse(settings.faqs) : [],
    });

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

    // FAQ Helpers
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
        <AdminLayout header="Pengaturan PPDB">
            <Head title="Admin - PPDB Settings" />

            <form onSubmit={submit} className="space-y-12 max-w-5xl">
                {/* Schedules */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-emerald-800 flex items-center gap-2"><span>📅</span> Jadwal Gelombang</h3>
                        <button type="button" onClick={addSchedule} className="text-emerald-600 text-sm font-bold">+ Tambah</button>
                    </div>
                    <div className="space-y-4">
                        {data.schedule.map((item, i) => (
                            <div key={i} className="flex gap-4 items-end bg-slate-50 p-4 rounded-xl">
                                <div className="grow space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-400">Label</label>
                                    <input value={item.label} onChange={e => updateSchedule(i, 'label', e.target.value)} className="w-full bg-transparent border-b border-slate-200 outline-none focus:border-emerald-500 font-bold text-slate-700" placeholder="Gelombang I" />
                                </div>
                                <div className="grow space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-400">Rentang Waktu</label>
                                    <input value={item.date} onChange={e => updateSchedule(i, 'date', e.target.value)} className="w-full bg-transparent border-b border-slate-200 outline-none focus:border-emerald-500 text-slate-600 text-sm" placeholder="Januari - Maret" />
                                </div>
                                <div className="flex items-center gap-2 h-10 px-4">
                                    <input type="checkbox" checked={item.active} onChange={e => updateSchedule(i, 'active', e.target.checked)} className="rounded text-emerald-600 focus:ring-emerald-500" />
                                    <label className="text-xs font-bold text-slate-500">Aktif</label>
                                </div>
                                <button type="button" onClick={() => removeSchedule(i)} className="text-rose-500 h-10 px-2 rounded-lg hover:bg-rose-50 transition-colors">🗑️</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requirements */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-emerald-800 flex items-center gap-2"><span>📋</span> Persyaratan Berkas</h3>
                        <button type="button" onClick={addReq} className="text-emerald-600 text-sm font-bold">+ Tambah</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.requirements.map((req, i) => (
                            <div key={i} className="flex gap-2 bg-slate-50 p-3 rounded-lg">
                                <span className="text-emerald-300 font-bold">#</span>
                                <input value={req} onChange={e => updateReq(i, e.target.value)} className="grow bg-transparent outline-none text-sm text-slate-600" />
                                <button type="button" onClick={() => removeReq(i)} className="text-rose-400 hover:text-rose-600">×</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fees */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-emerald-800 flex items-center gap-2"><span>💰</span> Rincian Biaya</h3>
                        <button type="button" onClick={addFee} className="text-emerald-600 text-sm font-bold">+ Tambah</button>
                    </div>
                    <div className="space-y-4">
                        {data.fees.map((fee, i) => (
                            <div key={i} className="flex gap-4 items-center border-b border-slate-100 pb-4">
                                <input value={fee.label} onChange={e => updateFee(i, 'label', e.target.value)} className="grow font-bold text-slate-700 outline-none" placeholder="Jenis Biaya" />
                                <input value={fee.price} onChange={e => updateFee(i, 'price', e.target.value)} className="w-48 text-right font-bold text-emerald-700 outline-none" placeholder="Rp 0" />
                                <button type="button" onClick={() => removeFee(i)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg">🗑️</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-emerald-800 flex items-center gap-2"><span>❓</span> FAQ (Tanya Jawab)</h3>
                        <button type="button" onClick={addFaq} className="text-emerald-600 text-sm font-bold">+ Tambah</button>
                    </div>
                    <div className="space-y-6">
                        {data.faqs.map((faq, i) => (
                            <div key={i} className="space-y-2 p-6 bg-slate-50 rounded-xl relative group">
                                <button type="button" onClick={() => removeFaq(i)} className="absolute top-4 right-4 text-rose-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">🗑️ Hapus</button>
                                <input value={faq.q} onChange={e => updateFaq(i, 'q', e.target.value)} className="w-full bg-white px-4 py-2 rounded-lg font-bold border border-slate-200 outline-none focus:border-emerald-500" placeholder="Pertanyaan?" />
                                <textarea value={faq.a} onChange={e => updateFaq(i, 'a', e.target.value)} rows="2" className="w-full bg-white px-4 py-2 rounded-lg text-sm border border-slate-200 outline-none focus:border-emerald-500" placeholder="Jawaban..." />
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
                        {processing ? 'Menyimpan...' : 'Update Pengaturan PPDB'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

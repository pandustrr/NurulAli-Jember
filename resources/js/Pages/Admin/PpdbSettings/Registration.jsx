import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Registration({ settings }) {
    const { data, setData, post, processing } = useForm({
        schedule: settings.schedule ? JSON.parse(settings.schedule) : [],
        requirements: settings.requirements ? JSON.parse(settings.requirements) : [],
        fees: settings.fees ? JSON.parse(settings.fees) : [],
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

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.ppdb-settings.update'));
    };

    return (
        <AdminLayout header="Pengaturan Pendaftaran PPDB">
            <Head title="Admin - Pendaftaran PPDB" />

            <form onSubmit={submit} className="space-y-10 max-w-5xl">
                {/* Schedules */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">📅 Jadwal Gelombang</h3>
                            <p className="text-sm text-slate-500 mt-1">Atur jadwal pembukaan dan penutupan pendaftaran.</p>
                        </div>
                        <button type="button" onClick={addSchedule} className="text-emerald-600 text-sm font-bold hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">+ Tambah Gelombang</button>
                    </div>
                    <div className="space-y-4">
                        {data.schedule.map((item, i) => (
                            <div key={i} className="flex gap-6 items-end bg-slate-50/50 p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:bg-white hover:border-emerald-100">
                                <div className="grow space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Nama Gelombang</label>
                                    <input value={item.label} onChange={e => updateSchedule(i, 'label', e.target.value)} className="w-full bg-transparent border-b-2 border-slate-200 outline-none focus:border-emerald-500 font-bold text-slate-700" placeholder="Gelombang I" />
                                </div>
                                <div className="grow space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Rentang Tanggal</label>
                                    <input value={item.date} onChange={e => updateSchedule(i, 'date', e.target.value)} className="w-full bg-transparent border-b-2 border-slate-200 outline-none focus:border-emerald-500 text-slate-600 text-sm" placeholder="Januari - Maret" />
                                </div>
                                <div className="flex items-center gap-2 h-10 px-4 bg-white/50 rounded-lg">
                                    <input type="checkbox" checked={item.active} onChange={e => updateSchedule(i, 'active', e.target.checked)} className="rounded text-emerald-600 focus:ring-emerald-500" />
                                    <label className="text-xs font-bold text-slate-500">Aktifkan</label>
                                </div>
                                <button type="button" onClick={() => removeSchedule(i)} className="text-rose-400 h-10 px-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors">🗑️</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requirements */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">📋 Persyaratan Berkas</h3>
                            <p className="text-sm text-slate-500 mt-1">Sediakan daftar berkas yang wajib dilampirkan santri.</p>
                        </div>
                        <button type="button" onClick={addReq} className="text-emerald-600 text-sm font-bold hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">+ Tambah Berkas</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.requirements.map((req, i) => (
                            <div key={i} className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-transparent hover:border-emerald-100 hover:bg-white transition-all group">
                                <span className="text-emerald-300 font-bold select-none">#</span>
                                <input value={req} onChange={e => updateReq(i, e.target.value)} className="grow bg-transparent outline-none text-sm text-slate-600 font-medium" placeholder="Contoh: Fotokopi KTP" />
                                <button type="button" onClick={() => removeReq(i)} className="text-rose-300 hover:text-rose-500 opacity-0 group-hover:opacity-100">×</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fees */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">💰 Rincian Biaya</h3>
                            <p className="text-sm text-slate-500 mt-1">Detail biaya administrasi pendaftaran santri baru.</p>
                        </div>
                        <button type="button" onClick={addFee} className="text-emerald-600 text-sm font-bold hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">+ Tambah Item Biaya</button>
                    </div>
                    <div className="space-y-3">
                        {data.fees.map((fee, i) => (
                            <div key={i} className="flex gap-4 items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100 hover:bg-white hover:border-emerald-100 transition-all shadow-sm">
                                <div className="grow">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Nama Item Biaya</label>
                                    <input value={fee.label} onChange={e => updateFee(i, 'label', e.target.value)} className="w-full bg-transparent font-bold text-slate-700 outline-none text-lg" placeholder="Uang Gedung / Seragam" />
                                </div>
                                <div className="w-48 text-right">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 mr-2">Besaran</label>
                                    <input value={fee.price} onChange={e => updateFee(i, 'price', e.target.value)} className="w-full text-right font-bold text-emerald-700 outline-none text-xl" placeholder="Rp 0" />
                                </div>
                                <button type="button" onClick={() => removeFee(i)} className="p-3 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all">🗑️</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-2xl font-bold shadow-2xl shadow-emerald-200 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Pengaturan Pendaftaran'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

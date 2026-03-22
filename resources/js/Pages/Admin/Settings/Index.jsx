import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ settings }) {
    // Parse JSON strings back to arrays if needed
    const missionArray = settings.mission ? JSON.parse(settings.mission) : [];

    const { data, setData, post, processing, errors } = useForm({
        school_name: settings.school_name || '',
        vision: settings.vision || '',
        mission: missionArray,
        history: settings.history || '',
        email: settings.email || '',
        phone: settings.phone || '',
        address: settings.address || '',
        maps_link: settings.maps_link || '',
    });

    const handleMissionChange = (index, value) => {
        const newMission = [...data.mission];
        newMission[index] = value;
        setData('mission', newMission);
    };

    const addMission = () => {
        setData('mission', [...data.mission, '']);
    };

    const removeMission = (index) => {
        const newMission = data.mission.filter((_, i) => i !== index);
        setData('mission', newMission);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout header="Pengaturan Website">
            <Head title="Admin - Settings" />

            <form onSubmit={submit} className="max-w-4xl space-y-8">
                {/* General Info */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-emerald-800 flex items-center gap-2">
                        <span>🏫</span> Informasi Umum
                    </h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Nama Sekolah / Pesantren</label>
                            <input
                                value={data.school_name}
                                onChange={e => setData('school_name', e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Visi</label>
                            <textarea
                                value={data.vision}
                                onChange={e => setData('vision', e.target.value)}
                                rows="3"
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-slate-700">Misi</label>
                                <button type="button" onClick={addMission} className="text-emerald-600 text-xs font-bold hover:underline">+ Tambah Misi</button>
                            </div>
                            {data.mission.map((m, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        value={m}
                                        onChange={e => handleMissionChange(i, e.target.value)}
                                        className="flex-grow px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
                                        placeholder={`Misi #${i + 1}`}
                                    />
                                    <button type="button" onClick={() => removeMission(i)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">🗑️</button>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Sejarah Singkat</label>
                            <textarea
                                value={data.history}
                                onChange={e => setData('history', e.target.value)}
                                rows="6"
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-emerald-800 flex items-center gap-2">
                        <span>📞</span> Kontak & Alamat
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Email</label>
                            <input
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Telepon / Whatsapp</label>
                            <input
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-slate-700">Alamat Lengkap</label>
                            <input
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-slate-700">Link Google Maps (URL)</label>
                            <input
                                value={data.maps_link}
                                onChange={e => setData('maps_link', e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-200 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

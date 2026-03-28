import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { PhoneIcon } from '@heroicons/react/24/outline';

export default function Index({ settings }) {
    const { data, setData, post, processing } = useForm({
        email: settings.email || '',
        phone: settings.phone || '',
        address: settings.address || '',
        maps_link: settings.maps_link || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.kontak.update'));
    };

    return (
        <AdminLayout 
            header="Pengaturan Kontak & Alamat"
            icon={PhoneIcon}
            description="Manajemen nomor telepon, email, dan lokasi fisik pondok pesantren."
        >
            <Head title="Admin - Kontak" />

            <form onSubmit={submit} className="max-w-4xl space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                            Informasi Kontak Utama
                        </h3>
                        <p className="text-sm text-slate-500 mt-2">Nomor WhatsApp dan Email yang Anda masukkan di sini akan berubah otomatis di **seluruh bagian website** (Halaman Kontak, Footer, dan tombol Fast-Response).</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-widest">Email Resmi Sekolah</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none font-medium text-slate-700 shadow-inner"
                                placeholder="sekolah@nurul-ali.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-widest">Nomor WhatsApp / Telp</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none font-medium text-slate-700 shadow-inner"
                                placeholder="0812XXXXXXXX"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-widest">Alamat Fisik Lengkap</label>
                            <textarea
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                rows="3"
                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none font-medium text-slate-700 shadow-inner resize-none"
                                placeholder="Jl. Raya No. 123, Kelurahan, Kecamatan, Kota..."
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-widest">Link Google Maps (Iframe/URL)</label>
                            <input
                                type="text"
                                value={data.maps_link}
                                onChange={e => setData('maps_link', e.target.value)}
                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none font-medium text-slate-700 shadow-inner"
                                placeholder="https://goo.gl/maps/..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-2xl font-bold shadow-2xl shadow-emerald-200 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Update Informasi Kontak'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

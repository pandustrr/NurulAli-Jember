import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Public/Navbar';
import Footer from '@/Components/Public/Footer';

export default function Pendaftaran({ settings }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        nik: '',
        place_birth: '',
        date_birth: '',
        parent_name: '',
        whatsapp: '',
        address: '',
        school_origin: '',
        payment_method: 'cash',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('pendaftaran.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={`Pendaftaran Online - ${settings.site_name || 'Nurul Ali'}`} />

            <Navbar />

            <main className="pt-24 pb-20 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-emerald-900 -z-10 skew-y-3 origin-top-right"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
                    <div className="bg-white/90 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] shadow-2xl border border-white/20">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Pendaftaran Santri Baru</span>
                            <h2 className="text-4xl font-bold text-slate-900">Formulir Pendaftaran</h2>
                            <p className="mt-3 text-slate-600">Silakan isi formulir di bawah ini dengan lengkap dan benar.</p>
                        </div>

                        {recentlySuccessful && (
                            <div className="mb-10 p-8 bg-emerald-50 text-emerald-900 rounded-[2rem] border border-emerald-200 shadow-inner animate-in zoom-in-95">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl shadow-sm">✅</div>
                                    <div>
                                        <h3 className="text-xl font-bold">Pendaftaran Berhasil!</h3>
                                        <p className="text-emerald-700/80 leading-relaxed">
                                            Data Anda telah kami terima. Tim administrasi akan segera melakukan verifikasi berkas dan menghubungi Anda melalui WhatsApp.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-12">
                            {/* Section 1: Data Santri */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold">1</div>
                                    <h3 className="text-xl font-bold text-slate-800">Identitas Calon Santri</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                                            placeholder="Sesuai Ijazah/Akte"
                                            required
                                        />
                                        {errors.name && <p className="text-rose-500 text-xs font-bold">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">NIK</label>
                                        <input
                                            type="text"
                                            value={data.nik}
                                            onChange={e => setData('nik', e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                                            placeholder="16 Digit NIK"
                                            maxLength="16"
                                            required
                                        />
                                        {errors.nik && <p className="text-rose-500 text-xs font-bold">{errors.nik}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Tempat Lahir</label>
                                        <input
                                            type="text"
                                            value={data.place_birth}
                                            onChange={e => setData('place_birth', e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                                            placeholder="Kota Kelahiran"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Tanggal Lahir</label>
                                        <input
                                            type="date"
                                            value={data.date_birth}
                                            onChange={e => setData('date_birth', e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">Asal Sekolah</label>
                                        <input
                                            type="text"
                                            value={data.school_origin}
                                            onChange={e => setData('school_origin', e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                                            placeholder="e.g. MI Nurul Ali"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">Alamat Lengkap</label>
                                        <textarea
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none h-28"
                                            placeholder="Jl, RT/RW, Desa, Kecamatan, Kabupaten"
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Data Wali */}
                            <div className="space-y-8 pt-6">
                                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold">2</div>
                                    <h3 className="text-xl font-bold text-slate-800">Orang Tua / Wali</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Nama Ayah/Ibu/Wali</label>
                                        <input
                                            type="text"
                                            value={data.parent_name}
                                            onChange={e => setData('parent_name', e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                                            placeholder="Nama Wali Penanggung Jawab"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Nomor WhatsApp</label>
                                        <input
                                            type="tel"
                                            value={data.whatsapp}
                                            onChange={e => setData('whatsapp', e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                                            placeholder="08xxxxxxxxxx"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Pembayaran */}
                            <div className="space-y-8 pt-6">
                                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold">3</div>
                                    <h3 className="text-xl font-bold text-slate-800">Metode Pembayaran</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`relative flex flex-col p-6 rounded-3xl border-2 transition-all cursor-pointer ${data.payment_method === 'cash' ? 'border-emerald-500 bg-emerald-50/50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                                        <input type="radio" name="payment_method" value="cash" checked={data.payment_method === 'cash'} onChange={e => setData('payment_method', e.target.value)} className="sr-only" />
                                        <span className="text-2xl mb-2">💵</span>
                                        <span className="font-bold text-slate-900 leading-none">Tunai</span>
                                        <span className="text-slate-500 text-xs mt-2 italic font-medium">Bayar di Pondok</span>
                                        {data.payment_method === 'cash' && <div className="absolute top-4 right-4 text-emerald-600">✓</div>}
                                    </label>
                                    <label className={`relative flex flex-col p-6 rounded-3xl border-2 transition-all cursor-pointer ${data.payment_method === 'transfer' ? 'border-emerald-500 bg-emerald-50/50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                                        <input type="radio" name="payment_method" value="transfer" checked={data.payment_method === 'transfer'} onChange={e => setData('payment_method', e.target.value)} className="sr-only" />
                                        <span className="text-2xl mb-2">🏦</span>
                                        <span className="font-bold text-slate-900 leading-none">Transfer</span>
                                        <span className="text-slate-500 text-xs mt-2 italic font-medium">Melalui MBanking/ATM</span>
                                        {data.payment_method === 'transfer' && <div className="absolute top-4 right-4 text-emerald-600">✓</div>}
                                    </label>
                                </div>
                            </div>

                            <div className="pt-8 w-full">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-3xl shadow-[0_20px_50px_-15px_rgba(5,150,105,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
                                >
                                    {processing ? 'Sedang Diproses...' : 'Kirim Pendaftaran'}
                                </button>
                                <p className="mt-6 text-center text-slate-400 text-xs font-medium uppercase tracking-widest leading-relaxed">
                                    Dengan menekan tombol di atas, Anda menyetujui <br /> Ketentuan & Kebijakan Pondok Pesantren Nurul Ali
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

import React from 'react';
import { useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { CheckCircleIcon, BanknotesIcon, BuildingLibraryIcon, PhotoIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function Pendaftaran({ settings, examples = [] }) {
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
        <PublicLayout title={`Pendaftaran Online - ${settings.site_name || 'Nurul Ali'}`}>
            <div className="bg-slate-50 min-h-screen">
                <main className="pb-20 relative overflow-hidden">
                    {/* Background Decor */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-emerald-900 -z-10 skew-y-3 origin-top-right"></div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 pt-32">
                        <div className="bg-white/90 backdrop-blur-xl p-8 md:p-16 rounded-2xl shadow-2xl border border-white/20">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Pendaftaran Santri Baru</span>
                                <h2 className="text-4xl font-bold text-slate-900">Formulir Pendaftaran</h2>
                                <p className="mt-3 text-slate-600">Silakan isi formulir di bawah ini dengan lengkap dan benar.</p>
                            </div>

                            {/* Panduan Visual Section */}
                            {examples.length > 0 && (
                                <div className="mb-16 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
                                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                        <PhotoIcon className="w-8 h-8 text-emerald-600" />
                                        <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Panduan Visual Berkas</h3>
                                        <div className="ml-auto flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mt-0.5">Contoh</span>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {examples.map((ex) => (
                                            <div key={ex.id} className="group space-y-3">
                                                <div className="relative aspect-4/5 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                                                    <img 
                                                        src={ex.image} 
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-zoom-in" 
                                                        alt={ex.title} 
                                                    />
                                                    <div className="absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-slate-900/90 to-transparent pt-8">
                                                        <p className="text-white text-[9px] font-black uppercase tracking-widest text-center truncate">{ex.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                                        <InformationCircleIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                        <p className="text-[11px] text-slate-500 leading-relaxed font-bold">
                                            Gunakan contoh di atas sebagai acuan dokumen yang harus disiapkan. Pastikan dokumen Anda terbaca jelas (tidak buram).
                                        </p>
                                    </div>
                                </div>
                            )}

                            {recentlySuccessful && (
                                <div className="mb-10 p-8 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 shadow-inner animate-in zoom-in-95">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                                            <CheckCircleIcon className="w-10 h-10" />
                                        </div>
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
                                        <div className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold">1</div>
                                        <h3 className="text-xl font-bold text-slate-800">Identitas Calon Santri</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
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
                                                className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
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
                                                className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
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
                                                className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-bold text-slate-700">Asal Sekolah</label>
                                            <input
                                                type="text"
                                                value={data.school_origin}
                                                onChange={e => setData('school_origin', e.target.value)}
                                                className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                                                placeholder="e.g. MI Nurul Ali"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-bold text-slate-700">Alamat Lengkap</label>
                                            <textarea
                                                value={data.address}
                                                onChange={e => setData('address', e.target.value)}
                                                className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none h-28 font-bold leading-relaxed"
                                                placeholder="Jl, RT/RW, Desa, Kecamatan, Kabupaten"
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Data Wali */}
                                <div className="space-y-8 pt-6">
                                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                        <div className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold">2</div>
                                        <h3 className="text-xl font-bold text-slate-800">Orang Tua / Wali</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Nama Ayah/Ibu/Wali</label>
                                            <input
                                                type="text"
                                                value={data.parent_name}
                                                onChange={e => setData('parent_name', e.target.value)}
                                                className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
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
                                                className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                                                placeholder="08xxxxxxxxxx"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Pembayaran */}
                                <div className="space-y-8 pt-6">
                                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                        <div className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold">3</div>
                                        <h3 className="text-xl font-bold text-slate-800">Metode Pembayaran</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className={`relative flex flex-col p-6 rounded-lg border-2 transition-all cursor-pointer ${data.payment_method === 'cash' ? 'border-emerald-500 bg-emerald-50/50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                                            <input type="radio" name="payment_method" value="cash" checked={data.payment_method === 'cash'} onChange={e => setData('payment_method', e.target.value)} className="sr-only" />
                                            <BanknotesIcon className="w-10 h-10 mb-4 text-emerald-600" />
                                            <span className="font-bold text-slate-900 leading-none">Tunai</span>
                                            <span className="text-slate-500 text-xs mt-2 font-medium">Bayar di Pondok</span>
                                            {data.payment_method === 'cash' && <div className="absolute top-4 right-4 text-emerald-600 font-bold">✓</div>}
                                        </label>
                                        <label className={`relative flex flex-col p-6 rounded-lg border-2 transition-all cursor-pointer ${data.payment_method === 'transfer' ? 'border-emerald-500 bg-emerald-50/50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                                            <input type="radio" name="payment_method" value="transfer" checked={data.payment_method === 'transfer'} onChange={e => setData('payment_method', e.target.value)} className="sr-only" />
                                            <BuildingLibraryIcon className="w-10 h-10 mb-4 text-emerald-600" />
                                            <span className="font-bold text-slate-900 leading-none">Transfer</span>
                                            <span className="text-slate-500 text-xs mt-2 font-medium">Melalui MBanking/ATM</span>
                                            {data.payment_method === 'transfer' && <div className="absolute top-4 right-4 text-emerald-600 font-bold">✓</div>}
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-8 w-full">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-lg shadow-[0_20px_50px_-15px_rgba(5,150,105,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
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
            </div>
        </PublicLayout>
    );
}

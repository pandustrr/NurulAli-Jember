import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    CheckCircleIcon, 
    BanknotesIcon, 
    BuildingLibraryIcon, 
    PhotoIcon, 
    InformationCircleIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    UserIcon,
    UsersIcon,
    CreditCardIcon
} from '@heroicons/react/24/outline';

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

    const [step, setStep] = useState(1);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const submit = (e) => {
        e.preventDefault();
        post(route('pendaftaran.store'), {
            onSuccess: () => {
                reset();
                setStep(1);
            },
        });
    };

    return (
        <PublicLayout title={`Pendaftaran Online - ${settings.site_name || 'Nurul Ali'}`}>
            <div className="bg-slate-50 min-h-screen font-medium">
                <main className="pt-0 pb-24 relative overflow-hidden">
                    {/* Header Hero - Matches Info PPDB Style */}
                    <div className="bg-emerald-950 h-[578px] flex items-center justify-center px-4 relative overflow-hidden text-center">
                        <div className="absolute inset-0 opacity-10">
                            <div className="grid grid-cols-12 h-full">
                                {[...Array(48)].map((_, i) => (
                                    <div key={i} className="border-r border-b border-emerald-400/20"></div>
                                ))}
                            </div>
                        </div>
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <span className="inline-block px-5 py-2 bg-emerald-600/30 backdrop-blur-md rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-500/20">
                                Registration Portal
                            </span>
                            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                                Pendaftaran <span className="text-emerald-500 underline decoration-8 decoration-emerald-500/20 underline-offset-8">Online</span>
                            </h1>
                            <p className="text-lg md:text-xl text-emerald-100/60 max-w-2xl mx-auto leading-relaxed font-bold">
                                Lengkapilah formulir di bawah ini untuk memulai langkah awal menjadi Santri Pondok Pesantren Nurul Ali Jember.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 -mt-16 relative z-20">
                        <div className="bg-white p-6 md:p-12 rounded-[3.5rem] shadow-2xl shadow-emerald-950/20 border border-white ring-8 ring-white/10 backdrop-blur-xl">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Pendaftaran Santri Baru</span>
                                <h2 className="text-4xl font-bold text-slate-900">Formulir Pendaftaran</h2>
                                <p className="mt-3 text-slate-600">Lengkapi tahapan pendaftaran di bawah ini untuk bergabung.</p>
                            </div>

                            {/* Step Indicator */}
                            <div className="mb-16 relative">
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2"></div>
                                <div className="relative flex justify-between">
                                    {[
                                        { s: 1, label: 'Biodata', icon: UserIcon },
                                        { s: 2, label: 'Orang Tua', icon: UsersIcon },
                                        { s: 3, label: 'Pembayaran', icon: CreditCardIcon },
                                    ].map((item) => (
                                        <div key={item.s} className="flex flex-col items-center gap-3 bg-white relative px-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${step >= item.s ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white border-slate-100 text-slate-300'}`}>
                                                {step > item.s ? <CheckCircleIcon className="w-6 h-6" /> : <item.icon className="w-6 h-6" />}
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= item.s ? 'text-emerald-600' : 'text-slate-300'}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Panduan Visual Section */}
                            {examples.length > 0 && (
                                <div className="mb-16 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
                                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                        <PhotoIcon className="w-8 h-8 text-emerald-600" />
                                        <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Panduan Berkas</h3>
                                        <div className="ml-auto flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none mt-0.5">Acuan</span>
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
                                {/* Step 1: Data Santri */}
                                {step === 1 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                            <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">1</div>
                                            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Identitas Calon Santri</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2 font-medium">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all outline-none text-slate-700 font-bold"
                                                    placeholder="Sesuai Ijazah/Akte"
                                                    required
                                                />
                                                {errors.name && <p className="text-rose-500 text-xs font-bold ml-1">{errors.name}</p>}
                                            </div>
                                            <div className="space-y-2 font-medium">
                                                <label className="text-sm font-bold text-slate-700 ml-1">NIK (Nomor Induk Kependudukan)</label>
                                                <input
                                                    type="text"
                                                    value={data.nik}
                                                    onChange={e => setData('nik', e.target.value)}
                                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all outline-none text-slate-700 font-bold"
                                                    placeholder="16 Digit NIK"
                                                    maxLength="16"
                                                    required
                                                />
                                                {errors.nik && <p className="text-rose-500 text-xs font-bold ml-1">{errors.nik}</p>}
                                            </div>
                                            <div className="space-y-2 font-medium">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Tempat Lahir</label>
                                                <input
                                                    type="text"
                                                    value={data.place_birth}
                                                    onChange={e => setData('place_birth', e.target.value)}
                                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all outline-none text-slate-700 font-bold"
                                                    placeholder="Kota Kelahiran"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2 font-medium">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Tanggal Lahir</label>
                                                <input
                                                    type="date"
                                                    value={data.date_birth}
                                                    onChange={e => setData('date_birth', e.target.value)}
                                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all outline-none text-slate-700 font-bold"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2 md:col-span-2 font-medium">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Asal Sekolah</label>
                                                <input
                                                    type="text"
                                                    value={data.school_origin}
                                                    onChange={e => setData('school_origin', e.target.value)}
                                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all outline-none text-slate-700 font-bold"
                                                    placeholder="e.g. MI Nurul Ali"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2 md:col-span-2 font-medium">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Alamat Lengkap</label>
                                                <textarea
                                                    value={data.address}
                                                    onChange={e => setData('address', e.target.value)}
                                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all outline-none h-32 font-bold leading-relaxed text-slate-700"
                                                    placeholder="Jl, RT/RW, Desa, Kecamatan, Kabupaten"
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4">
                                            <button 
                                                type="button" 
                                                onClick={nextStep}
                                                className="w-full py-4 bg-slate-900 border-2 border-slate-900 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95"
                                            >
                                                Lanjutkan <ArrowRightIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Data Wali */}
                                {step === 2 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                            <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">2</div>
                                            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Data Orang Tua / Wali</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2 font-medium">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Nama Ayah/Ibu/Wali</label>
                                                <input
                                                    type="text"
                                                    value={data.parent_name}
                                                    onChange={e => setData('parent_name', e.target.value)}
                                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all outline-none text-slate-700 font-bold"
                                                    placeholder="Nama Wali Penanggung Jawab"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2 font-medium">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Nomor WhatsApp Aktif</label>
                                                <input
                                                    type="tel"
                                                    value={data.whatsapp}
                                                    onChange={e => setData('whatsapp', e.target.value)}
                                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all outline-none text-slate-700 font-bold"
                                                    placeholder="e.g. 0812XXXXXXXX"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                            <button 
                                                type="button" 
                                                onClick={prevStep}
                                                className="w-full py-4 bg-white border-2 border-slate-100 text-slate-600 font-black uppercase text-xs tracking-widest rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95"
                                            >
                                                <ArrowLeftIcon className="w-4 h-4" /> Kembali
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={nextStep}
                                                className="w-full py-4 bg-slate-900 border-2 border-slate-900 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95"
                                            >
                                                Lanjutkan <ArrowRightIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Pembayaran */}
                                {step === 3 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                            <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">3</div>
                                            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Metode Pembayaran</h3>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <label className={`relative flex flex-col p-6 rounded-2xl border-2 transition-all cursor-pointer group ${data.payment_method === 'cash' ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                                                <input type="radio" name="payment_method" value="cash" checked={data.payment_method === 'cash'} onChange={e => setData('payment_method', e.target.value)} className="sr-only" />
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors mb-4 ${data.payment_method === 'cash' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'}`}>
                                                    <BanknotesIcon className="w-7 h-7" />
                                                </div>
                                                <span className="text-md font-black text-slate-900 leading-none">Tunai</span>
                                                <span className="text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-widest">Bayar di Kantor</span>
                                                {data.payment_method === 'cash' && <div className="absolute top-5 right-5 text-emerald-600"><CheckCircleIcon className="w-5 h-5" /></div>}
                                            </label>

                                            <label className={`relative flex flex-col p-6 rounded-2xl border-2 transition-all cursor-pointer group ${data.payment_method === 'transfer' ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                                                <input type="radio" name="payment_method" value="transfer" checked={data.payment_method === 'transfer'} onChange={e => setData('payment_method', e.target.value)} className="sr-only" />
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors mb-4 ${data.payment_method === 'transfer' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'}`}>
                                                    <BuildingLibraryIcon className="w-7 h-7" />
                                                </div>
                                                <span className="text-md font-black text-slate-900 leading-none">Transfer</span>
                                                <span className="text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-widest">Melalui Bank / ATM</span>
                                                {data.payment_method === 'transfer' && <div className="absolute top-5 right-5 text-emerald-600"><CheckCircleIcon className="w-5 h-5" /></div>}
                                            </label>
                                        </div>

                                        <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 mb-8">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                                                    <InformationCircleIcon className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <p className="text-[11px] text-slate-500 leading-relaxed font-bold">
                                                    Pastikan seluruh data yang Anda masukkan sudah benar sebelum mengirimkan pendaftaran. Anda akan dihubungi oleh admin untuk verifikasi berkas lebih lanjut.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                            <button 
                                                type="button" 
                                                onClick={prevStep}
                                                className="w-full py-5 bg-white border-2 border-slate-100 text-slate-600 font-black uppercase text-xs tracking-widest rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95"
                                            >
                                                <ArrowLeftIcon className="w-4 h-4" /> Kembali
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="sm:col-span-2 w-full py-5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black uppercase text-xs tracking-[0.2em] rounded-xl shadow-xl shadow-emerald-200/50 transition-all transform hover:-translate-y-1 active:scale-95"
                                            >
                                                {processing ? 'Sedang Diproses...' : 'Kirim Pendaftaran Sekarang'}
                                            </button>
                                        </div>
                                        
                                        <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed pt-2">
                                            Pondok Pesantren Nurul Ali Jember
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </PublicLayout>
    );
}

import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import SantriLayout from '@/Layouts/SantriLayout';
import { 
    UserIcon, 
    LockClosedIcon, 
    IdentificationIcon, 
    AcademicCapIcon, 
    MapPinIcon, 
    PhoneIcon,
    CameraIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

const DisplayItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shrink-0 shadow-sm border border-slate-100">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
            <p className="text-sm font-black text-slate-800 leading-tight">{value || '-'}</p>
        </div>
    </div>
);

export default function Profile({ santri, settings }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: santri.username || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('santri.profile.update'), {
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <SantriLayout title="Profil Saya">
            <div className="bg-slate-50 min-h-screen pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        {/* LEFT: Account Settings */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                        <LockClosedIcon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Pengaturan Akun</h2>
                                </div>

                                <form onSubmit={submit} className="space-y-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Username</label>
                                        <div className="relative group">
                                            <UserIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                            <input 
                                                type="text" 
                                                value={data.username}
                                                onChange={e => setData('username', e.target.value)}
                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl ring-1 ring-slate-100 focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-slate-700 transition-all"
                                                placeholder="Username baru..."
                                            />
                                        </div>
                                        {errors.username && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest ml-1">{errors.username}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Password Baru</label>
                                        <div className="relative group">
                                            <LockClosedIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                            <input 
                                                type="password" 
                                                value={data.password}
                                                onChange={e => setData('password', e.target.value)}
                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl ring-1 ring-slate-100 focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-slate-700 transition-all"
                                                placeholder="Kosongkan jika tidak diubah"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Konfirmasi Password</label>
                                        <div className="relative group">
                                            <LockClosedIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                            <input 
                                                type="password" 
                                                value={data.password_confirmation}
                                                onChange={e => setData('password_confirmation', e.target.value)}
                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl ring-1 ring-slate-100 focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-slate-700 transition-all"
                                                placeholder="Ulangi password baru"
                                            />
                                        </div>
                                        {errors.password && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest ml-1">{errors.password}</p>}
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                                    >
                                        Simpan Perubahan
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* RIGHT: Profile Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 border border-slate-200/50">
                                            <IdentificationIcon className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase leading-none mb-2">{santri.name}</h2>
                                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">ID REG: {santri.reg_id}</p>
                                        </div>
                                    </div>
                                    <div className="px-5 py-2.5 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-100">
                                        Status: {santri.status}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <DisplayItem icon={IdentificationIcon} label="NIK / No. Identitas" value={santri.nik} />
                                    <DisplayItem icon={AcademicCapIcon} label="Sekolah Asal" value={santri.school_origin} />
                                    <DisplayItem icon={CalendarIcon} label="Tempat, Tanggal Lahir" value={`${santri.place_birth}, ${santri.date_birth}`} />
                                    <DisplayItem icon={UserIcon} label="Nama Orang Tua / Wali" value={santri.parent_name} />
                                    <DisplayItem icon={PhoneIcon} label="Nomor WhatsApp" value={santri.whatsapp} />
                                    <DisplayItem icon={MapPinIcon} label="Alamat Lengkap" value={santri.address} />
                                </div>

                                <div className="mt-12 p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100/50">
                                    <h4 className="text-[11px] font-black text-emerald-800 uppercase tracking-widest mb-4">Pilihan Lembaga / Jenjang</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {santri.lembaga_summary?.split(',').map((l, i) => (
                                            <span key={i} className="px-5 py-2.5 bg-white text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-emerald-100">
                                                {l.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </SantriLayout>
    );
}

import SantriLayout from '@/Layouts/SantriLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    UserIcon,
    IdentificationIcon,
    AcademicCapIcon,
    CheckCircleIcon,
    ClockIcon,
    ExclamationCircleIcon,
    CreditCardIcon,
    ArrowRightOnRectangleIcon,
    DocumentTextIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import StatusBadge from '@/Components/Fragments/StatusBadge';

const DetailCard = ({ icon: Icon, label, value, color = "slate" }) => (
    <div className={`p-6 bg-white rounded-3xl border border-${color}-100 shadow-sm flex items-center gap-5 group hover:border-${color}-200 transition-all`}>
        <div className={`w-12 h-12 bg-${color}-50 rounded-2xl flex items-center justify-center text-${color}-500 group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
            <p className="text-sm font-black text-slate-800 leading-none">{value || '-'}</p>
        </div>
    </div>
);

export default function Dashboard({ santri, settings }) {
    const logout = () => {
        router.post(route('santri.logout'));
    };

    const lembagaList = JSON.parse(santri.lembaga_ids || '[]');

    return (
        <SantriLayout title={`Dashboard Santri - ${santri.name}`}>
            <div className="bg-slate-50 min-h-screen font-medium">
                {/* 1. Header Hero Panel */}
                <div className="bg-emerald-950 pt-32 pb-48 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={settings.hero_pendaftaran || '/hero_pendaftaran.png'} 
                            className="w-full h-full object-cover opacity-20 blur-sm scale-110" 
                            alt="Background" 
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-emerald-950/40 via-emerald-950/80 to-emerald-950"></div>
                    </div>

                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="space-y-4">
                                <span className="inline-block px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20">
                                    Selamat Datang di Portal Santri
                                </span>
                                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none uppercase">
                                    Ahlan wa Sahlan, <br />
                                    <span className="text-emerald-500">{santri.name.split(' ')[0]}!</span>
                                </h1>
                                <p className="text-emerald-100/60 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                    <IdentificationIcon className="w-4 h-4" />
                                    ID REG: {santri.reg_id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Main Content Grid */}
                <div className="max-w-6xl mx-auto px-4 -mt-24 pb-20 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* LEFT COLUMN: Status Cards */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Status Overview Card */}
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                                            <ClockIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Status Pendaftaran</h2>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update terakhir: {new Date(santri.updated_at).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Status Pendaftaran */}
                                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                                                    <DocumentTextIcon className="w-5 h-5" />
                                                </div>
                                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Dokumen</p>
                                            </div>
                                            <StatusBadge status={santri.status} />
                                        </div>

                                        {/* Status Pembayaran */}
                                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                                                    <CreditCardIcon className="w-5 h-5" />
                                                </div>
                                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Biaya Registrasi</p>
                                            </div>
                                            <StatusBadge status={santri.payment_status} />
                                        </div>
                                    </div>

                                    {/* Action Alert */}
                                    {santri.payment_status === 'unpaid' && (
                                        <div className="mt-8 p-6 bg-rose-50 rounded-3xl border border-rose-100 flex items-start gap-5 animate-in fade-in slide-in-from-top-4 duration-700">
                                            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600 shrink-0">
                                                <ExclamationCircleIcon className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-black text-rose-800 uppercase tracking-widest">Menunggu Pembayaran</p>
                                                <p className="text-[10px] font-bold text-rose-700/70 leading-relaxed uppercase tracking-widest">
                                                    Silakan lakukan pembayaran sesuai instruksi di brosur atau hubungi admin via WhatsApp untuk validasi.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Santri Data Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DetailCard icon={UserIcon} label="Username Login" value={santri.username} color="emerald" />
                                <DetailCard icon={AcademicCapIcon} label="Sekolah Asal" value={santri.school_origin} color="blue" />
                                <DetailCard icon={MapPinIcon} label="Alamat" value={santri.address} color="amber" />
                                <DetailCard icon={CheckCircleIcon} label="Metode Bayar" value={santri.payment_method === 'transfer' ? 'Transfer Bank' : 'Tunai / Cash'} color="emerald" />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sidebar Info */}
                        <div className="space-y-8">
                            {/* Jenjang Card */}
                            <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="mb-10">
                                        <AcademicCapIcon className="w-12 h-12 text-emerald-200 mb-6" />
                                        <h3 className="text-xl font-black uppercase tracking-tight leading-tight mb-2 text-white">Jenjang <br /> Pendidikan</h3>
                                        <p className="text-[10px] font-bold text-emerald-100/60 tracking-widest uppercase">Pilihan Anda saat mendaftar</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {santri.lembaga_summary ? santri.lembaga_summary.split(',').map((l, i) => (
                                            <span key={i} className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                                                {l.trim()}
                                            </span>
                                        )) : (
                                            <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest italic">Belum memilih jenjang</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Help Center */}
                            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Pusat Bantuan</h4>
                                <p className="text-xs font-bold text-slate-800 leading-relaxed mb-8 uppercase tracking-widest italic">
                                    Ada kendala dengan data pendaftaran Anda? <br /> Hubungi admin PPDB.
                                </p>
                                <a 
                                    href={`https://wa.me/${settings.whatsapp_ppdb || ''}`} 
                                    target="_blank" 
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    WhatsApp Admin
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </SantriLayout>
    );
}

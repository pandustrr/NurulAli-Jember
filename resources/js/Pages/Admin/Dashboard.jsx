import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    UserGroupIcon, 
    CheckCircleIcon, 
    ClockIcon, 
    InboxArrowDownIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';

export default function Dashboard({ stats, recent_pendaftars }) {
    const cards = [
        { label: 'Total Pendaftar', value: stats.total_pendaftar, icon: UserGroupIcon, color: 'bg-blue-50 text-blue-600', sub: 'Semua pendaftar' },
        { label: 'Selesai Verifikasi', value: stats.verified_pendaftar, icon: CheckCircleIcon, color: 'bg-emerald-50 text-emerald-600', sub: 'Pendaftar diterima' },
        { label: 'Menunggu', value: stats.pending_pendaftar, icon: ClockIcon, color: 'bg-amber-50 text-amber-600', sub: 'Perlu dicek' },
        { label: 'Pesan Baru', value: stats.unread_messages, icon: InboxArrowDownIcon, color: 'bg-rose-50 text-rose-600', sub: 'Pesan belum dibaca' },
    ];

    return (
        <AdminLayout header="Ringkasan Dashboard">
            <Head title="Admin - Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                        <div className={`w-16 h-16 rounded-xl ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <card.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{card.label}</p>
                            <h3 className="text-3xl font-black text-slate-800">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-slate-900">
                {/* Recent Registrations Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-800">Pendaftar Terbaru</h3>
                        <Link href={route('admin.pendaftar')} className="text-emerald-600 text-sm font-bold hover:underline">Lihat Semua →</Link>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-4 pl-8 font-bold text-slate-500 text-xs uppercase">Nama</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase">Status</th>
                                <th className="p-4 pr-8 font-bold text-slate-500 text-xs uppercase text-right">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent_pendaftars.map((p) => (
                                <tr key={p.id} className="border-b border-slate-50">
                                    <td className="p-4 pl-8 font-bold text-slate-700">{p.name}</td>
                                    <td className="p-4 text-xs">
                                        <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${p.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-8 text-right text-slate-400 text-xs">
                                        {new Date(p.created_at).toLocaleDateString('id-ID')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Quick Actions / Unit Status */}
                <div className="space-y-6">
                    <div className="bg-emerald-900 rounded-2xl p-8 text-white shadow-xl shadow-emerald-200">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <RocketLaunchIcon className="w-6 h-6 text-amber-400" />
                            <span>Quick Actions</span>
                        </h3>
                        <div className="space-y-4">
                            <Link href={route('admin.lembaga.index')} className="block w-full text-center py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border border-white/10 outline-none">Update Data Lembaga</Link>
                            <Link href={route('admin.ppdb-registration')} className="block w-full text-center py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border border-white/10 outline-none">Ubah Jadwal PPDB</Link>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">
                                {stats.total_lembaga}
                            </div>
                            <h3 className="font-bold text-slate-800">Unit Pendidikan</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Saat ini terdapat <strong>{stats.total_lembaga} unit</strong> lembaga pendidikan yang aktif dikelola di sistem.
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ messages }) {
    const [selectedMessage, setSelectedMessage] = useState(null);

    const markAsRead = (id) => {
        router.post(route('admin.messages.read', id));
    };

    const handleDelete = (id) => {
        if (confirm('Hapus pesan ini?')) {
            router.delete(route('admin.messages.destroy', id));
        }
    };

    return (
        <AdminLayout header="Kotak Masuk Pesan">
            <Head title="Admin - Messages" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-slate-900">
                {/* Message List */}
                <div className="lg:col-span-1 border-r border-slate-100 pr-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {messages.length === 0 && <p className="text-slate-400 text-center py-8">Tidak ada pesan.</p>}
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            onClick={() => {
                                setSelectedMessage(m);
                                if (!m.is_read) markAsRead(m.id);
                            }}
                            className={`p-5 rounded-2xl cursor-pointer transition-all border ${selectedMessage?.id === m.id ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-sm truncate">{m.name}</span>
                                {!m.is_read && <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm ring-4 ring-emerald-500/10"></span>}
                            </div>
                            <p className="text-xs text-slate-500 font-medium mb-1">{m.subject || '(Tanpa Subjek)'}</p>
                            <p className="text-[10px] text-slate-400">
                                {new Date(m.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Message Detail */}
                <div className="lg:col-span-2">
                    {selectedMessage ? (
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-10 pb-6 border-b border-slate-50">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{selectedMessage.subject || 'Pesan Baru'}</h3>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <span className="font-bold text-emerald-700">{selectedMessage.name}</span>
                                        <span>&lt;{selectedMessage.email}&gt;</span>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(selectedMessage.id)} className="p-3 text-rose-400 hover:bg-rose-50 rounded-2xl transition-colors">🗑️ Hapus</button>
                            </div>

                            <div className="flex-grow">
                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap italic">
                                    "{selectedMessage.message}"
                                </p>
                            </div>

                            <div className="pt-10 mt-10 border-t border-slate-50 flex gap-4">
                                <a
                                    href={`mailto:${selectedMessage.email}`}
                                    className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                                >
                                    Balas via Email
                                </a>
                                <button className="px-8 py-3 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-colors">Arsipkan</button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400">
                            Pilih pesan untuk melihat detail.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

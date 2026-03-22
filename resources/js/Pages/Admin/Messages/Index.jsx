import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { formatDate } from '@/Utils/formatters';
import MessageDetail from '@/Components/Fragments/MessageDetail';
import ConfirmModal from '@/Components/Fragments/ConfirmModal';

export default function Index({ messages }) {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);

    const markAsRead = (id) => {
        router.post(route('admin.messages.read', id));
    };

    const confirmDelete = (id) => {
        setMessageToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (messageToDelete) {
            router.delete(route('admin.messages.destroy', messageToDelete), {
                onSuccess: () => {
                    if (selectedMessage?.id === messageToDelete) setSelectedMessage(null);
                    setMessageToDelete(null);
                }
            });
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
                            className={`p-5 rounded-xl cursor-pointer transition-all border ${selectedMessage?.id === m.id ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-sm truncate">{m.name}</span>
                                {!m.is_read && <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm ring-4 ring-emerald-500/10"></span>}
                            </div>
                            <p className="text-xs text-slate-500 font-medium mb-1">{m.subject || '(Tanpa Subjek)'}</p>
                            <p className="text-[10px] text-slate-400">
                                {formatDate(m.created_at)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Message Detail View */}
                <div className="lg:col-span-2">
                    <MessageDetail 
                        message={selectedMessage} 
                        onDelete={confirmDelete} 
                    />
                </div>
            </div>

            <ConfirmModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Hapus Pesan"
                message="Pesan yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?"
                confirmText="Ya, Hapus"
                type="danger"
            />
        </AdminLayout>
    );
}

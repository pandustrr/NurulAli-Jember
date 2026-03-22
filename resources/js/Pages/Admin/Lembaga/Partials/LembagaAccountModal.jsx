import React from 'react';

export default function LembagaAccountModal({ isOpen, onClose, data, setData, onSubmit, editData, processing, errors }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-slate-900 overflow-y-auto">
            <div className="bg-white w-full max-w-xl rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300 my-8 border border-slate-100">
                <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-50">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Edit Akun Pengelola</h3>
                        <p className="text-emerald-600 font-black uppercase text-[10px] tracking-widest">{editData?.title}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 p-2 rounded-lg text-[10px] font-black uppercase tracking-tighter">Batal</button>
                </div>

                <form onSubmit={onSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Nama Lengkap Admin / Pengelola</label>
                            <input
                                value={data.admin_name || ''}
                                onChange={e => setData('admin_name', e.target.value)}
                                type="text"
                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-bold text-sm"
                                placeholder="Contoh: Ustadz Ahmad Fauzi"
                            />
                            {errors.admin_name && <p className="text-rose-500 text-[10px] mt-1 font-bold">{errors.admin_name}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Username Login</label>
                                <input
                                    value={data.username || ''}
                                    onChange={e => setData('username', e.target.value)}
                                    type="text"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-bold text-sm"
                                    placeholder="username_lembaga"
                                />
                                {errors.username && <p className="text-rose-500 text-[10px] mt-1 font-bold">{errors.username}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Password Baru</label>
                                <input
                                    value={data.password || ''}
                                    onChange={e => setData('password', e.target.value)}
                                    type="password"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-bold text-sm placeholder:font-normal"
                                    placeholder="******"
                                />
                                {errors.password && <p className="text-rose-500 text-[10px] mt-1 font-bold">{errors.password}</p>}
                                <p className="text-[9px] text-slate-400 font-medium italic">Kosongkan jika tidak ingin ganti password.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Alamat Email & Kontak WhatsApp</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    value={data.email || ''}
                                    onChange={e => setData('email', e.target.value)}
                                    type="email"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-bold text-sm"
                                    placeholder="email@nurulali.sch.id"
                                />
                                <input
                                    value={data.contact || ''}
                                    onChange={e => setData('contact', e.target.value)}
                                    type="text"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-bold text-sm"
                                    placeholder="0812XXXXXXXX"
                                />
                            </div>
                            <div className="flex justify-between">
                                {errors.email && <p className="text-rose-500 text-[10px] font-bold">{errors.email}</p>}
                                {errors.contact && <p className="text-rose-500 text-[10px] font-bold ml-auto">{errors.contact}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="grow py-4 bg-slate-100 text-slate-500 font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-slate-200 transition-colors"
                        >
                            Batalkan
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="grow py-4 bg-emerald-600 text-white font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-xl shadow-emerald-200/50"
                        >
                            Update Akses Akun
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

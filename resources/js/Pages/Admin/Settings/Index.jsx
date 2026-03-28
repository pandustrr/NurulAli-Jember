import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    PhotoIcon, 
    ArrowUpTrayIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Toast from '@/Components/Fragments/Toast';

export default function Index({ settings }) {
    const pages = [
        { id: 'hero_home', name: 'Halaman Beranda', desc: 'Background Utama / Landing Page' },
        { id: 'hero_about', name: 'Tentang Kami', desc: 'Profil & Sejarah Pesantren' },
        { id: 'hero_lembaga', name: 'Lembaga', desc: 'Daftar Unit Pendidikan' },
        { id: 'hero_ppdb', name: 'Info PPDB', desc: 'Pusat Informasi Pendaftaran' },
        { id: 'hero_pendaftaran', name: 'Pendaftaran', desc: 'Portal Registrasi Online' },
        { id: 'hero_kontak', name: 'Kontak', desc: 'Halaman Hubungi Kami' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        hero_home: null,
        hero_about: null,
        hero_lembaga: null,
        hero_ppdb: null,
        hero_pendaftaran: null,
        hero_kontak: null,
        _method: 'POST'
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.site-settings.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                // Reset file inputs if needed
            }
        });
    };

    const hasChanges = Object.keys(data).some(key => key !== '_method' && data[key] !== null);

    return (
        <AdminLayout 
            header="Pengaturan Background"
            icon={PhotoIcon}
            description="Atur gambar latar belakang (hero) secara spesifik untuk masing-masing halaman."
        >
            <Head title="Admin - Background Setting" />

            <div className="max-w-6xl mx-auto space-y-8 font-medium">
                <form onSubmit={submit} className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pages.map((page) => (
                            <div key={page.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col group overflow-hidden relative">
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 bg-emerald-50 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg shadow-emerald-200 shrink-0">
                                            <PhotoIcon className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-[13px] font-black text-slate-800 tracking-tight leading-none uppercase truncate">{page.name}</h3>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-2 leading-none">{page.desc}</p>
                                        </div>
                                    </div>

                                    <div className="aspect-video rounded-xl bg-slate-50 border-2 border-dashed border-slate-100 overflow-hidden relative group/preview flex items-center justify-center mb-6">
                                        {data[page.id] ? (
                                            <img 
                                                src={URL.createObjectURL(data[page.id])} 
                                                className="w-full h-full object-cover" 
                                                alt="Preview" 
                                            />
                                        ) : settings[page.id] ? (
                                            <img 
                                                src={settings[page.id]} 
                                                className="w-full h-full object-cover" 
                                                alt={page.name} 
                                            />
                                        ) : (
                                            <div className="text-center p-4">
                                                <PhotoIcon className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                                <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest leading-none">Belum ada gambar</p>
                                            </div>
                                        )}

                                        <label className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] opacity-0 group-hover/preview:opacity-100 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer text-white">
                                            <ArrowUpTrayIcon className="w-6 h-6 mb-2 animate-bounce" />
                                            <span className="font-black text-[9px] uppercase tracking-[0.2em]">Pilih Gambar</span>
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                onChange={e => setData(page.id, e.target.files[0])}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>

                                    {errors[page.id] && (
                                        <p className="text-rose-500 text-[9px] font-black uppercase mb-4 ml-2">{errors[page.id]}</p>
                                    )}

                                    {data[page.id] && (
                                        <button
                                            type="button"
                                            onClick={() => setData(page.id, null)}
                                            className="mt-auto w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all active:scale-95"
                                        >
                                            Batal Ganti
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col items-center gap-6">
                        <button
                            type="submit"
                            disabled={processing || !hasChanges}
                            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:bg-slate-300 text-white px-16 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-emerald-200 transition-all flex items-center justify-center gap-4 active:scale-95"
                        >
                            {processing ? 'Menyimpan Perubahan...' : 'Simpan Semua Perubahan'}
                        </button>

                        {!hasChanges && (
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pilih minimal satu gambar untuk memperbarui</p>
                        )}
                    </div>

                    <div className="max-w-3xl mx-auto p-8 bg-amber-50 border border-amber-100 rounded-[3rem] flex items-start gap-6">
                        <div className="bg-amber-400 p-3 rounded-2xl text-white shadow-lg shadow-amber-200">
                            <CheckCircleIcon className="w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-[15px] text-amber-900 font-black tracking-tight leading-none uppercase">Catatan Penting</p>
                            <p className="text-[13px] text-amber-800/70 font-bold leading-relaxed">
                                Pastikan gambar yang diunggah memiliki rasio yang sesuai (16:9) agar tidak terpotong saat ditampilkan di layar besar. Ukuran maksimal file adalah 2MB per gambar.
                            </p>
                        </div>
                    </div>
                </form>
            </div>

            <Toast />
        </AdminLayout>
    );
}

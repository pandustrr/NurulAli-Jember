import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    CheckCircleIcon, 
    BanknotesIcon, 
    BuildingLibraryIcon, 
    InformationCircleIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    CreditCardIcon,
    ClipboardDocumentListIcon,
    CloudArrowUpIcon,
    DocumentIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

export default function Pendaftaran({ settings, ppdb_settings = {}, examples = [] }) {
    // Default Fallback Config if not set in Admin
    const defaultConfig = {
        sections: [
            {
                id: 's1',
                title: 'Identitas Calon Santri',
                description: 'Biodata',
                fields: [
                    { key: 'name', label: 'Nama Lengkap', placeholder: 'Nama Lengkap', type: 'text', required: true },
                    { key: 'nik', label: 'NIK (Nomor Induk Kependudukan)', placeholder: 'NIK (Nomor Induk Kependudukan)', type: 'nik', required: true },
                    { key: 'place_birth', label: 'Tempat Lahir', placeholder: 'Tempat Lahir', type: 'text', required: true },
                    { key: 'date_birth', label: 'Tanggal Lahir', placeholder: 'Tanggal Lahir', type: 'date', required: true },
                    { key: 'school_origin', label: 'Asal Sekolah', placeholder: 'Asal Sekolah', type: 'text', required: true },
                    { key: 'address', label: 'Alamat Lengkap', placeholder: 'Alamat Lengkap', type: 'textarea', required: true },
                ]
            },
            {
                id: 's2',
                title: 'Data Orang Tua / Wali',
                description: 'Orang Tua',
                fields: [
                    { key: 'parent_name', label: 'Nama Ayah/Ibu/Wali', placeholder: 'Nama Ayah/Ibu/Wali', type: 'text', required: true },
                    { key: 'whatsapp', label: 'Nomor WhatsApp Aktif', placeholder: 'Nomor WhatsApp Aktif', type: 'tel', required: true },
                ]
            }
        ]
    };

    const formConfig = ppdb_settings.form_config ? JSON.parse(ppdb_settings.form_config) : defaultConfig;
    const sections = formConfig.sections || defaultConfig.sections;

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        // Fixed Fields
        name: '',
        nik: '',
        place_birth: '',
        date_birth: '',
        parent_name: '',
        whatsapp: '',
        address: '',
        school_origin: '',
        payment_method: 'cash',
        // Dynamic Fields (Stored in metadata)
        metadata: {},
    });

    const [step, setStep] = useState(1);
    const totalSteps = sections.length + 1; // +1 for Payment

    const nextStep = () => {
        // Simple client-side validation for mandatory fields in current step
        const currentFields = sections[step - 1].fields;
        const missing = currentFields.filter(f => {
            const val = ['name', 'nik', 'place_birth', 'date_birth', 'parent_name', 'whatsapp', 'address', 'school_origin'].includes(f.key) ? data[f.key] : data.metadata[f.key];
            return f.required && !val;
        });

        if (missing.length > 0) {
            alert(`Mohon lengkapi bagian yang wajib diisi.`);
            return;
        }
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const updateValue = (key, val) => {
        const fixed = ['name', 'nik', 'place_birth', 'date_birth', 'parent_name', 'whatsapp', 'address', 'school_origin'];
        if (fixed.includes(key)) {
            setData(key, val);
        } else {
            setData('metadata', { ...data.metadata, [key]: val });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // Since we are uploading files, ensure we use forceFormData: true if needed,
        // but Inertia handles automatic conversion to FormData if files are present.
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
                    {/* Header Hero */}
                    <div className="bg-emerald-950 h-[450px] flex items-center justify-center px-4 relative overflow-hidden text-center">
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
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 -mt-24 relative z-20">
                        <div className="bg-white p-6 md:p-12 rounded-3xl shadow-2xl shadow-emerald-950/20 border border-white ring-8 ring-white/10 backdrop-blur-xl">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-sm shadow-emerald-200">Nurul Ali Jember</span>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">Formulir Pendaftaran</h2>
                                <p className="mt-4 text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Lengkapi seluruh berkas pendaftaran santri baru</p>
                            </div>

                            {/* Step Indicator */}
                            <div className="mb-16 relative overflow-x-auto no-scrollbar pb-4">
                                <div className="min-w-[500px] flex justify-between relative px-8">
                                    <div className="absolute top-6 left-12 right-12 h-0.5 bg-slate-100 -translate-y-1/2"></div>
                                    {sections.map((sec, i) => (
                                        <div key={sec.id} className="flex flex-col items-center gap-3 bg-white relative px-4 text-center group">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 border-2 z-10 ${step > i + 1 ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200' : step === i + 1 ? 'bg-white border-emerald-500 text-emerald-600 shadow-xl shadow-emerald-100 scale-110' : 'bg-white border-slate-100 text-slate-300'}`}>
                                                {step > i + 1 ? <CheckCircleIcon className="w-6 h-6" /> : <ClipboardDocumentListIcon className="w-6 h-6" />}
                                            </div>
                                            <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-500 ${step === i + 1 ? 'text-emerald-600' : 'text-slate-300'}`}>
                                                {sec.description}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="flex flex-col items-center gap-3 bg-white relative px-4 text-center">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 border-2 z-10 ${step === totalSteps ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 scale-110' : 'bg-white border-slate-100 text-slate-300'}`}>
                                            <CreditCardIcon className="w-6 h-6" />
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${step === totalSteps ? 'text-emerald-600 font-black' : 'text-slate-300'}`}>Pembayaran</span>
                                    </div>
                                </div>
                            </div>

                            {recentlySuccessful && (
                                <div className="mb-10 p-10 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 shadow-inner animate-in zoom-in-95 duration-700 relative overflow-hidden group">
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100/50 rounded-full"></div>
                                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-200">
                                            <CheckCircleIcon className="w-12 h-12" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">Alhamdulillah, Pendaftaran Terkirim!</h3>
                                            <p className="text-emerald-700/80 leading-relaxed font-bold text-sm">
                                                Data santri telah kami terima. Tim PPDB akan segera menghubungi Anda melalui nomor WhatsApp untuk proses verifikasi selanjutnya.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-12">
                                {sections.map((section, sIdx) => (
                                    step === sIdx + 1 && (
                                        <div key={section.id} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                                            <div className="flex items-center gap-5 border-b border-slate-100 pb-6">
                                                <div className="w-10 h-10 bg-emerald-600 text-white rounded-[1.25rem] flex items-center justify-center font-black text-lg shadow-lg shadow-emerald-200">{sIdx + 1}</div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">{section.title}</h3>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{section.description}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                                                {section.fields?.map((field) => (
                                                    <div key={field.key} className={`space-y-3 ${['textarea', 'file_pdf', 'file_img'].includes(field.type) ? 'md:col-span-2' : ''}`}>
                                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                            {field.label}
                                                            {field.required && <span className="text-rose-500 animate-pulse text-lg leading-none mt-1">*</span>}
                                                        </label>
                                                        
                                                        {field.type === 'textarea' ? (
                                                            <textarea
                                                                value={['name', 'nik', 'place_birth', 'date_birth', 'parent_name', 'whatsapp', 'address', 'school_origin'].includes(field.key) ? data[field.key] : data.metadata[field.key] || ''}
                                                                onChange={e => updateValue(field.key, e.target.value)}
                                                                className="w-full px-6 py-5 rounded-xl bg-slate-50 border border-slate-100 focus:ring-8 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-500/20 transition-all outline-none h-40 font-bold leading-relaxed text-slate-700 shadow-sm placeholder:font-medium"
                                                                placeholder={field.placeholder}
                                                                required={field.required}
                                                            />
                                                        ) : (field.type === 'file_pdf' || field.type === 'file_img') ? (
                                                            <div className="relative group">
                                                                <input
                                                                    type="file"
                                                                    accept={field.type === 'file_pdf' ? '.pdf' : 'image/*'}
                                                                    onChange={e => updateValue(field.key, e.target.files[0])}
                                                                    className="hidden"
                                                                    id={`file-${field.key}`}
                                                                    required={field.required && !data.metadata[field.key]}
                                                                />
                                                                <label 
                                                                    htmlFor={`file-${field.key}`}
                                                                    className="w-full flex flex-col items-center justify-center gap-4 px-6 py-10 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/10 transition-all cursor-pointer group"
                                                                >
                                                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-emerald-500 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-emerald-100">
                                                                        {field.type === 'file_pdf' ? <DocumentIcon className="w-8 h-8" /> : <PhotoIcon className="w-8 h-8" />}
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <span className="text-xs font-black uppercase tracking-widest block mb-1">
                                                                            {data.metadata[field.key] ? 'File Terpilih' : `Pilih File ${field.type === 'file_pdf' ? 'PDF' : 'Gambar'}`}
                                                                        </span>
                                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate max-w-[200px] block">
                                                                            {data.metadata[field.key] ? data.metadata[field.key].name : `Maksimal 2MB`}
                                                                        </span>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        ) : (
                                                            <input
                                                                type={field.type === 'nik' ? 'text' : field.type}
                                                                inputMode={field.type === 'nik' ? 'numeric' : undefined}
                                                                value={['name', 'nik', 'place_birth', 'date_birth', 'parent_name', 'whatsapp', 'address', 'school_origin'].includes(field.key) ? data[field.key] : data.metadata[field.key] || ''}
                                                                onChange={e => {
                                                                    const val = e.target.value;
                                                                    if (field.type === 'nik' && !/^\d*$/.test(val)) return;
                                                                    updateValue(field.key, val);
                                                                }}
                                                                className="w-full px-6 py-5 rounded-xl bg-slate-50 border border-slate-100 focus:ring-8 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-500/20 transition-all outline-none text-slate-700 font-black shadow-sm placeholder:font-medium"
                                                                placeholder={field.placeholder}
                                                                required={field.required}
                                                                maxLength={(field.key === 'nik' || field.type === 'nik') ? 16 : undefined}
                                                            />
                                                        )}
                                                        {errors[field.key] && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-1 mt-1">{errors[field.key]}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="pt-8 flex flex-col sm:flex-row gap-4">
                                                {step > 1 && (
                                                    <button 
                                                        type="button" 
                                                        onClick={prevStep}
                                                        className="w-full sm:w-1/3 py-5 bg-white border-2 border-slate-100 text-slate-600 font-black uppercase text-xs tracking-widest rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95"
                                                    >
                                                        <ArrowLeftIcon className="w-4 h-4" /> Kembali
                                                    </button>
                                                )}
                                                <button 
                                                    type="button" 
                                                    onClick={nextStep}
                                                    className="grow py-5 bg-slate-900 border-2 border-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-200 active:scale-95"
                                                >
                                                    Tahap Selanjutnya <ArrowRightIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                ))}

                                {/* Final Step: Pembayaran */}
                                {step === totalSteps && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                                        <div className="flex items-center gap-5 border-b border-slate-100 pb-6">
                                            <div className="w-10 h-10 bg-emerald-600 text-white rounded-[1.25rem] flex items-center justify-center font-black text-lg shadow-lg shadow-emerald-200">{totalSteps}</div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">Metode Pembayaran</h3>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Pilih cara pelunasan biaya pendaftaran</p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <label className={`relative flex flex-col p-8 rounded-2xl border-2 transition-all cursor-pointer group hover:shadow-2xl hover:shadow-emerald-950/5 ${data.payment_method === 'cash' ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-50 bg-white hover:border-slate-200'}`}>
                                                <input type="radio" name="payment_method" value="cash" checked={data.payment_method === 'cash'} onChange={e => setData('payment_method', e.target.value)} className="sr-only" />
                                                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 mb-6 ${data.payment_method === 'cash' ? 'bg-emerald-600 text-white shadow-2xl shadow-emerald-200 scale-110' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'}`}>
                                                    <BanknotesIcon className="w-9 h-9" />
                                                </div>
                                                <span className="text-xl font-black text-slate-900 leading-none">Tunai</span>
                                                <span className="text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-widest opacity-60">Admin Nurul Ali</span>
                                                {data.payment_method === 'cash' && <div className="absolute top-8 right-8 text-emerald-600"><CheckCircleIcon className="w-8 h-8" /></div>}
                                            </label>

                                            <label className={`relative flex flex-col p-8 rounded-2xl border-2 transition-all cursor-pointer group hover:shadow-2xl hover:shadow-emerald-950/5 ${data.payment_method === 'transfer' ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-50 bg-white hover:border-slate-200'}`}>
                                                <input type="radio" name="payment_method" value="transfer" checked={data.payment_method === 'transfer'} onChange={e => setData('payment_method', e.target.value)} className="sr-only" />
                                                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 mb-6 ${data.payment_method === 'transfer' ? 'bg-emerald-600 text-white shadow-2xl shadow-emerald-200 scale-110' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'}`}>
                                                    <BuildingLibraryIcon className="w-9 h-9" />
                                                </div>
                                                <span className="text-xl font-black text-slate-900 leading-none">Transfer</span>
                                                <span className="text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-widest opacity-60">Bank Syariah Indonesia</span>
                                                {data.payment_method === 'transfer' && <div className="absolute top-8 right-8 text-emerald-600"><CheckCircleIcon className="w-8 h-8" /></div>}
                                            </label>
                                        </div>

                                        <div className="p-8 bg-slate-900 rounded-2xl text-white">
                                            <div className="flex gap-6 items-start relative z-10">
                                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                                                    <InformationCircleIcon className="w-7 h-7 text-emerald-400" />
                                                </div>
                                                <div className="space-y-2">
                                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Pernyataan Kejujuran</h5>
                                                    <p className="text-sm text-slate-300 leading-relaxed font-bold">
                                                        Dengan menekan tombol kirim, saya menyatakan bahwa seluruh data yang diberikan adalah benar dan sesuai dokumen asli.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-5">
                                            <button 
                                                type="button" 
                                                onClick={prevStep}
                                                className="w-full py-6 bg-white border-2 border-slate-100 text-slate-600 font-black uppercase text-xs tracking-widest rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                                            >
                                                <ArrowLeftIcon className="w-5 h-5" /> Kembali
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="sm:col-span-2 w-full py-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black uppercase text-sm tracking-[0.3em] rounded-xl shadow-2xl shadow-emerald-200 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4"
                                            >
                                                {processing ? 'Sedang Diproses...' : 'Selesaikan Pendaftaran'}
                                                <CheckCircleIcon className="w-6 h-6" />
                                            </button>
                                        </div>
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

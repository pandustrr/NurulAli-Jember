import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import ImagePreviewModal from '@/Components/Fragments/ImagePreviewModal';
import {
    CheckCircleIcon,
    XMarkIcon,
    ClipboardIcon,
    KeyIcon,
    UserIcon,
    IdentificationIcon
} from '@heroicons/react/24/outline';

// Partials
import SelectionSection from './Partials/SelectionSection';
import StepIndicator from './Partials/StepIndicator';
import FormStep from './Partials/FormStep';
import PaymentSection from './Partials/PaymentSection';

function SuccessModal({ isOpen, registration, onClose }) {
    if (!isOpen || !registration) return null;

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        window.dispatchEvent(new CustomEvent('toast', { detail: { message: `${label} berhasil disalin!`, type: 'success' } }));
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-500 border border-slate-100 flex flex-col max-h-[90vh]">
                
                {/* 1. Elegant Thin Top Bar */}
                <div className="h-2 bg-emerald-500 w-full shrink-0"></div>

                <div className="p-8 md:p-12 overflow-y-auto no-scrollbar">
                    {/* Success Icon Badge */}
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 ring-8 ring-emerald-500/5">
                            <CheckCircleIcon className="w-10 h-10" />
                        </div>
                    </div>

                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-2">Registrasi Berhasil</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Pondok Pesantren Nurul Ali Jember</p>
                    </div>

                    {/* Warning Box - Slimmer & Sleeker */}
                    <div className="mb-10 py-5 px-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                         <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
                             <KeyIcon className="w-5 h-5" />
                         </div>
                         <div className="text-left text-balance">
                             <h4 className="text-[10px] font-black uppercase text-slate-800 tracking-wider mb-0.5">Simpan Data Ini!</h4>
                             <p className="text-[9px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
                                Gunakan untuk login ke portal santri & cek status Anda.
                             </p>
                         </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        {/* Reg ID */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-emerald-200 transition-all shadow-sm">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors shadow-sm">
                                    <IdentificationIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1 group-hover:text-emerald-600">ID Registrasi / Password</p>
                                    <p className="text-sm font-black text-slate-700 tracking-tight">{registration.reg_id}</p>
                                </div>
                            </div>
                            <button onClick={() => copyToClipboard(registration.reg_id, 'ID Registrasi')} className="p-2 text-slate-300 hover:text-emerald-500 transition-colors">
                                <ClipboardIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Username */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-emerald-200 transition-all shadow-sm">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors shadow-sm">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1 group-hover:text-emerald-600">Username Santri</p>
                                    <p className="text-sm font-black text-slate-700 tracking-tight">{registration.username}</p>
                                </div>
                            </div>
                            <button onClick={() => copyToClipboard(registration.username, 'Username')} className="p-2 text-slate-300 hover:text-emerald-500 transition-colors">
                                <ClipboardIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Jenjang */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center group transition-all shadow-sm">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-50">
                                    <AcademicCapIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black uppercase text-emerald-600 tracking-widest mb-1">Daftar Ke Jenjang</p>
                                    <p className="text-sm font-black text-emerald-900 tracking-tight leading-tight">{registration.lembaga_summary}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all active:scale-95"
                    >
                        Tutup & Selesai
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Pendaftaran({ settings, ppdb_settings = {}, examples = [] }) {
    const { props } = usePage();
    const flash = props.flash || {};

    // Default Fallback Config if not set in Admin
    const defaultConfig = {
        sections: [
            {
                id: 'personal',
                title: 'Identitas Calon Santri',
                description: 'Biodata',
                fields: [
                    { key: 'name', label: 'Nama Lengkap', placeholder: 'Nama Lengkap', type: 'text', required: true },
                    { key: 'username', label: 'Nama Panggilan / Username', placeholder: 'Username untuk login nanti', type: 'text', required: true },
                    { key: 'nik', label: 'NIK (Nomor Induk Kependudukan)', placeholder: 'NIK (Nomor Induk Kependudukan)', type: 'nik', required: true },
                    { key: 'place_birth', label: 'Tempat Lahir', placeholder: 'Tempat Lahir', type: 'text', required: true },
                    { key: 'date_birth', label: 'Tanggal Lahir', placeholder: 'Tanggal Lahir', type: 'date', required: true },
                    { key: 'school_origin', label: 'Asal Sekolah', placeholder: 'Asal Sekolah', type: 'text', required: true },
                    { key: 'address', label: 'Alamat Lengkap', placeholder: 'Alamat Lengkap', type: 'textarea', required: true },
                ]
            },
            {
                id: 'parent',
                title: 'Data Orang Tua / Wali',
                description: 'Orang Tua',
                fields: [
                    { key: 'parent_name', label: 'Nama Ayah/Ibu/Wali', placeholder: 'Nama Ayah/Ibu/Wali', type: 'text', required: true },
                    { key: 'whatsapp', label: 'Nomor WhatsApp Aktif', placeholder: 'Nomor WhatsApp Aktif', type: 'tel', required: true },
                ]
            },
        ]
    };

    const formConfig = ppdb_settings.form_config ? JSON.parse(ppdb_settings.form_config) : defaultConfig;
    const sections = formConfig.sections || defaultConfig.sections;
    const totalSteps = sections.length + 1; // +1 for Payment

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        // Choice Fields
        lembaga_ids: [],
        // Fixed Fields
        name: '',
        username: '',
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
    const [previewImage, setPreviewImage] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // PERSISTENCE LOGIC
    // 1. Load from localStorage on Mount
    useEffect(() => {
        const saved = localStorage.getItem('ppdb_draft');
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                // Only restore non-file fields to avoid object corruption
                const restoredData = { ...data };
                Object.keys(draft.data || {}).forEach(key => {
                    if (!key.startsWith('file_')) {
                        restoredData[key] = draft.data[key];
                    }
                });
                setData(restoredData);
                if (draft.step) setStep(draft.step);
            } catch (e) {
                console.error("Draft restoration failed", e);
            }
        }
    }, []);

    // 2. Sync to localStorage
    useEffect(() => {
        const timer = setTimeout(() => {
            const cleanObj = (obj) => {
                const clean = {};
                Object.keys(obj).forEach(key => {
                    const val = obj[key];
                    if (!(val instanceof File) && !key.startsWith('file_')) {
                        if (val && typeof val === 'object' && !Array.isArray(val)) {
                            clean[key] = cleanObj(val);
                        } else {
                            clean[key] = val;
                        }
                    }
                });
                return clean;
            };

            const persistentData = cleanObj(data);

            localStorage.setItem('ppdb_draft', JSON.stringify({
                data: persistentData,
                step: step
            }));
        }, 1000); // Higher debounce for safety
        return () => clearTimeout(timer);
    }, [data, step]);

    useEffect(() => {
        if (recentlySuccessful || flash.registration) {
            setShowSuccess(true);
            localStorage.removeItem('ppdb_draft');
        }
    }, [recentlySuccessful, flash.registration]);

    const toast = (message, type = 'success') => {
        window.dispatchEvent(new CustomEvent('toast', { detail: { message, type } }));
    };

    const nextStep = () => {
        // Validation for Preliminary Requirement
        const selectedLembagas = data.lembaga_ids || [];
        if (selectedLembagas.length === 0) {
            toast('Silakan pilih minimal 1 jenjang pendidikan.', 'error');
            return;
        }

        // Simple client-side validation for mandatory fields in current step
        if (step <= sections.length) {
            const currentFields = sections[step - 1].fields;
            const fixedKeys = ['name', 'username', 'nik', 'place_birth', 'date_birth', 'parent_name', 'whatsapp', 'address', 'school_origin'];
            
            const missing = currentFields.filter(f => {
                const isFixed = fixedKeys.includes(f.key) || f.key.startsWith('file_');
                const val = isFixed ? data[f.key] : data.metadata[f.key];
                return f.required && !val;
            });

            if (missing.length > 0) {
                toast(`Mohon lengkapi bagian yang wajib diisi.`, 'error');
                return;
            }
        }
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const updateValue = (key, val) => {
        const fixed = [
            'name', 'username', 'nik', 'place_birth', 'date_birth', 
            'parent_name', 'whatsapp', 'address', 'school_origin', 
            'lembaga_ids'
        ];

        if (fixed.includes(key) || key.startsWith('file_')) {
            setData(key, val);
        } else {
            setData('metadata', { ...data.metadata, [key]: val });
        }
    };

    const toggleLembaga = (id) => {
        const current = Array.isArray(data.lembaga_ids) ? [...data.lembaga_ids] : [];
        const index = current.indexOf(id);

        if (index > -1) {
            // Remove if already exists
            current.splice(index, 1);
        } else {
            // Add if less than 3
            if (current.length < 3) {
                current.push(id);
            } else {
                toast('Maksimal 3 pilihan lembaga.', 'error');
                return;
            }
        }
        setData('lembaga_ids', current);
    };

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
                    {/* Header Hero - Matches Site Branding */}
                <div className="bg-emerald-950 h-[578px] flex items-center justify-center px-4 relative overflow-hidden text-center">
                    <div className="absolute inset-0">
                        <img 
                            src={settings.hero_pendaftaran || '/hero_pendaftaran.png'} 
                            className="w-full h-full object-cover opacity-40 transition-transform duration-1000 scale-105" 
                            alt="Hero Background"
                        />
                        <div className="absolute inset-0 bg-emerald-950/65 backdrop-blur-[0.5px]"></div>
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald-950/20 to-emerald-950"></div>
                    </div>
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <span className="inline-block px-5 py-2 bg-emerald-600/30 backdrop-blur-md rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-500/20">
                                Registration Portal
                            </span>
                            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                                Pendaftaran <span className="text-emerald-500 underline decoration-8 decoration-emerald-500/20 underline-offset-8">Online</span>
                            </h1>
                        </div>
                    </div>

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 -mt-24 relative z-20 space-y-8">

                        {/* 1. Selection Section */}
                        <SelectionSection
                            data={data}
                            toggleLembaga={toggleLembaga}
                        />

                        {/* 2. Main Registration Form Card */}
                        <div className="bg-white p-6 md:p-12 rounded-3xl shadow-2xl shadow-emerald-950/20 border border-white ring-8 ring-white/10 backdrop-blur-xl">
                            <div className="text-center mb-12">
                                <span className="inline-block px-5 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-4 shadow-sm shadow-emerald-100/50 border border-emerald-100">Portal Pendaftaran Santri Baru</span>
                                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase">Formulir Pendaftaran</h2>
                                <p className="mt-4 text-slate-400 font-bold uppercase tracking-[0.25em] text-[10px]">Nurul Ali Jember • Tahun Ajaran 2026/2027</p>
                            </div>

                            {/* Step Indicator */}
                            <StepIndicator
                                step={step}
                                sections={sections}
                                totalSteps={totalSteps}
                            />

                            {/* Dynamic Step Content */}
                            <div className="max-w-3xl mx-auto">
                                {step <= sections.length ? (
                                    <FormStep
                                        step={step}
                                        sections={sections}
                                        data={data}
                                        errors={errors}
                                        updateValue={updateValue}
                                        nextStep={nextStep}
                                        prevStep={prevStep}
                                        processing={processing}
                                        onImagePreview={setPreviewImage}
                                        examples={examples}
                                    />
                                ) : (
                                    <PaymentSection
                                        data={data}
                                        setData={setData}
                                        prevStep={prevStep}
                                        processing={processing}
                                        submit={submit}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modals & Overlays */}
            <SuccessModal 
                isOpen={showSuccess}
                registration={flash.registration}
                onClose={() => setShowSuccess(false)}
            />

            <ImagePreviewModal
                isOpen={!!previewImage}
                image={previewImage?.image}
                title={previewImage?.title}
                onClose={() => setPreviewImage(null)}
                dark={true}
            />
        </PublicLayout>
    );
}

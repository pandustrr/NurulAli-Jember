import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import ImagePreviewModal from '@/Components/Fragments/ImagePreviewModal';
import {
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

// Partials
import SelectionSection from './Partials/SelectionSection';
import StepIndicator from './Partials/StepIndicator';
import FormStep from './Partials/FormStep';
import PaymentSection from './Partials/PaymentSection';

export default function Pendaftaran({ settings, ppdb_settings = {}, examples = [] }) {
    // Default Fallback Config if not set in Admin
    const defaultConfig = {
        sections: [
            {
                id: 'personal',
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
            const missing = currentFields.filter(f => {
                const val = ['name', 'nik', 'place_birth', 'date_birth', 'parent_name', 'whatsapp', 'address', 'school_origin'].includes(f.key) ? data[f.key] : data.metadata[f.key];
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
        const fixed = ['name', 'nik', 'place_birth', 'date_birth', 'parent_name', 'whatsapp', 'address', 'school_origin', 'lembaga_ids'];
        if (fixed.includes(key)) {
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
                            src="/hero_pendaftaran.png" 
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

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 -mt-24 relative z-20 space-y-8">

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

                            {/* Dynamic Step Content */}
                            <div className="max-w-4xl mx-auto">
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

import React from 'react';
import { 
    UserIcon, 
    IdentificationIcon, 
    CalendarDaysIcon, 
    MapPinIcon, 
    PhoneIcon, 
    AcademicCapIcon, 
    CameraIcon,
    ArrowRightIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';

const fieldIcons = {
    name: UserIcon,
    nik: IdentificationIcon,
    place_birth: MapPinIcon,
    date_birth: CalendarDaysIcon,
    parent_name: UserIcon,
    whatsapp: PhoneIcon,
    address: MapPinIcon,
    school_origin: AcademicCapIcon,
};

export default function FormStep({ 
    step, 
    sections, 
    data, 
    errors, 
    updateValue, 
    nextStep, 
    prevStep, 
    processing,
    onImagePreview
}) {
    const currentSection = sections[step - 1];
    if (!currentSection) return null;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-1.5 h-10 bg-emerald-500 rounded-full"></div>
                <div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">{currentSection.description}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Lengkapi data berikut dengan benar</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentSection.fields.map((field) => {
                    const Icon = fieldIcons[field.key] || UserIcon;
                    const value = ['name', 'nik', 'place_birth', 'date_birth', 'parent_name', 'whatsapp', 'address', 'school_origin'].includes(field.key) 
                        ? (data[field.key] || '') 
                        : (data.metadata[field.key] || '');

                    return (
                        <div key={field.key} className="space-y-3 group">
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-hover:text-emerald-600">
                                <Icon className="w-3.5 h-3.5" />
                                {field.label}
                                {field.required && <span className="text-rose-500 ml-0.5">*</span>}
                            </label>

                            {field.type === 'file' ? (
                                <div className="relative">
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            updateValue(field.key, file);
                                            if (file && file.type.startsWith('image/')) {
                                                const reader = new FileReader();
                                                reader.onload = (e) => onImagePreview(e.target.result);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="hidden"
                                        id={`file-${field.key}`}
                                    />
                                    <label
                                        htmlFor={`file-${field.key}`}
                                        className="flex items-center justify-between w-full px-6 py-5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-white hover:border-emerald-400 transition-all duration-300 group/file shadow-sm"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover/file:bg-emerald-50 group-hover/file:text-emerald-600 transition-all shadow-sm">
                                                <CameraIcon className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 truncate max-w-[150px]">
                                                {value instanceof File ? value.name : `Pilih berkas ${field.label}`}
                                            </span>
                                        </div>
                                        <div className="px-4 py-2 bg-white text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm group-hover/file:bg-emerald-600 group-hover/file:text-white transition-all">Upload</div>
                                    </label>
                                </div>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    value={value}
                                    onChange={(e) => updateValue(field.key, e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-3xl text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-300 min-h-[120px]"
                                    placeholder={`Masukkan ${field.label.toLowerCase()}...`}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    value={value}
                                    onChange={(e) => updateValue(field.key, e.target.value)}
                                    className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-3xl text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-300 shadow-sm"
                                    placeholder={`Masukkan ${field.label.toLowerCase()}...`}
                                />
                            )}
                            {errors[field.key] && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-4 mt-1">{errors[field.key]}</p>}
                        </div>
                    );
                })}
            </div>

            <div className="mt-16 flex items-center justify-end gap-6 pt-10 border-t border-slate-100">
                {step > 1 && (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center gap-3 px-8 py-4 text-slate-400 hover:text-slate-800 font-black text-xs uppercase tracking-widest transition-all group"
                    >
                        <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
                        Kembali
                    </button>
                )}
                <button
                    type="button"
                    onClick={nextStep}
                    disabled={processing}
                    className="flex items-center gap-4 px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-4xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-200 transition-all hover:-translate-y-1 hover:shadow-emerald-300 disabled:opacity-50 group"
                >
                    Lanjutkan Langkah
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </button>
            </div>
        </div>
    );
}

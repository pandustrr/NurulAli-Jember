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
    onImagePreview,
    examples = []
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
                    const value = ([
                        'name', 'username', 'nik', 'place_birth', 'date_birth', 
                        'parent_name', 'whatsapp', 'address', 'school_origin'
                    ].includes(field.key) || field.key.startsWith('file_') || field.type === 'username')
                        ? (data[field.key] || '') 
                        : (data.metadata[field.key] || '');

                    const isFileType = field.type === 'file' || field.type === 'file_img' || field.type === 'file_pdf';
                    const hasExample = field.example_id && examples.find(ex => ex.id == field.example_id);

                    return (
                        <div key={field.key} className="space-y-3 group">
                            <div className="flex justify-between items-center px-1">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest transition-colors group-hover:text-emerald-600">
                                    <Icon className="w-3.5 h-3.5" />
                                    {field.label}
                                    {field.required && <span className="text-rose-500 ml-0.5">*</span>}
                                </label>
                                
                                {isFileType && hasExample && (
                                    <button 
                                        type="button"
                                        onClick={() => onImagePreview({ image: hasExample.image, title: `Contoh ${field.label}` })}
                                        className="text-[9px] font-black text-emerald-600 uppercase tracking-widest border-b border-dashed border-emerald-300 hover:border-emerald-600 transition-all"
                                    >
                                        Lihat Contoh
                                    </button>
                                )}
                            </div>

                            {isFileType ? (
                                <div className="relative h-full">
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file && !['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                                                window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Hanya file JPG, JPEG, atau PNG yang diperbolehkan.', type: 'error' } }));
                                                return;
                                            }
                                            updateValue(field.key, file);
                                        }}
                                        className="hidden"
                                        id={`file-${field.key}`}
                                    />
                                    <label
                                        htmlFor={`file-${field.key}`}
                                        className={`flex items-center justify-between w-full h-full min-h-[110px] px-4 md:px-6 py-5 rounded-3xl cursor-pointer transition-all duration-500 group/file shadow-sm border-2 ${value ? 'bg-white border-emerald-500 shadow-xl shadow-emerald-500/10' : 'bg-slate-50 border-dashed border-slate-200 hover:bg-white hover:border-emerald-400'}`}
                                    >
                                        <div className="flex items-center gap-3 md:gap-4 grow min-w-0 pr-2">
                                            <div 
                                                onClick={(e) => {
                                                    if (value instanceof File && value.type.startsWith('image/')) {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        onImagePreview({ image: URL.createObjectURL(value), title: `Pratinjau ${field.label}` });
                                                    }
                                                }}
                                                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all shadow-sm shrink-0 overflow-hidden border-4 ${value ? 'bg-white border-white ring-1 ring-emerald-100 cursor-zoom-in group-hover/file:scale-105' : 'bg-white border-transparent text-slate-400 group-hover/file:bg-emerald-50 group-hover/file:text-emerald-600'}`}
                                            >
                                                {value instanceof File && value.type.startsWith('image/') ? (
                                                    <img 
                                                        src={URL.createObjectURL(value)} 
                                                        className="w-full h-full object-cover" 
                                                        alt="Selected"
                                                        onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                                                    />
                                                ) : (
                                                    <CameraIcon className="w-6 h-6" />
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className={`text-[11px] md:text-xs font-black truncate leading-tight mb-1 uppercase tracking-tight ${value ? 'text-emerald-800' : 'text-slate-500'}`}>
                                                    {field.label}
                                                </span>
                                                <span className={`text-[10px] md:text-[11px] font-bold truncate ${value ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                    {value instanceof File ? value.name : `Pilih Berkas...`}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-1.5 shrink-0 pl-2 border-l border-slate-100/50">
                                            <div className={`px-5 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-md transition-all ${value ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white text-emerald-600 group-hover/file:bg-emerald-600 group-hover/file:text-white'}`}>
                                                {value ? 'Ganti' : 'Upload'}
                                            </div>
                                            {value instanceof File && value.type.startsWith('image/') && (
                                                <button 
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        onImagePreview({ image: URL.createObjectURL(value), title: `Pratinjau ${field.label}` });
                                                    }}
                                                    className="text-[8px] md:text-[9px] font-black text-emerald-600/70 hover:text-emerald-800 uppercase tracking-widest transition-all p-1"
                                                >
                                                    Lihat File
                                                </button>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    value={value}
                                    onChange={(e) => updateValue(field.key, e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-300 min-h-[120px]"
                                    placeholder={`Masukkan ${field.label.toLowerCase()}...`}
                                />
                            ) : field.type === 'nik' ? (
                                <div className="relative">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={16}
                                        value={value}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9]/g, '');
                                            updateValue(field.key, val);
                                        }}
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-300 shadow-sm"
                                        placeholder="Masukkan 16 digit NIK..."
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-widest text-slate-300 pointer-events-none">
                                        {value.length}/16
                                    </div>
                                </div>
                            ) : (field.type === 'tel' || field.key === 'whatsapp') ? (
                                <div className="relative">
                                    <input
                                        type="tel"
                                        inputMode="tel"
                                        value={value}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9+]/g, '');
                                            updateValue(field.key, val);
                                        }}
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-300 shadow-sm"
                                        placeholder="Contoh: 08123... / +62812..."
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                                        <PhoneIcon className={`w-4 h-4 ${value ? 'text-emerald-500' : 'text-slate-300'}`} />
                                    </div>
                                </div>
                            ) : field.type === 'date' ? (
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="relative">
                                        <select
                                            value={value ? value.split('-')[2] : ''}
                                            onChange={(e) => {
                                                const parts = (value || '--').split('-');
                                                const year = parts[0] || '';
                                                const month = parts[1] || '';
                                                updateValue(field.key, `${year}-${month}-${e.target.value.padStart(2, '0')}`);
                                            }}
                                            className="w-full px-4 py-5 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-xs font-bold text-slate-700 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Tgl</option>
                                            {[...Array(31)].map((_, i) => (
                                                <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={value ? value.split('-')[1] : ''}
                                            onChange={(e) => {
                                                const parts = (value || '--').split('-');
                                                const year = parts[0] || '';
                                                const day = parts[2] || '';
                                                updateValue(field.key, `${year}-${e.target.value.padStart(2, '0')}-${day}`);
                                            }}
                                            className="w-full px-4 py-5 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-xs font-bold text-slate-700 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Bulan</option>
                                            {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((m, i) => (
                                                <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>{m}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={value ? value.split('-')[0] : ''}
                                            onChange={(e) => {
                                                const parts = (value || '--').split('-');
                                                const month = parts[1] || '';
                                                const day = parts[2] || '';
                                                updateValue(field.key, `${e.target.value}-${month}-${day}`);
                                            }}
                                            className="w-full px-4 py-5 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-xs font-bold text-slate-700 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Tahun</option>
                                            {[...Array(30)].map((_, i) => {
                                                const year = new Date().getFullYear() - 5 - i;
                                                return <option key={year} value={year}>{year}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                            ) : (
                                <input
                                    type={field.type}
                                    value={value}
                                    onChange={(e) => updateValue(field.key, e.target.value)}
                                    className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-300 shadow-sm"
                                    placeholder={`Masukkan ${field.label.toLowerCase()}...`}
                                />
                            )}
                            {errors[field.key] && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-4 mt-1">{errors[field.key]}</p>}
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-end gap-2 md:gap-6 pt-8 md:pt-10 border-t border-slate-100">
                {step > 1 && (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="w-full md:w-auto flex items-center justify-center gap-3 px-6 md:px-8 py-4 text-slate-400 hover:text-slate-800 font-black text-[10px] md:text-xs uppercase tracking-widest transition-all group order-2 md:order-1"
                    >
                        <ArrowLeftIcon className="w-3.5 h-3.5 md:w-4 h-4 transition-transform group-hover:-translate-x-2" />
                        Kembali
                    </button>
                )}
                
                {(() => {
                    const missing = currentSection.fields.filter(f => {
                        const val = ([
                            'name', 'username', 'nik', 'place_birth', 'date_birth', 
                            'parent_name', 'whatsapp', 'address', 'school_origin'
                        ].includes(f.key) || f.key.startsWith('file_') || f.type === 'username')
                            ? (data[f.key]) 
                            : (data.metadata[f.key]);

                        // Required but empty
                        if (f.required && !val) return true;
                        
                        // Type specific length check (NIK must be 16)
                        if ((f.type === 'nik' || f.key === 'nik') && val && val.length !== 16) return true;
                        
                        return false;
                    });

                    const canNext = missing.length === 0;

                    return (
                        <button
                            type="button"
                            onClick={nextStep}
                            disabled={!canNext || processing}
                            className={`w-full md:w-auto flex items-center justify-center gap-4 px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all group order-1 md:order-2 ${
                                canNext 
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl md:shadow-2xl shadow-emerald-200 hover:-translate-y-1 hover:shadow-emerald-300' 
                                    : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                            }`}
                        >
                            {canNext ? 'Lanjutkan' : 'Lengkapi Data'}
                            <ArrowRightIcon className={`w-3.5 h-3.5 md:w-4 h-4 transition-transform ${canNext ? 'group-hover:translate-x-2' : 'opacity-30'}`} />
                        </button>
                    );
                })()}
            </div>
        </div>
    );
}

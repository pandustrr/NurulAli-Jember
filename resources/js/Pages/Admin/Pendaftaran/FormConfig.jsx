import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    PencilSquareIcon,
    TableCellsIcon,
    PlusIcon,
    TrashIcon,
    CheckCircleIcon,
    PhotoIcon,
    ArrowUpTrayIcon,
    CloudArrowUpIcon,
    EyeIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import Toast from '@/Components/Fragments/Toast';
import ConfirmModal from '@/Components/Fragments/ConfirmModal';
import ImagePreviewModal from '@/Components/Fragments/ImagePreviewModal';
import { useState, useMemo } from 'react';

export default function FormConfig({ settings, examples = [] }) {
    const originalConfig = useMemo(() => settings.form_config ? JSON.parse(settings.form_config) : { sections: [] }, [settings.form_config]);

    const { data, setData, post, processing } = useForm({
        form_config: settings.form_config ? JSON.parse(settings.form_config) : {
            sections: [
                {
                    id: 'section_1',
                    title: 'Identitas Calon Santri',
                    description: 'Identitas Calon Santri',
                    fields: [
                        { id: 'f_name', key: 'name', label: 'Nama Lengkap', placeholder: 'Nama Lengkap', type: 'text', required: true, example_id: null },
                        { id: 'f_nik', key: 'nik', label: 'NIK (Nomor Induk Kependudukan)', placeholder: 'NIK (Nomor Induk Kependudukan)', type: 'nik', required: true, example_id: null },
                        { id: 'f_pb', key: 'place_birth', label: 'Tempat Lahir', placeholder: 'Tempat Lahir', type: 'text', required: true, example_id: null },
                        { id: 'f_db', key: 'date_birth', label: 'Tanggal Lahir', placeholder: 'Tanggal Lahir', type: 'date', required: true, example_id: null },
                        { id: 'f_so', key: 'school_origin', label: 'Asal Sekolah', placeholder: 'Asal Sekolah', type: 'text', required: true, example_id: null },
                        { id: 'f_addr', key: 'address', label: 'Alamat Lengkap', placeholder: 'Alamat Lengkap', type: 'textarea', required: true, example_id: null },
                    ]
                },
                {
                    id: 'section_2',
                    title: 'Data Orang Tua / Wali',
                    description: 'Orang Tua',
                    fields: [
                        { id: 'f_pn', key: 'parent_name', label: 'Nama Ayah/Ibu/Wali', placeholder: 'Nama Ayah/Ibu/Wali', type: 'text', required: true, example_id: null },
                        { id: 'f_wa', key: 'whatsapp', label: 'Nomor WhatsApp Aktif', placeholder: 'Nomor WhatsApp Aktif', type: 'tel', required: true, example_id: null },
                    ]
                }
            ]
        }
    });

    // States for Quick Upload
    const [isUploading, setIsUploading] = useState(null); // stores field id being uploaded

    const handleQuickUpload = (file, sIdx, fIdx) => {
        const field = data.form_config.sections[sIdx].fields[fIdx];
        setIsUploading(field.id);

        const formData = new FormData();
        formData.append('image', file);

        router.post(route('admin.ppdb-examples.store'), formData, {
            onSuccess: (page) => {
                // The examples prop will be refreshed by Inertia automatically
                // We just need to find the newest example (highest ID or matching title)
                const newExamples = page.props.examples || [];
                // Sort by ID descending to get the latest
                const latest = [...newExamples].sort((a,b) => b.id - a.id)[0];
                if (latest) {
                    updateField(sIdx, fIdx, 'example_id', latest.id);
                }
                setIsUploading(null);
            },
            onError: () => setIsUploading(null),
            onFinish: () => setIsUploading(null),
        });
    };

    // Determine if a specific section is dirty
    const isSectionDirty = (section) => {
        const original = originalConfig.sections?.find(s => s.id === section.id);
        if (!original) return true; // New section
        return JSON.stringify(original) !== JSON.stringify(section);
    };

    // Global dirty check
    const isGloballyDirty = JSON.stringify(originalConfig) !== JSON.stringify(data.form_config);

    // Confirmation Modal States
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        onConfirm: () => {},
        title: '',
        message: '',
    });

    const openConfirm = (title, message, onConfirm) => {
        setConfirmModal({ isOpen: true, title, message, onConfirm });
    };

    const [previewImg, setPreviewImg] = useState(null);

    const toast = (message, type = 'success') => {
        window.dispatchEvent(new CustomEvent('toast', { detail: { message, type } }));
    };

    // SECTION ACTIONS
    const addSection = () => {
        const id = 'section_' + Date.now();
        const next = { ...data.form_config };
        if (!next.sections) next.sections = [];
        next.sections.push({
            id: id,
            title: 'Bagian Baru',
            description: 'Label Indikator',
            fields: []
        });
        setData('form_config', next);
        toast('Tahapan baru ditambahkan.', 'success');
        
        // Scroll to the newest section
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const removeSection = (index) => {
        const next = { ...data.form_config };
        const sectionTitle = next.sections[index].title;
        next.sections.splice(index, 1);
        setData('form_config', next);
        toast(`Tahapan "${sectionTitle}" berhasil dihapus dari draf.`, 'error');
    };

    const updateSection = (index, field, val) => {
        const next = { ...data.form_config };
        next.sections[index][field] = val;
        setData('form_config', next);
    };

    // FIELD ACTIONS
    const addField = (sectionIndex) => {
        const fid = 'field_' + Date.now();
        const next = { ...data.form_config };
        next.sections[sectionIndex].fields.push({
            id: fid,
            key: fid,
            label: 'Input Baru',
            placeholder: 'Input Baru',
            type: 'text',
            required: true,
            example_id: null
        });
        setData('form_config', next);
        toast('Kolom input baru ditambahkan.', 'success');

        // Scroll to the newest field
        setTimeout(() => {
            const el = document.getElementById(fid);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const removeField = (sectionIndex, fieldIndex) => {
        const next = { ...data.form_config };
        const fieldLabel = next.sections[sectionIndex].fields[fieldIndex].label;
        next.sections[sectionIndex].fields.splice(fieldIndex, 1);
        setData('form_config', next);
        toast(`Kolom "${fieldLabel}" berhasil dihapus dari draf.`, 'error');
    };

    const updateField = (sectionIndex, fieldIndex, prop, val) => {
        const next = { ...data.form_config };
        next.sections[sectionIndex].fields[fieldIndex][prop] = val;
        
        // Auto-set key for specialized types
        if (prop === 'type' && val === 'username') {
            next.sections[sectionIndex].fields[fieldIndex].key = 'username';
        }

        // Always sync placeholder with label in background
        if (prop === 'label') {
            next.sections[sectionIndex].fields[fieldIndex].placeholder = val;
        }
        
        setData('form_config', next);
    };

    const submit = (e) => {
        if (e) e.preventDefault();
        post(route('admin.ppdb-settings.update'));
    };

    const inputTypes = [
        { id: 'text', label: 'Teks Biasa' },
        { id: 'username', label: 'Nama Panggilan / Username' },
        { id: 'nik', label: 'NIK (16 Digit)' },
        { id: 'textarea', label: 'Teks Panjang' },
        { id: 'date', label: 'Tanggal' },
        { id: 'tel', label: 'Nomor Telepon/WA' },
        { id: 'number', label: 'Angka' },
        { id: 'email', label: 'Email' },
        { id: 'file_pdf', label: 'Upload PDF' },
        { id: 'file_img', label: 'Upload Gambar (JPG / PNG / JPEG)' },
    ];

    return (
        <AdminLayout 
            header="Atur Formulir Pendaftaran"
            icon={PencilSquareIcon}
            description="Lengkapi label dan tipe inputan formulir secara sederhana."
        >
            <Head title="Admin - Formulir Pendaftaran" />

            <div className="max-w-4xl mx-auto space-y-12 font-medium text-slate-900">
                
                <div className="space-y-12">
                    <div className="flex justify-between items-center bg-white p-6 rounded-4xl shadow-sm border border-slate-100 mb-10">
                        <div className="flex items-center gap-3 ml-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mt-0.5">Struktur Formulir Aktif</span>
                        </div>
                        <button 
                            type="button" 
                            onClick={addSection}
                            className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-100"
                        >
                            <PlusIcon className="w-4 h-4" /> Tambah Tahapan Baru
                        </button>
                    </div>

                    <div className="space-y-16">
                        {data.form_config.sections?.map((section, sIdx) => {
                            const isDirty = isSectionDirty(section);
                            return (
                                <div key={section.id} id={section.id} className="relative animate-in fade-in slide-in-from-bottom-4 duration-500 group/section">
                                    {/* Section Header */}
                                    <div className="bg-white p-6 md:p-8 rounded-t-[2.5rem] border border-slate-100/60 shadow-sm relative z-20 transition-all group-hover/section:shadow-xl group-hover/section:shadow-emerald-900/5 group-hover/section:-translate-y-1">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-emerald-200">
                                                    {sIdx + 1}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Tahapan {sIdx + 1}</h3>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Pengaturan Bagian Formulir</p>
                                                        {isDirty && <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest animate-pulse">Ada Perubahan</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => openConfirm(
                                                    'Hapus Tahapan', 
                                                    'Apakah Anda yakin ingin menghapus seluruh tahapan ini beserta isinya?',
                                                    () => removeSection(sIdx)
                                                )}
                                                className="text-rose-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-xl transition-all"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100/60 border-dashed">
                                            <div className="space-y-2">
                                                <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1">Judul Tahapan (Muncul di Form)</label>
                                                <input 
                                                    value={section.title} 
                                                    onChange={e => updateSection(sIdx, 'title', e.target.value)} 
                                                    className="w-full bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 outline-none font-bold text-slate-700 text-[14px] focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                                                    placeholder="Contoh: Identitas Santri"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1">Sub Judul Tahapan</label>
                                                <input 
                                                    value={section.description} 
                                                    onChange={e => updateSection(sIdx, 'description', e.target.value)} 
                                                    className="w-full bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 outline-none font-bold text-slate-700 text-[14px] focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                                                    placeholder="Contoh: Biodata"
                                                />
                                            </div>
                                        </div>

                                        {/* Field List Container */}
                                        <div className="mt-8 space-y-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Daftar Input Kolom</h4>
                                                <button 
                                                    type="button" 
                                                    onClick={() => addField(sIdx)}
                                                    className="text-emerald-600 hover:text-emerald-700 font-black text-[9px] uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100 transition-all hover:bg-emerald-100"
                                                >
                                                    <PlusIcon className="w-3.5 h-3.5" /> Tambah Kolom
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {section.fields?.length === 0 && (
                                                    <div className="py-10 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100 text-slate-300 font-bold text-xs">
                                                        Klik tambah kolom untuk mengisi tahapan ini.
                                                    </div>
                                                )}
                                                {section.fields?.map((field, fIdx) => (
                                                    <div key={field.id} id={field.id} className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100/50 flex flex-col gap-5 items-stretch group hover:bg-white hover:border-emerald-100/50 hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-300">
                                                        <div className="flex flex-col lg:flex-row gap-5 items-end">
                                                            <div className="grow space-y-2">
                                                                    <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1">Label Input</label>
                                                                    <input 
                                                                        value={field.label} 
                                                                        onChange={e => updateField(sIdx, fIdx, 'label', e.target.value)} 
                                                                        className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-100 outline-none font-bold text-slate-700 text-[12px] focus:border-emerald-500/30"
                                                                        placeholder="Masukan Nama Label..."
                                                                    />
                                                            </div>
                                                            <div className="w-full lg:w-1/3 grid grid-cols-2 gap-3">
                                                                    <div className="space-y-2">
                                                                        <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1">Tipe</label>
                                                                        <select 
                                                                            value={field.type} 
                                                                            onChange={e => updateField(sIdx, fIdx, 'type', e.target.value)}
                                                                            className="w-full bg-white px-3 py-2.5 rounded-xl border border-slate-100 outline-none font-bold text-slate-700 text-[10px] focus:border-emerald-500/30"
                                                                        >
                                                                            {inputTypes.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                                                                        </select>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1 truncate">Wajib</label>
                                                                        <div className="h-[42px] flex items-center justify-center">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => updateField(sIdx, fIdx, 'required', !field.required)}
                                                                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${field.required ? 'bg-emerald-600' : 'bg-slate-200'}`}
                                                                            >
                                                                                <span
                                                                                    aria-hidden="true"
                                                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${field.required ? 'translate-x-5' : 'translate-x-0'}`}
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                            <button 
                                                                    type="button" 
                                                                    onClick={() => openConfirm(
                                                                        'Hapus Kolom',
                                                                        `Hapus kolom "${field.label}"?`,
                                                                        () => removeField(sIdx, fIdx)
                                                                    )}
                                                                    className="h-[42px] px-4 text-rose-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                                            >
                                                                    <TrashIcon className="w-4 h-4" />
                                                            </button>
                                                        </div>

                                                        {/* Example Image Minimalist UI */}
                                                        <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                                                            {!field.example_id ? (
                                                                <div className="relative group">
                                                                    <input 
                                                                        type="file"
                                                                        accept="image/*"
                                                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                                                        onChange={e => e.target.files[0] && handleQuickUpload(e.target.files[0], sIdx, fIdx)}
                                                                    />
                                                                    <button 
                                                                        type="button"
                                                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${isUploading === field.id ? 'bg-emerald-100 text-emerald-600 animate-pulse' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-200/30'}`}
                                                                    >
                                                                        <CloudArrowUpIcon className="w-3.5 h-3.5" />
                                                                        {isUploading === field.id ? 'Mengunggah...' : 'Upload Panduan Gambar'}
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 transition-all">
                                                                    <div 
                                                                        onClick={() => setPreviewImg({ image: examples.find(ex => ex.id == field.example_id)?.image, title: field.label })}
                                                                        className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-lg shadow-emerald-950/5 ring-1 ring-slate-100 relative group/thumb cursor-pointer"
                                                                    >
                                                                        <img 
                                                                            src={examples.find(ex => ex.id == field.example_id)?.image} 
                                                                            className="w-full h-full object-cover" 
                                                                            alt="Preview" 
                                                                        />
                                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                                                            <PhotoIcon className="w-4 h-4 text-white" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col sm:flex-row items-center gap-2 ml-1">
                                                                        <button 
                                                                            type="button"
                                                                            onClick={() => setPreviewImg({ image: examples.find(ex => ex.id == field.example_id)?.image, title: field.label })}
                                                                            className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-black text-[9px] uppercase tracking-widest hover:bg-emerald-50 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-emerald-100"
                                                                        >
                                                                            <EyeIcon className="w-3.5 h-3.5" /> Lihat
                                                                        </button>
                                                                        <div className="relative group">
                                                                            <input 
                                                                                type="file"
                                                                                accept="image/*"
                                                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                                                                onChange={e => e.target.files[0] && handleQuickUpload(e.target.files[0], sIdx, fIdx)}
                                                                            />
                                                                            <button 
                                                                                type="button"
                                                                                className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 font-black text-[9px] uppercase tracking-widest hover:bg-slate-100 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-slate-200"
                                                                            >
                                                                                <PencilSquareIcon className="w-3.5 h-3.5" /> Ganti
                                                                            </button>
                                                                        </div>
                                                                        <button 
                                                                            type="button"
                                                                            onClick={() => {
                                                                                updateField(sIdx, fIdx, 'example_id', null);
                                                                                toast('Panduan gambar dihapus.', 'error');
                                                                            }}
                                                                            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-600 font-black text-[9px] uppercase tracking-widest hover:bg-rose-50 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-rose-100"
                                                                        >
                                                                            <TrashIcon className="w-3.5 h-3.5" /> Hapus
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* Per-Section Save Button */}
                                        <div className="mt-10 pt-6 border-t border-slate-50 border-dashed flex justify-end">
                                            <button 
                                                type="button"
                                                onClick={() => submit()}
                                                disabled={processing || !isDirty}
                                                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 active:scale-95 ${
                                                    isDirty 
                                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-200' 
                                                    : 'bg-slate-100 text-slate-400 grayscale cursor-not-allowed'
                                                } ${processing ? 'opacity-50' : ''}`}
                                            >
                                                <CheckCircleIcon className="w-4 h-4" /> 
                                                {processing ? 'Menyimpan...' : `Simpan Tahapan ${sIdx + 1}`}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-slate-50 mx-10 rounded-b-[2.5rem] border-x border-b border-slate-100 shadow-sm opacity-50"></div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Final Action Bar (Optional but good to keep as Save All) */}
                    <div className="flex flex-col items-center gap-6 pt-12 pb-20">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center max-w-sm">
                            Gunakan tombol simpan di setiap tahapan atau tombol di bawah ini untuk menyimpan seluruh perubahan struktur formulir.
                        </p>
                        <button
                            type="button"
                            onClick={() => submit()}
                            disabled={processing || !isGloballyDirty}
                            className={`px-16 py-5 rounded-full font-black text-[12px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 active:scale-95 ${
                                isGloballyDirty
                                ? 'bg-slate-900 border-4 border-white text-white shadow-2xl shadow-slate-200 hover:bg-slate-800'
                                : 'bg-slate-100 text-slate-300 grayscale border-4 border-slate-50 cursor-not-allowed'
                            } ${processing ? 'opacity-50' : ''}`}
                        >
                            {processing ? 'Sedang Memproses...' : 'Simpan Seluruh Struktur'}
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <PlusIcon className="w-4 h-4 rotate-45" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmModal 
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                type="danger"
            />

            <Toast />

            <ImagePreviewModal 
                isOpen={!!previewImg}
                image={previewImg?.image}
                title={previewImg?.title}
                onClose={() => setPreviewImg(null)}
                dark={false}
            />
        </AdminLayout>
    );
}

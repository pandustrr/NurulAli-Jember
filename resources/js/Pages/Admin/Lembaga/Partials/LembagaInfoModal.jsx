import React from 'react';
import { 
    AcademicCapIcon, 
    BuildingLibraryIcon, 
    BuildingOfficeIcon, 
    BriefcaseIcon,
    BookOpenIcon,
    UserGroupIcon,
    BeakerIcon,
    RectangleGroupIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const iconList = [
    { name: 'AcademicCapIcon', icon: AcademicCapIcon },
    { name: 'BuildingLibraryIcon', icon: BuildingLibraryIcon },
    { name: 'BuildingOfficeIcon', icon: BuildingOfficeIcon },
    { name: 'BriefcaseIcon', icon: BriefcaseIcon },
    { name: 'BookOpenIcon', icon: BookOpenIcon },
    { name: 'UserGroupIcon', icon: UserGroupIcon },
    { name: 'BeakerIcon', icon: BeakerIcon },
    { name: 'RectangleGroupIcon', icon: RectangleGroupIcon },
];

export default function LembagaInfoModal({ isOpen, onClose, data, setData, onSubmit, editData, processing, errors }) {
    if (!isOpen) return null;

    const addPrice = () => {
        setData('prices', [...data.prices, { label: '', value: '' }]);
    };

    const removePrice = (index) => {
        const newPrices = [...data.prices];
        newPrices.splice(index, 1);
        setData('prices', newPrices);
    };

    const updatePrice = (index, field, value) => {
        const newPrices = [...data.prices];
        newPrices[index][field] = value;
        setData('prices', newPrices);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 text-slate-900 overflow-y-auto">
            <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in-95 duration-500 my-8 overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header Container */}
                <div className="px-8 pt-8 pb-6 border-b border-slate-50 flex justify-between items-center shrink-0">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
                            {editData ? 'Edit Jenjang' : 'Tambah Jenjang Baru'}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Konfigurasi informasi & biaya pendidikan</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-2xl transition-all active:scale-90"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Container */}
                <form onSubmit={onSubmit} className="flex-1 overflow-y-auto no-scrollbar p-8 pt-6 space-y-10">
                    
                    {/* Basic Info Group */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                             <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-[10px] font-black">1</div>
                             <h4 className="text-[11px] font-black uppercase text-slate-800 tracking-widest">Informasi Utama</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Singkat (Title)</label>
                                <input
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    type="text"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none font-bold placeholder:font-normal"
                                    placeholder="Contoh: MI"
                                />
                                {errors.title && <p className="text-rose-500 text-[9px] mt-1 font-bold italic ml-1">{errors.title}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap (Subtitle)</label>
                                <input
                                    value={data.subtitle}
                                    onChange={e => setData('subtitle', e.target.value)}
                                    type="text"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none font-bold placeholder:font-normal"
                                    placeholder="Contoh: Madrasah Ibtidaiyah"
                                />
                                {errors.subtitle && <p className="text-rose-500 text-[9px] mt-1 font-bold italic ml-1">{errors.subtitle}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pilih Icon Visual</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {iconList.map((item) => (
                                        <button
                                            key={item.name}
                                            type="button"
                                            onClick={() => setData('icon', item.name)}
                                            className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center ${data.icon === item.name ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-50 bg-white text-slate-300 hover:border-slate-200 hover:text-slate-400'}`}
                                            title={item.name}
                                        >
                                            <item.icon className="w-5 h-5" />
                                        </button>
                                    ))}
                                </div>
                                {errors.icon && <p className="text-rose-500 text-[9px] mt-1 font-bold italic ml-1">{errors.icon}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image / Background (Optional)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        onChange={e => setData('image', e.target.files[0])}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="lembaga-image"
                                    />
                                    <label 
                                        htmlFor="lembaga-image"
                                        className="grow p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-[10px] font-bold text-slate-400 text-center cursor-pointer hover:bg-slate-100 transition-colors uppercase tracking-widest"
                                    >
                                        {(data.image || editData?.image) ? 'Ganti Image' : 'Pilih File'}
                                    </label>
                                    {(data.image || editData?.image) && (
                                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-100 shadow-sm shrink-0">
                                            <img
                                                src={data.image ? URL.createObjectURL(data.image) : editData.image}
                                                className="w-full h-full object-cover"
                                                alt="preview"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Group */}
                    <div className="space-y-6 pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-4 mb-2">
                             <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-[10px] font-black">2</div>
                             <h4 className="text-[11px] font-black uppercase text-slate-800 tracking-widest">Deskripsi & Konten</h4>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Deskripsi Singkat (Beranda)</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="2"
                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-sm font-medium"
                                placeholder="Jelaskan secara singkat penawaran jenjang ini..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detail Lengkap (Modal Popup)</label>
                            <textarea
                                value={data.detailed_description}
                                onChange={e => setData('detailed_description', e.target.value)}
                                rows="4"
                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-sm font-medium"
                                placeholder="Jelaskan keunggulan, kurikulum, dan detail program..."
                            />
                        </div>
                    </div>

                    {/* Pricing Group */}
                    <div className="space-y-6 pt-4 border-t border-slate-50">
                        <div className="flex justify-between items-center mb-2">
                             <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-[10px] font-black">3</div>
                                <h4 className="text-[11px] font-black uppercase text-slate-800 tracking-widest">Estimasi Biaya</h4>
                             </div>
                             <button
                                type="button"
                                onClick={addPrice}
                                className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all active:scale-95"
                                title="Tambah Baris Biaya"
                             >
                                <PlusIcon className="w-4 h-4" />
                             </button>
                        </div>
                        
                        <div className="space-y-3">
                            {data.prices.map((price, idx) => (
                                <div key={idx} className="flex gap-3 items-center animate-in slide-in-from-right-2 duration-300">
                                    <div className="grow grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <input
                                            value={price.label}
                                            onChange={e => updatePrice(idx, 'label', e.target.value)}
                                            type="text"
                                            className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-bold outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500"
                                            placeholder="Nama Biaya (e.g. SPP)"
                                        />
                                        <input
                                            value={price.value}
                                            onChange={e => updatePrice(idx, 'value', e.target.value)}
                                            type="text"
                                            className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-black tabular-nums outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500"
                                            placeholder="Nominal (e.g. Rp 150.000)"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removePrice(idx)}
                                        className="p-3 text-slate-300 hover:text-rose-500 transition-colors shrink-0"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {data.prices.length === 0 && (
                                <p className="text-[10px] text-slate-400 italic text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 uppercase tracking-widest font-bold">Belum ada rincian biaya. Klik "+" untuk menambah.</p>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-4 pt-10 sticky bottom-0 bg-white pb-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="grow py-5 border border-slate-200 text-slate-600 font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-slate-50 transition-colors active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="grow py-5 bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl active:scale-95"
                        >
                            {editData ? 'Simpan Perubahan' : 'Terbitkan Jenjang'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

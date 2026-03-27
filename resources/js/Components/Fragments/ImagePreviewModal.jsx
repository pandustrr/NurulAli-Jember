import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ImagePreviewModal({ isOpen, image, title, onClose, dark = false }) {
    if (!isOpen || !image) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div 
                className={`absolute inset-0 backdrop-blur-sm transition-colors ${dark ? 'bg-slate-900/40' : 'bg-slate-900/30'}`} 
                onClick={onClose}
            ></div>
            <div className="relative max-w-sm w-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                <button 
                    onClick={onClose}
                    className={`absolute -top-12 right-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all border shadow-sm backdrop-blur-md ${
                        dark 
                        ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' 
                        : 'bg-white/50 hover:bg-white text-slate-900/60 hover:text-slate-900 border-white/50'
                    }`}
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
                <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl shadow-emerald-950/30 border-4 border-white ring-1 ring-slate-200/50">
                    <img src={image} className="max-h-[50vh] w-full object-contain" alt="Full Preview" />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/60 to-transparent flex justify-center">
                        <span className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full text-[9px] font-black text-slate-800 tracking-widest uppercase shadow-xl ring-1 ring-slate-200">
                            {title}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

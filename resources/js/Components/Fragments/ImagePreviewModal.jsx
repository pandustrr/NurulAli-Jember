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
                <div className="absolute -top-12 left-0 h-10 flex items-center gap-3 px-2 animate-in slide-in-from-left-4 duration-500">
                    <div className="w-1 h-5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50"></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.25em] drop-shadow-sm">
                        {title}
                    </span>
                </div>
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
                </div>
            </div>
        </div>
    );
}

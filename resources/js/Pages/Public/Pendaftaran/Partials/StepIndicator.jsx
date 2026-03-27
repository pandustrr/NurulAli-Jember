import React from 'react';
import { CheckCircleIcon, ClipboardDocumentListIcon, CreditCardIcon } from '@heroicons/react/24/outline';

export default function StepIndicator({ step, sections, totalSteps }) {
    const currentSection = step <= sections.length ? sections[step - 1] : { description: 'Pembayaran' };

    return (
        <div className="mb-20 relative overflow-visible pt-8 pb-4 px-4 sm:px-8">
            
            {/* Desktop View: Full Progress Bar (Internal sm breakpoint) */}
            <div className="hidden sm:flex justify-between items-start gap-2 relative max-w-5xl mx-auto">
                <div className="absolute top-7 left-10 right-10 h-[2px] bg-slate-100/80 -translate-y-1/2 z-0">
                    <div 
                        className="h-full bg-emerald-500 transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                        style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                    />
                </div>

                {sections.map((sec, i) => {
                    const isActive = step === i + 1;
                    const isCompleted = step > i + 1;

                    return (
                        <div key={sec.id || i} className="flex-1 flex flex-col items-center gap-4 relative z-10">
                            <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-700 border-2 ${
                                isCompleted 
                                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-200' 
                                    : isActive 
                                        ? 'bg-white border-emerald-500 text-emerald-600 shadow-2xl shadow-emerald-100 scale-125 z-20' 
                                        : 'bg-white border-slate-100 text-slate-300'
                                }`}>
                                {isCompleted ? <CheckCircleIcon className="w-7 h-7" /> : <ClipboardDocumentListIcon className="w-6 h-6" />}
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-[0.15em] text-center leading-none transition-all duration-500 ${isActive ? 'text-emerald-700' : isCompleted ? 'text-slate-600' : 'text-slate-300 opacity-60'}`}>
                                {sec.description}
                            </span>
                        </div>
                    );
                })}

                <div className="flex-1 flex flex-col items-center gap-4 relative z-10">
                    <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-700 border-2 ${step === totalSteps ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xl shadow-emerald-200 scale-125 z-20' : 'bg-white border-slate-100 text-slate-300'}`}>
                        <CreditCardIcon className="w-6 h-6" />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-500 ${step === totalSteps ? 'text-emerald-700' : 'text-slate-300 opacity-60'}`}>Pembayaran</span>
                </div>
            </div>

            {/* Mobile View: Single Step (Internal max-sm fallback) */}
            <div className="sm:hidden flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-4 w-full justify-center">
                    <div className="h-px bg-slate-100 grow"></div>
                    <span className="text-[10px] font-black text-emerald-600/70 uppercase tracking-[0.3em]">Tahap {step} dari {totalSteps}</span>
                    <div className="h-px bg-slate-100 grow"></div>
                </div>
                
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-white border-4 border-emerald-500 shadow-2xl shadow-emerald-100 flex items-center justify-center text-emerald-600 ring-8 ring-emerald-50/50">
                        {step === totalSteps 
                            ? <CreditCardIcon className="w-10 h-10" /> 
                            : <ClipboardDocumentListIcon className="w-10 h-10" />
                        }
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Sedang Diisi</span>
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none">{currentSection.description}</h4>
                    </div>
                </div>

                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden shadow-inner">
                    <div 
                        className="h-full bg-emerald-500 transition-all duration-700 ease-out"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

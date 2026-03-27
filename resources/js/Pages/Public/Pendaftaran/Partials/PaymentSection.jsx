import React from 'react';
import { 
    CreditCardIcon, 
    BanknotesIcon,
    ArrowLeftIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const paymentOptions = [
    { id: 'transfer', name: 'Transfer Bank', desc: 'Metode transfer antar bank atau antar dompet digital', icon: CreditCardIcon, color: 'emerald' },
    { id: 'cash', name: 'Tunai / Cash', desc: 'Pembayaran tunai di lokasi pondok oleh wali santri', icon: BanknotesIcon, color: 'orange' },
];

export default function PaymentSection({ data, setData, prevStep, processing, submit }) {
    return (
        <form onSubmit={submit} className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-1.5 h-10 bg-emerald-500 rounded-full"></div>
                <div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase tracking-tight">Metode Pembayaran</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Pilih metode penyelesaian biaya pendaftaran</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentOptions.map((opt) => (
                    <button
                        key={opt.id}
                        type="button"
                        onClick={() => setData('payment_method', opt.id)}
                        className={`w-full p-8 text-left rounded-3xl border-2 transition-all duration-500 flex flex-col items-center text-center group/opt relative overflow-hidden ${data.payment_method === opt.id ? 'bg-emerald-50 border-emerald-500 shadow-2xl shadow-emerald-200/20 ring-4 ring-emerald-500/5' : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 hover:shadow-xl'}`}
                    >
                        {data.payment_method === opt.id && (
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-100/30 rounded-full group-hover/opt:scale-125 transition-transform"></div>
                        )}
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all mb-6 ${data.payment_method === opt.id ? 'bg-emerald-600 text-white scale-110 shadow-lg shadow-emerald-200' : 'bg-white text-slate-400 shadow-sm border border-slate-100 group-hover/opt:text-emerald-500 group-hover/opt:translate-y-[-4px]'}`}>
                            <opt.icon className="w-8 h-8" />
                        </div>
                        <div className="relative z-10 w-full">
                            <h4 className={`text-sm md:text-md font-black uppercase tracking-widest ${data.payment_method === opt.id ? 'text-emerald-700' : 'text-slate-800'}`}>{opt.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{opt.desc}</p>
                        </div>
                        <div className={`absolute top-6 right-6 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${data.payment_method === opt.id ? 'bg-emerald-600 border-emerald-600 animate-in zoom-in-50 rotate-12' : 'border-slate-200'}`}>
                            {data.payment_method === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-end gap-2 md:gap-6 pt-8 md:pt-10 border-t border-slate-100">
                <button
                    type="button"
                    onClick={prevStep}
                    className="w-full md:w-auto flex items-center justify-center gap-3 px-6 md:px-8 py-4 text-slate-400 hover:text-slate-800 font-black text-[10px] md:text-xs uppercase tracking-widest transition-all group order-2 md:order-1"
                >
                    <ArrowLeftIcon className="w-3.5 h-3.5 md:w-4 h-4 transition-transform group-hover:-translate-x-2" />
                    Kembali
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full md:w-auto flex items-center justify-center gap-4 px-8 md:px-12 py-4 md:py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl md:rounded-3xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl md:shadow-2xl shadow-emerald-200 transition-all hover:-translate-y-1 hover:shadow-emerald-300 disabled:opacity-50 group order-1 md:order-2"
                >
                    Selesaikan Pendaftaran
                    <CheckCircleIcon className="w-4 h-4 md:w-5 h-5 transition-transform group-hover:scale-110" />
                </button>
            </div>
        </form>
    );
}

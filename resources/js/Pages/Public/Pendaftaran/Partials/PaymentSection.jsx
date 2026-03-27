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

            <div className="space-y-4">
                {paymentOptions.map((opt) => (
                    <button
                        key={opt.id}
                        type="button"
                        onClick={() => setData('payment_method', opt.id)}
                        className={`w-full p-6 space-x-6 text-left rounded-2xl border-2 transition-all duration-300 flex items-center group/opt relative overflow-hidden ${data.payment_method === opt.id ? 'bg-emerald-50 border-emerald-500 shadow-xl shadow-emerald-100' : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 hover:shadow-lg'}`}
                    >
                        {data.payment_method === opt.id && (
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-100/30 rounded-full group-hover/opt:scale-125 transition-transform"></div>
                        )}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${data.payment_method === opt.id ? 'bg-emerald-500 text-white scale-110' : 'bg-white text-slate-400 shadow-sm border border-slate-100 group-hover/opt:text-emerald-500'}`}>
                            <opt.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className={`text-md font-black uppercase tracking-tight ${data.payment_method === opt.id ? 'text-emerald-700' : 'text-slate-800'}`}>{opt.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{opt.desc}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${data.payment_method === opt.id ? 'bg-emerald-500 border-emerald-500 animate-in zoom-in-50' : 'border-slate-200'}`}>
                            {data.payment_method === opt.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-16 flex items-center justify-end gap-6 pt-10 border-t border-slate-100">
                <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-3 px-8 py-4 text-slate-400 hover:text-slate-800 font-black text-xs uppercase tracking-widest transition-all group"
                >
                    <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
                    Kembali
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="flex items-center gap-4 px-12 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-200 transition-all hover:-translate-y-1 hover:shadow-emerald-300 disabled:opacity-50 group"
                >
                    Selesaikan Pendaftaran
                    <CheckCircleIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </button>
            </div>
        </form>
    );
}

import React from 'react';

export default function PhotoGallery() {
    const images = [
        'https://media.base44.com/images/public/69b91c829d049ca7a587c0d1/b1a8f2c3b_generated_f6574991.png',
        'https://media.base44.com/images/public/69b91c829d049ca7a587c0d1/421d3603c_generated_07d4ed39.png',
        'https://media.base44.com/images/public/69b91c829d049ca7a587c0d1/066eeccc8_generated_eab597b5.png',
        'https://media.base44.com/images/public/69b91c829d049ca7a587c0d1/2bf1194be_generated_e5911d8e.png',
        'https://media.base44.com/images/public/69b91c829d049ca7a587c0d1/d4c53f862_generated_3b610f15.png'
    ];

    return (
        <section className="py-24 bg-emerald-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Potret Kehidupan Santri</h2>
                    <p className="text-slate-600">Melihat lebih dekat keseharian, pembelajaran, dan kebersamaan di Nurul Ali.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:h-[700px]">
                    <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-[2rem] shadow-sm">
                        <img src={images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Soccer Activity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-bottom p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white font-semibold mt-auto">Kegiatan Olahraga & Pengembangan Diri</p>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-[2rem] shadow-sm">
                        <img src={images[1]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Praying" />
                    </div>
                    <div className="group relative overflow-hidden rounded-[2rem] shadow-sm">
                        <img src={images[2]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Asrama" />
                    </div>
                    <div className="col-span-1 group relative overflow-hidden rounded-[2rem] shadow-sm lg:h-1/2 h-40">
                        <img src={images[3]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Wisuda" />
                    </div>
                    <div className="col-span-1 group relative overflow-hidden rounded-[2rem] shadow-sm lg:h-1/2 h-40">
                        <img src={images[4]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Study" />
                    </div>
                </div>
            </div>
        </section>
    );
}

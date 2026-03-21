import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Public/Navbar';
import Footer from '@/Components/Public/Footer';
import Programs from '@/Components/Public/Programs';

export default function Lembaga() {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Lembaga Pendidikan - Pondok Pesantren Nurul Ali" />

            <Navbar />

            <main className="pt-20">
                <Programs />
            </main>

            <Footer />
        </div>
    );
}

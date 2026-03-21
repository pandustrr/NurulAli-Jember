import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Public/Navbar';
import Footer from '@/Components/Public/Footer';
import PPDBInfo from '@/Components/Public/PPDBInfo';

export default function InfoPpdb() {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Informasi PPDB - Pondok Pesantren Nurul Ali" />

            <Navbar />

            <main className="pt-20"> {/* Add padding top to avoid overlap with fixed navbar */}
                <PPDBInfo />
            </main>

            <Footer />
        </div>
    );
}

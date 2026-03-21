import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Public/Navbar';
import Hero from '@/Components/Public/Hero';
import Stats from '@/Components/Public/Stats';
import Programs from '@/Components/Public/Programs';
import PPDBInfo from '@/Components/Public/PPDBInfo';
import PhotoGallery from '@/Components/Public/PhotoGallery';
import Footer from '@/Components/Public/Footer';

export default function Home({ auth }) {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Pondok Pesantren Nurul Ali - Membentuk Generasi Qurani" />

            <Navbar />

            <main>
                <Hero />
                <Stats />
                <Programs />
                <PPDBInfo />
                <PhotoGallery />
            </main>

            <Footer />
        </div>
    );
}

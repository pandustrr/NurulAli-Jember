import React from 'react';
import Navbar from './Partials/Navbar';
import Footer from './Partials/Footer';
import { Head } from '@inertiajs/react';

export default function PublicLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-white">
            <Head title={title} />
            
            <Navbar />
            
            <main>
                {children}
            </main>
            
            <Footer />
        </div>
    );
}

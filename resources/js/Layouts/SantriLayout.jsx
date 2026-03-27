import React from 'react';
import SantriNavbar from './Partials/SantriNavbar';
import SantriFooter from './Partials/SantriFooter';
import { Head, usePage } from '@inertiajs/react';
import Toast from '@/Components/Fragments/Toast';

export default function SantriLayout({ children, title }) {
    const { site_settings } = usePage().props;
    const pageTitle = title ? `${title} - Portal Santri ${site_settings?.site_name || 'Nurul Ali'}` : `Portal Santri - ${site_settings?.site_name || 'Nurul Ali'}`;

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-emerald-500 selection:text-white">
            <Head title={pageTitle} />
            
            <SantriNavbar />
            
            <main className="animate-in fade-in duration-700">
                {children}
            </main>
            
            <SantriFooter />
            <Toast />
        </div>
    );
}

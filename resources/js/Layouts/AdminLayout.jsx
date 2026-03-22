import { useState } from 'react';
import Sidebar from './Partials/Sidebar';
import Topbar from './Partials/Topbar';
import Toast from '@/Components/Fragments/Toast';

export default function AdminLayout({ children, header, icon, description }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 flex relative">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            <div className={`grow transition-all duration-300 ${isSidebarOpen ? 'ml-56' : 'ml-16'}`}>
                <Topbar header={header} icon={icon} description={description} isSidebarOpen={isSidebarOpen} />

                <main className="p-6">
                    {children}
                </main>
            </div>
            
            <Toast />
        </div>
    );
}

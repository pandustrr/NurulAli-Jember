import { useState, useEffect } from 'react';
import Sidebar from './Partials/Sidebar';
import Topbar from './Partials/Topbar';
import Toast from '@/Components/Fragments/Toast';

export default function AdminLayout({ children, header, icon, description }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Initial check for mobile
    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
                setIsSidebarOpen(false); // Close by default on mobile
            } else {
                setIsMobile(false);
                setIsSidebarOpen(true); // Open by default on desktop
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="h-screen bg-slate-50 flex overflow-hidden relative">
            {/* Backdrop for mobile */}
            {isMobile && isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-40 lg:relative transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} h-full grow-0 shrink-0`}>
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
            </div>

            <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-300 ${!isMobile && !isSidebarOpen ? 'lg:-ml-40!' : ''}`}>
                <Topbar 
                    header={header} 
                    icon={icon} 
                    description={description} 
                    isSidebarOpen={isSidebarOpen} 
                    setIsSidebarOpen={setIsSidebarOpen} 
                />

                <main className="p-4 md:p-6 lg:p-10 grow overflow-y-auto no-scrollbar scroll-smooth">
                    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </div>
                </main>
            </div>
            
            <Toast />
        </div>
    );
}

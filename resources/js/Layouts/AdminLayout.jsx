import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, header }) {
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { name: 'Dashboard', icon: '📊', route: 'dashboard' },
        { name: 'Lembaga', icon: '🏫', route: 'admin.lembaga.index' },
        { name: 'Site Settings', icon: '⚙️', route: 'admin.settings' },
        { name: 'PPDB Settings', icon: '📅', route: 'admin.ppdb-settings' },
        { name: 'Data Pendaftar', icon: '👥', route: 'admin.pendaftar' },
        { name: 'Inbox', icon: '📩', route: 'admin.messages' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-emerald-900 text-white transition-all duration-300 flex flex-col fixed h-full z-20`}>
                <div className="p-6 flex items-center justify-between">
                    <h1 className={`${isSidebarOpen ? 'block' : 'hidden'} font-bold text-xl tracking-wider`}>NURUL ALI</h1>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-emerald-800 rounded">
                        {isSidebarOpen ? '⬅️' : '➡️'}
                    </button>
                </div>

                <nav className="mt-6 flex-grow">
                    {menuItems.map((item) => {
                        const active = route().current(item.route) || (item.route === 'admin.lembaga.index' && route().current('admin.lembaga.*'));
                        return (
                            <Link
                                key={item.name}
                                href={route(item.route)}
                                className={`flex items-center p-4 transition-colors ${active ? 'bg-emerald-800 border-l-4 border-emerald-400' : 'hover:bg-emerald-800/50'}`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'} font-medium`}>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-emerald-800">
                    <Link href={route('logout')} method="post" as="button" className="flex items-center p-4 w-full hover:bg-emerald-800 transition-colors text-emerald-300">
                        <span>🚪</span>
                        <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'}`}>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="font-bold text-slate-800 text-lg">{header}</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-600">{auth.user.name}</span>
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
                            {auth.user.name.charAt(0)}
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

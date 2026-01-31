import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Settings,
    ChevronDown,
    Menu,
    Calendar,
    User,
    ListTodo,
    Table,
    Plane,
    Users,
    ClipboardList,
    ChevronUp,
    Star
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;

    const [openMenus, setOpenMenus] = useState({
        dashboard: true,
        tasks: false
    });

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/admin/login');
    };

    const activeItemClass = "flex items-center gap-3.5 rounded-xl px-5 py-3 text-base font-medium transition-all duration-200 bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-200 dark:bg-white dark:text-slate-900 dark:shadow-md";
    const inactiveItemClass = "flex items-center gap-3.5 rounded-xl px-5 py-3 text-base font-medium transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white";

    return (
        <aside
            className={`absolute left-0 top-0 z-50 flex h-screen w-80 flex-col overflow-y-hidden border-r border-slate-200 bg-white duration-300 ease-linear dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between px-8 py-8">
                <NavLink to="/admin" className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-200 dark:shadow-none">
                        <Plane className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Amadeus <span className="text-indigo-600">Admin</span>
                        </h1>
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                            Voyage Management
                        </p>
                    </div>
                </NavLink>

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="block rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear px-5">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-4 flex flex-col gap-8">
                    {/* <!-- MAIN MENU Group --> */}
                    <div>
                        <h3 className="mb-5 px-5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Main Menu
                        </h3>

                        <ul className="flex flex-col gap-2">
                            {/* Dashboard with sub-items */}
                            <li>
                                <button
                                    onClick={() => toggleMenu('dashboard')}
                                    className={`w-full ${pathname === '/admin' ? activeItemClass : inactiveItemClass}`}
                                >
                                    <LayoutDashboard className="h-6 w-6" />
                                    <span className="flex-1 text-left">Dashboard</span>
                                    {openMenus.dashboard ? <ChevronUp className="h-5 w-5 opacity-50" /> : <ChevronDown className="h-5 w-5 opacity-50" />}
                                </button>

                                {openMenus.dashboard && (
                                    <ul className="mt-2 flex flex-col gap-2 pl-12">
                                        <li>
                                            <NavLink
                                                to="/admin"
                                                end
                                                className={({ isActive }) =>
                                                    `block rounded-lg px-4 py-2 text-sm font-medium transition-all ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'}`
                                                }
                                            >
                                                Analytics
                                            </NavLink>
                                        </li>
                                        <li>
                                            <div className="flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-slate-400">
                                                <span>Ecommerce</span>
                                                <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">PRO</span>
                                            </div>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            {/* Calendar */}
                            <li>
                                <NavLink
                                    to="/admin/calendar"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <Calendar className="h-6 w-6" />
                                    Calendar
                                </NavLink>
                            </li>

                            {/* Profile */}
                            <li>
                                <NavLink
                                    to="/admin/profile"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <User className="h-6 w-6" />
                                    Profile
                                </NavLink>
                            </li>

                            {/* Flight Searches */}
                            <li>
                                <NavLink
                                    to="/admin/searches"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <ClipboardList className="h-6 w-6" />
                                    Flight Searches
                                    <span className="ml-auto rounded-md bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">PRO</span>
                                </NavLink>
                            </li>

                            {/* Users & Bookings */}
                            <li>
                                <NavLink
                                    to="/admin/users"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <Users className="h-6 w-6" />
                                    Users & Bookings
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- SUPPORT GROUP --> */}
                    <div>
                        <h3 className="mb-5 px-5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Settings & Support
                        </h3>

                        <ul className="flex flex-col gap-2">
                            <li>
                                <NavLink
                                    to="/admin/settings"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <Settings className="h-6 w-6" />
                                    Account Settings
                                </NavLink>
                            </li>
                            <li>
                                <div className={inactiveItemClass + " opacity-60 cursor-not-allowed group"}>
                                    <Star className="h-6 w-6 text-amber-500 group-hover:text-amber-600" />
                                    Premium Support
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Upgrade Plan Card */}
            <div className="mt-auto p-6">
                <div className="rounded-3xl bg-indigo-600 p-6 shadow-xl shadow-indigo-200 dark:shadow-none">
                    <h4 className="text-base font-bold text-white">Upgrade to Pro</h4>
                    <p className="mt-2 text-xs font-medium text-indigo-100 leading-relaxed">
                        Get all detailed flight analytics and booking reports.
                    </p>
                    <button className="mt-5 w-full rounded-xl bg-white py-3 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-50 shadow-sm">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

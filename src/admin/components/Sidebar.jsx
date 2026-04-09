import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Settings,
    ChevronDown,
    Menu,
    CalendarCheck,
    User,
    Users,
    ChevronUp,
    GraduationCap,
    Image as ImageIcon,
    CreditCard,
    BookOpenCheck,
    LogOut,
    HelpCircle
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    const [openMenus, setOpenMenus] = useState({
        academics: true,
        administration: false
    });

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        window.location.href = '/admin/login';
    };

    const activeItemClass = "flex items-center gap-3.5 rounded-xl px-5 py-3 text-base font-bold transition-all duration-200 bg-sky-600 text-white shadow-lg shadow-sky-200 dark:shadow-none";
    const inactiveItemClass = "flex items-center gap-3.5 rounded-xl px-5 py-3 text-base font-medium transition-all duration-200 text-slate-600 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-400 dark:hover:bg-sky-900/20 dark:hover:text-sky-400";

    return (
        <aside
            className={`absolute left-0 top-0 z-50 flex h-screen w-80 flex-col overflow-y-hidden border-r border-slate-200 bg-white duration-300 ease-linear dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between px-8 py-8">
                <NavLink to="/admin" className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 shadow-xl shadow-sky-200 dark:shadow-none">
                        <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            St. Joseph's
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                            Admin Portal
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
                    {/* <!-- ACADEMICS Group --> */}
                    <div>
                        <h3 className="mb-5 px-5 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            Academics
                        </h3>

                        <ul className="flex flex-col gap-2">
                            {/* Dashboard */}
                            <li>
                                <NavLink
                                    to="/admin"
                                    end
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <LayoutDashboard className="h-6 w-6" />
                                    Dashboard
                                </NavLink>
                            </li>

                            {/* Students */}
                            <li>
                                <NavLink
                                    to="/admin/users"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <Users className="h-6 w-6" />
                                    Student Management
                                </NavLink>
                            </li>

                            {/* Teachers */}
                            <li>
                                <NavLink
                                    to="/admin/teachers"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <User className="h-6 w-6" />
                                    Staff & Teachers
                                </NavLink>
                            </li>

                            {/* Attendance */}
                            <li>
                                <NavLink
                                    to="/admin/calendar"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <CalendarCheck className="h-6 w-6" />
                                    Attendance
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- ADMINISTRATION Group --> */}
                    <div>
                        <h3 className="mb-5 px-5 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            Administration
                        </h3>

                        <ul className="flex flex-col gap-2">
                            {/* Gallery Management */}
                            <li>
                                <NavLink
                                    to="/admin/gallery"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <ImageIcon className="h-6 w-6" />
                                    Gallery Manage
                                    <span className="ml-auto rounded-md bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700">Dynamic</span>
                                </NavLink>
                            </li>

                            {/* Fees */}
                            <li>
                                <NavLink
                                    to="/admin/fees"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <CreditCard className="h-6 w-6" />
                                    Fees Management
                                </NavLink>
                            </li>

                            {/* Exams */}
                            <li>
                                <NavLink
                                    to="/admin/results"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <BookOpenCheck className="h-6 w-6" />
                                    Exams & Results
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- SETTINGS Group --> */}
                    <div>
                        <h3 className="mb-5 px-5 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            Settings
                        </h3>

                        <ul className="flex flex-col gap-2">
                            <li>
                                <NavLink
                                    to="/admin/settings"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <Settings className="h-6 w-6" />
                                    Portal Settings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/support"
                                    className={({ isActive }) => isActive ? activeItemClass : inactiveItemClass}
                                >
                                    <HelpCircle className="h-6 w-6 text-sky-500" />
                                    Technical Support
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Support Card */}
            <div className="mt-auto p-6">
                <div className="rounded-3xl bg-sky-600 p-6 shadow-xl shadow-sky-200 dark:shadow-none">
                    <h4 className="text-base font-bold text-white">Need Help?</h4>
                    <p className="mt-2 text-xs font-medium text-sky-100 leading-relaxed">
                        Contact Digitalsolution360 for any technical issues or portal training.
                    </p>
                    <button className="mt-5 w-full rounded-xl bg-white py-3 text-sm font-bold text-sky-600 transition-colors hover:bg-sky-50 shadow-sm">
                        Contact Support
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="mt-3 w-full flex items-center justify-center gap-2 text-white/80 hover:text-white text-xs font-bold py-2 transition-colors"
                    >
                        <LogOut size={14} /> Logout Session
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

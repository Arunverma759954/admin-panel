import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  CreditCard, 
  ArrowUp, 
  ArrowDown, 
  TrendingUp, 
  Image as ImageIcon,
  PlusCircle,
  ExternalLink
} from "lucide-react";
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const series = [
        {
            name: 'Attendance Rate',
            data: [92, 94, 91, 95, 89, 96, 93],
        },
        {
            name: 'Fee Collection',
            data: [85, 88, 92, 87, 91, 94, 98],
        },
    ];

    const options = {
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right',
        },
        colors: ['#0099CC', '#FFCC00'],
        chart: {
            type: 'area',
            fontFamily: 'Outfit, sans-serif',
            height: 335,
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100]
            }
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        },
    };

    return (
        <div className="flex flex-col gap-8 p-1">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {/* Total Students */}
                <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-950/30">
                            <GraduationCap className="h-7 w-7" />
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950/30">
                            +45 <ArrowUp className="h-3 w-3" />
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">1,248</h3>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Total Students</p>
                    </div>
                </div>

                {/* Total Teachers */}
                <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/30">
                            <Users className="h-7 w-7" />
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500 dark:bg-slate-800">
                            Stable
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">86</h3>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Total Staff</p>
                    </div>
                </div>

                {/* Attendance Rate */}
                <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30">
                            <CalendarCheck className="h-7 w-7" />
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950/30">
                            94% <TrendingUp className="h-3 w-3" />
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">Today</h3>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Attendance</p>
                    </div>
                </div>

                {/* Fees Collected */}
                <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/30">
                            <CreditCard className="h-7 w-7" />
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 dark:bg-rose-950/30">
                            -2% <ArrowDown className="h-3 w-3" />
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">₹8.4L</h3>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Fees (This Month)</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Analytics */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">Academic Performance</h4>
                            <p className="text-sm text-slate-500 font-medium">Monthly attendance vs Fee collection trends</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-1.5 dark:bg-slate-800">
                                <button className="rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-sky-600 shadow-sm dark:bg-slate-700 dark:text-sky-400">Term 1</button>
                                <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Term 2</button>
                            </div>
                        </div>
                    </div>
                    <div className="h-[350px]">
                        <ReactApexChart options={options} series={series} type="area" height="100%" />
                    </div>
                </div>

                <div className="col-span-12 flex flex-col gap-6 xl:col-span-4">
                    {/* Dynamic Gallery Quick Action */}
                    <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-indigo-700 p-8 text-white shadow-xl shadow-sky-200 dark:shadow-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <ImageIcon size={120} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold mb-2">School Gallery</h4>
                            <p className="text-sky-100 text-sm mb-6 leading-relaxed">Manage and upload new memories to the school website's dynamic gallery.</p>
                            <Link to="/admin/gallery" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 group/btn">
                                Manage Photos <PlusCircle className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Recent Admissions */}
                    <div className="flex-1 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Recent Admissions</h4>
                            <Link to="/admin/users" className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group">
                                View All <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: 'Aryan Sharma', class: 'Class 10-A', date: '2 hours ago', id: 'S2025-01' },
                                { name: 'Priya Verma', class: 'Class 8-C', date: '5 hours ago', id: 'S2025-02' },
                                { name: 'Rohan Mehta', class: 'Class 12-B', date: 'Yesterday', id: 'S2025-03' },
                            ].map((student, i) => (
                                <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-50 p-4 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50 transition-all border-l-4 border-l-transparent hover:border-l-sky-500">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center font-bold text-sky-600">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{student.name}</p>
                                            <p className="text-xs text-slate-500 font-medium">{student.class}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{student.id}</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">{student.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

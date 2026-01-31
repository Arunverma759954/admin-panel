import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Eye, TrendingUp, Users, Plane, ArrowUp, ArrowDown, Activity, DollarSign, Search } from 'lucide-react';

const Dashboard = () => {
    const series = [
        {
            name: 'Flights Booked',
            data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: 'Searches',
            data: [11, 32, 45, 32, 34, 52, 41],
        },
    ];

    const options = {
        legend: {
            show: false,
        },
        colors: ['#6366f1', '#818cf8'],
        chart: {
            type: 'area',
            fontFamily: 'Satoshi, sans-serif',
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
        <div className="flex flex-col gap-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {/* Total Views */}
                <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30">
                            <Eye className="h-6 w-6" />
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950/30">
                            +12% <ArrowUp className="h-3 w-3" />
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">3.5K</h3>
                        <p className="text-sm font-medium text-slate-500">Total Page Views</p>
                    </div>
                </div>

                {/* Total Profit */}
                <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/30">
                            <DollarSign className="h-6 w-6" />
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950/30">
                            +4.3% <ArrowUp className="h-3 w-3" />
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">$4.2K</h3>
                        <p className="text-sm font-medium text-slate-500">Total Profit</p>
                    </div>
                </div>

                {/* Total Flights */}
                <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30">
                            <Plane className="h-6 w-6" />
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-950/30">
                            +2.5% <ArrowUp className="h-3 w-3" />
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">2,450</h3>
                        <p className="text-sm font-medium text-slate-500">Total Flights</p>
                    </div>
                </div>

                {/* Total Users */}
                <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/30">
                            <Users className="h-6 w-6" />
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-600 dark:bg-rose-950/30">
                            -0.9% <ArrowDown className="h-3 w-3" />
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">3.5K</h3>
                        <p className="text-sm font-medium text-slate-500">Total Active Users</p>
                    </div>
                </div>
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Analytics Overview</h4>
                            <p className="text-sm text-slate-500">Flight bookings vs Searches this year</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-1 dark:bg-slate-800">
                                <button className="rounded-md bg-white px-3 py-1 text-xs font-bold text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400">Week</button>
                                <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-900">Month</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ReactApexChart options={options} series={series} type="area" height={350} />
                    </div>
                </div>

                <div className="col-span-12 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-4">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h4>
                    <p className="text-sm text-slate-500 mb-6">Latest flight bookings</p>

                    <div className="flex flex-col gap-4">
                        {[
                            { name: 'John Smith', flight: 'DEL ➔ BOM', status: 'Success', amount: '$240' },
                            { name: 'Sarah Wilson', flight: 'LHR ➔ DXB', status: 'Pending', amount: '$850' },
                            { name: 'Mike Johnson', flight: 'JFK ➔ LAX', status: 'Success', amount: '$420' },
                            { name: 'Emily Brown', flight: 'SIN ➔ HND', status: 'Success', amount: '$310' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between rounded-xl border border-slate-50 p-3 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</p>
                                        <p className="text-[11px] text-slate-500">{item.flight}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{item.amount}</p>
                                    <p className={`text-[10px] font-bold ${item.status === 'Success' ? 'text-emerald-500' : 'text-orange-500'}`}>{item.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-6 w-full rounded-xl border border-indigo-100 py-2 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-50 dark:border-indigo-900 dark:hover:bg-indigo-950/30">
                        View All Activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

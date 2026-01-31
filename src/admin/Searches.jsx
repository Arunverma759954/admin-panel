import React, { useState } from 'react';
import { Breadcrumb } from './components/Breadcrumb';
import { Search, Filter, Plane, Calendar, User, ArrowRight, MoreHorizontal, MapPin } from 'lucide-react';

const Searches = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All Types');

    // Mock Data for Flight Searches
    const searchesData = [
        {
            id: 'SCH-8821',
            user: 'John Doe',
            origin: 'New York (JFK)',
            destination: 'London (LHR)',
            date: 'Oct 28, 2025',
            passengers: 2,
            class: 'Business',
            type: 'Round Trip',
            status: 'Booked'
        },
        {
            id: 'SCH-8822',
            user: 'Sarah Smith',
            origin: 'San Francisco (SFO)',
            destination: 'Tokyo (HND)',
            date: 'Nov 12, 2025',
            passengers: 1,
            class: 'Economy',
            type: 'One Way',
            status: 'Active'
        },
        {
            id: 'SCH-8823',
            user: 'Mike Johnson',
            origin: 'Dubai (DXB)',
            destination: 'Paris (CDG)',
            date: 'Dec 05, 2025',
            passengers: 4,
            class: 'First Class',
            type: 'Round Trip',
            status: 'Expired'
        },
        {
            id: 'SCH-8824',
            user: 'Emma Watson',
            origin: 'Singapore (SIN)',
            destination: 'Sydney (SYD)',
            date: 'Jan 15, 2026',
            passengers: 2,
            class: 'Economy',
            type: 'One Way',
            status: 'Active'
        },
        {
            id: 'SCH-8825',
            user: 'David Lee',
            origin: 'Los Angeles (LAX)',
            destination: 'Miami (MIA)',
            date: 'Feb 20, 2026',
            passengers: 1,
            class: 'Business',
            type: 'Round Trip',
            status: 'Active'
        }
    ];

    // Filter Logic
    const filteredSearches = searchesData.filter(item => {
        const matchesSearch = item.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.user.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === 'All Types' || item.type === typeFilter;

        return matchesSearch && matchesType;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Booked': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900';
            case 'Active': return 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200 dark:border-blue-900';
            case 'Expired': return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Flight Searches</h2>
                    <Breadcrumb pageName="Monitor user search activity" />
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                {/* Filter/Search Bar */}
                <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by city or user..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-900/20"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm font-medium outline-none transition-all hover:border-indigo-600 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-indigo-500"
                            >
                                <option>All Types</option>
                                <option>Round Trip</option>
                                <option>One Way</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-slate-50 text-left dark:bg-slate-800/50">
                                <th className="min-w-[200px] py-4 px-6 font-semibold text-slate-600 dark:text-slate-400">
                                    Route Information
                                </th>
                                <th className="min-w-[150px] py-4 px-6 font-semibold text-slate-600 dark:text-slate-400">
                                    User
                                </th>
                                <th className="min-w-[120px] py-4 px-6 font-semibold text-slate-600 dark:text-slate-400">
                                    Dates
                                </th>
                                <th className="min-w-[120px] py-4 px-6 font-semibold text-slate-600 dark:text-slate-400">
                                    Details
                                </th>
                                <th className="py-4 px-6 font-semibold text-slate-600 dark:text-slate-400">
                                    Status
                                </th>
                                <th className="py-4 px-6 text-right font-semibold text-slate-600 dark:text-slate-400">

                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {filteredSearches.length > 0 ? (
                                filteredSearches.map((item) => (
                                    <tr key={item.id} className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-slate-900 dark:text-white">{item.origin.split('(')[0].trim()}</span>
                                                    <ArrowRight className="h-3 w-3 text-slate-400" />
                                                    <span className="font-bold text-slate-900 dark:text-white">{item.destination.split('(')[0].trim()}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium dark:bg-slate-800">{item.origin.match(/\(([^)]+)\)/)[1]}</span>
                                                    <span>to</span>
                                                    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium dark:bg-slate-800">{item.destination.match(/\(([^)]+)\)/)[1]}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.user}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                <Calendar className="h-4 w-4" />
                                                <span className="text-sm">{item.date}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col gap-1 text-xs">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">{item.class}</span>
                                                <span className="text-slate-500">{item.passengers} Passenger(s) • {item.type}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold leading-normal ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-indigo-600 hover:shadow-sm dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-all">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-slate-500">
                                        No flight searches found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Searches;

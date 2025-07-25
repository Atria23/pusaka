import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Dashboard({ title = 'Dashboard Admin Air' }) {
    return (
        <>
            <Head title={title} />
            <div className="max-w-[500px] mx-auto min-h-screen bg-white">
                {/* Header */}
                <div className="fixed top-0 z-10 w-full max-w-[500px] bg-main text-white px-4 py-3">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-bold">Dashboard Admin Air</h1>
                        <a href={route('user.dashboard')}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Menu Section */}
                <div className="pt-[60px] px-4 pb-8">
                    <ul className="grid grid-cols-1 gap-4 text-sm text-gray-700">
                        <MenuItem
                            href="/admin-air/penukarans"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-main" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z" />
                                </svg>
                            }
                            label="Kelola Penukaran"
                        />
                    </ul>
                </div>
            </div>
        </>
    );
}

function MenuItem({ href, icon, label }) {
    return (
        <li>
            <Link
                href={href}
                className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-md hover:shadow-md hover:bg-gray-50 transition"
            >
                {icon}
                <span>{label}</span>
            </Link>
        </li>
    );
}

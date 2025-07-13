import { useEffect, useState, useMemo } from "react";
import { Head, usePage } from "@inertiajs/react";

export default function LaporanAdmin() {
    const { laporan, userCount } = usePage().props;

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("desc");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [showFilter, setShowFilter] = useState(false);

    const groupedData = useMemo(() => {
        const grouped = {};
        laporan.forEach(item => {
            if (!grouped[item.periode]) {
                grouped[item.periode] = {};
            }
            if (!grouped[item.periode][item.user_id]) {
                grouped[item.periode][item.user_id] = {
                    user_name: item.user_name,
                    sampah: []
                };
            }
            grouped[item.periode][item.user_id].sampah.push({
                nama: item.sampah_nama,
                berat: item.total_berat
            });
        });
        return grouped;
    }, [laporan]);

    const filteredPeriode = Object.keys(groupedData).filter((periode) => {
        const [day, month, year] = periode.split("-");
        const periodeDate = new Date(`${year}-${month}-${day}`);

        if (dateRange.start && periodeDate < new Date(dateRange.start)) return false;
        if (dateRange.end && periodeDate > new Date(dateRange.end)) return false;

        if (searchQuery) {
            return Object.values(groupedData[periode]).some(user =>
                user.user_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return true;
    }).sort((a, b) => {
        const dateA = a.split('-').reverse().join('');
        const dateB = b.split('-').reverse().join('');
        return sortOrder === "desc" ? (dateB - dateA) : (dateA - dateB);
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredPeriode.length / itemsPerPage);
    const paginatedPeriode = filteredPeriode.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortOrder, dateRange]);

    const getNextDate = (dateString) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="mx-auto w-full max-w-[500px] min-h-screen bg-gray-50">
            <Head title="Laporan Admin" />

            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[500px] w-full z-10 bg-main">
                <div className="w-full flex flex-row space-x-4 justify-start items-center px-4 py-2 bg-main">
                    <div className="w-full flex flex-row space-x-4 items-center justify-start">
                        <button className="shrink-0 w-6 h-6" onClick={() => window.history.back()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>
                        <div className="font-utama text-white font-bold text-lg">Laporan Admin</div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => window.open(route('admin.laporan.export.excel'), '_blank')}
                            className="text-white p-2 rounded-full hover:bg-main_dark transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                    </div>

                </div>

                {/* Search & Filter */}
                <div className="w-full h-max flex flex-col space-y-4 items-center justify-start p-4 bg-white shadow-lg">
                    <div className="w-full h-9 flex flex-row mx-auto items-center justify-center pr-2 py-2 rounded-lg bg-neutral-100 border-2 border-gray-200">
                        {/* Search Bar */}
                        <input
                            id="searchInput"
                            type="text"
                            className="bg-transparent border-none flex-grow focus:ring-0 focus:outline-none placeholder-gray-400"
                            placeholder="Cari nama pengguna"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {/* Search Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.3"  // Ubah ketebalan stroke di sini
                            className="w-5 h-5 text-main"
                        >
                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16a6.471 6.471 0 0 0 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.505 4.505 0 0 1 9.5 14z" />
                        </svg>
                    </div>

                    <div className="w-full flex flex-row space-x-4 items-center">
                        <button
                            onClick={() => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))}
                            className="w-full flex flex-row space-x-2 items-center justify-center px-4 py-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 text-main" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                            </svg>
                            <span className="text-utama text-sm font-thin text-main">
                                {sortOrder === "desc" ? "Terbaru" : "Terlama"}
                            </span>
                        </button>

                        <div className="shrink-0 w-px bg-main h-6" />

                        <button onClick={() => setShowFilter(true)} className="w-full flex flex-row space-x-2 items-center justify-center px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-main">
                                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                            </svg>
                            <span className="text-utama text-sm font-thin text-main">Filter</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="pt-[200px] px-4 pb-16">
                {paginatedPeriode.length > 0 ? (
                    paginatedPeriode.map((periode, idx) => (
                        <div key={idx} className="mb-6 bg-white rounded-lg shadow p-4">
                            <div className="flex justify-between items-center mb-2">
                                {/* Total User */}
                                <div className="flex items-center text-sm text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-1 text-blue-500" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                    <span>Total Pengguna: <b>{userCount[periode]?.total_user_setor || 0}</b></span>
                                </div>

                                {/* Periode (Tanggal) */}
                                <div className="flex items-center font-bold text-sm text-right text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-1 text-main" viewBox="0 0 16 16">
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h.5A1.5 1.5 0 0 1 15 2.5v11A1.5 1.5 0 0 1 13.5 15h-11A1.5 1.5 0 0 1 1 13.5v-11A1.5 1.5 0 0 1 2.5 1H3V.5a.5.5 0 0 1 .5-.5zM14 4H2v9.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V4z" />
                                    </svg>
                                    <span>{periode}</span>
                                </div>
                            </div>


                            {Object.entries(groupedData[periode]).map(([userId, userData]) => (
                                // <div key={userId} className="mb-3 border rounded p-3">
                                //     <p className="font-semibold text-sm mb-2">{userData.user_name}</p>
                                //     <ul className="ml-4 list-disc text-sm text-gray-700">
                                //         {userData.sampah.map((sampah, idxSampah) => (
                                //             <li key={idxSampah}>
                                //                 {sampah.nama} : {Number(sampah.berat).toLocaleString('id-ID')} kg
                                //             </li>
                                //         ))}
                                //     </ul>
                                // </div>
                                <div 
    key={userId} 
    className="mb-3 border rounded p-3 cursor-pointer hover:bg-gray-100"
    onClick={() => window.location.href = `/admin/view-users/${userId}`}
>
    <p className="font-semibold text-sm mb-2">{userData.user_name}</p>
    <ul className="ml-4 list-disc text-sm text-gray-700">
        {userData.sampah.map((sampah, idxSampah) => (
            <li key={idxSampah}>
                {sampah.nama} : {Number(sampah.berat).toLocaleString('id-ID')} kg
            </li>
        ))}
    </ul>
</div>

                            ))}
                        </div>
                    ))
                ) : (
                    <p className="text-center py-6 text-gray-500">Tidak ada data laporan.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[500px] w-full bg-white border-t shadow-inner p-4 flex justify-between items-center">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 border rounded disabled:opacity-50">
                    Sebelumnya
                </button>
                <span className="text-sm">Halaman {currentPage} dari {totalPages}</span>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 border rounded disabled:opacity-50">
                    Selanjutnya
                </button>
            </div>

            {/* Modal Filter */}
            {showFilter && (
                <div className="fixed h-screen px-4 inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="w-full max-w-[328px] p-4 bg-white rounded-lg shadow-lg">
                        <div className="flex flex-col space-y-4">
                            <button className="flex justify-end" onClick={() => setShowFilter(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7 text-red-500" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                </svg>
                            </button>

                            <h2 className="text-center text-utama text-lg font-medium">Filter Tanggal</h2>

                            <div className="flex flex-col space-y-2">
                                <div>
                                    <label className="text-sm font-medium text-utama">Tanggal Mulai</label>
                                    <input type="date" className="text-sm px-3 py-2 border rounded-md bg-neutral-100"
                                        value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-utama">Tanggal Akhir</label>
                                    <input type="date" className="text-sm px-3 py-2 border rounded-md bg-neutral-100"
                                        value={dateRange.end} min={dateRange.start ? getNextDate(dateRange.start) : ""} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-2">
                                <button onClick={() => setDateRange({ start: "", end: "" })} className="border border-red-300 text-red-500 py-2 rounded hover:bg-red-50 transition">
                                    Reset Tanggal
                                </button>
                                <button onClick={() => setShowFilter(false)} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                                    Terapkan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

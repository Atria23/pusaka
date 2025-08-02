import React, { useState, useMemo } from "react";
import { Link, router, usePage, Head } from "@inertiajs/react";

export default function PengelolaAirIndex() {
    const { pengelolaAir } = usePage().props;

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data ini?")) {
            router.delete(route("admin.pengelola-air.destroy", id));
        }
    };

    const filteredData = useMemo(() => {
        const filtered = pengelolaAir.filter((item) =>
            item.nama.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const sorted = filtered.sort((a, b) =>
            sortOrder === "asc"
                ? a.nama.localeCompare(b.nama)
                : b.nama.localeCompare(a.nama)
        );

        return sorted;
    }, [searchQuery, sortOrder, pengelolaAir]);

    return (
        <>
            <Head title="Pengelola Air" />
            <div className="mx-auto w-full min-h-screen bg-white">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-main text-white px-4 py-3 flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => window.history.back()}
                            className="w-6 h-6 flex items-center justify-center"
                        >
                            <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>
                        <h1 className="text-lg font-bold">Kelola Pengelola Air</h1>
                    </div>                    <Link
                        href={route("admin.pengelola-air.create")}
                        className="bg-white text-main text-sm px-3 py-1 rounded shadow font-semibold hover:bg-gray-100"
                    >
                        + Tambah
                    </Link>
                </div>

                {/* Search & Sort */}
                <div className="p-4 space-y-3">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Cari nama pengelola..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                        <button
                            onClick={() =>
                                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                            }
                            className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm hover:bg-gray-200"
                            title={`Urutkan ${sortOrder === "asc" ? "Z-A" : "A-Z"}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-main"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 10h11M3 6h16M3 14h8M3 18h13"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* List Content */}
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="border border-gray-200 p-4 rounded-lg shadow-sm space-y-2"
                            >
                                {/* Nama */}
                                <div className="text-base font-semibold text-gray-800 truncate">
                                    {item.nama}
                                </div>

                                {/* Alamat */}
                                <div className="flex items-start text-sm text-gray-600">
                                    <svg
                                        className="w-4 h-4 mr-2 mt-0.5 text-main"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>

                                    <span>{item.alamat || "-"}</span>
                                </div>

                                {/* Keterangan */}
                                <div className="flex items-start text-sm text-gray-600">
                                    <svg
                                        className="w-4 h-4 mr-2 mt-0.5 text-main"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                    <span>{item.keterangan || "-"}</span>
                                </div>

                                {/* Aksi */}
                                <div className="flex gap-2 pt-2">
                                    <Link
                                        href={route("admin.pengelola-air.edit", item.id)}
                                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 mt-6">
                            Tidak ditemukan data pengelola air.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

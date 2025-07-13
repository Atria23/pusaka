// import React, { useState, useEffect, useRef } from 'react';
// import { Inertia } from '@inertiajs/inertia';
// import { Html5Qrcode } from "html5-qrcode";

// export default function Penukaran({ penukaran }) {
//   const [searchId, setSearchId] = useState('');
//   const [scanning, setScanning] = useState(false);
//   const scannerRef = useRef(null);
//   const html5QrCodeRef = useRef(null);

//   const handleSearch = () => {
//     if (searchId.trim() === '') return;
//     Inertia.get(route('admin-air.penukarans.index'), { id: searchId.trim() });
//   };

//   const handleScan = async (id) => {
//     setSearchId(id);
//     await stopScanner();
//     setScanning(false);
//     Inertia.get(route('admin-air.penukarans.index'), { id: id });
//   };

//   const startScanner = async () => {
//     const html5QrCode = new Html5Qrcode(scannerRef.current.id);
//     html5QrCodeRef.current = html5QrCode;

//     const devices = await Html5Qrcode.getCameras();
//     if (devices.length === 0) return alert('Tidak ada kamera');

//     const selectedCameraId = devices[0].id;

//     await html5QrCode.start(
//       { deviceId: { exact: selectedCameraId } },
//       { fps: 10, qrbox: { width: 250, height: 250 } },
//       decodedText => handleScan(decodedText.trim())
//     );
//   };

//   const stopScanner = async () => {
//     if (html5QrCodeRef.current) {
//       await html5QrCodeRef.current.stop();
//       await html5QrCodeRef.current.clear();
//     }
//   };

//   useEffect(() => {
//     if (scanning) startScanner();
//     return () => stopScanner();
//   }, [scanning]);

//   const toggleStatus = () => {
//     if (!penukaran) return;
//     const newStatus = penukaran.status === 'sudah diredeem' ? 'belum diredeem' : 'sudah diredeem';
//     Inertia.put(route('admin-air.penukarans.status', penukaran.id), { status: newStatus });
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h1 className="text-xl font-bold mb-4">Scan / Cek Penukaran</h1>

//       <div className="flex space-x-2 mb-4">
//         <input
//           type="text"
//           className="border px-3 py-2 flex-grow rounded"
//           placeholder="Masukkan ID penukaran..."
//           value={searchId}
//           onChange={e => setSearchId(e.target.value)}
//         />
//         <button className="bg-blue-500 text-white px-4 rounded" onClick={handleSearch}>
//           Cari
//         </button>
//         <button className="bg-green-500 text-white px-4 rounded" onClick={() => setScanning(true)}>
//           Scan
//         </button>
//       </div>

//       {scanning && (
//         <div className="mb-4">
//           <div ref={scannerRef} id="qr-reader" className="w-full aspect-square bg-gray-200 rounded-lg"></div>
//           <button className="mt-2 bg-red-500 text-white px-4 py-1 rounded" onClick={() => { stopScanner(); setScanning(false); }}>
//             Tutup Scan
//           </button>
//         </div>
//       )}

//       {penukaran ? (
//         <div className="border p-4 rounded bg-white shadow">
//           <div className="font-semibold text-lg">{penukaran.voucher?.nama}</div>
//           <div className="text-sm text-gray-600">Poin: {penukaran.poin_dipakai}</div>
//           <div className="text-sm text-gray-600">Status: <b>{penukaran.status}</b></div>
//           <div className="text-sm text-gray-600 mt-2">User: {penukaran.user?.name} ({penukaran.user?.rt}/{penukaran.user?.rw})</div>
//           <button
//             className={`mt-4 px-4 py-2 rounded text-white ${penukaran.status === 'sudah diredeem' ? 'bg-rose-500' : 'bg-teal-500'}`}
//             onClick={toggleStatus}
//           >
//             Tandai {penukaran.status === 'sudah diredeem' ? 'Belum' : 'Sudah'} Redeem
//           </button>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">Silakan masukkan ID penukaran atau scan QR.</p>
//       )}
//     </div>
//   );
// }






















// import React, { useState, useEffect, useRef } from 'react';
// import { Inertia } from '@inertiajs/inertia';
// import { Html5Qrcode } from "html5-qrcode";

// export default function Penukaran({ penukaran }) {
//   const [searchId, setSearchId] = useState('');
//   const [scanning, setScanning] = useState(false);
//   const scannerRef = useRef(null);
//   const html5QrCodeRef = useRef(null);
//   const [loading, setLoading] = useState(false);

//   // 🔄 Debounce pencarian otomatis (tidak langsung panggil inertia saat mengetik)
//   useEffect(() => {
//     if (!searchId.trim()) return;

//     const timeout = setTimeout(() => {
//       setLoading(true);
//       Inertia.get(route('admin-air.penukarans.index'), { id: searchId.trim() }, {
//         preserveState: true,
//         replace: true,
//         only: ['penukaran'],
//         onFinish: () => setLoading(false),
//       });
//     }, 500); // 500ms debounce

//     return () => clearTimeout(timeout);
//   }, [searchId]);

//   const handleScan = async (id) => {
//     setSearchId(id);
//     await stopScanner();
//     setScanning(false);
//     // pencarian otomatis akan berjalan dari useEffect di atas
//   };

//   const startScanner = async () => {
//     const html5QrCode = new Html5Qrcode(scannerRef.current.id);
//     html5QrCodeRef.current = html5QrCode;

//     const devices = await Html5Qrcode.getCameras();
//     if (devices.length === 0) return alert('Tidak ada kamera');

//     const selectedCameraId = devices[0].id;

//     await html5QrCode.start(
//       { deviceId: { exact: selectedCameraId } },
//       { fps: 10, qrbox: { width: 250, height: 250 } },
//       decodedText => handleScan(decodedText.trim())
//     );
//   };

//   const stopScanner = async () => {
//     if (html5QrCodeRef.current) {
//       await html5QrCodeRef.current.stop();
//       await html5QrCodeRef.current.clear();
//       html5QrCodeRef.current = null;
//     }
//   };

//   useEffect(() => {
//     if (scanning) startScanner();
//     return () => stopScanner();
//   }, [scanning]);

//   const toggleStatus = () => {
//     if (!penukaran) return;
//     const newStatus = penukaran.status === 'sudah diredeem' ? 'belum diredeem' : 'sudah diredeem';
//     Inertia.put(route('admin-air.penukarans.status', penukaran.id), { status: newStatus });
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h1 className="text-xl font-bold mb-4">Scan / Cek Penukaran</h1>

//       <div className="flex space-x-2 mb-4">
//         <input
//           type="text"
//           className="border px-3 py-2 flex-grow rounded"
//           placeholder="Masukkan ID penukaran..."
//           value={searchId}
//           onChange={e => setSearchId(e.target.value)}
//         />
//         <button className="bg-green-500 text-white px-4 rounded" onClick={() => setScanning(true)}>
//           Scan
//         </button>
//       </div>

//       {scanning && (
//         <div className="mb-4">
//           <div ref={scannerRef} id="qr-reader" className="w-full aspect-square bg-gray-200 rounded-lg"></div>
//           <button className="mt-2 bg-red-500 text-white px-4 py-1 rounded" onClick={() => { stopScanner(); setScanning(false); }}>
//             Tutup Scan
//           </button>
//         </div>
//       )}

//       {/* Tampilan hasil */}
//       {loading ? (
//         <p className="text-center text-gray-400 italic">Memuat data...</p>
//       ) : penukaran ? (
//         <div className="border p-4 rounded bg-white shadow">
//           <div className="font-semibold text-lg">{penukaran.voucher?.nama}</div>
//           <div className="text-sm text-gray-600">Poin: {penukaran.poin_dipakai}</div>
//           <div className="text-sm text-gray-600">Status: <b>{penukaran.status}</b></div>
//           <div className="text-sm text-gray-600 mt-2">User: {penukaran.user?.name} ({penukaran.user?.rt}/{penukaran.user?.rw})</div>
//           <button
//             className={`mt-4 px-4 py-2 rounded text-white ${penukaran.status === 'sudah diredeem' ? 'bg-rose-500' : 'bg-teal-500'}`}
//             onClick={toggleStatus}
//           >
//             Tandai {penukaran.status === 'sudah diredeem' ? 'Belum' : 'Sudah'} Redeem
//           </button>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">Silakan masukkan ID penukaran atau scan QR.</p>
//       )}
//     </div>
//   );
// }


























import React, { useState, useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Html5Qrcode } from "html5-qrcode";

export default function Penukaran({ penukaran }) {
    const [searchId, setSearchId] = useState('');
    const [scanning, setScanning] = useState(false);
    const [cameras, setCameras] = useState([]);
    const [currentCameraId, setCurrentCameraId] = useState(null);
    const scannerRef = useRef(null);
    const html5QrCodeRef = useRef(null);
    const [loading, setLoading] = useState(false);

    // Auto fetch saat searchId berubah (debounced)
    useEffect(() => {
        if (!searchId.trim()) return;

        const timeout = setTimeout(() => {
            setLoading(true);
            Inertia.get(route('admin-air.penukarans.index'), { id: searchId.trim() }, {
                preserveState: true,
                replace: true,
                only: ['penukaran'],
                onFinish: () => setLoading(false),
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchId]);

    const handleScan = async (id) => {
        setSearchId(id);
        await stopScanner();
        setScanning(false);
        // pencarian otomatis akan berjalan dari useEffect di atas
    };

    const startScanner = async () => {
        const html5QrCode = new Html5Qrcode(scannerRef.current.id);
        html5QrCodeRef.current = html5QrCode;

        const devices = await Html5Qrcode.getCameras();
        if (devices.length === 0) return alert('Tidak ada kamera');

        const selectedCameraId = devices[0].id;

        await html5QrCode.start(
            { deviceId: { exact: selectedCameraId } },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
            },
            decodedText => handleScan(decodedText.trim())
        );
    };

    const stopScanner = async () => {
        if (html5QrCodeRef.current) {
            await html5QrCodeRef.current.stop();
            await html5QrCodeRef.current.clear();
            html5QrCodeRef.current = null;
        }
    };

    useEffect(() => {
        if (scanning) startScanner();
        return () => stopScanner();
    }, [scanning]);

    const flipCamera = () => {
        if (cameras.length <= 1) return;
        const index = cameras.findIndex(c => c.id === currentCameraId);
        const nextCamera = cameras[(index + 1) % cameras.length];
        setCurrentCameraId(nextCamera.id);

        stopScanner().then(() => {
            const qr = new Html5Qrcode(scannerRef.current.id);
            html5QrCodeRef.current = qr;
            qr.start(
                { deviceId: { exact: nextCamera.id } },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                decodedText => handleScan(decodedText.trim())
            );
        });
    };

    const toggleStatus = () => {
        if (!penukaran) return;
        const newStatus = penukaran.status === 'sudah diredeem' ? 'belum diredeem' : 'sudah diredeem';
        Inertia.put(route('admin-air.penukarans.status', penukaran.id), { status: newStatus });
    };

    return (
        <div className="mx-auto w-full max-w-[500px] min-h-screen bg-white">
            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[500px] w-full z-20 bg-main">
                <div className="flex items-center px-4 py-2 space-x-4 bg-main">
                    <button onClick={() => window.history.back()} className="w-6 h-6 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                    <div className="text-white font-bold text-lg font-utama">
                        Kelola Penukaran
                    </div>
                </div>
                <div className="sticky top-[44px] z-10 bg-white shadow px-4 py-3 border-b border-gray-200">
                    <div className="flex space-x-4 items-center">
                        <div className="flex-grow h-9 flex items-center pr-2 py-2 rounded-lg bg-neutral-100 border-2 border-gray-200">
                            <input
                                type="text"
                                placeholder="Masukkan id voucher..."
                                value={searchId}
                                onChange={e => setSearchId(e.target.value)}
                                className="bg-transparent border-none flex-grow text-sm focus:ring-0 focus:outline-none placeholder-gray-400"
                            />
                            <button onClick={() => setScanning(true)} className="text-main">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                    <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z" />
                                    <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z" />
                                    <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z" />
                                    <path d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z" />
                                    <path d="M12 9h2V8h-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-[120px] px-4 pb-6">
                {scanning && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
                        <div className="bg-white rounded-lg relative w-full max-w-sm mx-4 p-4 flex flex-col items-center">
                            <div ref={scannerRef} id="qr-reader" className="w-full aspect-square bg-gray-200 rounded-lg"></div>
                            <div className="flex space-x-2 mt-4">
                                {cameras.length > 1 && (
                                    <button onClick={flipCamera} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                        Flip Camera
                                    </button>
                                )}
                                <button onClick={() => { stopScanner(); setScanning(false); }} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-gray-400 italic">Memuat data...</p>
                ) : penukaran ? (
                    <div className="border p-4 rounded-lg bg-white shadow-sm space-y-2">
                        {/* Nama Voucher + Badge Status */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-main font-semibold text-lg">
                                <svg className="w-5 h-5 text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2v4h4v-4c0-1.1-.9-2-2-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m0 14v1m8-8h1M4 12H3m15.364-5.364l.707.707M6.343 17.657l-.707.707m12.728 0l.707-.707M6.343 6.343l-.707-.707" />
                                </svg>
                                {penukaran.voucher?.nama}
                            </div>
                            <span className={`text-xs text-center font-medium px-2 py-0.5 rounded-full
                            ${penukaran.status === 'sudah diredeem'
                                                            ? 'bg-red-100 text-red-600'
                                                            : 'bg-green-100 text-green-600'}
                            `}>
                                {penukaran.status}
                            </span>
                        </div>

                        {/* Poin */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                className="w-4 h-4 text-yellow-500"
                            >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.283V9.164h1.668C10.033 9.164 11 8.08 11 6.586c0-1.482-.955-2.584-2.538-2.584zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z" />
                            </svg>
                            {penukaran.poin_dipakai} Poin
                        </div>

                        {/* User dengan Link */}
                        <div className="flex items-center gap-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-1 text-blue-500" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                            <a
                                href={route('admin.manage-users.show', penukaran.user?.id)}
                                className="text-main hover:underline hover:text-blue-700 transition"
                            >
                                {penukaran.user?.name} ({penukaran.user?.rt}/{penukaran.user?.rw})
                            </a>
                        </div>

                        {/* Tombol Redeem */}
                        <button
                            className={`w-full mt-2 px-4 py-2 rounded-md text-sm font-medium transition flex items-center justify-center gap-2 ${penukaran.status === 'sudah diredeem'
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    : 'bg-teal-500 hover:bg-teal-600 text-white'
                                }`}
                            disabled={penukaran.status === 'sudah diredeem'}
                            onClick={toggleStatus}
                        >
                            {penukaran.status === 'sudah diredeem'
                                ? `Terpakai pada: ${new Date(penukaran.updated_at).toLocaleString('id-ID', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}`
                                : 'Redeem Voucher'}
                        </button>

                    </div>

                ) : (
                    <p className="text-center text-gray-500">Silakan scan QR atau masukkan ID voucher.</p>
                )}
            </div>
        </div>
    );
}

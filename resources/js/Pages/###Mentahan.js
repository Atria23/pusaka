import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { Html5Qrcode } from "html5-qrcode";

export default function Penukaran({ penukarans }) {
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    if (scanning) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [scanning]);

  const startScanner = async () => {
    if (!scannerRef.current) return;

    const html5QrCode = new Html5Qrcode(scannerRef.current.id);
    html5QrCodeRef.current = html5QrCode;

    const containerWidth = scannerRef.current.getBoundingClientRect().width;
    const videoWidth = Math.min(containerWidth * 0.95, 400); // maksimal 400px supaya aman di semua device

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: {
            width: videoWidth * 0.8,
            height: videoWidth * 0.8
          },
          aspectRatio: 1.0,  // Biar tetap square
          videoConstraints: {
            width: { ideal: videoWidth }
          }
        },
        async (decodedText) => {
          if (decodedText) {
            const id = decodedText.trim();
            const found = penukarans.find(p => p.id.toString() === id);
            if (found) {
              setSearch(id);
              setCurrentPage(1);
            } else {
              alert('Data penukaran tidak ditemukan.');
            }
          }
          await html5QrCode.stop();
          await html5QrCode.clear();
          html5QrCodeRef.current = null;
          setScanning(false);
        }
      );
    } catch (err) {
      console.error(err);
      alert("Gagal mengakses kamera. Pastikan izin kamera sudah diaktifkan.");
      setScanning(false);
    }
  };



  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      await html5QrCodeRef.current.stop();
      await html5QrCodeRef.current.clear();
      html5QrCodeRef.current = null;
    }
  };

  const handleScanResult = async (decodedText) => {
    if (decodedText) {
      const id = decodedText.trim();
      const found = penukarans.find(p => p.id.toString() === id);
      if (found) {
        setSearch(id);
        setCurrentPage(1);
      } else {
        alert('Data penukaran tidak ditemukan.');
      }
    }
    await stopScanner();
  }

  const toggleStatus = (penukaran) => {
    const newStatus = penukaran.status === 'sudah diredeem' ? 'belum diredeem' : 'sudah diredeem';
    setUpdatingId(penukaran.id);
    Inertia.put(`/admin/penukarans/${penukaran.id}/status`, { status: newStatus }, {
      onSuccess: () => setUpdatingId(null)
    });
  };

  const filteredSortedPenukarans = useMemo(() => {
    let filtered = penukarans;
    if (search.trim() !== '') {
      const keyword = search.toLowerCase();
      filtered = filtered.filter(p => {
        const matchName = p.user?.name?.toLowerCase().includes(keyword);
        const matchVoucher = p.voucher?.nama?.toLowerCase().includes(keyword);
        const matchId = p.id.toString() === search.trim(); // exact match untuk ID
        return matchName || matchVoucher || matchId;
      });
    }
    filtered.sort((a, b) => new Date(sortOrder === 'asc' ? a.created_at : b.created_at) - new Date(sortOrder === 'asc' ? b.created_at : a.created_at));
    return filtered;
  }, [penukarans, search, sortOrder]);


  const totalPages = Math.ceil(filteredSortedPenukarans.length / itemsPerPage);
  const paginatedPenukarans = filteredSortedPenukarans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPage = (page) => { if (page >= 1 && page <= totalPages) setCurrentPage(page); };
  const formatNumber = (number) => new Intl.NumberFormat('id-ID').format(number);

  return (
    <>
      <div className="mx-auto w-full max-w-[500px] min-h-screen bg-white">
        {/* Header */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[500px] w-full z-20 bg-main">
          <div className="w-full h-max flex flex-row space-x-4 justify-start items-center px-4 py-2 bg-main">
            <div className="w-full h-max flex flex-row space-x-4 items-center justify-start">
              <button
                className="shrink-0 w-6 h-6"
                onClick={() => window.history.back()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <div className="font-utama text-white font-bold text-lg">
                Kelola Penukaran
              </div>
            </div>
          </div>
          {/* Search global + Sort by date */}
          <div className={`sticky top-[44px] z-10 bg-white shadow px-4 py-3 border-b border-gray-200`}>
            <div className="flex space-x-4 items-center">
              {/* Input Pencarian */}
              <div className="flex-grow h-9 flex flex-row items-center justify-center pr-2 py-2 rounded-lg bg-neutral-100 border-2 border-gray-200">
                <input
                  type="text"
                  placeholder="Masukkan id penukaran/nama user/voucher..."
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-none flex-grow focus:ring-0 focus:outline-none text-sm placeholder-gray-400"
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
              {/* Tombol Sort Tanggal */}
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center space-x-2 text-sm text-gray-700 hover:text-main transition"
              >
                {sortOrder === 'asc' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-main">
                    <path d="M6.75 2.25A.75.75 0 017.5 3v.75h9V3a.75.75 0 011.5 0v.75h.75A2.25 2.25 0 0121 6v12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6a2.25 2.25 0 012.25-2.25H6V3a.75.75 0 01.75-.75zM4.5 8.25v9.75a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V8.25H4.5z" />
                    <path fillRule="evenodd" d="M12 16a.75.75 0 01-.75-.75v-3.69l-1.22 1.22a.75.75 0 11-1.06-1.06l2.5-2.5a.75.75 0 011.06 0l2.5 2.5a.75.75 0 11-1.06 1.06l-1.22-1.22v3.69A.75.75 0 0112 16z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-main">
                    <path d="M6.75 2.25A.75.75 0 017.5 3v.75h9V3a.75.75 0 011.5 0v.75h.75A2.25 2.25 0 0121 6v12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6a2.25 2.25 0 012.25-2.25H6V3a.75.75 0 01.75-.75zM4.5 8.25v9.75a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V8.25H4.5z" />
                    <path fillRule="evenodd" d="M12 12a.75.75 0 01.75.75v3.69l1.22-1.22a.75.75 0 111.06 1.06l-2.5 2.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06l1.22 1.22v-3.69A.75.75 0 0112 12z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Content */}
        <div className="pt-16 p-4 grid grid-cols-1 gap-3 mt-12">
          {paginatedPenukarans.length > 0 ? (
            paginatedPenukarans.map(p => (
              <div
                key={p.id}
                className="bg-white rounded-lg shadow p-3 flex flex-col space-y-2"
              >
                {/* Baris atas: Gambar, Nama voucher & status */}
                <div className="flex items-start space-x-3 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    {p.voucher?.gambar ? (
                      <img
                        src={`/storage/${p.voucher.gambar}`}
                        alt={p.voucher.nama}
                        className="w-12 h-12 object-cover"
                      />
                    ) : (
                      <div className="text-xs text-gray-400 px-1 text-center">No Image</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-semibold text-gray-800 ${expandedId === p.id ? 'break-words' : 'line-clamp-3'
                        }`}
                    >
                      {p.voucher?.nama || 'Voucher tidak ditemukan'}
                    </div>

                  </div>
                  <div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === 'sudah diredeem'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>

                {/* Baris tengah: Poin & tombol */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-yellow-600 space-x-1 text-sm font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="w-4 h-4 text-yellow-500"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.283V9.164h1.668C10.033 9.164 11 8.08 11 6.586c0-1.482-.955-2.584-2.538-2.584zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z" />
                    </svg>
                    <span>{formatNumber(p.poin_dipakai)}</span>
                  </div>
                  <button
                    onClick={() => toggleStatus(p)}
                    disabled={updatingId === p.id}
                    className={`text-xs px-3 py-1 rounded transition ${p.status === 'sudah diredeem'
                      ? 'bg-rose-500 hover:bg-rose-600 text-white'
                      : 'bg-teal-500 hover:bg-teal-600 text-white'
                      } disabled:opacity-50`}
                  >
                    Tandai {p.status === 'sudah diredeem' ? 'Belum' : 'Sudah'}
                  </button>
                </div>

                {/* Baris bawah: User dan waktu */}
                <div className="flex justify-between items-center text-xs text-gray-600 space-x-2">
                  <Link
                    href={route('admin.manage-users.show', p.user?.id)}
                    className="flex items-center max-w-[60%] truncate text-blue-600 hover:underline"
                    title={`${p.user?.name}_RT:${p.user?.rt}_RW:${p.user?.rw}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 0 1-8 0 4 4 0 0 1 8 0Zm-8 6a6 6 0 0 0-6 6h20a6 6 0 0 0-6-6H8Z"
                      />
                    </svg>
                    {p.user?.name} {p.user?.rt}/{p.user?.rw}
                  </Link>

                  <div className="flex items-center space-x-1 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10m2 0a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2m14 0v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"
                      />
                    </svg>
                    <span>
                      {new Date(p.created_at).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">Belum ada penukaran voucher.</p>
          )}
        </div>


        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 pb-8">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map(i => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 py-1 rounded border ${currentPage === pageNum ? 'bg-main text-white' : 'border-gray-300'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {scanning && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-white rounded-lg relative w-full max-w-sm mx-4 sm:mx-0 sm:w-full sm:max-w-md p-4">
            <div ref={scannerRef} id="qr-reader" className="w-full max-w-full aspect-square bg-gray-200 rounded-lg overflow-hidden"></div>
            <button
              onClick={() => setScanning(false)}
              className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}


    </>
  );
}

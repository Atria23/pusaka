import React, { useState, useMemo } from 'react';
import { Inertia } from '@inertiajs/inertia';
import SidebarDrawer from '@/Components/SidebarDrawer';

export default function Voucher({ vouchers, user }) {
  const [expandedId, setExpandedId] = useState(null);

  const [voucherId, setVoucherId] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredSortedVouchers = useMemo(() => {
    let filtered = vouchers;

    if (search.trim() !== '') {
      filtered = filtered.filter((v) =>
        v.nama.toLowerCase().includes(search.toLowerCase())
      );
    }

    filtered.sort((a, b) =>
      sortOrder === 'asc' ? a.nilai_poin - b.nilai_poin : b.nilai_poin - a.nilai_poin
    );

    return filtered;
  }, [vouchers, search, sortOrder]);

  // Paginasi: hitung total pages & data slice untuk halaman saat ini
  const totalPages = Math.ceil(filteredSortedVouchers.length / itemsPerPage);
  const paginatedVouchers = filteredSortedVouchers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTukar = (e) => {
    e.preventDefault();
    Inertia.post('/penukaran/tukar', { voucher_id: voucherId }, {
      onError: (errs) => setErrors(errs),
      onSuccess: (page) => {
        setErrors(null);
        setMessage(page.props.flash.message);
        setVoucherId(null);
        setSelectedVoucher(null);
      }
    });
  };

  const openModal = (voucher) => {
    setVoucherId(voucher.id);
    setSelectedVoucher(voucher);
  };

  const closeModal = () => {
    setVoucherId(null);
    setSelectedVoucher(null);
  };

  // Fungsi untuk pindah halaman
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mx-auto w-full min-h-screen bg-gray-100">
      {/* Header (fixed) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-10 bg-main">
        <div className="w-full flex flex-row justify-between items-center px-4 py-2 bg-main">
          {/* Kiri: Tombol Back + Judul */}
          <div className="flex flex-row items-center space-x-4">
            <div className="font-bold text-white text-lg">Voucher</div>
          </div>

          {/* Kanan: Sidebar Drawer */}
          <SidebarDrawer />
        </div>

        {/* Search & Filter */}
        <div className="w-full h-max flex flex-col space-y-4 items-center justify-start p-4 bg-white shadow-lg">
          <div className='w-full flex space-x-4'>
            <div className="w-full h-9 flex flex-row mx-auto items-center justify-center pr-2 py-2 rounded-lg bg-neutral-100 border-2 border-gray-200">
              {/* Search Bar */}
              <input
                id="searchInput"
                type="text"
                className="bg-transparent border-none flex-grow focus:ring-0 focus:outline-none placeholder-gray-400"
                placeholder="Cari voucher"
                value={search}
                onChange={e => setSearch(e.target.value)}
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
            {/* Sort Button */}
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex flex-row space-x-2 items-center justify-center py-2"
            >
              {sortOrder === "asc" ? (
                // Ikon A-Z (urutan naik)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-6 h-6 text-main"
                >
                  <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z" />
                  <path fillRule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98" />
                  <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                </svg>
              ) : (
                // Ikon Z-A (urutan turun)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-6 h-6 text-main"
                >
                  <path fillRule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98" />
                  <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer agar tidak ketutupan header */}
      <div className="h-[150px]" />

      {/* Pesan & Error */}
      {message && <div className="text-green-600 text-center my-2">{message}</div>}
      {errors && <div className="text-red-600 text-center my-2">{Object.values(errors).join(', ')}</div>}

      {/* Voucher List */}
      <div className="px-4 grid grid-cols-1 gap-4 pb-8">
        {paginatedVouchers.map((v) => {
          const disabled = v.stok <= 0 || Number(user.points) < Number(v.nilai_poin);
          const buttonLabel = v.stok <= 0
            ? 'Tidak Tersedia'
            : Number(user.points) < Number(v.nilai_poin)
              ? 'Poin Kurang'
              : 'Beli Voucher';

          const buttonColor = disabled ? 'bg-gray-400' : 'bg-main';

          return (
            <div
              key={v.id}
              className="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition"
            >
              {/* Gambar dan Kategori */}
              <div className="relative">
                <img
                  src={v.gambar ? `/storage/${v.gambar}` : '/storage/logo_no_bg.png'}
                  alt={v.nama}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-main text-white text-xs font-semibold py-1 px-3 rounded">
                  {v.kategori || 'Voucher'}
                </div>
                {v.stok <= 0 && (
                  <div className="absolute bottom-3 left-3 bg-white text-red-600 text-xs font-semibold py-1 px-3 rounded-t">
                    Stok Habis
                  </div>
                )}
              </div>

              {/* Konten */}
              <div className="p-4 pb-0">
                <div
                  onClick={() => setExpandedId(expandedId === v.id ? null : v.id)}
                  className="cursor-pointer select-none"
                  title="Klik untuk selengkapnya"
                >
                  <h5
                    className={`text-main text-lg font-bold mb-1 ${expandedId === v.id ? 'break-words' : 'truncate'
                      }`}
                  >
                    {v.nama}
                  </h5>

                  <div
                    className={`text-gray-700 text-sm mb-2 transition-all duration-200 ease-in-out ${expandedId === v.id ? 'break-words line-clamp-none' : 'line-clamp-2'
                      }`}
                  >
                    {v.deskripsi}
                  </div>
                </div>


                {/* Poin dan Stok dengan ikon, justify-between */}
                <div className="flex justify-between items-center text-sm text-gray-600 border-t py-3 ">
                  {/* Poin */}
                  <div className="flex items-center space-x-1 text-yellow-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-4 h-4 text-yellow-500"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.283V9.164h1.668C10.033 9.164 11 8.08 11 6.586c0-1.482-.955-2.584-2.538-2.584zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z" />
                    </svg>
                    <span className="font-medium">
                      {Number(v.nilai_poin).toLocaleString('id-ID')} Poin
                    </span>
                  </div>

                  {/* Stok */}
                  <div className="flex items-center space-x-1 text-sky-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-4 h-4 text-sky-500"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zm4-1v1h1v-1zm1 3v-1H4v1zm7 0v-1h-1v1zm-1-2h1v-1h-1zm-6 3H4v1h1zm7 1v-1h-1v1zm-7 1H4v1h1zm7 1v-1h-1v1zm-8 1v1h1v-1zm7 1h1v-1h-1z" />
                    </svg>
                    <span>Stok: {Number(v.stok).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* Tombol */}
              <div className="flex border-t">
                <button
                  onClick={() => openModal(v)}
                  disabled={disabled}
                  className={`flex-1 text-center py-2 text-white text-sm font-medium ${buttonColor} ${disabled ? 'cursor-not-allowed' : 'hover:opacity-90'
                    }`}
                >
                  {buttonLabel}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-3 mb-8">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded border ${currentPage === i + 1
              ? 'bg-main text-white border-main'
              : 'border-gray-300'
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal Konfirmasi */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative animate-slideUp">
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-main_dark hover:text-main transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2 className="text-2xl font-semibold mb-5 text-center text-main_dark">Konfirmasi Pembelian Voucher</h2>

            <div className="mb-6 text-center break-words px-4 border-b border-gray-300 pb-6">
              <h3 className="text-xl font-bold text-main">{selectedVoucher.nama}</h3>
              <p className="text-gray-700 text-sm mt-1">{selectedVoucher.deskripsi}</p>
            </div>

            <form onSubmit={handleTukar} className="flex justify-center space-x-4">
              <button
                type="submit"
                className="bg-main hover:bg-main_dark text-white px-6 py-2 rounded-md font-medium shadow-md transition"
              >
                Konfirmasi
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2 rounded-md border border-red-600 bg-red-500 text-white hover:bg-red-700 hover:border-red-700 transition font-medium shadow-md"
              >
                Batal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

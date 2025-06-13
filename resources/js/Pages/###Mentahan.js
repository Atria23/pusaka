import { useState } from 'react';

const KomponenVoucher = ({ data }) => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <>
      {data.map((v) => (
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
            <h5 className="text-main text-lg font-bold mb-1">{v.nama}</h5>
            <p className="text-gray-700 text-sm mb-2 line-clamp-2">{v.deskripsi}</p>

            {/* Poin dan Stok */}
            <div className="flex justify-between items-center text-sm text-gray-600 border-t py-3 ">
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
                <span className="font-medium">{v.nilai_poin} Poin</span>
              </div>

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
                <span>Stok: {v.stok}</span>
              </div>
            </div>
          </div>

          {/* Tombol */}
          <div className="flex border-t">
            <button
              onClick={() => {
                openModal(v);
                setExpandedId(v.id); // Set elemen yang diperluas
              }}
              disabled={disabled}
              className={`flex-1 text-center py-2 text-white text-sm font-medium ${buttonColor} ${disabled ? 'cursor-not-allowed' : 'hover:opacity-90'
                }`}
            >
              {buttonLabel}
            </button>
          </div>

          {/* Contoh detail tambahan jika ingin tampilkan jika diperluas */}
          {expandedId === v.id && (
            <div className="p-4 text-sm text-gray-600 border-t bg-gray-50">
              <p>Detail tambahan untuk voucher ini...</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default KomponenVoucher;

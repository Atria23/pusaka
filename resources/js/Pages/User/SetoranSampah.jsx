import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import SidebarDrawer from '@/Components/SidebarDrawer';

export default function UserSampahIndex() {
  const { sampahList } = usePage().props;
  const [beratGram, setBeratGram] = useState(0);
  const [beratFormatted, setBeratFormatted] = useState('');
  const handleBeratChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, ''); // hapus titik
    if (!/^\d*$/.test(rawValue)) return; // hanya angka

    setBeratGram(rawValue);

    // format dengan titik
    const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setBeratFormatted(formatted);
  };

  // Fungsi format angka ke format Indonesia (ribuan pakai titik)
  const formatRupiah = (angka) => {
    return angka.toLocaleString('id-ID');
  };

  return (
    <div className="mx-auto w-full max-w-[500px] max-h-[892px] min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[500px] w-full z-20 bg-main">
        <div className="w-full flex flex-row justify-between items-center px-4 py-2 bg-main">
          {/* Kiri: Tombol Back + Judul */}
          <div className="flex flex-row items-center space-x-4">
            <div className="font-bold text-white text-lg">Setoran Sampah</div>
          </div>

          {/* Kanan: Sidebar Drawer */}
          <SidebarDrawer />
        </div>

        {/* Input Berat (Sticky) */}
        <div className="sticky top-12 z-10 bg-white px-4 py-4 shadow-lg">
          <label htmlFor="beratGram" className="block text-sm font-semibold text-gray-700 mb-2">
            Masukkan Berat Sampah <span className="text-main">(gram)</span>
          </label>
          <input
            id="beratGram"
            type="text"
            inputMode="numeric"
            value={beratFormatted}
            onChange={handleBeratChange}
            placeholder="Contoh: 500"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main appearance-none
    [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[180px]" />

      {/* List Sampah */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 gap-4">
          {sampahList.map((s) => {
            const hargaPerGram = s.harga_per_kg / 1000;
            const estimasiPoin = Math.floor(beratGram * hargaPerGram);

            return (
              <div key={s.id} className="rounded overflow-hidden border shadow bg-white">
                <div className="relative overflow-hidden">
                  {s.image && (
                    <img
                      src={`/storage/${s.image}`}
                      alt={s.nama_sampah}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="absolute top-0 left-0 m-2 bg-main text-white text-xs px-2 py-1 rounded">
                    {s.kategori || 'Sampah'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-main mb-1">{s.nama_sampah}</h3>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium text-gray-800">Harga:</span> Rp {formatRupiah(s.harga_per_kg)}/kg
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    Poin Yang Didapatkan: <span className="text-main font-bold">{formatRupiah(estimasiPoin)}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

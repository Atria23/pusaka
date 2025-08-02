import { useForm, Head } from '@inertiajs/react';
import React from 'react';

export default function Edit({ pengelolaAir }) {
  const { data, setData, put, processing, errors } = useForm({
    nama: pengelolaAir.nama || '',
    alamat: pengelolaAir.alamat || '',
    keterangan: pengelolaAir.keterangan || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.pengelola-air.update', pengelolaAir.id));
  };

  return (
    <>
      <Head title="Edit Pengelola Air" />
      <div className="mx-auto w-full min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-main text-white px-4 py-3 flex items-center justify-between shadow">
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
            <h1 className="text-lg font-bold">Edit Pengelola Air</h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.nama}
              onChange={(e) => setData("nama", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-main focus:border-main text-sm"
              placeholder="Nama pengelola"
            />
            {errors.nama && <p className="text-sm text-red-500 mt-1">{errors.nama}</p>}
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <textarea
              value={data.alamat}
              onChange={(e) => setData("alamat", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-main focus:border-main text-sm"
              rows={3}
              placeholder="Alamat lengkap"
            />
          </div>

          {/* Keterangan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keterangan
            </label>
            <textarea
              value={data.keterangan}
              onChange={(e) => setData("keterangan", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-main focus:border-main text-sm"
              rows={2}
              placeholder="Catatan atau deskripsi tambahan"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-main hover:bg-main_dark text-white font-semibold py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

import React from 'react';

export default function ManageUserView({ user }) {
  return (
    <div className="mx-auto w-full min-h-screen md:h-screen">
      <div className="min-h-screen md:min-h-full bg-white px-4 py-6 sm:px-6">

        {/* Header */}
        <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-10 bg-main">
          <div className="w-full h-max flex flex-row items-center px-4 py-2 space-x-4">
            <button className="shrink-0 w-6 h-6" onClick={() => window.history.back()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M15.41 7.41 14 6 8 12l6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <div className="font-utama text-white font-bold text-lg">Detail Pengguna</div>
          </div>
        </header>

        {/* Spacer Header */}
        <div className="h-11" />

        {/* Avatar Section */}
        <section className="flex flex-col items-center space-y-4 mb-6 px-4">
          <div className="relative inline-block">
            <img
              src={user.avatar ?? '/default-avatar.png'}
              alt="Avatar"
              className="w-24 h-24 object-cover rounded-full shadow-lg border-4 border-white"
            />
          </div>
          <label className="text-gray-700 font-medium text-sm">Foto Profil</label>
        </section>

        {/* Section View Data */}
        <section className="flex flex-col items-center justify-center gap-4 w-full px-4">
          <div className="w-full flex flex-col space-y-4 mb-6">

            <ViewItem label="Email" value={user.email} />
            <ViewItem label="Nama Kepala Keluarga" value={user.name} />
            <ViewItem label="RT" value={user.rt} />
            <ViewItem label="RW" value={user.rw} />
            <ViewItem label="Alamat" value={user.alamat} />
            <ViewItem label="Kontak" value={user.kontak} />

          </div>
        </section>
      </div>
    </div>
  );
}

function ViewItem({ label, value }) {
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 px-3 text-sm">
        {value || '-'}
      </div>
    </div>
  );
}

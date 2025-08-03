import { useForm, Head } from '@inertiajs/react'
import React from 'react'

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        type: 'email',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.broadcast.store'));
    };

    const handleTest = (e) => {
        e.preventDefault();
        post(route('admin.broadcast.test'));
    };

    return (
        <>
            <Head title="Kirim Broadcast" />

            <div className="mx-auto w-full min-h-screen bg-white text-black">
                {/* Fixed Header */}
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-20 bg-main">
                    <div className="flex items-center space-x-4 px-4 py-3 text-white">
                        <button onClick={() => window.history.back()} className="w-6 h-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>
                        <h1 className="font-bold text-lg">Kirim Broadcast Email/SMS</h1>
                    </div>
                </div>

                {/* Form Container */}
                <div className="max-w-xl mx-auto px-4 pt-20 pb-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Tipe Pesan */}
                        <div>
                            <label className="block font-medium mb-1">Tipe Pesan</label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full border rounded p-2"
                            >
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                                <option value="both">Email & SMS</option>
                            </select>
                            {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                        </div>

                        {/* Subject Email */}
                        {data.type !== 'sms' && (
                            <div>
                                <label className="block font-medium mb-1">Judul Email</label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="w-full border rounded p-2"
                                />
                                {errors.subject && <div className="text-red-500 text-sm mt-1">{errors.subject}</div>}
                            </div>
                        )}

                        {/* Isi Pesan */}
                        <div>
                            <label className="block font-medium mb-1">Isi Pesan</label>
                            <textarea
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full border rounded p-2"
                                rows="5"
                            />
                            {errors.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-main text-white px-4 py-2 rounded hover:bg-main_dark w-full sm:w-auto"
                            >
                                {processing ? 'Mengirim...' : 'Kirim ke Semua User'}
                            </button>

                            <button
                                type="button"
                                onClick={handleTest}
                                disabled={processing}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full sm:w-auto"
                            >
                                Kirim Test ke Admin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

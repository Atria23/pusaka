import { useEffect } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';

export default function Login({ canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const isFormValid = data.email && data.password;

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };


    return (
        <>
            <Head title="Login" />
            <div className="mx-auto w-full max-w-[500px] min-h-screen md:h-screen">
                <div className="min-h-screen md:min-h-full bg-white px-4 py-6 sm:px-6">

                    {/* section atas */}
                    <section className="w-full h-max flex flex-col items-center space-y-4 mb-6 px-4">
                        <img
                            src="/storage/logo_no_bg.png"
                            alt="Logo Muvausa Store"
                            className="w-20 p-1.5 border-4 border-white bg-white mx-auto"
                        />
                        <p className="font-utama text-xl font-bold text-center">Login</p>
                        <p className="font-utama text-base font-medium text-gray-600 text-center">
                            Halaman Login
                        </p>
                    </section>

                    {/* section form */}
                    <section className="flex flex-col items-center justify-center gap-4 w-full px-4">
                        <form onSubmit={submit} className="w-full">
                            <div className="w-full h-max flex flex-col space-y-4 mb-6">
                                <div>
                                    <label className="block text-gray-700 mb-1">Email</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            placeholder="Jangan isi email palsu lho ya, kita tahu kok!"
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Password</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            placeholder="janji nggak kita kasih password kamu ke kucing"
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>
                                <div className="flex flex-wrap items-center justify-between mt-4 w-full">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="h-4 w-4 text-main_light border-gray-300 rounded focus:ring-main_light"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Ingetin Saya</span>
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-main hover:underline ml-auto"
                                        >
                                            Lupa Password?
                                        </Link>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full text-white p-2 rounded text-sm transition ${!isFormValid ? "bg-gray-400 cursor-not-allowed" : processing ? "bg-gray-400" : "bg-main hover:bg-main_dark"
                                        }`}
                                    disabled={!isFormValid || processing}
                                >
                                    {processing ? "Validasi data..." : "Masuk"}
                                </button>

                                <p className=" w-full px-4 py-8 text-center text-sm text-gray-600 font-utama">
                                    Belum punya akun?{' '}
                                    <a
                                        href="register"
                                        className="text-main font-semibold hover:underline"
                                    >
                                        Daftar
                                    </a>
                                </p>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}
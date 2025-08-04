<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Http;
// use Inertia\Inertia;

// class ChatController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('Chat');
//     }
    
//     public function send(Request $request)
// {
//     $userMessage = $request->input('message');

//     $context = "Aplikasi ini adalah sistem manajemen digital untuk kegiatan bank sampah yang dikelola oleh Pusaka Purwosari. "
//              . "Fungsinya termasuk pencatatan setoran sampah, penukaran dengan voucher, akses riwayat transaksi, produk daur ulang, dan edukasi iklim. "
//              . "Berikan jawaban yang relevan dengan konteks ini."
//              . "Desa Purwosari terletak di Kecamatan Sayung, Kabupaten Demak, dengan luas wilayah
// sekitar 3,93 km² dan jumlah penduduk sebanyak 6.277 jiwa yang tersebar di lima dusun. Desa
// Purwosari yang terletak di pesisir pantai utara menyebabkan desa ini sering menghadapi
// masalah banjir rob akibat dari perubahan iklim. Dampaknya, ketahanan pangan masyarakat
// menjadi terganggu karena banyak lahan yang terendam banjir dan tidak dapat ditanami
// lagi. Selain itu pengelolaan sampah yang tidak efektif memperburuk permasalahan akibat
// perubahan iklim tersebut. Padahal sampah yang dihasilkan oleh masyarakat purwosari
// sebenarnya mempunyai potensi besar apabila dapat dikelola dengan lebih baik, dengan
// merubahnya menjadi barang bernilai ekonomis, seperti ecobrick, eco-enzyme, dan juga kompos
// organik yang dapat digunakan sebagai media tanam.
// Untuk mengatasi permasalahan ini maka tim PPK Ormawa PK IMM Asy-Syifa
// menginisiasi adanya program kampung iklim. Solusi yang diberikan diantaranya adalah
// dengan pembentukan ruang iklim sebagai media edukasi masyarakat yang terintegrasi dengan
// dua program lainnya yaitu pengelolaan sampah berbasis digital dan pembentukan taman
// ketahanan pangan. Selain itu akan dibentuk juga Lembaga Aksi Iklim Purwosari (LAIP)
// guna mendukung keberlanjutan dan kemandirian program.
// Tujuan umum dari program ini adalah untuk meningkatkan kesadaran masyarakat
// terhadap isu perubahan iklim, sehingga dapat mendorong kontribusi aktif masyarakat dalam
// menjaga lingkungan. Adapun tujuan yang akan dicapai diantaranya adalah 1) Menghasilkan
// Ruang Iklim sebagai pusat pembelajaran masyarakat tentang Kampung Iklim; 2)
// Meningkatkan pengetahuan masyarakat tentang manajemen Kampung Iklim; dan 3)
// Meningkatkan keterampilan masyarakat dalam pengelolaan sampah guna mengurangi
// timbunan sampah di Desa Purwosari. Program ini menjadi bagian dari upaya
// mengimplementasikan Asta Cita Presiden RI, khususnya pada Asta Cita butir ke-2 dan Asta
// Cita butir ke-8 serta mendukung Tujuan Pembangunan Berkelanjutan (SDGs), utamanya
// SDG 12, SDG 13, dan SDG 15.
// Luaran yang diharapkan dari program ini adalah terbentuknya Lembaga Aksi Iklim
// Purwosari (LAIP) yang bertanggung jawab dalam pengelolaan dan pelaksanaan program
// kampung iklim. Tim pelaksana melengkapi dengan luaran diantaranya adalah 1) Buku refleksi
// ormawa dengan judul “Langkah Kecil untuk Bumi besar”; 2) Media publikasi elektronik
// melalui kanal media Youtube, Instagram, dan Tiktok Unimus Official dan PK IMM Asy-Syifa;
// 3) Poster hasil pelaksanaan PPK Ormawa IMM Asy-Syifa; 4) Produk Riil berupa: kompos
// organik, eco-enzyme, ecobrick, kerajinan tangan dan tanaman ketahanan pangan; 5) Publikasi
// artikel ilmiah pengabdian masyarakat pada jurnal terindeks SINTA 5; 6) Publikasi media
// massa di Suara Muhammadiyah dan Kompas; 7) Modul edukasi perubahan iklim dengan
// judul “Jaga Iklim, Jaga Kampung: Langkah Bijak Warga Purwosari”; 8) Modul penggunaan
// website PUSAKA dengan judul “Kenali PUSAKA: Aplikasi Cerdas Warga Sadar Iklim”; 9)
// Website PUSAKA (Purwosari Sadar Iklim dan Alam); dan 10) Kepengurusan hak cipta
// untuk poster, video konten kreatif dan modul.
// Metode pelaksanaan program Ruang Iklim akan menyasar tiga segmen, yaitu 1) Anakanak sampai remaja berjumlah minimal 20 orang; 2) Ibu-ibu PKK minimal 20 orang; dan 3)
// Bapak-bapak berjumlah minimal 20 orang. Selain itu akan dibentuk 1 Bank Sampah Digital
// berbasis aplikasi PUSAKA, dan membentuk setidaknya 5 taman ketahanan pangan,
// pembentukan kelembagaan juga akan dilakukan untuk memperkuat keberlanjutan program di
// tahun berikutnya. Program ini juga membangun kemitraan dengan beberapa mitra strategis
// guna mendukung keberlanjutan program ini, diantaranya adalah Pemerintah Desa Purwosari,
// Dinas Lingkungan Hidup Kab. Demak, Sahabat Pecinta Alam Demak (PADe), MDMC Jateng,
// Lazismu Jateng dan Majelis Lingkungan Hidup Muhammadiyah PWM Jawa Tengah.";

//     $response = Http::withHeaders([
//         'Content-Type' => 'application/json',
//         'X-Goog-Api-Key' => env('GEMINI_API_KEY'),
//     ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', [
//         'contents' => [
//             [
//                 'parts' => [
//                     ['text' => $context],
//                     ['text' => $userMessage]
//                 ]
//             ]
//         ]
//     ]);

//     if (!$response->successful()) {
//         return response()->json([
//             'error' => 'Failed to contact Gemini API',
//             'status' => $response->status(),
//             'body' => $response->body()
//         ], 500);
//     }

//     $reply = $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? 'Tidak ada balasan.';

//     return response()->json(['reply' => $reply]);
// }

// }




















// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Http;
// use Inertia\Inertia;

// class ChatController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('Chat');
//     }

//     public function send(Request $request)
//     {
//         $userMessage = $request->input('message');

//         // --- PROMPT DENGAN BASIS PENGETAHUAN LENGKAP ---
//         $systemPrompt = "
//         ---
//         **PERAN DAN KONTEKS ANDA:**
//         Anda adalah asisten AI dari aplikasi 'Pusaka Purwosari'. Anda bertugas untuk membantu pengguna dengan menyediakan informasi yang akurat berdasarkan data yang Anda miliki.

//         **NOMOR ADMIN:**
//         087712345678.

//         **INFORMASI DASAR DAN DATA PROGRAM (SUMBER KEBENARAN ANDA):**
//         Desa Purwosari terletak di Kecamatan Sayung, Kabupaten Demak, dengan luas wilayah sekitar 3,93 km² dan jumlah penduduk sebanyak 6.277 jiwa yang tersebar di lima dusun. Desa Purwosari yang terletak di pesisir pantai utara menyebabkan desa ini sering menghadapi masalah banjir rob akibat dari perubahan iklim. Dampaknya, ketahanan pangan masyarakat menjadi terganggu karena banyak lahan yang terendam banjir dan tidak dapat ditanami lagi. Selain itu pengelolaan sampah yang tidak efektif memperburuk permasalahan akibat perubahan iklim tersebut. Padahal sampah yang dihasilkan oleh masyarakat purwosari sebenarnya mempunyai potensi besar apabila dapat dikelola dengan lebih baik, dengan merubahnya menjadi barang bernilai ekonomis, seperti ecobrick, eco-enzyme, dan juga kompos organik yang dapat digunakan sebagai media tanam.
//         Untuk mengatasi permasalahan ini maka tim PPK Ormawa PK IMM Asy-Syifa menginisiasi adanya program kampung iklim. Solusi yang diberikan diantaranya adalah dengan pembentukan ruang iklim sebagai media edukasi masyarakat yang terintegrasi dengan dua program lainnya yaitu pengelolaan sampah berbasis digital dan pembentukan taman ketahanan pangan. Selain itu akan dibentuk juga Lembaga Aksi Iklim Purwosari (LAIP) guna mendukung keberlanjutan dan kemandirian program.
//         Tujuan umum dari program ini adalah untuk meningkatkan kesadaran masyarakat terhadap isu perubahan iklim, sehingga dapat mendorong kontribusi aktif masyarakat dalam menjaga lingkungan. Adapun tujuan yang akan dicapai diantaranya adalah 1) Menghasilkan Ruang Iklim sebagai pusat pembelajaran masyarakat tentang Kampung Iklim; 2) Meningkatkan pengetahuan masyarakat tentang manajemen Kampung Iklim; dan 3) Meningkatkan keterampilan masyarakat dalam pengelolaan sampah guna mengurangi timbunan sampah di Desa Purwosari. Program ini menjadi bagian dari upaya mengimplementasikan Asta Cita Presiden RI, khususnya pada Asta Cita butir ke-2 dan Asta Cita butir ke-8 serta mendukung Tujuan Pembangunan Berkelanjutan (SDGs), utamanya SDG 12, SDG 13, dan SDG 15.
//         Luaran yang diharapkan dari program ini adalah terbentuknya Lembaga Aksi Iklim Purwosari (LAIP) yang bertanggung jawab dalam pengelolaan dan pelaksanaan program kampung iklim. Tim pelaksana melengkapi dengan luaran diantaranya adalah 1) Buku refleksi ormawa dengan judul “Langkah Kecil untuk Bumi besar”; 2) Media publikasi elektronik melalui kanal media Youtube, Instagram, dan Tiktok Unimus Official dan PK IMM Asy-Syifa; 3) Poster hasil pelaksanaan PPK Ormawa IMM Asy-Syifa; 4) Produk Riil berupa: kompos organik, eco-enzyme, ecobrick, kerajinan tangan dan tanaman ketahanan pangan; 5) Publikasi artikel ilmiah pengabdian masyarakat pada jurnal terindeks SINTA 5; 6) Publikasi media massa di Suara Muhammadiyah dan Kompas; 7) Modul edukasi perubahan iklim dengan judul “Jaga Iklim, Jaga Kampung: Langkah Bijak Warga Purwosari”; 8) Modul penggunaan website PUSAKA dengan judul “Kenali PUSAKA: Aplikasi Cerdas Warga Sadar Iklim”; 9) Website PUSAKA (Purwosari Sadar Iklim dan Alam); dan 10) Kepengurusan hak cipta untuk poster, video konten kreatif dan modul.
//         Metode pelaksanaan program Ruang Iklim akan menyasar tiga segmen, yaitu 1) Anak-anak sampai remaja berjumlah minimal 20 orang; 2) Ibu-ibu PKK minimal 20 orang; dan 3) Bapak-bapak berjumlah minimal 20 orang. Selain itu akan dibentuk 1 Bank Sampah Digital berbasis aplikasi PUSAKA, dan membentuk setidaknya 5 taman ketahanan pangan, pembentukan kelembagaan juga akan dilakukan untuk memperkuat keberlanjutan program di tahun berikutnya. Program ini juga membangun kemitraan dengan beberapa mitra strategis guna mendukung keberlanjutan program ini, diantaranya adalah Pemerintah Desa Purwosari, Dinas Lingkungan Hidup Kab. Demak, Sahabat Pecinta Alam Demak (PADe), MDMC Jateng, Lazismu Jateng dan Majelis Lingkungan Hidup Muhammadiyah PWM Jawa Tengah.

//         **ATURAN WAJIB (SANGAT PENTING):**
//         1.  **Gunakan HANYA** informasi dari bagian 'INFORMASI DASAR' di atas untuk menjawab pertanyaan. Jangan menambah informasi dari luar.
//         2.  **Lingkup Anda Terbatas.** Jika pengguna bertanya di luar topik program Pusaka, Proklim, pengelolaan sampah, dan ketahanan pangan di Purwosari (misalnya: pertanyaan umum, berita, dll), **TOLAK DENGAN SOPAN**. Gunakan jawaban ini: 'Maaf, saya hanya bisa menjawab pertanyaan seputar program dan aplikasi Pusaka Purwosari. Apakah ada yang bisa saya bantu terkait topik tersebut?'
//         3.  **Jawaban Singkat.** Selalu berikan jawaban yang ringkas, jelas, dan langsung ke intinya (maksimal 3-4 kalimat). Jangan gunakan format list atau markdown (tanda `*` atau `**`).
//         ";

//         $response = Http::withHeaders([
//             'Content-Type' => 'application/json',
//             'X-Goog-Api-Key' => env('GEMINI_API_KEY'),
//         ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', [
//             'contents' => [
//                 [
//                     'parts' => [
//                         ['text' => $systemPrompt],
//                         ['text' => "Pertanyaan Pengguna: " . $userMessage]
//                     ]
//                 ]
//             ],
//             'generationConfig' => [
//                 'temperature' => 0.4, // Suhu sedikit diturunkan lagi untuk jawaban yang sangat faktual
//                 'maxOutputTokens' => 150,
//             ]
//         ]);

//         if (!$response->successful()) {
//             return response()->json([
//                 'error' => 'Gagal menghubungi Gemini API',
//                 'status' => $response->status(),
//                 'body' => $response->body()
//             ], 500);
//         }
        
//         $reply = data_get($response->json(), 'candidates.0.content.parts.0.text', 'Maaf, terjadi kesalahan saat memproses balasan.');

//         // Membersihkan karakter markdown jika masih muncul
//         $cleanedReply = preg_replace('/^[-*]\s*|[*#`]/m', '', $reply);

//         return response()->json(['reply' => $cleanedReply]);
//     }
// }


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Voucher;
use App\Models\Sampah;
use App\Models\Setoran;
use App\Models\Penukaran;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class ChatController extends Controller
{
    public function index()
    {
        return Inertia::render('Chat');
    }

    private function buildDynamicKnowledge(): string
{
    // PERINGATAN: Kode ini SANGAT TIDAK EFISIEN dan berisiko TINGGI menyebabkan
    // error token limit, performa lambat, dan kebocoran privasi. Gunakan dengan sangat hati-hati.
    
    $knowledgeParts = [];

    try {
        // --- Mengambil SEMUA data Voucher ---
        $vouchers = Voucher::all();
        // Mengubah seluruh koleksi menjadi representasi string (JSON)
        $knowledgeParts[] = "Data Voucher:\n" . $vouchers->toJson(JSON_PRETTY_PRINT);

        // --- Mengambil SEMUA data Sampah ---
        $sampah = Sampah::all();
        $knowledgeParts[] = "Data Jenis Sampah:\n" . $sampah->toJson(JSON_PRETTY_PRINT);

        // --- Mengambil SEMUA data Setoran ---
        $setoran = Setoran::all();
        $knowledgeParts[] = "Data Semua Setoran:\n" . $setoran->toJson(JSON_PRETTY_PRINT);
        
        // --- Mengambil SEMUA data Penukaran ---
        $penukaran = Penukaran::all();
        $knowledgeParts[] = "Data Semua Penukaran:\n" . $penukaran->toJson(JSON_PRETTY_PRINT);

    } catch (\Exception $e) {
        Log::error('Chatbot Gagal Membangun Pengetahuan Dinamis (Mode Penuh): ' . $e->getMessage());
        return "Maaf, terjadi kendala saat memuat data aplikasi secara penuh.";
    }

    // Gabungkan semua data JSON menjadi satu blok teks raksasa
    return implode("\n\n---\n\n", $knowledgeParts);
}

    public function send(Request $request)
    {
        $userMessage = $request->input('message');

        $dynamicKnowledge = $this->buildDynamicKnowledge();

        $staticPromptPart = "
        ---
        **PERAN DAN KONTEKS ANDA:**
        Anda adalah asisten AI dari aplikasi 'Pusaka Purwosari'. Anda bertugas untuk membantu pengguna dengan menyediakan informasi yang akurat berdasarkan data yang Anda miliki. Nomor kontak admin adalah 087712345678.

        **INFORMASI UMUM PROGRAM:**
        Program 'Pusaka Purwosari' diinisiasi untuk mengatasi masalah banjir rob dan pengelolaan sampah di Desa Purwosari, Demak. Solusi utamanya adalah program kampung iklim (Proklim) yang mencakup Ruang Iklim untuk edukasi, pengelolaan sampah digital, dan pembentukan taman ketahanan pangan untuk meningkatkan kesadaran warga terhadap isu perubahan iklim.

        **ATURAN WAJIB (SANGAT PENTING):**
        1.  **Gunakan HANYA** informasi yang diberikan di bawah ini untuk menjawab. Jangan mengarang atau mengambil info dari luar.
        2.  Jika pertanyaan di luar konteks program (misal: berita, cuaca, dll), **TOLAK DENGAN SOPAN**: 'Maaf, saya hanya bisa menjawab pertanyaan seputar program dan aplikasi Pusaka Purwosari. Apakah ada yang bisa saya bantu terkait topik tersebut?'
        3.  Berikan jawaban yang **ringkas dan jelas** (maksimal 3-4 kalimat). Hindari penggunaan format list atau markdown (seperti tanda * atau **).
        4.  **Jika pertanyaan pengguna tidak jelas, ambigu, atau tidak masuk akal** (contoh: 'berapa kenapa', 'apakah ikan', 'asdfghjkl'), **JANGAN MENCOBA MENJAWAB**. Sebaliknya, minta klarifikasi dengan sopan menggunakan jawaban ini: 'Maaf, saya kurang mengerti pertanyaan Anda. Bisa tolong diperjelas lagi?'
        ";

        $systemPrompt = $staticPromptPart . "\n\n**DATA LANGSUNG DARI APLIKASI (SUMBER KEBENARAN ANDA):**\n" . $dynamicKnowledge;

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Goog-Api-Key' => env('GEMINI_API_KEY'),
        ])
        ->retry(3, 1000)
        ->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $systemPrompt],
                        ['text' => "Pertanyaan Pengguna: " . $userMessage]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.4,
                'maxOutputTokens' => 150,
            ]
        ]);

        if (!$response->successful()) {
            Log::error('Gemini API request failed: ' . $response->body());
            
            if ($response->status() == 503) {
                return response()->json(['reply' => 'Maaf, layanan AI sedang sangat sibuk saat ini. Silakan coba lagi dalam beberapa saat.'], 503);
            }

            return response()->json([
                'error' => 'Gagal menghubungi layanan AI setelah beberapa kali percobaan.',
            ], 500);
        }

        $reply = data_get($response->json(), 'candidates.0.content.parts.0.text', 'Maaf, terjadi kesalahan saat memproses balasan.');
        $cleanedReply = preg_replace('/^[-*]\s*|[*#`]/m', '', $reply);

        return response()->json(['reply' => $cleanedReply]);
    }
}
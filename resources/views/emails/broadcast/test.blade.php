<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Broadcast Bank Sampah</title>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .email-container {
            background-color: #ffffff;
            margin: 30px auto;
            padding: 20px;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2e7d32;
        }
        .footer {
            font-size: 0.9em;
            color: #666;
            margin-top: 30px;
        }
        .logo {
            width: 100px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <center>
            {{-- Optional Logo --}}
            {{-- <img src="{{ asset('images/logo-pusaka.png') }}" class="logo" alt="Logo"> --}}
            <h1>Bank Sampah Pusaka Purwosari</h1>
        </center>

        <p>Halo Warga Pusaka! 👋</p>

        <p>
            {!! nl2br(e($data['message'])) !!}
        </p>

        @if (!empty($data['subject']))
            <p><strong>Judul Pesan:</strong> {{ $data['subject'] }}</p>
        @endif

        <p>Salam hijau 🌿<br>
        <strong>Tim Bank Sampah Pusaka Purwosari</strong></p>

        <hr>

        <div class="footer">
            Email ini dikirim otomatis oleh sistem Bank Sampah.<br>
            Mohon tidak membalas langsung email ini.
        </div>
    </div>
</body>
</html>

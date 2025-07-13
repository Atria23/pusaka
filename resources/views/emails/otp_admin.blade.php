<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Permintaan OTP Reset Password</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333;">Permintaan OTP Reset Password</h2>
        <p>Permintaan reset password dari nomor: <span style="font-size: 20px; color: #e53935;">{{ $kontak }}</span></p>
        <p><strong>OTP:</strong> <span style="font-size: 20px; color: #e53935;">{{ $otp }}</span></p>
        <p style="margin-top: 30px;">JANGAN BERIKAN OTP SELAIN KEPADA PEMILIK NOMOR TELEPON TERSEBUT!!!.</p>
    </div>
</body>
</html>

<!DOCTYPE html>
<html>
<head>
    <title>Laporan Admin</title>
    <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #000; padding: 6px; text-align: left; }
        th { background-color: #eee; }
    </style>
</head>
<body>
    <h2>Laporan Admin</h2>
    <table>
        <thead>
            <tr>
                <th>Periode</th>
                <th>Total Aktivitas Setoran</th>
                <th>Total Poin Didapat User</th>
                <th>Total Aktivitas Penukaran</th>
            </tr>
        </thead>
        <tbody>
            @foreach($laporan as $item)
                <tr>
                    <td>{{ $item->periode }}</td>
                    <td>{{ $item->total_aktivitas_setoran }}</td>
                    <td>{{ $item->total_poin_didapat_user ?? '-' }}</td>
                    <td>{{ $item->total_aktivitas_penukaran ?? '-' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>

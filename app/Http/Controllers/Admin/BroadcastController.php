<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BroadcastMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\BroadcastMail;
use Illuminate\Support\Facades\Mail;

class BroadcastController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/Broadcast/Create');
    }

    
public function store(Request $request)
{
    $validated = $request->validate([
        'type' => 'required|in:email,sms,both',
        'subject' => 'nullable|string|max:255',
        'message' => 'required|string',
    ]);

    $broadcast = BroadcastMessage::create($validated);
    $users = User::all();

    foreach ($users as $user) {
        if (in_array($validated['type'], ['email', 'both']) && $user->email) {
            Mail::to($user->email)->send(new BroadcastMail(
                $validated['subject'] ?? 'Informasi dari Bank Sampah',
                $validated['message']
            ));
        }

        if (in_array($validated['type'], ['sms', 'both']) && $user->phone_number) {
            // Masih simulasi kirim SMS
            \Log::info("Sending SMS to {$user->phone_number}: {$validated['message']}");
        }
    }

    return redirect()->route('admin.broadcast.create')->with('success', 'Pesan berhasil dikirim!');
}


    public function test(Request $request)
{
    $validated = $request->validate([
        'type' => 'required|in:email,sms,both',
        'subject' => 'nullable|string|max:255',
        'message' => 'required|string',
    ]);

    $adminEmail = config('mail.admin_email');
    $adminPhone = config('mail.admin_phone');

    if (in_array($validated['type'], ['email', 'both']) && $adminEmail) {
        Mail::to($adminEmail)->send(new BroadcastMail(
            $validated['subject'] ?? '[TEST] Informasi Broadcast',
            $validated['message']
        ));
    }

    if (in_array($validated['type'], ['sms', 'both']) && $adminPhone) {
        \Log::info("[TEST SMS] Kirim ke {$adminPhone}: {$validated['message']}");
    }

    return redirect()->route('admin.broadcast.create')->with('success', 'Test berhasil dikirim ke admin!');
}

}

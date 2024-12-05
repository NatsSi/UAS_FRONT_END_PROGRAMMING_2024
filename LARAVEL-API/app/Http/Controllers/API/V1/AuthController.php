<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $member = Auth::user();
            $email = $member->email;
            return response()->json([
                'email' => $email,
            ]);
        }

        return response()->json(['error' => 'Tidak Sesuai!'], 401);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logout successful']);
    }
}
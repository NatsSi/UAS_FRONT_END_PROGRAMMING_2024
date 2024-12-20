<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\MemberCollection;
use App\Http\Resources\V1\MemberResource;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Optional: You can add pagination if you want
        $members = Member::all(); // Or use pagination, like Member::paginate(10);

        return new MemberCollection($members); // Wrap the result in a collection resource
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        $member = Member::create([
            'email' => $request->input('email'),
            'subscription_type' => $request->input('subscription_type'),
            'payment_method' => $request->input('payment_method'),
            'password' => Hash::make($request->input('password')),
            'subscription_date' => $request->input('subscription_date'),
         ]);

         return (new MemberResource($member))
         ->response()
         ->setStatusCode(200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $email)
    {
        // Cari member berdasarkan email
        $member = Member::where('email', $email)->first();

        if (!$member) {
            return response()->json(['message' => 'Member not found'], 404);
        }

        // Kembalikan data member
        return (new MemberResource($member))
            ->response()
            ->setStatusCode(200);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'title' => 'max:255'
        ]);

        $member->update([
            'email' => $request->input('email'),
            'subscription_type' => $request->input('subscription_type'),
            'payment_method' => $request->input('payment_method'),
            'password' => $request->input('password'),
            'subscription_date' => $request->input('subscription_date'),
         ]);

        return (new MemberResource($member))
        ->response()
        ->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        $member->delete();

        return response('Successfully Deleted', 204);
    }
}
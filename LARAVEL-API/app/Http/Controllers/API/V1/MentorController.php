<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\MentorCollection;
use App\Models\Mentor;
use Illuminate\Http\Request;

class MentorController extends Controller
{
    public function index(Request $request)
    {
        // Ambil parameter pencarian dan filter dari query string
        $search = $request->input('search', '');
        $role = $request->input('role', '');
        $sortBy = $request->input('sort_by', 'rating');
        $page = $request->input('page', 1);
        $pageSize = $request->input('page_size', 3);

        // Query untuk mendapatkan data mentor sesuai dengan parameter
        $mentors = Mentor::query();

        // Filter berdasarkan pencarian nama
        if ($search) {
            $mentors = $mentors->where('name', 'like', '%' . $search . '%');
        }

        // Filter berdasarkan role
        if ($role) {
            $mentors = $mentors->where('role', $role);
        }

        // Sort berdasarkan rating
        $mentors = $mentors->orderBy($sortBy, 'desc');

        // Pagination
        $mentors = $mentors->paginate($pageSize);

        // Kembalikan data dalam format yang sesuai untuk frontend
        return response()->json([
            'data' => $mentors->items(),
            'total' => $mentors->total(),
            'current_page' => $mentors->currentPage(),
            'last_page' => $mentors->lastPage()
        ]);
    }
}


<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Http\Resources\V1\VideoResource;
use Illuminate\Http\Request; // Pastikan namespace ini sudah benar

class VideoController extends Controller
{
    // Mengambil semua video
    public function index(Request $request)
    {
        // Mendapatkan query parameter untuk pencarian
        $title = $request->query('title');
        $publisher = $request->query('publisher');
        $type = $request->query('type');
        $sort = $request->query('sort', 'desc'); // Default sorting adalah descending

        // Query untuk mendapatkan video, dengan kondisi pencarian jika ada parameter yang diterima
        $videos = Video::query();

        if ($title) {
            $videos = $videos->where('title', 'like', '%' . $title . '%');
        }

        if ($publisher) {
            $videos = $videos->where('publisher', 'like', '%' . $publisher . '%');
        }

        if ($type) {
            $videos = $videos->where('type', 'like', '%' . $type . '%');
        }

        // Menambahkan sorting berdasarkan timestamp
        $videos = $videos->orderBy('created_at', $sort); // Menambahkan sorting berdasarkan timestamp

        // Ambil video yang sudah difilter dan diurutkan
        $videos = $videos->get();

        // Mengembalikan koleksi video yang sudah difilter dan diurutkan
        return VideoResource::collection($videos);
    }

    public function show($id)
    {
        // Mencari video berdasarkan ID MongoDB
        $video = Video::find($id); // Menggunakan _id secara otomatis di MongoDB

        if (!$video) {
            return response()->json(['error' => 'Video not found'], 404);
        }

        // Mengembalikan data video menggunakan resource
        return new VideoResource($video);
    }


    // Menyimpan video baru
    public function store(Request $request)
    {
        // Validasi input data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'link' => 'required|url',
            'type' => 'required|string|max:255',
        ]);

        // Menyimpan data video ke MongoDB
        $video = Video::create($validated);

        // Mengembalikan respons dengan data video baru
        return new VideoResource($video);

        dd($request->all());
    }



    public function update($id, Request $request)
    {
        // Mencari video berdasarkan ID
        $video = Video::find($id);

        // Jika video tidak ditemukan, kembalikan respons error
        if (!$video) {
            return response()->json(['error' => 'Video not found'], 404);
        }

        // Validasi data yang diterima
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'link' => 'nullable|url',
            'type' => 'nullable|string|max:255',
        ]);

        // Mengupdate video dengan data yang sudah divalidasi
        $video->update($validated);

        // Mengembalikan video yang sudah diupdate menggunakan resource
        return new VideoResource($video);
    }


    public function destroy($id)
    {
        $video = Video::find($id);
        if (!$video) {
            return response()->json(['error' => 'Video not found'], 404);
        }

        $video->delete();
        return response()->json(['message' => 'Video deleted successfully'], 200);
    }
}

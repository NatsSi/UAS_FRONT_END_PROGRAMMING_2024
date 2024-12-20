<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VideoCollection extends ResourceCollection
{
    public $collects = VideoResource::class; // Menggunakan VideoResource untuk setiap item

    public function toArray($request)
    {
        return [
            'data' => $this->collection, // Mengembalikan koleksi dalam bentuk 'data'
        ];
    }

    public function with($request) {
        return [
            'status' => 'success',
        ];
    }

    public function withResponse(Request $request, \Illuminate\Http\JsonResponse $response){
        $response->header('Accept', 'application/json');
    }
}


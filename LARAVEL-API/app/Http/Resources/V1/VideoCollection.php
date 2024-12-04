<?php

namespace App\Http\Resources\V1;

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
}


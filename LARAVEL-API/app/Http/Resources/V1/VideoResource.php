<?php
namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id, // Mengonversi ID ke string jika perlu
            'title' => $this->title,
            'publisher' => $this->publisher,
            'link' => $this->link,
            'type' => $this->type,
            'created_at' => $this->created_at ? $this->created_at->toIso8601String() : null,
        ];
    }

    public function with($request){
        return [
            'status' => 'success',
        ];
    }

    public function withResponse(Request $request, \Illuminate\Http\JsonResponse $response){
        $response->header('Accept', 'application/json');
    }
}


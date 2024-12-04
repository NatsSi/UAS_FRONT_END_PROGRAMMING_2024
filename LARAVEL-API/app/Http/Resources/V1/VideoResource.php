<?php
namespace App\Http\Resources\V1;

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
            'created_at' => $this->created_at ? $this->created_at->format('d M - Y - H:i:s') : null,
        ];
    }
}


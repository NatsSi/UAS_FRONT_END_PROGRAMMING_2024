<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'events';
    public function toArray(Request $request): array
    {
        return [
            'type' => 'event',
            'id' => $this->id,
            'attributes' => [
                'title' => $this->title,
                'place' => $this->place,
                'category' => $this->category,
                'day' => $this->day,
                'date' => $this->date,
                'message' => $this->message,
                'sub_message' => $this->sub_message,
                'author_1' => $this->author_1,
                'job_author_1' => $this->job_author_1,
                'author_2' => $this->author_2,
                'job_author_2' => $this->job_author_2,
                'image' => $this->image,
                'header' => $this->header,
                'body' => $this->body,
            ],
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
<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'blogs';
    public function toArray(Request $request): array
    {
        return [
            'type' => 'blog',
            'id' => $this->id,
            'attributes' => [
                'title' => $this->title,
                'category' => $this->category,
                'date' => $this->date,
                'sub_message' => $this->sub_message,
                'author_1' => $this->author_1,
                'job_author_1' => $this->job_author_1,
                'image' => $this->image,
                'section1_title' => $this->section1_title,
                'section1_content' => $this->section1_content,
                'section2_title' => $this->section2_title,
                'section2_content' => $this->section2_content,
                'section3_title' => $this->section3_title,
                'section3_content' => $this->section3_content,
                'conclusion' => $this->conclusion,
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
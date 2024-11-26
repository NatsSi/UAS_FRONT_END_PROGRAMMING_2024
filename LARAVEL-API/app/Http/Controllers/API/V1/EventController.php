<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\EventCollection;
use App\Http\Resources\V1\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $category = $request->get('category', '');
        $search = $request->get('search', ''); // Get the search query
        $perPage = $request->get('per_page');
    


         // Query dasar
        $query = Event::query();

        // Tambahkan filter berdasarkan kategori (jika ada)
        if (!empty($category)) {
            $query->where('category', $category);
        }

        // Tambahkan search berdasarkan title, place, atau day (jika ada)
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                ->orWhere('place', 'LIKE', "%{$search}%");
            });
        }

        // Pagination dan kembalikan hasil
        $events = $query->paginate($perPage);
        
        return new EventCollection($events);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|unique:events|max:255',
    
        ]);

        $event = Event::create([
            'title' => $request->input('title'),
            'place' => $request->input('place'),
            'category' => $request->input('category'),
            'day' => $request->input('day'),
            'date' => $request->input('date'),
            'message' => $request->input('message'),
            'sub_message' => $request->input('sub_message'),
            'author_1' => $request->input('author_1'),
            'job_author_1' => $request->input('job_author_1'),
            'author_2' => $request->input('author_2'),
            'job_author_2' => $request->input('job_author_2'),
            'image' => $request->input('image'),
            'header' => $request->input('header'),
            'body' => $request->input('body'),
        ]);

        return (new EventResource($event))
        ->response()
        ->setStatusCode(200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return (new EventResource($event))->response()->setStatusCode(200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'max:255'
        ]);

        $event->update([
            'title' => $request->input('title'),
            'place' => $request->input('place'),
            'category' => $request->input('category'),
            'day' => $request->input('day'),
            'date' => $request->input('date'),
            'message' => $request->input('message'),
            'sub_message' => $request->input('sub_message'),
            'author_1' => $request->input('author_1'),
            'job_author_1' => $request->input('job_author_1'),
            'author_2' => $request->input('author_2'),
            'job_author_2' => $request->input('job_author_2'),
            'image' => $request->input('image'),
            'header' => $request->input('header'),
            'body' => $request->input('body'),
        ]);

        return (new EventResource($event))
        ->response()
        ->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return response('Success Delete', 204);
    }
}
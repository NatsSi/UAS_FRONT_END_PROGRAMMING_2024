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
    public function index()
    {
        return new EventCollection(Event::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|unique:events|max:255',
            'day' => 'required',
            'date' => 'required|date',
            'message' => 'required',
            'sub_message' => 'required',
            'author_1' => 'required',
            'job_author_1' => 'required',
            'header' => 'required',
            'body' => 'required'
        ]);

        $event = Event::create([
            'title' => $request->input('title'),
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
            'title' => 'required|unique:events|max:255'
        ]);

        $event->update([
            'title' => $request->input('title'),
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
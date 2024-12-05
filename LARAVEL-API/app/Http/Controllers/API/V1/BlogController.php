<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\BlogCollection;
use App\Http\Resources\V1\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sort = $request->get('sort', 'asc');
        $date = $request->get('date', '');
        $category = $request->get('category', '');
        $search = $request->get('search', ''); // Get the search query
        $perPage = $request->get('per_page');
    
        // Query dasar
        $query = Blog::query();

        if(!empty($sort)) {
            $query->orderBy('date', $sort);
        }

        if(!empty($date)) {
            $query->where('date', '>=', $date);
        }

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
        $blogs = $query->paginate($perPage);
        
        return new BlogCollection($blogs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|unique:blogs|max:255',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:90000',
        ]);

        $blog = Blog::create([
            'title' => $request->input('title'),
            'category' => $request->input('category'),
            'date' => $request->input('date'),
            'sub_message' => $request->input('sub_message'),
            'author_1' => $request->input('author_1'),
            'job_author_1' => $request->input('job_author_1'),
            'image' => '',
            'section1_title' => $request->input('section1_title'),
            'section1_content' => $request->input('section1_content'),
            'section2_title' => $request->input('section2_title'),
            'section2_content' => $request->input('section2_content'),
            'section3_title' => $request->input('section3_title'),
            'section3_content' => $request->input('section3_content'),
            'conclusion' => $request->input('conclusion'),

        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('images', $filename, 'public'); 
            $blog->image = $filename;  // Update the blog record with the filename
            $blog->save();  // Save the blog with the image path
        }

        return (new BlogResource($blog))
        ->response()
        ->setStatusCode(200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        return (new BlogResource($blog))->response()->setStatusCode(200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
{
    // Log the incoming request to check data
    \Log::info('Request data:', $request->all());

    // Validate the request data, you can exclude 'image' here as you don't want to change it
    $validated = $request->validate([
        'title' => 'max:255', // Add other validation rules as necessary
        'category' => 'max:255',
        'date' => 'date',
        // You can add other fields like sub_message, section titles, etc.
    ]);

    // Update only the string fields (excluding image)
    $blog->update([
        'title' => $request->input('title'),
        'category' => $request->input('category'),
        'date' => $request->input('date'),
        'sub_message' => $request->input('sub_message'),
        'author_1' => $request->input('author_1'),
        'job_author_1' => $request->input('job_author_1'),
        'section1_title' => $request->input('section1_title'),
        'section1_content' => $request->input('section1_content'),
        'section2_title' => $request->input('section2_title'),
        'section2_content' => $request->input('section2_content'),
        'section3_title' => $request->input('section3_title'),
        'section3_content' => $request->input('section3_content'),
        'conclusion' => $request->input('conclusion'),
    ]);

    // If no image is being sent, you can skip saving/updating the image field.
    // The image will remain unchanged.

    return (new BlogResource($blog))
        ->response()
        ->setStatusCode(200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();

        return response('Success Delete', 204);
    }
}
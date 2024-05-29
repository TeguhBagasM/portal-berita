<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // orderbydesc = sscanding
        $news = new NewsCollection(News::OrderByDesc('id')->paginate(8));
        return Inertia::render('Homepage', [
            'title' => "ThievNews Homepage",
            'description' => "Welcome To ThievNews",
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'required|string|max:255',
            'category' => 'required|string|max:150',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        $newName = '';
        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $newName = $request->title . '-' . now()->timestamp . '.' . $extension;
            // Store the file in public/cover
            $request->file('image')->move(public_path('cover'), $newName);
        }
    
        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;
        $news->image = $newName;
        $news->save();
    
        return back()->with('message', 'News Added Successfully');
    }
    



    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $myNews = $news::where('author', auth()->user()->email)->get();
        return Inertia::render('Dashboard', [
            'myNews' => $myNews
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news, Request $request)
    {
      return Inertia::render('EditNews', [
        'myNews' => $news->find($request->id)
      ]); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'required|string|max:255',
            'category' => 'required|string|max:150',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $news = News::findOrFail($id);

        if ($request->hasFile('image')) {
            $oldImagePath = public_path('cover/' . $news->image);
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }

            $extension = $request->file('image')->getClientOriginalExtension();
            $newName = $request->title . '-' . now()->timestamp . '.' . $extension;
            $request->file('image')->move(public_path('cover'), $newName);

            $news->update([
                'title' => $request->title,
                'description' => $request->description,
                'category' => $request->category,
                'image' => $newName,
            ]);
        } else {
            $news->update([
                'title' => $request->title,
                'description' => $request->description,
                'category' => $request->category,
            ]);
        }

        return redirect()->route('dashboard')->with('message', 'News Updated Successfully');
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
{
    $news = News::find($request->id);

    if ($news) {
        // Path to the image
        $imagePath = public_path('cover/' . $news->image);

        // Check if the file exists and delete it
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }

        // Delete the news from the database
        $news->delete();
    }

    return redirect()->back()->with('message', 'News Deleted Successfully');
}

}

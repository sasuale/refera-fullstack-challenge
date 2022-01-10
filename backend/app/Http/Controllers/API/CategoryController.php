<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $categories = Category::all();

        return response()->json([
            'status' => 200,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191|unique:categories,name',
        ],
        [
            'required'=> 'The :attribute is mandatory',
            'unique' => 'The :attribute was registered',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }
        else
        {
            $category = Category::where('name', $request->name)->first();

            if($category)
            {
                return response()->json([
                    'status' => 302,
                    'message' => 'Category Found!',
                ]);
            }
            else{
                $category = new Category;
                $category->name = $request->name;
                $category->tag = $request->tag;
                $category->description = $request->description;
                $category->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'Category Added Successfully!',
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $category = Category::findOrFail($id);

        if($category)
        {
            return response()->json([
                'status' => 200,
                'category' => $category,
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Category Not Found!',
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
        ],
        [
            'required'=> 'The :attribute is mandatory',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }
        else
        {
            $category = Category::findOrFail($id);

            if($category)
            {
                $category->name = $request->name;
                $category->tag = $request->tag;
                $category->description = $request->description;
                $category->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Category Updated Successfully!',
                ]);
            }
            else{
                return response()->json([
                    'status' => 302,
                    'message' => 'Category Not Found!',
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $category = Category::findOrFail($id);

        if($category)
        {
            $category->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Category Deleted Successfully!',
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Category Not Found!',
            ]);
        }
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $companies = Company::all();

        return response()->json([
            'status' => 200,
            'companies' => $companies,
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
            'name' => 'required|max:191|unique:companies,name',
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
            $company = Company::where('name', $request->name)->first();

            if($company)
            {
                return response()->json([
                    'status' => 302,
                    'message' => 'Company Found!',
                ]);
            }
            else{
                $company = new Company;
                $company->name = $request->name;
                $company->tag = $request->tag;
                $company->description = $request->description;
                $company->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'Company Added Successfully!',
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
        $company = Company::findOrFail($id);

        if($company)
        {
            return response()->json([
                'status' => 200,
                'company' => $company,
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Company Not Found!',
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
            $company = Company::findOrFail($id);

            if(!$company)
            {
                return response()->json([
                    'status' => 302,
                    'message' => 'Company Not Found!',
                ]);
            }
            else{
                $company->name = $request->name;
                $company->tag = $request->tag;
                $company->description = $request->description;
                $company->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Company Updated Successfully!',
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
        $company = Company::findOrFail($id);

        if($company)
        {
            $company->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Company Deleted Successfully!',
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Company Not Found!',
            ]);
        }
    }
}

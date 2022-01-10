<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $orders = Order::all();

        return response()->json([
            'status' => 200,
            'orders' => $orders,
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
            'contact_name' => 'required|max:191',
            'contact_phone' => 'required|max:191',
            'real_estate' => 'required|max:191',
            'company_id' => 'required',
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
            $order = new Order;
            $order->contact_name = $request->contact_name;
            $order->contact_phone = $request->contact_phone;
            $order->real_estate = $request->real_estate;
            $order->description = $request->description;
            $order->deadline = $request->deadline;
            $order->company_id = $request->company_id;
            $order->category_id = $request->category_id;
            $order->save();

            return response()->json([
                'status' => 200,
                'message' => 'Order Added Successfully!',
            ]);
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
        $order = Order::findOrFail($id);

        if($order)
        {
            return response()->json([
                'status' => 200,
                'order' => $order,
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Order Not Found!',
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
            'contact_name' => 'required|max:191',
            'contact_phone' => 'required|max:191',
            'real_estate' => 'required|max:191',
            'company_id' => 'required',
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
            $order = Order::findOrFail($id);

            if(!$order)
            {
                return response()->json([
                    'status' => 302,
                    'message' => 'Order Not Found!',
                ]);
            }
            else{
                $order->contact_name = $request->contact_name;
                $order->contact_phone = $request->contact_phone;
                $order->real_estate = $request->real_estate;
                $order->description = $request->description;
                $order->deadline = $request->deadline;
                $order->company_id = $request->company_id;
                $order->category_id = $request->category_id;
                $order->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Order Updated Successfully!',
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
        $order = Order::findOrFail($id);

        if($order)
        {
            $order->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Order Deleted Successfully!',
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Order Not Found!',
            ]);
        }
    }
}

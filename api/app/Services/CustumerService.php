<?php

namespace App\Services;

use App\Models\Customers;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CustumerService
{
    public function fetchAll(Request $request)
    {
        $query = Customers::with('address');

        // dd($request->input('birthday'));
        if ($request->has('name') && !empty($request->input('name'))) {
            $name = strtolower($request->input('name'));
            $query->whereRaw('lower(name) like ?', ["%{$name}%"]);
        }

        if ($request->has('identification_number') && !empty($request->input('identification_number'))) {
            $query->where('identification_number', str_replace(['.', '-'], '', $request->input('identification_number')));
        }

        if ($request->has('gender') && !empty($request->input('gender'))) {
            $query->where('gender', $request->input('gender'));
        }

        if ($request->has('birthday') && !empty($request->input('birthday'))) {
            $birthday = Carbon::createFromFormat('d/m/Y', $request->input('birthday'))->format('Y-m-d');
            $query->whereDate('birthday', $birthday);
        }

        $customers = $query->orderBy('id')->paginate(10);
        return $customers;
    }

    public function fetchOne($id)
    {
        $customer = Customers::with('address')->find($id);

        if (!$customer) {
            return null;
        }

        return $customer;
    }

    public function create(array $data)
    {
        $addressData = $data['address'];
        unset($data['address']);
        $customerData = $data;

        $customer = Customers::create($customerData);

        $customer->address()->create($addressData);

        $customer = $this->fetchOne($customer['id']);

        return $customer;
    }

    public function update($id, array $data)
    {
        $customer = $this->fetchOne($id);

        if (!$customer) {
            $customer = $this->create($data);
        }

        $customerAux = $customer->toArray();
        $addressAux =  array_key_exists('address', $customerAux) ? $customer['address'] : [];

        $customerData = array_merge($customerAux, $data);
        $addressData = array_merge($addressAux->toArray(), $data['address']);
        unset($customerData['address']);

        $customer->update($customerData);

        $customer->address()->update($addressData);

        return $this->fetchOne($id);
    }

    public function delete($id)
    {
        $customer = Customers::find($id);

        if (!$customer) {
            return null;
        }

        Customers::destroy($id);
        return true;
    }
}

<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Customers;
use Illuminate\Database\Seeder;

class CustomersSeeder extends Seeder
{
    public function run()
    {
        Customers::factory()->count(50)->create()->each(function ($customer) {
            Address::factory()->create([
                'customers_id' => $customer->id
            ]);
        });
    }
}

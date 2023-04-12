<?php

namespace Database\Factories;

use App\Models\Customers;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomersFactory extends Factory
{
    protected $model = Customers::class;
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'identification_number' => fake()->cpf(false),
            'birthday' => fake()->date('Y-m-d'),
            'gender' => fake()->randomElement(['m', 'f'])
        ];
    }
}

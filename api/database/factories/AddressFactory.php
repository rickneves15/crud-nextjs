<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    public function definition()
    {
        $url = "geradornv.com.br/wp-json/api/cep/random-by-states?state=SP";
        $response = Http::get($url);
        $address = $response->json();
        return [
            'street' => $address['street'],
            'city' => $address['city'],
            'state' => $address['state'],
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customers extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'identification_number',
        'birthday',
        'gender'
    ];

    public function address()
    {
        return $this->hasOne(Address::class);
    }
}

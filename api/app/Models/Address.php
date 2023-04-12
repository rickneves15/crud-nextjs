<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'street',
        'city',
        'state',
    ];

    public function customer()
    {
        return $this->belongsTo(Customers::class);
    }
}

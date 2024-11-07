<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Student extends Model
{
    protected $connection = 'mongodb';  // Conexión a MongoDB
    protected $collection = 'students'; // Colección en MongoDB



    protected $fillable = ['name', 'grade']; // Campos permitidos


}

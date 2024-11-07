<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use MongoDB\Client;
use MongoDB\BSON\ObjectId;


class StudentController extends Controller
{
    protected $collection;

    public function __construct()
    {
        $client = new Client("mongodb://localhost:27017");
        $this->collection = $client->selectCollection('estudiantes', 'students');
    }

    public function index()
    {
        $students = $this->collection->find()->toArray();
        return response()->json($students, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'grade' => 'required|integer|min:0|max:100'
        ]);

        $student = [
            'name' => $validated['name'],
            'grade' => $validated['grade']
        ];

        try {
            $this->collection->insertOne($student);
            return response()->json($student, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inserting data: ' . $e->getMessage()], 500);
        }

    }

    public function bestGrade()
    {
        $bestStudent = $this->collection->findOne([], ['sort' => ['grade' => -1]]);
        if (!$bestStudent) {
            return response()->json(['message' => 'No students found'], 404);
        }
        return response()->json($bestStudent);
    }

    public function worstGrade()
    {
        $worstStudent = $this->collection->findOne([], ['sort' => ['grade' => 1]]);
        if (!$worstStudent) {
            return response()->json(['message' => 'No students found'], 404);
        }
        return response()->json($worstStudent);
    }

    public function destroy($id)
    {
        try {
            $result = $this->collection->deleteOne(['_id' => new ObjectId($id)]);
            if ($result->getDeletedCount() === 0) {
                return response()->json(['message' => 'No student found with that ID'], 404);
            }
            return response()->json(['message' => 'Student deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting data: ' . $e->getMessage()], 500);
        }
    }


}

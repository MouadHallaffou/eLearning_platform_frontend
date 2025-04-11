<?php

namespace App\Http\Controllers\Api;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Classes\ApiResponseClass;
use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Interfaces\CourseRepositoryInterface;

/**
 * @OA\Tag(
 *     name="Courses",
 *     description="Endpoints pour la gestion des cours"
 * )
 */
class CourseController extends Controller
{
    private $courseRepositoryInterface;

    public function __construct(CourseRepositoryInterface $courseRepositoryInterface)
    {
        $this->courseRepositoryInterface = $courseRepositoryInterface;
    }

    /**
     * @OA\Get(
     *     path="/api/V1/courses",
     *     summary="Lister tous les cours",
     *     tags={"Courses"},
     *     @OA\Response(
     *         response=200,
     *         description="Liste des cours"
     *     )
     * )
     */
    public function index()
    {
        $data = $this->courseRepositoryInterface->index();
        return ApiResponseClass::sendResponse(CourseResource::collection($data), '', 200);
    }

    /**
     * @OA\Post(
     *     path="/api/V1/courses",
     *     summary="Créer un nouveau cours",
     *     tags={"Courses"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"title", "description", "content", "duration", "level", "category_id"},
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="content", type="string"),
     *                 @OA\Property(property="duration", type="integer"),
     *                 @OA\Property(property="level", type="string"),
     *                 @OA\Property(property="category_id", type="integer"),
     *                 @OA\Property(property="tag_ids", type="array", @OA\Items(type="integer")),
     *                 @OA\Property(property="cover", type="file")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Cours créé avec succès"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erreur de validation"
     *     )
     * )
     */
    public function store(StoreCourseRequest $request)
    {
        DB::beginTransaction();
        try {
            $details = $request->validated();
            $coverPath = null;

            if ($request->hasFile('cover')) {
                $coverPath = $request->file('cover')->store('covers', 'public');
                $details['cover'] = $coverPath;
            }

            $course = $this->courseRepositoryInterface->store($details);

            if ($request->has('tag_ids')) {
                $course->tags()->sync($request->tag_ids);
            }

            DB::commit();
            return ApiResponseClass::sendResponse(
                new CourseResource($course->load('tags')),
                'Course created successfully',
                201
            );
        } catch (\Exception $ex) {
            DB::rollBack();
            if (isset($coverPath)) {
                Storage::disk('public')->delete($coverPath);
            }
            Log::error('Course creation error: ' . $ex->getMessage());
            return ApiResponseClass::rollback($ex, 'Error creating course');
        }
    }

    /**
     * @OA\Get(
     *     path="/api/V1/courses/{id}",
     *     summary="Obtenir les détails d'un cours",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Détails du cours"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Cours non trouvé"
     *     )
     * )
     */
    public function show($id)
    {
        $course = $this->courseRepositoryInterface->getById($id);
        if (!$course) {
            return ApiResponseClass::sendResponse('Course not found', '', 404);
        }
        return ApiResponseClass::sendResponse(new CourseResource($course->load('tags')), '', 200);
    }

    /**
     * @OA\Put(
     *     path="/api/V1/courses/{id}",
     *     summary="Mettre à jour un cours",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="content", type="string"),
     *                 @OA\Property(property="duration", type="integer"),
     *                 @OA\Property(property="level", type="string"),
     *                 @OA\Property(property="category_id", type="integer"),
     *                 @OA\Property(property="tag_ids", type="array", @OA\Items(type="integer")),
     *                 @OA\Property(property="cover", type="file")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Cours mis à jour avec succès"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Cours non trouvé"
     *     )
     * )
     */
    public function update(UpdateCourseRequest $request, $id)
    {
        $course = $this->courseRepositoryInterface->getById($id);
        if (!$course) {
            return ApiResponseClass::sendResponse('Course not found', '', 404);
        }

        DB::beginTransaction();
        try {
            $details = $request->validated();
            $coverPath = $course->cover;

            if ($request->hasFile('cover')) {
                if ($coverPath) {
                    Storage::disk('public')->delete($coverPath);
                }
                $coverPath = $request->file('cover')->store('covers', 'public');
                $details['cover'] = $coverPath;
            }

            $course = $this->courseRepositoryInterface->update($details, $id);

            if ($request->has('tag_ids')) {
                $course->tags()->sync($request->tag_ids);
            } else {
                $course->tags()->detach();
            }

            DB::commit();
            return ApiResponseClass::sendResponse(
                new CourseResource($course->load('tags')),
                'Course updated successfully',
                200
            );
        } catch (\Exception $ex) {
            DB::rollBack();
            Log::error('Course update error: ' . $ex->getMessage());
            return ApiResponseClass::rollback($ex, 'Error updating course');
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/V1/courses/{id}",
     *     summary="Supprimer un cours",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Cours supprimé avec succès"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Cours non trouvé"
     *     )
     * )
     */
    public function destroy($id)
    {
        $course = $this->courseRepositoryInterface->getById($id);
        if (!$course) {
            return ApiResponseClass::sendResponse('Course not found', '', 404);
        }

        DB::beginTransaction();
        try {
            if ($course->cover) {
                Storage::disk('public')->delete($course->cover);
            }

            $course->tags()->detach();
            $this->courseRepositoryInterface->delete($id);
            DB::commit();

            return ApiResponseClass::sendResponse('', 'Course deleted successfully', 204);
        } catch (\Exception $ex) {
            DB::rollBack();
            Log::error('Course deletion error: ' . $ex->getMessage());
            return ApiResponseClass::rollback($ex, 'Error deleting course');
        }
    }
}

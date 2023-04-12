<?php

namespace App\Http\Controllers;

use App\Services\CustumerService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CustomersController extends Controller
{
    use ResponseTrait;

    public function __construct(private CustumerService $custumerService)
    {
    }

    public function index(Request $request)
    {
        try {
            $custumers = $this->custumerService->fetchAll($request);
            return $this->responseSuccess($custumers, 'Custumers List Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        try {
            $custumer = $this->custumerService->create($request->all());
            return $this->responseSuccess($custumer, 'New Custumer Created Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $custumer = $this->custumerService->fetchOne($id);
            if (is_null($custumer)) {
                return $this->responseError(null, 'Custumer Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($custumer, 'Custumer Details Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $custumer = $this->custumerService->update($id, $request->all());
            if (is_null($custumer)) {
                return $this->responseError(null, 'Custumer Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($custumer, 'Custumer Updated Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $custumer = $this->custumerService->delete($id);
            if (is_null($custumer)) {
                return $this->responseError(null, 'Custumer Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($custumer, 'Custumer Deleted Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

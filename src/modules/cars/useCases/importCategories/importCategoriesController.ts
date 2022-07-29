import { Request, Response } from 'express';

import { ImportCategoriesUseCase } from './importCategoriesUseCase';

class ImportCategoriesController {
  constructor(private importCategoriesUsecase: ImportCategoriesUseCase) {}
  handle(request: Request, response: Response): Response {
    const { file } = request;
    this.importCategoriesUsecase.execute(file);
    return response.status(200).send();
  }
}

export { ImportCategoriesController };

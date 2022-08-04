import { Request, Response } from 'express';

import { ImportCategoriesUseCase } from './importCategoriesUseCase';

class ImportCategoriesController {
  constructor(private importCategoriesUsecase: ImportCategoriesUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    await this.importCategoriesUsecase.execute(file);
    return response.status(200).send();
  }
}

export { ImportCategoriesController };

import { parse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { CategoriesRepository } from '../../repositories/implementations/categoriesRepository';

interface IImportCategories {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    // transforma uma função que não é assíncrona em uma
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategories[] = [];

      const parseFile = parse({
        delimiter: ';',
      });

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          // em caso de sucesso retorna.
          resolve(categories);
          fs.unlink(file.path, err => {
            if (err) throw err;
            return null;
          });
        })
        .on('error', err => {
          // em caso de falha
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const categoryExist = await this.categoriesRepository.findByName(
        category.name,
      );

      const { name, description } = category;

      if (!categoryExist) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoriesUseCase };

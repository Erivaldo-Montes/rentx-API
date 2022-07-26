import { Category } from '../model/category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository';

class PostgresRespository implements ICategoryRepository {
  findByName(name: string): Category {
    return null;
  }
  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
  }
  list(): Category[] {
    return null;
  }
}

export { PostgresRespository };

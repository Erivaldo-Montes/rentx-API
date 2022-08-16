import { Category } from "../infra/typeorm/entities/category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoryRepository {
  findByName(name: string): Promise<Category>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
}

export { ICategoryRepository, ICreateCategoryDTO };

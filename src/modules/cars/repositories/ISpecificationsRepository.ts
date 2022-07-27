import { Specification } from '../model/specification';

interface ICreateSpecification {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecification): void;
  findByName(name: string): Specification;
}

export { ISpecificationsRepository, ICreateSpecification };

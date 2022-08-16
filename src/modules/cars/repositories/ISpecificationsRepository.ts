import { Specification } from "../infra/typeorm/entities/specification";

interface ICreateSpecification {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecification): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecification };

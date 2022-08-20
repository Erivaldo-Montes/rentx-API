import { Specification } from "@modules/cars/infra/typeorm/entities/specification";

import {
  ICreateSpecification,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecification): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const AllSpecifications = this.specifications.filter(specification =>
      ids.includes(specification.id),
    );
    return AllSpecifications;
  }
}

export { SpecificationsRepositoryInMemory };

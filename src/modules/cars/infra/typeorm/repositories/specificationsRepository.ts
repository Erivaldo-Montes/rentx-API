import { Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/specification";
import {
  ICreateSpecification,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import appDataSource from "@shared/infra/typeorm/index";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = appDataSource.getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecification): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specificationsArray = await this.repository.find();

    const specifications = specificationsArray.filter(specification => {
      const re = ids.find(id => specification.id === id);
      return re;
    });
    return specifications;
  }
}

export { SpecificationsRepository };

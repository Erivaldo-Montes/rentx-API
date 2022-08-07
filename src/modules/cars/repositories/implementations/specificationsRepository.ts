import { Repository } from "typeorm";

import appDataSource from "../../../../database";
import { Specification } from "../../entities/specification";
import {
  ICreateSpecification,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = appDataSource.getRepository(Specification);
  }
  async create({ name, description }: ICreateSpecification): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }
}

export { SpecificationsRepository };

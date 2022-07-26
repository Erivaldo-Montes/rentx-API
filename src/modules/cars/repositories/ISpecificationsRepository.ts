interface ICreateSpecification {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecification): void;
}

export { ISpecificationsRepository, ICreateSpecification };

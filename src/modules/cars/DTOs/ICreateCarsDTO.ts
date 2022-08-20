import { Specification } from "../infra/typeorm/entities/specification";

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  fine_amount: number;
  brand: string;
  license_plate: string;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarDTO };

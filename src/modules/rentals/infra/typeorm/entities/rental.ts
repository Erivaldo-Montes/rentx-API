import { randomUUID } from "crypto";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import { Car } from "@modules/cars/infra/typeorm/entities/car";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id?: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  expected_return_date: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export { Rental };

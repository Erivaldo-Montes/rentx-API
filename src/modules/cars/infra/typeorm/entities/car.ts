import { randomUUID } from "crypto";
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { Category } from "./category";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
  @Column()
  daily_rate: number;

  @Column()
  fine_amount: number;

  @Column()
  available: true;

  @Column()
  brand: string;

  @Column()
  license_plate: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
      this.available = true;
    }
  }
}

export { Car };

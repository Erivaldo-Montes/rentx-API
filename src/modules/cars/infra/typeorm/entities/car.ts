import { randomUUID } from "crypto";
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Category } from "./category";
import { Specification } from "./specification";

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

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    // coluna que referencia esta entidade na tebela de relacionamento
    joinColumns: [{ name: "car_id" }],
    // coluna que referencia a tabela que é declarada nesta entidade
    inverseJoinColumns: [{ name: "specification_id" }],
  })
  specifications: Specification[];

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

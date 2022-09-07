import { randomUUID } from "crypto";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import { User } from "./user";

@Entity("users_tokens")
class UserToken {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  refresh_token: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export { UserToken };

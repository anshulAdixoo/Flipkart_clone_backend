import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // Links this entity to the "users" table in the database
export class User {
  @PrimaryGeneratedColumn() // Automatically generates a unique identifier for each user
  id: number;

  @Column({ nullable: false }) // Name cannot be null
  name: string;

  @Column({ unique: true, nullable: false }) // Email must be unique and not null
  email: string;

  @Column({ nullable: false }) // Password cannot be null
  password: string;
}

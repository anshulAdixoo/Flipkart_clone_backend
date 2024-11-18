// payment/entities/payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payments') // Make sure the table name matches your table in PostgreSQL
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  payment_method: string;

  @Column()
  payment_status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}

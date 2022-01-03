/* --- Third-party libraries --- */
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

/* --- Entities --- */
import { UserEntity } from '../../users/entities/user.entity';

@Entity('Payment_methods')
export class PaymentMethodEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Payment_method_id' })
  paymentMethodId: string;
  @Column('varchar', { length: 50, name: 'Card_holder', nullable: false })
  cardHolder: string;
  @Column('varchar', { length: 16, name: 'Card_number', nullable: false })
  cardNumber: string;
  @Column('varchar', { length: 3, name: 'Cvv', nullable: false })
  securityCode: string;
  @Column('varchar', { length: 4, name: 'Expiration_month', nullable: false })
  expirationMonth: string;
  @Column('varchar', { length: 4, name: 'Expiration_year', nullable: false })
  expirationYear: string;
  @JoinColumn({ name: 'User_id', referencedColumnName: 'userId' })
  @OneToOne(() => UserEntity, (user: UserEntity) => user.userId, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  userId: string;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Added_at',
    nullable: true
  })
  addedAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true })
  updatedA: Date;
}

/* --- Third-party libraries --- */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'User_id' })
  userId: number;
  @Column('varchar', { length: 15, name: 'First_name', nullable: false })
  firstName: string;
  @Column('varchar', { length: 15, name: 'Last_name', nullable: false })
  lastName: string;
  @Column('varchar', {
    length: 32,
    name: 'Email',
    nullable: false,
    unique: true
  })
  email: string;
  @Column('varchar', { length: 60, name: 'Password', nullable: false })
  password: string;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Registered_at',
    nullable: true
  })
  registeredAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true })
  updatedAt: Date;
}

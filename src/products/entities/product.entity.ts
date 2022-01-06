/* --- Third-party libraries --- */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Product_id' })
  productId: string;
  @Column('varchar', {
    length: 50,
    name: 'Name',
    nullable: false,
    unique: true
  })
  name: string;
  @Column('text', { name: 'Description', nullable: false })
  description: string;
  @Column('float', {
    name: 'Price',
    nullable: false,
    precision: 5,
    scale: 2
  })
  price: number;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Added_at',
    nullable: true
  })
  addedAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true })
  updatedAt: Date;
}

/* --- Third-party libraries --- */
import { EntityRepository, Repository } from 'typeorm';

import { ProductEntity } from '../../entities/product.entity';

@EntityRepository(ProductEntity)
export class ProductsEntityRepository extends Repository<ProductEntity> {}

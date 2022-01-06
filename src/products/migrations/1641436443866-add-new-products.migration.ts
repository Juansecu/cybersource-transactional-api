/* --- Third-party libraries --- */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewProductsMigration1641436443866
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO Products (Product_id, Name, Description, Price) VALUES
        (
          '131ec4c9-e6c7-4a39-b474-5808e9d15e9a',
          '500 Coins',
          '500 Coins for the game.',
          5.00
        ),
        (
          'c8f9f8f9-f8f9-4f9f-9f9f-9f9f9f9f9f9f',
          '1000 Coins',
          '1000 Coins for the game.',
          10.00
        ),
        (
          '33b00ea7-eb8a-4d4f-a299-463539f75c2c',
          '2000 Coins',
          '2000 Coins for the game.',
          20.00
        ),
        (
          'f9f9f9f9-f9f9-4f9f-9f9f-9f9f9f9f9f9f',
          '5000 Coins',
          '5000 Coins for the game.',
          50.00
        ),
        (
          '5ce788e4-0234-485f-984d-97315528a3fa',
          '10000 Coins',
          '10000 Coins for the game.',
          100.00
        )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `DELETE FROM Products WHERE Product_id IN ('131ec4c9-e6c7-4a39-b474-5808e9d15e9a', 'c8f9f8f9-f8f9-4f9f-9f9f-9f9f9f9f9f9f', '33b00ea7-eb8a-4d4f-a299-463539f75c2c', 'f9f9f9f9-f9f9-4f9f-9f9f-9f9f9f9f9f9f', '5ce788e4-0234-485f-984d-97315528a3fa')`
    );
  }
}

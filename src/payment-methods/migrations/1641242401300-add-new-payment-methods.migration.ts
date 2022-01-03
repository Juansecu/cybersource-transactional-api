import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewPaymentMethodsMigration1641242401300
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO Payment_methods (Payment_method_id, Card_holder, Card_number, Cvv, Expiration_month, Expiration_year, User_id) VALUES
      (
        '9d5ed243-afbc-42ca-8e0c-97ffc6e13357',
        '9GYDsYoFXngWv+1F8w==',
        'Jvty0zTfrn6MTtHHYCW48g==',
        'KKa6',
        '6pI=',
        'WqAlUQ==',
        '27d1556d-ebbb-4b7d-929b-d5c5471f8066'
      ),
      (
        'cce4e60d-39a5-4050-8757-3f649f35d5af',
        'E+4Wl/fS9rFH6IHTUA==',
        'cDWTM7unT8GAPwV8K31aFA==',
        'lDnm',
        'xtE=',
        'NdeUmA==',
        '69f0c4a2-da73-4885-a1ea-a8fd81411a81'
      ),
      (
        'ae3b71fe-df30-4656-86df-e07af2f74996',
        'RR01nU6Fc9eJuVH7AQ==',
        'bEgymJCfUIfG5ymoc1SFeA==',
        'ZrG9',
        'Vn4=',
        'Yk/iuA==',
        'e8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8'
      )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `DELETE FROM Payment_methods WHERE Payment_method_id IN ('9d5ed243-afbc-42ca-8e0c-97ffc6e13357', 'cce4e60d-39a5-4050-8757-3f649f35d5af', 'ae3b71fe-df30-4656-86df-e07af2f74996')`
    );
  }
}

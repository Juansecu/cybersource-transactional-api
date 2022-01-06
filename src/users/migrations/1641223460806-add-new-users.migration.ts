import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewUsersMigration1641223460806 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO Users (User_id, First_name, Last_name, Email, Phone_number, Country, Administrative_area, Locality, Address_1, Postal_code, Password) VALUES
      (
        '27d1556d-ebbb-4b7d-929b-d5c5471f8066',
        'Murph',
        'Hershey',
        'murphsey@gmail.com',
        '8965432100',
        'US',
        'CA',
        'San Francisco',
        '1 Market St',
        '94105',
        '$2b$10$ibZnSKNuxG//5eZkFBKoUudx76QZkQOFrGeiAJqQvoI.HYejjCThS'
      ),
      (
        '69f0c4a2-da73-4885-a1ea-a8fd81411a81',
        'John',
        'Doe',
        'john.doe@gmail.com',
        '1254367890',
        'US',
        'CA',
        'San Francisco',
        '1 Market St',
        '94105',
        '$2b$10$ibZnSKNuxG//5eZkFBKoUudx76QZkQOFrGeiAJqQvoI.HYejjCThS'
      ),
      (
        'e8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
        'Jane',
        'Doe',
        'doe.jane@gmail.com',
        '1254637890',
        'US',
        'CA',
        'San Francisco',
        '1 Market St',
        '94105',
        '$2b$10$ibZnSKNuxG//5eZkFBKoUudx76QZkQOFrGeiAJqQvoI.HYejjCThS'
      )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `DELETE FROM Users WHERE User_id IN ('27d1556d-ebbb-4b7d-929b-d5c5471f8066', '69f0c4a2-da73-4885-a1ea-a8fd81411a81', 'e8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8')`
    );
  }
}

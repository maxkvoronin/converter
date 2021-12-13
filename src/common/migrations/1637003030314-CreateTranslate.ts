import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTranslate1637003030314 implements MigrationInterface {
    name = 'CreateTranslate1637003030314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`translates\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`rus\` varchar(255) NOT NULL DEFAULT '', \`eng\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`translates\``);
    }

}

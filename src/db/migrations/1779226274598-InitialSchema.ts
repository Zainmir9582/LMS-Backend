import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1779226274598 implements MigrationInterface {
    name = 'InitialSchema1779226274598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(35) NOT NULL, \`Last_name\` varchar(35) NULL, \`email\` varchar(30) NOT NULL, \`gender\` varchar(10) NOT NULL, \`Address\` varchar(100) NOT NULL, \`password\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fee\` (\`id\` varchar(36) NOT NULL, \`fee\` decimal(10,2) NOT NULL, \`receive_fee\` decimal(10,2) NOT NULL DEFAULT '0.00', \`remaining_fee\` decimal(10,2) NOT NULL DEFAULT '0.00', \`fee_status\` varchar(10) NOT NULL DEFAULT 'unpaid', \`paper_fund\` decimal(10,2) NOT NULL DEFAULT '0.00', \`receipt_no\` varchar(40) NULL, \`paid_at\` date NOT NULL, \`date\` date NOT NULL, \`month\` int NOT NULL DEFAULT '1', \`year\` int NOT NULL DEFAULT '2000', \`qrCode\` text NULL, \`slipPath\` varchar(255) NULL, \`studentId\` varchar(36) NULL, \`classId\` varchar(36) NULL, \`courceId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student\` (\`id\` varchar(36) NOT NULL, \`student_id\` varchar(255) NOT NULL, \`name\` varchar(35) NOT NULL, \`f_name\` varchar(35) NULL, \`gender\` varchar(10) NOT NULL, \`Address\` varchar(100) NOT NULL, \`phone\` varchar(15) NULL, \`fee\` decimal(10,2) NOT NULL DEFAULT '0.00', \`dateOfBirth\` date NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`classId\` varchar(36) NULL, \`courceId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`datesheet_item\` (\`id\` varchar(36) NOT NULL, \`date\` date NOT NULL, \`syllabus\` text NULL, \`datesheetId\` varchar(36) NULL, \`subjectId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`datesheet\` (\`id\` varchar(36) NOT NULL, \`test_name\` text NOT NULL, \`classId\` varchar(36) NULL, \`courceId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`class\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(35) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cource\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(35) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teacher\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(35) NOT NULL, \`father_name\` varchar(35) NULL, \`qualification\` varchar(100) NULL, \`experience\` varchar(50) NULL, \`phone\` varchar(15) NULL, \`email\` varchar(30) NOT NULL, \`gender\` varchar(10) NOT NULL, \`Address\` varchar(100) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subject\` (\`id\` varchar(36) NOT NULL, \`subject_name\` varchar(100) NOT NULL, \`classId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`result\` (\`id\` varchar(36) NOT NULL, \`examName\` varchar(100) NOT NULL, \`obtainedMarks\` decimal(10,2) NOT NULL, \`totalMarks\` decimal(10,2) NOT NULL, \`percentage\` decimal(5,2) NOT NULL, \`grade\` varchar(10) NOT NULL, \`studentId\` varchar(36) NULL, \`classId\` varchar(36) NULL, \`courceId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`grading_criteria\` (\`id\` varchar(36) NOT NULL, \`grade\` varchar(10) NOT NULL, \`minPercentage\` decimal(5,2) NOT NULL, \`maxPercentage\` decimal(5,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`datesheet_subjects_subject\` (\`datesheetId\` varchar(36) NOT NULL, \`subjectId\` varchar(36) NOT NULL, INDEX \`IDX_09ba5853892f1ae98c31bf0dd4\` (\`datesheetId\`), INDEX \`IDX_2cdae823e07ab848b4427d8c1d\` (\`subjectId\`), PRIMARY KEY (\`datesheetId\`, \`subjectId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`class_cources_cource\` (\`classId\` varchar(36) NOT NULL, \`courceId\` varchar(36) NOT NULL, INDEX \`IDX_346593277774922c904b06087d\` (\`classId\`), INDEX \`IDX_831f20b47864d14931f0edaaef\` (\`courceId\`), PRIMARY KEY (\`classId\`, \`courceId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teacher_subjects\` (\`teacherId\` varchar(36) NOT NULL, \`subjectId\` varchar(36) NOT NULL, INDEX \`IDX_2013034e3c170743cbd5fda6de\` (\`teacherId\`), INDEX \`IDX_8b5bb4420cea1e9e5a988ec3e1\` (\`subjectId\`), PRIMARY KEY (\`teacherId\`, \`subjectId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subject_cources_cource\` (\`subjectId\` varchar(36) NOT NULL, \`courceId\` varchar(36) NOT NULL, INDEX \`IDX_e0712905e63d647db6270f26bd\` (\`subjectId\`), INDEX \`IDX_0fb96f07970d55b69f0c3262a1\` (\`courceId\`), PRIMARY KEY (\`subjectId\`, \`courceId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`fee\` ADD CONSTRAINT \`FK_38e5a5f9d352b462cd38da82df8\` FOREIGN KEY (\`studentId\`) REFERENCES \`student\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`fee\` ADD CONSTRAINT \`FK_736f783d6ac6eb1f6a38a059dca\` FOREIGN KEY (\`classId\`) REFERENCES \`class\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`fee\` ADD CONSTRAINT \`FK_7b75210579af0d71656a5cbeda5\` FOREIGN KEY (\`courceId\`) REFERENCES \`cource\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_bd5c8f2ef67394162384a484ba1\` FOREIGN KEY (\`classId\`) REFERENCES \`class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_721f45382744669cd8e10f88e69\` FOREIGN KEY (\`courceId\`) REFERENCES \`cource\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`datesheet_item\` ADD CONSTRAINT \`FK_95b35a2b959c21b6327b0cbe13f\` FOREIGN KEY (\`datesheetId\`) REFERENCES \`datesheet\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`datesheet_item\` ADD CONSTRAINT \`FK_467dc106be0fd8833acc6460c93\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`datesheet\` ADD CONSTRAINT \`FK_28499548772b6b7a9122b2a2dda\` FOREIGN KEY (\`classId\`) REFERENCES \`class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`datesheet\` ADD CONSTRAINT \`FK_6dceadf15b0070025850f5a0e61\` FOREIGN KEY (\`courceId\`) REFERENCES \`cource\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subject\` ADD CONSTRAINT \`FK_bd8702647b256adaa5bb5321565\` FOREIGN KEY (\`classId\`) REFERENCES \`class\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`result\` ADD CONSTRAINT \`FK_4782e86a1f84152f65b2fdabf69\` FOREIGN KEY (\`studentId\`) REFERENCES \`student\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`result\` ADD CONSTRAINT \`FK_8e3df14788789eba2c907e84805\` FOREIGN KEY (\`classId\`) REFERENCES \`class\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`result\` ADD CONSTRAINT \`FK_1b46b7d3e0ae92f2830ba09b820\` FOREIGN KEY (\`courceId\`) REFERENCES \`cource\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`datesheet_subjects_subject\` ADD CONSTRAINT \`FK_09ba5853892f1ae98c31bf0dd4a\` FOREIGN KEY (\`datesheetId\`) REFERENCES \`datesheet\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`datesheet_subjects_subject\` ADD CONSTRAINT \`FK_2cdae823e07ab848b4427d8c1d7\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`class_cources_cource\` ADD CONSTRAINT \`FK_346593277774922c904b06087d5\` FOREIGN KEY (\`classId\`) REFERENCES \`class\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`class_cources_cource\` ADD CONSTRAINT \`FK_831f20b47864d14931f0edaaef2\` FOREIGN KEY (\`courceId\`) REFERENCES \`cource\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teacher_subjects\` ADD CONSTRAINT \`FK_2013034e3c170743cbd5fda6de9\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teacher\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`teacher_subjects\` ADD CONSTRAINT \`FK_8b5bb4420cea1e9e5a988ec3e11\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subject_cources_cource\` ADD CONSTRAINT \`FK_e0712905e63d647db6270f26bd9\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`subject_cources_cource\` ADD CONSTRAINT \`FK_0fb96f07970d55b69f0c3262a1c\` FOREIGN KEY (\`courceId\`) REFERENCES \`cource\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subject_cources_cource\` DROP FOREIGN KEY \`FK_0fb96f07970d55b69f0c3262a1c\``);
        await queryRunner.query(`ALTER TABLE \`subject_cources_cource\` DROP FOREIGN KEY \`FK_e0712905e63d647db6270f26bd9\``);
        await queryRunner.query(`ALTER TABLE \`teacher_subjects\` DROP FOREIGN KEY \`FK_8b5bb4420cea1e9e5a988ec3e11\``);
        await queryRunner.query(`ALTER TABLE \`teacher_subjects\` DROP FOREIGN KEY \`FK_2013034e3c170743cbd5fda6de9\``);
        await queryRunner.query(`ALTER TABLE \`class_cources_cource\` DROP FOREIGN KEY \`FK_831f20b47864d14931f0edaaef2\``);
        await queryRunner.query(`ALTER TABLE \`class_cources_cource\` DROP FOREIGN KEY \`FK_346593277774922c904b06087d5\``);
        await queryRunner.query(`ALTER TABLE \`datesheet_subjects_subject\` DROP FOREIGN KEY \`FK_2cdae823e07ab848b4427d8c1d7\``);
        await queryRunner.query(`ALTER TABLE \`datesheet_subjects_subject\` DROP FOREIGN KEY \`FK_09ba5853892f1ae98c31bf0dd4a\``);
        await queryRunner.query(`ALTER TABLE \`result\` DROP FOREIGN KEY \`FK_1b46b7d3e0ae92f2830ba09b820\``);
        await queryRunner.query(`ALTER TABLE \`result\` DROP FOREIGN KEY \`FK_8e3df14788789eba2c907e84805\``);
        await queryRunner.query(`ALTER TABLE \`result\` DROP FOREIGN KEY \`FK_4782e86a1f84152f65b2fdabf69\``);
        await queryRunner.query(`ALTER TABLE \`subject\` DROP FOREIGN KEY \`FK_bd8702647b256adaa5bb5321565\``);
        await queryRunner.query(`ALTER TABLE \`datesheet\` DROP FOREIGN KEY \`FK_6dceadf15b0070025850f5a0e61\``);
        await queryRunner.query(`ALTER TABLE \`datesheet\` DROP FOREIGN KEY \`FK_28499548772b6b7a9122b2a2dda\``);
        await queryRunner.query(`ALTER TABLE \`datesheet_item\` DROP FOREIGN KEY \`FK_467dc106be0fd8833acc6460c93\``);
        await queryRunner.query(`ALTER TABLE \`datesheet_item\` DROP FOREIGN KEY \`FK_95b35a2b959c21b6327b0cbe13f\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_721f45382744669cd8e10f88e69\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_bd5c8f2ef67394162384a484ba1\``);
        await queryRunner.query(`ALTER TABLE \`fee\` DROP FOREIGN KEY \`FK_7b75210579af0d71656a5cbeda5\``);
        await queryRunner.query(`ALTER TABLE \`fee\` DROP FOREIGN KEY \`FK_736f783d6ac6eb1f6a38a059dca\``);
        await queryRunner.query(`ALTER TABLE \`fee\` DROP FOREIGN KEY \`FK_38e5a5f9d352b462cd38da82df8\``);
        await queryRunner.query(`DROP INDEX \`IDX_0fb96f07970d55b69f0c3262a1\` ON \`subject_cources_cource\``);
        await queryRunner.query(`DROP INDEX \`IDX_e0712905e63d647db6270f26bd\` ON \`subject_cources_cource\``);
        await queryRunner.query(`DROP TABLE \`subject_cources_cource\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b5bb4420cea1e9e5a988ec3e1\` ON \`teacher_subjects\``);
        await queryRunner.query(`DROP INDEX \`IDX_2013034e3c170743cbd5fda6de\` ON \`teacher_subjects\``);
        await queryRunner.query(`DROP TABLE \`teacher_subjects\``);
        await queryRunner.query(`DROP INDEX \`IDX_831f20b47864d14931f0edaaef\` ON \`class_cources_cource\``);
        await queryRunner.query(`DROP INDEX \`IDX_346593277774922c904b06087d\` ON \`class_cources_cource\``);
        await queryRunner.query(`DROP TABLE \`class_cources_cource\``);
        await queryRunner.query(`DROP INDEX \`IDX_2cdae823e07ab848b4427d8c1d\` ON \`datesheet_subjects_subject\``);
        await queryRunner.query(`DROP INDEX \`IDX_09ba5853892f1ae98c31bf0dd4\` ON \`datesheet_subjects_subject\``);
        await queryRunner.query(`DROP TABLE \`datesheet_subjects_subject\``);
        await queryRunner.query(`DROP TABLE \`grading_criteria\``);
        await queryRunner.query(`DROP TABLE \`result\``);
        await queryRunner.query(`DROP TABLE \`subject\``);
        await queryRunner.query(`DROP TABLE \`teacher\``);
        await queryRunner.query(`DROP TABLE \`cource\``);
        await queryRunner.query(`DROP TABLE \`class\``);
        await queryRunner.query(`DROP TABLE \`datesheet\``);
        await queryRunner.query(`DROP TABLE \`datesheet_item\``);
        await queryRunner.query(`DROP TABLE \`student\``);
        await queryRunner.query(`DROP TABLE \`fee\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}

import { Class } from '../entities/class.entity';
import { Cource } from '../entities/cource.entity';
import { User } from '../entities/user.entity'; // Import the User entity
import { Subject } from '../entities/subject.entity';
import { Datesheet } from '../entities/datesheet.entity';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

export default class DBSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const rep_class = dataSource.getRepository(Class);
    const rep_cource = dataSource.getRepository(Cource);
    const rep_user = dataSource.getRepository(User); // Repository for User entity
    const rep_subject = dataSource.getRepository(Subject);
    const rep_datesheet = dataSource.getRepository(Datesheet);

    // Clear existing data in correct order (junction tables and child tables first)
    await dataSource.query('DELETE FROM datesheet_subjects_subject');
    await dataSource.query('DELETE FROM subject_cources_cource');
    await dataSource.query('DELETE FROM class_cources_cource');
    await rep_datesheet.createQueryBuilder().delete().from(Datesheet).execute();
    await rep_subject.createQueryBuilder().delete().from(Subject).execute();
    await rep_user.createQueryBuilder().delete().from(User).execute(); // Clear User table
    await rep_cource.createQueryBuilder().delete().from(Cource).execute();
    await rep_class.createQueryBuilder().delete().from(Class).execute();

    // Seed Classes
    const classData = [
      { name: '1' },
      { name: '2' },
      { name: '3' },
      { name: '4' },
      { name: '5' },
      { name: '6' },
      { name: '7' },
      { name: '8' },
      { name: 'Pre-9' },
      { name: '9' },
      { name: '10' },
      { name: '11' },
      { name: '12' },
      { name: 'B.A' },
      { name: 'M.A' },
    ];

    const classes = await rep_class.save(rep_class.create(classData));

    // Seed Courses
    const courceData = [
      { name: 'Computer Science' },
      { name: 'Computer Science in Arts' },
      { name: 'Arts' },
      { name: 'Biological Science' },
      { name: 'I.C.S(Phy)' },
      { name: 'I.C.S(Eco)' },
      { name: 'I.C.S(Stat)' },
      { name: 'Fsc(Med)' },
      { name: 'Fsc(Eng)' },
      { name: 'I.com' },
      { name: 'F.A' },
      { name: 'B.com' },
    ];

    const cources = await rep_cource.save(rep_cource.create(courceData));

    // Assign Courses to Classes
    const pre9To10Classes = classes.filter(
      (cls) => ['Pre-9', '9', '10'].includes(cls.name),
    );
    const allCources = cources.filter(
      (cource) =>
        ['Computer Science', 'Computer Science in Arts', 'Arts', 'Biological Science'].includes(
          cource.name,
        ),
    );

    pre9To10Classes.forEach((cls) => {
      cls.cources = allCources;
    });
    await rep_class.save(pre9To10Classes);

    const elevenAndTwelveClasses = classes.filter((cls) =>
      ['11', '12'].includes(cls.name),
    );
    elevenAndTwelveClasses.forEach((cls) => {
      cls.cources = cources;
    });
    await rep_class.save(elevenAndTwelveClasses);

    // Seed Users
    const userData = [
      {
        name: 'zain',
        Last_name: 'mir',
        email: 'zainmir9582@gmail.com',
        password: 'strongpassword222',
        gender: 'Male',
        Address: 'Sialkot',
        isActive: true,
      },
    ];

    await rep_user.save(rep_user.create(userData));
  }
}

// Executable block to run the seeder when this script is executed directly
import dataSource from '../data-source-sqlite-dev';

if (require.main === module) {
  (async () => {
    try {
      await dataSource.initialize();
      const seeder = new DBSeeder();
      // SeederFactoryManager is not used in your seeder, so we can pass an empty object
      await seeder.run(dataSource, {} as any);
      console.log('Seeding completed successfully.');
      await dataSource.destroy();
    } catch (error) {
      console.error('Seeding failed:', error);
      process.exit(1);
    }
  })();
}

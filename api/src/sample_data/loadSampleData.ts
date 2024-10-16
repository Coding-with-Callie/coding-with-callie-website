import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Workshop } from '../workshops/entities/workshop.entity';
import { Users } from '../users/entities/users.entity';
import { Review } from '../review/entities/review.entity';
import { Message } from '../message/entities/message.entity';
import { Speaker } from '../speakers/entities/speaker.entity';
import { UserStory } from '../userStories/entities/userStory.entity';
import { Project } from '../projects/entities/project.entity';
import { Feature } from '../features/entities/feature.entity';
import { Task } from '../tasks/entities/task.entity';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

async function hashPassword(password) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

async function loadSampleData() {
  /*Here we use NestFactory to create the application context which allows us
    access our entities and services without having to create a separate module
    .*/
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  /*Create a query runner which we can use to batch commands to the database
    and rollback changes in the case of an error.*/
  const queryRunner = dataSource.createQueryRunner();
  const usersRepository = queryRunner.manager.getRepository(Users);
  const workshopRepository = queryRunner.manager.getRepository(Workshop);
  const speakerRepository = queryRunner.manager.getRepository(Speaker);
  const reviewRepository = queryRunner.manager.getRepository(Review);
  const messageRepository = queryRunner.manager.getRepository(Message);
  const projectRepository = queryRunner.manager.getRepository(Project);
  const featureRepository = queryRunner.manager.getRepository(Feature);
  const userStoryRepository = queryRunner.manager.getRepository(UserStory);
  const taskRepository = queryRunner.manager.getRepository(Task);

  const hashedPassword = await hashPassword('samplePassword');

  await queryRunner.startTransaction();
  try {
    /*Create 2 of every sample entity. You can increase the limit on i if
        you need more.*/
    for (let i = 0; i < 2; i++) {
      const sampleUser = await usersRepository.save({
        name: `Sample Name ${i}`,
        //Allow multiple email addresses to be passed in as arguments
        email: process.argv[i + 2] ?? `SampleEmail${i}@example.com`,
        username: `sampleUserName${i}`,
        password: hashedPassword,
        role: i % 2 === 0 ? 'admin' : 'user',
        photo:
          'https://coding-with-callie.com/static/media/sloth.b29ac2f36bd49aeb8a17.png',
        review: [],
        projects: [],
      });
      const sampleWorkshop = await workshopRepository.save({
        name: `Sample Workshop ${i}`,
        description: `Sample workshop ${i} description.`,
        photo:
          'https://coding-with-callie.com/static/media/sloth.b29ac2f36bd49aeb8a17.png',
        details: [`Sample detail 1`, 'Sample detail 2'],
        objectives: [`Sample objective 1`, 'Sample objective 2'],
        techStack: [`Sample tech stack 1`, 'Sample tech stack 2'],
        price: 100,
        alumni: [],
      });
      const sampleSpeaker = await speakerRepository.save({
        name: `Sample Speaker ${i}`,
        date: new Date().toDateString(),
        time: '8PM EST',
        sessionText: [`Sample session text 1`, 'Sample session text 2'],
        bioText: [`Sample bio text 1`, 'Sample bio text 2'],
        websiteUrl: `http://`,
        photoUrl:
          'https://coding-with-callie.com/static/media/sloth.b29ac2f36bd49aeb8a17.png',
        sessionRecordingUrl: 'https://www.youtube.com/watch?v=bszcbg6xQNw',
      });
      const sampleReview = await reviewRepository.save({
        rating: i % 5.0,
        comments: `Sample review ${i}.`,
        displayName: `Sample Name ${i}`,
        user: sampleUser,
        createdAt: new Date(Date.now()),
      });
      const sampleMessage = await messageRepository.save({
        name: sampleUser.name,
        email: sampleUser.email,
        message: `Sample message ${i}.`,
      });
      //Add 2 projects to each user
      for (let j = 0; j < 2; j++) {
        const sampleProject = await projectRepository.save({
          user: sampleUser,
          name: `Sample Project ${j}`,
          description: `Sample project ${j} description.`,
          features: [],
        });
        //Add 2 features to each project
        for (let k = 0; k < 2; k++) {
          const sampleFeature = await featureRepository.save({
            project: sampleProject,
            name: `Sample Feature ${k}`,
            description: `Sample feature ${k} description.`,
            userStories: [],
          });
          //Add 2 user stories to each feature
          for (let l = 0; l < 2; l++) {
            const sampleUserStory = await userStoryRepository.save({
              feature: sampleFeature,
              name: `Sample User Story ${l}`,
              description: `Sample user story ${l} description.`,
              tasks: [],
            });
            //Add 2 tasks to each user story
            for (let m = 0; m < 2; m++) {
              const sampleTask = await taskRepository.save({
                userStory: sampleUserStory,
                name: `Sample Task ${m}`,
                status: 'To Do',
              });
              sampleUserStory.tasks = [...sampleUserStory.tasks, sampleTask];
            }
            await userStoryRepository.save(sampleUserStory);
            sampleFeature.userStories = [
              ...sampleFeature.userStories,
              sampleUserStory,
            ];
          }
          await featureRepository.save(sampleFeature);
          sampleProject.features = [...sampleProject.features, sampleFeature];
        }
        await projectRepository.save(sampleProject);
        sampleUser.projects = [...sampleUser.projects, sampleProject];
      }
      sampleUser.review = [...sampleUser.review, sampleReview];
      await usersRepository.save(sampleUser);
    }
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
    await app.close();
  }
  console.log('Sample data loaded successfully!');
}

loadSampleData();

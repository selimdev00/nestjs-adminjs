import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { TodosModule } from './todos/todos.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todos/entities/todo.entity.js';
import { UsersModule } from './users/users.module.js';

import * as AdminJSTypeorm from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import { User } from './users/entities/user.entity.js';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [Todo, User],
          },
          auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'adminjs-secret',
          },
          sessionOptions: {
            resave: false,
            saveUninitialized: false,
            secret: 'adminjs-secret',
          },
        }),
      }),
    ),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql',
      synchronize: true,
      entities: [Todo, User],
    }),
    TodosModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

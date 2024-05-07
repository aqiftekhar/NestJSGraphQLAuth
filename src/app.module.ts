import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserRoleModule } from './userRole/userRole.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      context: ({ req, connection }) =>
        connection ? { req: connection.context } : { req },
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          onConnect: () => {
            console.log('Connected');
          },
          onSubscribe: () => {
            console.log('Connected');
          },
        },
        'subscriptions-transport-ws': {
          path: '/graphql',
          onConnect: () => {
            console.log('Connected');
          },
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => {
        return {
          type: 'postgres',
          host: ConfigService.get('POSTGRES_HOST'),
          port: ConfigService.get('POSTGRES_PORT'),
          database: ConfigService.get('POSTGRES_DATABASE'),
          username: ConfigService.get('POSTGRES_USERNAME'),
          password: ConfigService.get('POSTGRES_PASSWORD'),
          schema: '',
          entities: ['src/**/DB/*.entity.{.ts,.js}'],
          migrations: ['src/migrations/*{.ts,.js}'],
          useUnifiedTopology: true,
          autoLoadEntities: true,
          synchronize: false,
          logging: false,
        };
      },
    }),
    UserModule,
    UserRoleModule,
  ],
  // controllers: [],
  // providers: [UserResolver],
})
export class AppModule {}

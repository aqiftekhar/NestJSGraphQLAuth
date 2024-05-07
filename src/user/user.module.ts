import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserRoles } from 'src/userRole/userRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRoles])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserRoleService } from './userRole.service';
import { UserRoleResolver } from './userRole.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoles } from './userRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoles])],
  providers: [UserRoleResolver, UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}

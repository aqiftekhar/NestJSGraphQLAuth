import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserRoleService } from './userRole.service';
import { UserRoles } from './userRole.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserRoles)
export class UserRoleResolver {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Mutation(() => UserRoles)
  @UseGuards(JwtAuthGuard)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.userRoleService.create(createRoleInput);
  }

  @Query(() => [UserRoles], { name: 'userRoles' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userRoleService.findAll();
  }

  @Query(() => UserRoles, { name: 'userRole' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('roleName') roleName: string) {
    return this.userRoleService.findOne(roleName);
  }

  @Mutation(() => UserRoles)
  @UseGuards(JwtAuthGuard)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.userRoleService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation(() => UserRoles)
  @UseGuards(JwtAuthGuard)
  removeRole(@Args('id') id: string) {
    return this.userRoleService.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { UserRoles } from './userRole.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRoles)
    private userRolesRepository: Repository<UserRoles>,
  ) {}
  async create(createRoleInput: CreateRoleInput) {
    return await this.userRolesRepository.save(createRoleInput);
  }

  async findAll() {
    return await this.userRolesRepository.find();
  }

  async findOne(roleName: string) {
    return await this.userRolesRepository.findOneBy({ roleName: roleName });
  }

  async update(id: string, updateRoleInput: UpdateRoleInput) {
    return await this.userRolesRepository.update({ id: id }, updateRoleInput);
  }

  async remove(id: string) {
    const userRole = await this.userRolesRepository.findOneBy({ id: id });
    if (!userRole) {
      throw new Error(`User role with ID ${id} not found`);
    }
    await this.userRolesRepository.remove(userRole);
  }
}

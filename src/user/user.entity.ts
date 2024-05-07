import { ObjectType, Field } from '@nestjs/graphql';
import { UserRoles } from 'src/userRole/userRole.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  firstName: string;

  @Column()
  @Field(() => String)
  roleId: string; // <-- Added userTypeId column

  @OneToOne(() => UserRoles)
  @JoinColumn({ name: 'roleId' }) // <-- Joining with userTypeId column
  userRole: UserRoles;
}

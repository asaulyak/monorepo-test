import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from '../typeorm';

@Entity({schema: 'public'})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({type: 'varchar'})
  public username: string;
}

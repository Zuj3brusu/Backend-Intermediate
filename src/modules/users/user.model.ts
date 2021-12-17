import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {

  @Column
  Name: string;

  @Column
  Email: string;
}
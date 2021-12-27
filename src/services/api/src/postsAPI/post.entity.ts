import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Post extends Model<Post> {

    @Column
    postContent: string;

    @Column
    creatorEmail: string;

}
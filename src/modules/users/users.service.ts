import { Injectable, Inject } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;



@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async create(userDto: UserDto): Promise<User> {
    const user = new User();
    let dataSaved:any;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    const hash = await bcrypt.hash(userDto.password, saltOrRounds);
    user.password = hash

     return user.save().then(data => {
      dataSaved=data
      return dataSaved.dataValues;
    })
    .catch(error => {
        console.log(error)
    });;
     
  }
}
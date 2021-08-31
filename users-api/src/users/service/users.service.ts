import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument } from '../schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async update(id, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id) {
    return await this.userModel.findByIdAndRemove(id);
  }
  async existsByField(value, fieldName: string, id?: string) {
    // edit mode
    if (id) {
      return await this.userModel.exists({
        [fieldName]: value,
        _id: { $ne: id },
      });
    }
    return await this.userModel.exists({ [fieldName]: value });
  }
}

import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../service/users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(value: any, args: ValidationArguments) {
    const exist = await this.usersService.existsByField(
      value,
      args.property,
      args.object['_id'],
    );
    return !exist;
  }
  public defaultMessage(args: ValidationArguments): string {
    return `${args.property} already exists in the DB`;
  }
}
// Decorator
export function IsUnique(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueConstraint,
    });
  };
}

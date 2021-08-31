import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstNames: string;
  @Prop()
  lastNames: string;
  @Prop({ unique: true })
  ci: number;
  @Prop({ unique: true })
  email: string;
  @Prop()
  phoneNumber: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

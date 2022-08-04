import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import mongoose, { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Static extends Document {
  @Prop({
    required: true,
    default: '',
  })
  @IsString()
  mapName: String;

  @Prop({
    required: true,
    default: '',
  })
  @IsString()
  regionName: String;

  @Prop({
    required: true,
    default: 0,
  })
  @IsNumber()
  count: number;

  @Prop({
    _id: false,
    required: true,
    type: {
      count: Number,
      yes: Number,
      no: Number,
      so: Number,
      age: {
        '10대': Number,
        '20대': Number,
        '30대': Number,
        '40대': Number,
        '50대': Number,
        '60대이상': Number,
      },
    },
    default: {
      count: 0,
      yes: 0,
      no: 0,
      so: 0,
      age: {
        '10대': 0,
        '20대': 0,
        '30대': 0,
        '40대': 0,
        '50대': 0,
        '60대이상': 0,
      },
    },
  })
  male: {
    count: number;
    yes: number;
    no: number;
    so: number;
    age: {
      '10대': number;
      '20대': number;
      '30대': number;
      '40대': number;
      '50대': number;
      '60대이상': number;
    };
  };

  @Prop({
    _id: false,
    required: true,
    type: {
      count: Number,
      yes: Number,
      no: Number,
      so: Number,
      age: {
        '10대': Number,
        '20대': Number,
        '30대': Number,
        '40대': Number,
        '50대': Number,
        '60대이상': Number,
      },
    },
    default: {
      count: 0,
      yes: 0,
      no: 0,
      so: 0,
      age: {
        '10대': 0,
        '20대': 0,
        '30대': 0,
        '40대': 0,
        '50대': 0,
        '60대이상': 0,
      },
    },
  })
  female: {
    count: number;
    yes: number;
    no: number;
    so: number;
    age: {
      '10대': number;
      '20대': number;
      '30대': number;
      '40대': number;
      '50대': number;
      '60대이상': number;
    };
  };
}

export const static_Schema = SchemaFactory.createForClass(Static);

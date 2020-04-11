import { Mongo } from 'meteor/mongo';

export interface Doctor {
  _id?: string;
  name: string;
  lastNameF: string;
  lastNameM: string;
  rut: string;
  specialty: string;
  createdAt: Date;
}

export const DoctorsCollection = new Mongo.Collection<Doctor>('doctors');

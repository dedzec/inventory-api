import { ISupplier } from '../interfaces/supplier.interface';

export class Supplier implements ISupplier {
  id?: number;
  name: string;
  contactInfo?: string;

  constructor(name: string, contactInfo?: string, id?: number) {
    this.name = name;
    this.contactInfo = contactInfo;
    this.id = id;
  }
}

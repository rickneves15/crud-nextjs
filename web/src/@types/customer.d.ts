export interface ICustomer {
  id?: number;
  name: string;
  identification_number: string;
  birthday: string;
  gender: string;
  created_at?: string;
  updated_at?: string;
  address: IAddress;
}

export interface IAddress {
  id?: number;
  customers_id?: number;
  street: string;
  city: string;
  state: string;
  created_at?: string;
  updated_at?: string;
}

export interface IFilter {
  name?: string;
  identification_number?: string;
  birthday?: string;
  gender?: string;
  page?: number;
}

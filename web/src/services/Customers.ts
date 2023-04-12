import { ICustomer, IFilter } from "@/@types/customer";
import api from "./api";

export async function getCustomers(filters: IFilter = {}) {
  const { data } = await api.get("/customers", { params: filters });
  return data;
}

export async function getCustomerById(id: number) {
  const { data } = await api.get(`customers/${id}`);
  return data;
}

export async function createCustomer(customerData: ICustomer) {
  const { data } = await api.post(`/customers`, customerData);
  return data;
}
export async function updateCustomer(id: number, customerData: ICustomer) {
  const { data } = await api.put(`/customers/${id}`, customerData);
  return data;
}

export async function deleteCustomer(id: number) {
  const { data } = await api.delete(`/customers/${id}`);
  return data;
}

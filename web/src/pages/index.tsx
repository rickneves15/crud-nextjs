import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import InputMask from "react-input-mask";

import { ICustomer } from "@/@types/customer";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "@/services/Customers";
import { Modal } from "@/components/Modal";

interface Props {
  response: any;
}

export default function Home({ response }: Props) {
  const { data, current_page, last_page, links, to, from, total } = response;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [customers, setCustomers] = useState<ICustomer[]>(data);
  const [customersId, setCustomersId] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(current_page);
  const [lastPage, setLastPage] = useState<number>(last_page);
  const [pagination, setPagination] = useState<any>(links);
  const [results, setResults] = useState<any>({
    to,
    from,
    total,
  });
  const [filters, setFilters] = useState<any>({
    name: "",
    identification_number: "",
    birthday: "",
    gender: "",
  });

  const changePage = async (page: number) => {
    const { data, current_page, last_page, links, to, from, total } =
      await getCustomers({
        ...filters,
        page,
      });
    setCustomers(data);
    setCurrentPage(current_page);
    setLastPage(last_page);
    setPagination(links);
    setResults({ to, from, total });
  };

  const search = async (e: any) => {
    e.preventDefault();
    const { data, current_page, last_page, links, to, from, total } =
      await getCustomers(filters);
    setCustomers(data);
    setCurrentPage(current_page);
    setLastPage(last_page);
    setPagination(links);
    setResults({ to, from, total });
  };

  const clear = async (e: any) => {
    setFilters({
      name: "",
      identification_number: "",
      birthday: "",
      gender: "",
    });
  };

  const toogle = () => {
    setIsModalOpen(!isModalOpen);

    isModalOpen
      ? document.body.classList.remove("overflow-hidden")
      : document.body.classList.add("overflow-hidden");
  };

  const handleDelete = async (id: number) => {
    const response = await deleteCustomer(id);
    const { data, current_page, last_page, links, to, from, total } =
      await getCustomers(filters);
    setCustomers(data);
    setCurrentPage(current_page);
    setLastPage(last_page);
    setPagination(links);
    setResults({ to, from, total });
  };

  const handleShowEdit = async (id: number) => {
    setCustomersId(id);
    toogle();
  };

  const handleEdit = async (id: number, customer: ICustomer) => {
    customer.birthday = customer.birthday.split("/").reverse().join("-");

    const response = await updateCustomer(id, customer);
    const { data, current_page, last_page, links, to, from, total } =
      await getCustomers(filters);
    setCustomers(data);
    setCurrentPage(current_page);
    setLastPage(last_page);
    setPagination(links);
    setResults({ to, from, total });
  };

  const handleCreate = async (customer: ICustomer) => {
    customer.birthday = customer.birthday.split("/").reverse().join("-");

    const response = await createCustomer(customer);
    const { data, current_page, last_page, links, to, from, total } =
      await getCustomers(filters);
    setCustomers(data);
    setCurrentPage(current_page);
    setLastPage(last_page);
    setPagination(links);
    setResults({ to, from, total });
  };

  return (
    <main className="flex gap-6 min-h-screen flex-col items-center p-24">
      <div className="w-full overflow-hidden bg-white sm:rounded-lg shadow p-4">
        <form>
          <h2 className="text-xl ...">Buscar Cliente</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-6">
            <div className="lg:col-span-2 md:col-start-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome
              </label>
              <div className="mt-2">
                <input
                  onChange={(e: any) =>
                    setFilters({ ...filters, name: e.target.value })
                  }
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <label
                htmlFor="identification_number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CPF
              </label>
              <div className="mt-2">
                <InputMask
                  mask="999.999.999-99"
                  onChange={(e: any) =>
                    setFilters({
                      ...filters,
                      identification_number: e.target.value,
                    })
                  }
                >
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      type="text"
                      name="identification_number"
                      id="identification_number"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  )}
                </InputMask>
              </div>
            </div>
            <div className="lg:col-span-1">
              <label
                htmlFor="birthday"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Data Nasc.
              </label>
              <div className="mt-2">
                <InputMask
                  mask="99/99/9999"
                  onChange={(e: any) =>
                    setFilters({ ...filters, birthday: e.target.value })
                  }
                >
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      type="text"
                      name="birthday"
                      id="birthday"
                      className="block w-full  rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  )}
                </InputMask>
              </div>
            </div>
            <div className="lg:col-span-1">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sexo
              </label>
              <div className="mt-2">
                <select
                  name="gender"
                  id="gender"
                  onChange={(e: any) =>
                    setFilters({ ...filters, gender: e.target.value })
                  }
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                >
                  <option value="" selected>
                    Selectione
                  </option>
                  <option value="m">Masculino</option>
                  <option value="f">Feminino</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-end pt-8 gap-3">
            <button
              onClick={(e) => search(e)}
              className="items-center px-4 py-2 text-sm font-semibold bg-gray-300 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-black hover:text-white rounded"
            >
              Buscar
            </button>
            <button
              onClick={clear}
              type="reset"
              className="items-center px-4 py-2 text-sm font-semibold bg-gray-300 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-black hover:text-white rounded"
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
      <div className="w-full overflow-hidden bg-white sm:rounded-lg shadow">
        <div className="flex items-center ">
          <h2 className="text-xl p-4">Lista de Cliente</h2>

          <button
            onClick={toogle}
            className="items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-black hover:text-white rounded"
          >
            Adicionar Novo Cliente
          </button>
        </div>
        <table className="table-auto w-full text-sm divide-y divide-gray-200">
          <thead>
            <tr className="border-t">
              <th className="text-left p-4">Cliente</th>
              <th className="text-left p-4">CPF</th>
              <th className="text-left p-4">Data Nasc.</th>
              <th className="text-left p-4">Estado</th>
              <th className="text-left p-4">Cidade</th>
              <th className="text-left p-4">Sexo</th>
              <th className="text-left p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr
                className="border-t cursor-pointer hover:bg-gray-50"
                key={index}
              >
                <td className="p-4">{customer.name}</td>
                <td className="p-4">
                  {customer.identification_number.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    "$1.$2.$3-$4"
                  )}
                </td>
                <td className="p-4">
                  {customer.birthday
                    .split("-")
                    .reverse()
                    .join("/")
                    .replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$2/$1/$3")}
                </td>
                <td className="p-4">{customer.address.state}</td>
                <td className="p-4">{customer.address.city}</td>
                <td className="p-4 capitalize">{customer.gender}</td>
                <td className="p-4">
                  <div className="flex flex-col items-center justify-end gap-2">
                    <button
                      onClick={() => handleShowEdit(Number(customer.id))}
                      className="w-[70px] h-[40px] items-center px-4 py-2 text-sm font-semibold bg-blue-700 text-white ring-1 ring-inset ring-gray-300 hover:bg-blue-400 hover:text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(Number(customer.id))}
                      className="w-[70px] h-[40px] items-center px-4 py-2 text-sm font-semibold bg-red-700 text-white ring-1 ring-inset ring-gray-300 hover:bg-red-400 hover:text-white rounded"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Exibindo <span className="font-medium">{results.to}</span> de{" "}
                <span className="font-medium">{results.from}</span> de{" "}
                <span className="font-medium">{results.total}</span> resultados
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  disabled={currentPage === 1}
                  onClick={(e) => changePage(1)}
                  className={clsx(
                    "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
                    {
                      "cursor-not-allowed opacity-50 disabled:hover:opacity-100 disabled:text-gray-500 ":
                        currentPage === 1,
                    }
                  )}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {pagination.slice(1, -1).map((link: any, index: number) => (
                  <button
                    key={index}
                    disabled={Number(link.label) === currentPage}
                    onClick={(e) => changePage(Number(link.label))}
                    className={clsx(
                      "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-black hover:text-white focus:z-20 focus:outline-offset-0",
                      {
                        "bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black text-white":
                          link.active,
                      }
                    )}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  disabled={currentPage === lastPage}
                  onClick={(e) => changePage(Number(lastPage))}
                  className={clsx(
                    "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
                    {
                      "cursor-not-allowed opacity-50 disabled:hover:opacity-100 disabled:text-gray-500 ":
                        currentPage === lastPage,
                    }
                  )}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        toogle={toogle}
        customersId={customersId}
        setCustomersId={setCustomersId}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
      />
    </main>
  );
}

export async function getStaticProps() {
  const response = await getCustomers();

  return {
    props: {
      response,
    },
  };
}

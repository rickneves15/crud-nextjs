import { useEffect, useState } from "react";
import clsx from "clsx";
import InputMask from "react-input-mask";

import { ICustomer } from "@/@types/customer";
import { getCustomerById } from "@/services/Customers";

interface ModalProps {
  isModalOpen: boolean;
  toogle: () => void;
  customersId?: any;
  setCustomersId?: any;
  handleCreate?: any;
  handleEdit?: any;
}

export function Modal({
  isModalOpen,
  toogle,
  customersId,
  setCustomersId,
  handleCreate,
  handleEdit,
}: ModalProps) {
  const [customer, setCustomer] = useState<ICustomer>({
    name: "",
    identification_number: "",
    birthday: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
    },
  });

  const modalClose = (e: any) => {
    e.preventDefault();
    setCustomer({
      name: "",
      identification_number: "",
      birthday: "",
      gender: "",
      address: {
        street: "",
        city: "",
        state: "",
      },
    });
    setCustomersId(null);
    toogle();
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    const data = {
      name: customer.name,
      identification_number: customer.identification_number,
      birthday: customer.birthday,
      gender: customer.gender,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        state: customer.address.state,
      },
    };
    if (customersId) {
      handleEdit(customersId, data);
    } else {
      handleCreate(data);
    }
    modalClose(e);
  };

  useEffect(() => {
    async function getCustomer() {
      if (customersId) {
        try {
          const response = await getCustomerById(customersId);
          response.birthday = response.birthday
            .split("-")
            .reverse()
            .join("/")
            .replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$2/$1/$3");
          setCustomer(response);
        } catch (error) {
          console.error(error);
        }
      }
    }

    getCustomer();
  }, [isModalOpen]);

  return (
    <div
      className={clsx("fixed inset-0 z-10 overflow-y-auto", {
        hidden: !isModalOpen,
      })}
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>

        <div className="z-20 w-full max-h-[90%] max-w-3xl my-8 p-6 bg-white rounded-lg">
          <form>
            <h2 className="text-lg font-medium mb-4">Título do modal</h2>

            <div className="flex flex-col">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nome
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e: any) =>
                      setCustomer({ ...customer, name: e.target.value })
                    }
                    type="text"
                    name="name"
                    id="name"
                    value={customer.name}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="identification_number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  CPF
                </label>
                <div className="mt-2">
                  <InputMask
                    mask="999.999.999-99"
                    value={customer.identification_number}
                    onChange={(e: any) =>
                      setCustomer({
                        ...customer,
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

              <div className="w-full">
                <label
                  htmlFor="birthday"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Data Nasc.
                </label>
                <div className="mt-2">
                  <InputMask
                    mask="99/99/9999"
                    value={customer.birthday}
                    onChange={(e: any) =>
                      setCustomer({ ...customer, birthday: e.target.value })
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

              <div className="w-full">
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
                      setCustomer({ ...customer, gender: e.target.value })
                    }
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  >
                    <option value="" selected={customer.gender == ""}>
                      Selectione
                    </option>
                    <option value="m" selected={customer.gender == "m"}>
                      Masculino
                    </option>
                    <option value="f" selected={customer.gender == "f"}>
                      Feminino
                    </option>
                  </select>
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rua
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e: any) =>
                      setCustomer({
                        ...customer,
                        address: {
                          ...customer.address,
                          street: e.target.value,
                        },
                      })
                    }
                    type="text"
                    name="street"
                    id="street"
                    value={customer.address.street}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cidade
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e: any) =>
                      setCustomer({
                        ...customer,
                        address: { ...customer.address, city: e.target.value },
                      })
                    }
                    type="text"
                    name="city"
                    id="city"
                    value={customer.address.city}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Estado
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e: any) =>
                      setCustomer({
                        ...customer,
                        address: { ...customer.address, state: e.target.value },
                      })
                    }
                    type="text"
                    name="state"
                    id="state"
                    value={customer.address.state}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end mt-4 gap-2">
              <button
                onClick={(e) => handleSave(e)}
                className="items-center px-4 py-2 text-sm font-semibold bg-gray-300 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-black hover:text-white rounded"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={(e) => modalClose(e)}
                className="items-center px-4 py-2 text-sm font-semibold bg-gray-300 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-black hover:text-white rounded"
              >
                Fechar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

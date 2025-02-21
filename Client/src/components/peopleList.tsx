import { useEffect, useState } from "react";
import { DefaultPerson, Person } from "../types/people.types";
import SearchInput from "./searchInput";
import SearchOptions from "../types/searchOptions";
import Button from "@material-tailwind/react/components/Button";
import { ButtonGroup } from "@material-tailwind/react";
import SelectComponent from "./select";
import Modal from "./modal";
import { Field, Fieldset, Input, Label, Textarea } from "@headlessui/react";
import { labelClasses, inputClasses } from "../styles/addPerson";
import usePeople from "../hooks/people";
import Table from "./table";

export default function PeopleTable() {
  const {
    people,
    fetchPeople,
    addPerson,
    editPerson,
    deletePerson,
    searchPeople,
  } = usePeople();
  const [search, setSearch] = useState<string>("");
  const [field, setField] = useState<string>("name");
  const [current, setCurrent] = useState<Person>(DefaultPerson);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    fetchPeople();
  }, []);

  const formFields = (
    <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
      <Field>
        <Label className={labelClasses}>Nombre:</Label>
        <Input
          value={current.name}
          onChange={(e) => setCurrent({ ...current, name: e.target.value })}
          className={inputClasses}
        />
      </Field>
      <Field>
        <Label className={labelClasses}>Apellido paterno:</Label>
        <Input
          value={current.fatherLastName}
          onChange={(e) =>
            setCurrent({ ...current, fatherLastName: e.target.value })
          }
          className={inputClasses}
        />
      </Field>
      <Field>
        <Label className={labelClasses}>Apellido materno:</Label>
        <Input
          value={current.motherLastName}
          onChange={(e) =>
            setCurrent({ ...current, motherLastName: e.target.value })
          }
          className={inputClasses}
        />
      </Field>
      <Field>
        <Label className={labelClasses}>Direccion:</Label>
        <Textarea
          value={current.address}
          onChange={(e) => setCurrent({ ...current, address: e.target.value })}
          className={inputClasses}
        />
      </Field>
      <Field>
        <Label className={labelClasses}>Telefono:</Label>
        <Input
          value={current.phone}
          onChange={(e) => setCurrent({ ...current, phone: e.target.value })}
          className={inputClasses}
        />
      </Field>
    </Fieldset>
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto p-4">
      <div className="pb-2 bg-white dark:bg-gray-900 flex flex-row justify-between">
        <form
          onSubmit={() => searchPeople(search, field)}
          className="flex flex-row justify-items-start"
        >
          <SearchInput
            value={search}
            setValue={setSearch}
            placeholder="Buscar..."
          />
          <div className="pl-2">
            <SelectComponent
              options={SearchOptions}
              value={field}
              setValue={setField}
            />
          </div>
        </form>
        <div>
          <Button
            className="bg-green-500"
            onClick={() => {
              setCurrent(DefaultPerson);
              setAddModal(true);
            }}>
            Agregar
          </Button>
        </div>
      </div>
      <Table
        head={
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Apellido Paterno
            </th>
            <th scope="col" className="px-6 py-3">
              Apellido Materno
            </th>
            <th scope="col" className="px-6 py-3">
              Direccion
            </th>
            <th scope="col" className="px-6 py-3">
              Telefono
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        }
        body={people.map((person: Person) => (
          <tr
            key={person.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {person.name}
            </th>
            <td className="px-6 py-4">{person.fatherLastName}</td>
            <td className="px-6 py-4">{person.motherLastName}</td>
            <td className="px-6 py-4">{person.address}</td>
            <td className="px-6 py-4">{person.phone}</td>
            <td className="px-6 py-4">
              <ButtonGroup>
                <Button
                  className="bg-blue-600"
                  onClick={() => {
                    setCurrent(person);
                    setEditModal(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  className="bg-red-600"
                  onClick={() => {
                    setCurrent(person);
                    setDeleteModal(true);
                  }}
                >
                  Borrar
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      />

      <Modal
        open={addModal}
        setOpen={setAddModal}
        primaryBtnFn={() => {
          addPerson(current);
          setAddModal(false);
        }}
        btnColor={"blue"}
        title={"Agregar persona"}
        btnName={"Agregar"}
      >
        {formFields}
      </Modal>

      <Modal
        open={editModal}
        setOpen={setEditModal}
        primaryBtnFn={() => {
          editPerson(current);
          setEditModal(false);
        }}
        btnColor={"blue"}
        title={"Editar persona"}
        btnName={"Editar"}
      >
        {formFields}
      </Modal>

      <Modal
        open={deleteModal}
        setOpen={setDeleteModal}
        primaryBtnFn={() => {
          deletePerson(current);
          setDeleteModal(false);
        }}
        btnColor={"red"}
        title={"Eliminar persona"}
        btnName={"Eliminar"}
      >
        <p>Esta seguro de que desea eliminar a esta persona?</p>
      </Modal>
    </div>
  );
}

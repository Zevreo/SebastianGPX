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
    addPerson,
    editPerson,
    deletePerson,
    searchPeople,
  } = usePeople();
  const [search, setSearch] = useState<string>("");
  const [field, setField] = useState<string>("name");
  const [current, setCurrent] = useState<Person>(DefaultPerson);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false
  })

  useEffect(() => {
    searchPeople(search, field);
  }, [field])

  useEffect(() => {
    if (search === "")
        searchPeople(search, field);
  }, [search])

  const fields = [
    { label: "Nombre", field: "name" },
    { label: "Apellido Paterno", field: "fatherLastName" },
    { label: "Apellido Materno", field: "motherLastName" },
    { label: "Direccion", field: "address", type: "textarea" },
    { label: "Telefono", field: "phone" },
  ];

  const formFields = (
    <Fieldset>
      {fields.map(({ label, field, type = "input" }) => (
        <Field key={field}>
          <Label className={labelClasses}>{label}:</Label>
          {type === "textarea" ? (
            <Textarea
              value={current[field]}
              onChange={(e) =>
                setCurrent({ ...current, [field]: e.target.value })
              }
              className={inputClasses}
            />
          ) : (
            <Input
              value={current[field]}
              onChange={(e) =>
                setCurrent({ ...current, [field]: e.target.value })
              }
              className={inputClasses}
            />
          )}
        </Field>
      ))}
    </Fieldset>
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto p-4">
      <div className="pb-2 bg-white dark:bg-gray-900 flex flex-row justify-between">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchPeople(search, field);
          }}
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
              setModalState({ ...modalState, add: true});
            }}
          >
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
                    setModalState({ ...modalState, edit: true});
                  }}
                >
                  Editar
                </Button>
                <Button
                  className="bg-red-600"
                  onClick={() => {
                    setCurrent(person);
                    setModalState({ ...modalState, delete: true});
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
        open={modalState.add}
        setOpen={() => setModalState({ ...modalState, add: false})}
        primaryBtnFn={() => {
          addPerson(current);
          setModalState({ ...modalState, add: false});
        }}
        btnColor={"blue"}
        title={"Agregar persona"}
        btnName={"Agregar"}
      >
        {formFields}
      </Modal>

      <Modal
        open={modalState.edit}
        setOpen={() => setModalState({ ...modalState, edit: false})}
        primaryBtnFn={() => {
          editPerson(current);
          setModalState({ ...modalState, edit: false});
        }}
        btnColor={"blue"}
        title={"Editar persona"}
        btnName={"Editar"}
      >
        {formFields}
      </Modal>

      <Modal
        open={modalState.delete}
        setOpen={() => setModalState({ ...modalState, delete: false})}
        primaryBtnFn={() => {
          deletePerson(current);
          setModalState({ ...modalState, delete: false});
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

import { useEffect, useState } from "react";
import { usePerson } from "../services/people.service";
import { Person, PersonRequest } from "../types/people.types";

export default function usePeople() {
  const PeopleRequest = usePerson();
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    PeopleRequest.GetAll().then((res) => setPeople(res.data));
  }, [])

  function addPerson(current: PersonRequest) {
    PeopleRequest.Post(current).then((res) => {
      setPeople([...people, res.data])
    });
  }

  function editPerson(current: Person) {
    PeopleRequest.Patch(current.id, current).then((res) => {
      setPeople((prevPeople) =>
        prevPeople.map((person) =>
          person.id === res.data.id ? res.data : person
        )
      );
    });
  }

  function deletePerson(current: Person) {
    PeopleRequest.Delete(current.id).then(() => {
      setPeople(people.filter((item) => item.id != current.id))
    });
  }

  function searchPeople(search: string, field: string) {
    PeopleRequest.GetBySearch(search, field).then((res) => setPeople(res.data));
  }

  return { people, addPerson, editPerson, deletePerson, searchPeople }
}

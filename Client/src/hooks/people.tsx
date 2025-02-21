import { useState } from "react";
import { usePerson } from "../services/people.service";
import { Person, PersonRequest } from "../types/people.types";

export default function usePeople() {
  const PeopleRequest = usePerson();
  const [people, setPeople] = useState<Person[]>([]);

  function fetchPeople() {
    PeopleRequest.GetAll().then((res) => setPeople(res.data));
  }

  function addPerson(current: PersonRequest) {
    PeopleRequest.Post(current).then(() => {
      fetchPeople();
    });
  }

  function editPerson(current: Person) {
    PeopleRequest.Patch(current.id, current).then(() => {
      fetchPeople();
    });
  }

  function deletePerson(current: Person) {
    PeopleRequest.Delete(current.id).then(() => {
      fetchPeople();
    });
  }

  function searchPeople(search: string, field: string) {
    PeopleRequest.GetBySearch(search, field).then((res) => setPeople(res.data));
  }

  return { people, fetchPeople, addPerson, editPerson, deletePerson, searchPeople }
}

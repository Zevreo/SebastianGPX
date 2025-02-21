import { Method } from "../types/method.types";
import { PersonRequest } from "../types/people.types";
import { useRequest } from "./request.service";

export const usePerson = () => {
  const request = useRequest();

  function GetAll() {
    return request("/people", Method.get);
  }

  function GetBySearch(search: string, fields: string) {
    return request("/people?search="+search+"&fields="+fields, Method.get)
  }

  function GetById(id: string) {
    return request("/people/" + id, Method.get);
  }

  function Post(body: PersonRequest) {
    return request("/people", Method.post, body);
  }

  function Patch(id: string, body: PersonRequest) {
    return request("/people/" + id, Method.patch, body);
  }

  function Delete(id: string) {
    return request("/people/" + id, Method.delete);
  }

  return { GetAll, GetBySearch, GetById, Post, Patch, Delete };
};

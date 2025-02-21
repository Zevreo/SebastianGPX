export type PersonRequest = {
  name: string;
  fatherLastName: string;
  motherLastName: string;
  address: string;
  phone: string;
};

export type Person = PersonRequest & {
  id: string;
};

export const DefaultPerson: Person = {
  id: "",
  name: "",
  fatherLastName: "",
  motherLastName: "",
  address: "",
  phone: "",
};

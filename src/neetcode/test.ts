interface User {
  name: string;
  age: number;
  birthday: Date;
  createdBy: Date;
}

// interface AnotherUser extends User {
//   birthday: string;
// }

type SuperUser = Omit<User, "birthday"> & {
  birthday: string;
};

type borthdayTest = SuperUser["birthday"];

type ConvertDateToNumber<T> = T extends Date ? number : T;
type MapDateToString<T> = {
  [key in keyof T]: ConvertDateToNumber<T[key]>;
};
type UltraUser = MapDateToString<User>;

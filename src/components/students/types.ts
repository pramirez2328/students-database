export interface Student {
  _id: number;
  name: string;
  courses: string[];
  gpa: string;
  email: string;
  phone: string;
  address: string;
}

export interface AddStudent {
  name: string;
  courses: string[];
  gpa: string;
  email: string;
  phone: string;
  address: string;
}

export interface StudentInputs {
  _id: number;
  name: string;
  lastName: string;
  gpa: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  courses: string[];
}

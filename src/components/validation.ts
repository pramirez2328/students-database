import { StudentInputs } from './students/types';

const validation = (student: StudentInputs) => {
  if (student.name.length < 3) {
    return { inputType: 'name', message: 'Name must be at least 3 characters' };
  } else if (student.lastName.length < 3) {
    return { inputType: 'lastName', message: 'Last name must be at least 3 characters' };
  } else if (student.gpa === '') {
    return { inputType: 'gpa', message: 'GPA is required' };
  } else if (student.email.length < 13 || !student.email.includes('@') || !student.email.includes('.')) {
    console.log('student.email', student.email.length);
    return { inputType: 'email', message: 'Enter a valid email!' };
  } else if (student.address.length < 7) {
    return { inputType: 'address', message: 'Address must be at least 5 characters' };
  } else if (student.city.length < 3) {
    return { inputType: 'city', message: 'City must be at least 3 characters' };
  } else if (student.state === '') {
    return { inputType: 'state', message: 'State is required' };
  } else if (student.courses.length === 0) {
    return { inputType: 'courses', message: 'At least one course is required' };
  } else if (student.phone.length < 10) {
    return { inputType: 'phone', message: 'Phone number must be at least 10 characters' };
  } else {
    return { inputType: 'valid', message: 'valid' };
  }
};
export default validation;

import { AddStudent, Student } from '../src/components/students/types';

export const fetchStudents = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/students`);

    if (!response.ok || !response.headers.get('Content-Type')?.includes('application/json')) {
      const text = await response.text();
      console.log('Response text:', text);
      throw new Error('Failed to fetch students');
    } else {
      const totalStudents = await response.json();
      console.log('Total students:', totalStudents.length);
      console.info('%c---> Students were fetched from STUDENTS RECORDS!', 'color: green;');
      return totalStudents;
    }
  } catch (error) {
    console.error('Error: unable to fetch students--->', error);
    return error;
  }
};

export const deleteStudent = async (id: number) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/students/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      response.json().then((data) => alert(data.message));
      throw new Error('Failed to delete student');
    }

    console.info('%c---A student was deleted from STUDENTS RECORDS!', 'color: red;');
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const addStudent = async (student: AddStudent) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (response.status !== 201) {
      const data = await response.json();
      alert(data.message);
      throw new Error('Failed to add student');
    } else {
      console.log('%c---A student was added to STUDENTS RECORDS!', 'color: pink;');
      return response.json();
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateStudent = async (student: Student) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/students/${student._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      response.json().then((data) => alert(data.message));
      throw new Error('Failed to update student');
    }
    console.log('%c---A student was updated in STUDENTS RECORDS!', 'color: violet;');
    return response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

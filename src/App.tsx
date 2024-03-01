import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Students from './components/students/Students';
import './App.css';
import { fetchStudents, deleteStudent } from './http';
import { addStudent } from './http';

interface Student {
  _id: number;
  name: string;
  courses: string[];
  gpa: string;
  email: string;
  phone: string;
  address: string;
}

interface AddStudent {
  name: string;
  courses: string[];
  gpa: string;
  email: string;
  phone: string;
  address: string;
}

function App() {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [value, setValue] = useState('Choose...');

  useEffect(() => {
    setValue('Choose...');

    const getStudents = async () => {
      const existingStudents = await fetchStudents();
      //if existingStudents is an error, alert the user
      if (existingStudents instanceof Error) {
        // alert('Failed to fetch students');
        return;
      } else {
        setStudents(existingStudents);
        setAllStudents(existingStudents);
      }
    };
    getStudents();
  }, []);

  const handleDeleteStudent = (id: number) => {
    deleteStudent(id);
    setStudents(students.filter((student) => student._id !== id));
    setAllStudents(allStudents.filter((student) => student._id !== id));
  };

  const handleAddStudent = async (student: AddStudent) => {
    const newStudent = await addStudent(student);
    if (!newStudent) {
      alert('Failed to add student');
      return;
    } else {
      setStudents([...students, newStudent]);
      setAllStudents([...allStudents, newStudent]);
    }
  };

  const handleUpdateStudent = (student: Student) => {
    setStudents(students.map((s) => (s._id === student._id ? student : s)));
    setAllStudents(allStudents.map((s) => (s._id === student._id ? student : s)));
  };

  const handleSearch = (word: string) => {
    if (word.length === 0) {
      setStudents(allStudents);
      setValue('Choose...');
    } else if (word.length >= 3) {
      const matches: Student[] = [];

      for (const student of allStudents) {
        if (student?.name.toLowerCase().includes(word.toLowerCase())) {
          matches.push(student);
        } else if (student?.email.toLowerCase().includes(word.toLowerCase())) {
          matches.push(student);
        } else if (student?.phone.toLowerCase().includes(word.toLowerCase())) {
          matches.push(student);
        } else if (student?.address.toLowerCase().includes(word.toLowerCase())) {
          matches.push(student);
        } else if (student?.courses.join(' ').toLowerCase().includes(word.toLowerCase())) {
          matches.push(student);
        } else if (student?.gpa.toString().includes(word)) {
          matches.push(student);
        }
      }
      setStudents(matches);
    }
  };

  return (
    <div className='p-1 p-md-4'>
      <Nav handleSearch={handleSearch} />
      <p className='text-center mt-4 mb-0 title'>Boston University</p>
      <p className='text-center mb-4 mt-0 subtitle'>Students Records</p>
      <Students
        students={students || []}
        handleDelete={handleDeleteStudent}
        value={value}
        handleAddStudent={handleAddStudent}
        handleUpdateStudent={handleUpdateStudent}
      />
      {students.length === 0 && <p className='text-center mt-4'>No students found</p>}
    </div>
  );
}

export default App;

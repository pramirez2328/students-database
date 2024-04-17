import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Students from './components/students/Students';
import './App.css';
import { fetchStudents, deleteStudent } from './http';
import { addStudent } from './http';
import { Student, AddStudent } from '../src/components/students/types';
import PopUp from './components/students/PopUp';

function App() {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [newStudent, setNewStudent] = useState<Student | null>(null);
  const [action, setAction] = useState('' as string);
  const [value, setValue] = useState('Choose...');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setValue('Choose...');

    const getStudents = async () => {
      const existingStudents = await fetchStudents();
      if (existingStudents instanceof Error) {
        return;
      } else {
        setStudents(existingStudents as Student[]);
        setAllStudents(existingStudents as Student[]);
        setLoading(false);
      }
    };
    getStudents();
  }, []);

  //how to display the PopUp component when a student is added or updated but only for 3 seconds
  useEffect(() => {
    if (newStudent) {
      setTimeout(() => {
        setNewStudent(null);
      }, 3000);
    }
  }, [newStudent]);

  const handleDeleteStudent = async (id: number) => {
    const deletedStudent = await deleteStudent(id);
    setStudents(students.filter((student) => student._id !== id));
    setAllStudents(allStudents.filter((student) => student._id !== id));
    setNewStudent(deletedStudent as Student);
    setAction('deleted');
  };

  const handleAddStudent = async (student: AddStudent) => {
    const newStudent = await addStudent(student);

    if (!newStudent) {
      alert('Failed to add student');
      return;
    } else {
      setStudents([...students, newStudent]);
      setAllStudents([...allStudents, newStudent]);
      setNewStudent(newStudent);
      setAction('added');
    }
  };

  const handleUpdateStudent = (student: Student) => {
    setStudents(students.map((s) => (s._id === student._id ? student : s)));
    setAllStudents(allStudents.map((s) => (s._id === student._id ? student : s)));
    setNewStudent(student);
    setAction('updated');
  };

  const handleSearch = (word: string) => {
    setSearch(word);
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

  const handleOnClosePopUp = () => {
    setNewStudent(null);
  };

  const handleClearSearch = () => {
    setStudents(allStudents);
    setSearch('');
  };

  return (
    <div className='p-0'>
      <div className='top'>
        <Nav handleSearch={handleSearch} handleClear={handleClearSearch} searchValue={search} />
        <p className='text-center mt-4 mb-0 title'>Boston University</p>
        <p className='text-center mb-4 mt-0 subtitle'>Students Records</p>
      </div>

      {newStudent ? (
        <PopUp student={newStudent} action={action} onClose={handleOnClosePopUp} />
      ) : (
        <Students
          students={students || []}
          handleDelete={handleDeleteStudent}
          value={value}
          handleAddStudent={handleAddStudent}
          handleUpdateStudent={handleUpdateStudent}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;

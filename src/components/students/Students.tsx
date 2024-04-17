import { useState, useEffect } from 'react';
import Filter from './Filter';
import List from './List';
import AddNewStudent from './AddNewStudent';
import { courses } from '../../util';
import { Student, AddStudent } from './types';

function Students({
  students,
  value,
  handleDelete,
  handleAddStudent,
  handleUpdateStudent,
  loading,
}: {
  students: Student[];
  value: string;
  handleDelete: (id: number) => void;
  handleAddStudent: (student: AddStudent) => void;
  handleUpdateStudent: (student: Student) => void;
  loading: boolean;
}) {
  const [filterStudents, setStudents] = useState(students);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filterBy, setValue] = useState(value);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    if (windowWidth < 824) {
      setAlert(true);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    setStudents(students);
    setValue(value);
  }, [students, value]);

  const handleFilterBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    setValue(filter);
    if (filter === 'All Students' || filter === 'Choose...') {
      setStudents([...students]);
    } else if (filter === 'Name') {
      setStudents([...students].sort((a: Student, b: Student) => a.name.localeCompare(b.name)));
    } else if (filter === 'GPA') {
      setStudents([...students].sort((a: Student, b: Student) => +b.gpa - +a.gpa));
    } else if (courses.includes(filter)) {
      const filterByCourse: Student[] = students.filter((student: Student) => student.courses.includes(filter));
      setStudents(filterByCourse);
    }
  };

  const handleAlertOnClose = () => {
    setAlert(false);
  };

  let subtitle = '';
  if (filterBy === 'Choose...') {
    subtitle = '';
  } else if (filterBy === 'All Students') {
    subtitle = `There are ${students.length} students.`;
  } else if (filterBy === 'Name') {
    subtitle = 'Students sorted by name: A-Z.';
  } else if (filterBy === 'GPA') {
    subtitle = 'Students sorted by GPA: High to Low.';
  } else {
    subtitle = `There are ${filterStudents.length} students filtered by ${filterBy}.`;
  }

  return (
    <>
      <div className='d-flex flex-wrap col-12 justify-content-between px-4'>
        <div>
          <Filter handleFilter={handleFilterBy} courses={courses} value={filterBy} />
          <h6>{subtitle}</h6>
        </div>
        <div className='col-12 col-sm-6 col-md-2'>
          <AddNewStudent addStudent={handleAddStudent} />
        </div>
      </div>

      {alert && (
        <div className='alert alert-warning alert-dismissible fade show' role='alert'>
          rotate your device to view the full table or ...<strong>Scroll&#8594;</strong>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='alert'
            aria-label='Close'
            onClick={handleAlertOnClose}
          ></button>
        </div>
      )}
      <List
        students={filterStudents}
        handleDelete={handleDelete}
        handleUpdateStudent={handleUpdateStudent}
        loading={loading}
      />
    </>
  );
}

export default Students;

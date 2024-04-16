import StudentRecord from './StudentRecord';
import { Student } from './types';
import Loading from '../Loading';

function List({
  students,
  handleDelete,
  handleUpdateStudent,
  loading,
}: {
  students: Student[];
  handleDelete: (id: number) => void;
  handleUpdateStudent: (student: Student) => void;
  loading: boolean;
}) {
  if (loading) {
    return <Loading />;
  }
  return (
    <div id='table-desktop' className='table-responsive'>
      <table className='table table-striped '>
        <thead className='table-header'>
          <tr className='text-center'>
            <th className='text-header' scope='col'>
              ID
            </th>
            <th className='text-header' scope='col'>
              Name
            </th>
            <th className='text-header' scope='col'>
              Courses
            </th>
            <th className='text-header' scope='col'>
              GPA
            </th>
            <th className='text-header' scope='col'>
              Email
            </th>
            <th className='text-header' scope='col'>
              Phone
            </th>
            <th className='text-header' scope='col'>
              Address
            </th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {students.map((student: Student) => {
            return (
              <StudentRecord
                key={student?._id ? student._id : 0}
                student={student}
                handleDelete={handleDelete}
                handleUpdateStudent={handleUpdateStudent}
              />
            );
          })}
        </tbody>
      </table>
      {students.length === 0 && <p className='text-center mt-4'>No students found</p>}
    </div>
  );
}

export default List;

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import UpdateStudent from './UpdateStudent';
import { Student } from './types';

function StudentRecord({
  student,
  handleDelete,
  handleUpdateStudent,
}: {
  student: Student;
  handleDelete: (id: number) => void;
  handleUpdateStudent: (student: Student) => void;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <tr
      className='fields p-4'
      id='student-row'
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <th className='fields p-4' scope='row'>
        {student?._id && ('' + student?._id).slice(-7)}
      </th>
      <td className='fields p-4'>{student?.name}</td>
      <td className='fields p-4'>{student?.courses.join(', ')}</td>
      <td className='fields p-4'>{student?.gpa}</td>
      <td className='fields p-4'>
        <a href={`mailto:${student?.email}`}>{student?.email}</a>
      </td>
      <td className='fields p-4'>{student?.phone}</td>
      <td className='fields p-4'>{student?.address}</td>
      <td
        className='pt-3'
        style={{
          display: visible ? '' : 'none',
        }}
      >
        <div className='w-100' id='delete-button' onClick={() => handleDelete(student?._id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      </td>
      <td
        className='pt-3'
        style={{
          display: visible ? '' : 'none',
        }}
      >
        <UpdateStudent currentStudent={student} handleUpdateStudent={handleUpdateStudent} />
      </td>
    </tr>
  );
}

export default StudentRecord;

//how to use font awesome icons

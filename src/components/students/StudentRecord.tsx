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
    <>
      <tr id='student-row' onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        <th scope='row'>{student?._id && ('' + student?._id).slice(-7)}</th>
        <td>{student?.name}</td>
        <td>{student?.courses.join(', ')}</td>
        <td>{student?.gpa}</td>
        <td>
          <a href={student?.email}>{student?.email}</a>
        </td>
        <td>{student?.phone}</td>
        <td>{student?.address}</td>
        <td style={{ display: visible ? '' : 'none' }}>
          <div id='delete-button' onClick={() => handleDelete(student?._id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </td>
        <td style={{ display: visible ? '' : 'none' }}>
          <UpdateStudent currentStudent={student} handleUpdateStudent={handleUpdateStudent} />
        </td>
      </tr>
    </>
  );
}

export default StudentRecord;

//how to use font awesome icons

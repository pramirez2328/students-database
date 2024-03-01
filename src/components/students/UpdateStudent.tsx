import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { states, courses } from '../../util';
import { updateStudent } from '../../http';
import { Student, StudentInputs } from './types';

function UpdateStudent({
  currentStudent,
  handleUpdateStudent,
}: {
  currentStudent: Student;
  handleUpdateStudent: (student: Student) => void;
}) {
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState<StudentInputs>({
    ...currentStudent,
    courses: currentStudent?.courses,
    name: currentStudent?.name?.split(' ')[0],
    lastName: currentStudent?.name?.split(' ')[1],
    address: currentStudent?.address?.split(', ')[0],
    city: currentStudent?.address?.split(', ')[1],
    state: currentStudent?.address?.split(', ')[2],
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleUpdate = (studentObj: StudentInputs) => {
    if (studentObj.phone[0] === '1') {
      studentObj.phone = studentObj.phone.slice(1);
    }

    const newPhone = studentObj.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    const newStudent: Student = {
      _id: studentObj._id,
      name: `${studentObj?.name} ${studentObj?.lastName}`,
      courses: [...new Set(student.courses)] as string[],
      gpa: studentObj.gpa,
      email: studentObj.email,
      phone: newPhone,
      address: `${student.address}, ${student.city}, ${student.state}`,
    };

    updateStudent(newStudent);
    handleUpdateStudent(newStudent);

    setShow(false);
  };

  return (
    <>
      <Button className='w-100' id='update-button' variant='primary' onClick={handleShow}>
        update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Student Information:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='form-title'>
              <Form.Label htmlFor='inputName'>Name:</Form.Label>
              <Form.Control
                type='text'
                id='inputName'
                aria-describedby='studentName'
                value={student?.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
              />
              <Form.Text id='studentName' className='form-subtitles'>
                Your name must be at least 3 characters long.
              </Form.Text>
            </div>
            <div className='form-title'>
              <Form.Label htmlFor='inputLastName'>Last Name:</Form.Label>
              <Form.Control
                type='text'
                id='inputLastName'
                aria-describedby='studentLastName'
                value={student?.lastName}
                onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
              />
              <Form.Text id='studentLastName' className='form-subtitles'>
                Your last name must be at least 3 characters long.
              </Form.Text>
            </div>
            <div className='d-flex justify-content-between col-12'>
              <div className='form-title col-6 pe-1'>
                <Form.Label htmlFor='inputGPA'>GPA:</Form.Label>
                <Form.Control
                  type='number'
                  id='inputGPA'
                  aria-describedby='studentGPA'
                  min={2.0}
                  max={4.0}
                  step={0.1}
                  value={student?.gpa}
                  onChange={(e) => setStudent({ ...student, gpa: e.target.value })}
                />
                <Form.Text id='studentGPA' className='form-subtitles'>
                  Your GPA must be between 2.0 and 4.0.
                </Form.Text>
              </div>
              <div className='form-title col-6 ps-1'>
                <Form.Label htmlFor='inputCourses'>Courses</Form.Label>
                <Form.Control
                  as='select'
                  id='inputCourses'
                  aria-describedby='studentCourses'
                  value={student?.courses}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      courses: student.courses.includes(e.target.value)
                        ? student.courses.filter((course) => course !== e.target.value)
                        : [...student.courses, e.target.value],
                    })
                  }
                  multiple
                >
                  <option value=''>Select course...</option>
                  {courses?.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text
                  id='studentCourses'
                  className={`form-subtitles ${student?.courses?.length > 0 && 'added-course'}`}
                >
                  {student?.courses?.length > 0
                    ? `You have selected ${student?.courses?.length} course${
                        student.courses.length === 1 ? '. You Must have at least one!' : 's.'
                      }`
                    : 'You have to select your courses again.'}
                </Form.Text>
              </div>
            </div>
            <div className='form-title'>
              <Form.Label htmlFor='inputEmail'>Email:</Form.Label>
              <Form.Control
                type='email'
                id='inputEmail'
                aria-describedby='studentEmail'
                value={student?.email}
                onChange={(e) => setStudent({ ...student, email: e.target.value })}
              />
              <Form.Text id='studentEmail' className='form-subtitles'>
                Your email must be a valid email address.
              </Form.Text>
            </div>

            <div className='d-flex justify-content-between col-12'>
              <div className='form-title col-6 pe-1'>
                <Form.Label htmlFor='inputAddress'>Address:</Form.Label>
                <Form.Control
                  type='text'
                  id='inputAddress'
                  aria-describedby='studentAddress'
                  value={student?.address}
                  onChange={(e) => setStudent({ ...student, address: e.target.value })}
                />
                <Form.Text id='studentAddress' className='form-subtitles'>
                  It must be at least 5 characters long.
                </Form.Text>
              </div>
              <div className='form-title col-6 ps-1'>
                <Form.Label htmlFor='inputCity'>City:</Form.Label>
                <Form.Control
                  type='text'
                  id='inputCity'
                  aria-describedby='studentCity'
                  value={student?.city}
                  onChange={(e) => setStudent({ ...student, city: e.target.value })}
                />
                <Form.Text id='studentCity' className='form-subtitles'>
                  It must be at least 3 characters long.
                </Form.Text>
              </div>
            </div>
            <div className='d-flex justify-content-between col-12'>
              <div className='form-title col-6 pe-1'>
                <Form.Label htmlFor='inputPhone'>Phone:</Form.Label>
                <Form.Control
                  type='tel'
                  id='inputPhone'
                  aria-describedby='studentPhone'
                  value={student?.phone}
                  onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                />
                <Form.Text id='studentPhone' className='form-subtitles'>
                  valid format: 123-456-7890
                </Form.Text>
              </div>

              <div className='form-title col-6 ps-1'>
                <Form.Label htmlFor='inputStates'>State</Form.Label>
                <Form.Control
                  as='select'
                  id='inputStates'
                  aria-describedby='studentState'
                  onChange={(e) => setStudent({ ...student, state: e.target.value })}
                >
                  <option defaultValue={student?.state}>{student?.state}</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text id='studentState' className='form-subtitles'>
                  Add the state again.
                </Form.Text>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={() => handleUpdate(student)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateStudent;

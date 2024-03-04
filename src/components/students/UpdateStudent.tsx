import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { states, courses } from '../../util';
import { updateStudent } from '../../http';
import { Student, StudentInputs } from './types';
import validation from '../validation';

function UpdateStudent({
  currentStudent,
  handleUpdateStudent,
}: {
  currentStudent: Student;
  handleUpdateStudent: (student: Student) => void;
}) {
  const [validationMessage, setValidationMessage] = useState({ inputType: '', message: '' });
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
    const validationObj = validation(student as StudentInputs);
    if (validationObj.inputType !== 'valid') {
      setValidationMessage(validationObj);
    } else {
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
    }
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
              {validationMessage.inputType === 'name' && (
                <Form.Text id='studentName' className='form-subtitles text-danger'>
                  Your name must be at least 3 characters long.
                </Form.Text>
              )}
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
              {validationMessage.inputType === 'lastName' && (
                <Form.Text id='studentLastName' className='form-subtitles text-danger'>
                  Your last name must be at least 3 characters long.
                </Form.Text>
              )}
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
                {validationMessage.inputType === 'gpa' && (
                  <Form.Text id='studentGPA' className='form-subtitles text-danger'>
                    GPA is required and must be between 2.0 and 4.0.
                  </Form.Text>
                )}
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
                        ? student.courses.filter((course) => course !== e.target.value?.trim())
                        : [...student.courses, e.target.value?.trim()],
                    })
                  }
                  multiple
                >
                  <option disabled>Select course...</option>
                  {courses?.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text
                  id='studentCourses'
                  className={`form-subtitles ${student.courses.length !== 0 ? 'added-course' : 'text-danger'}`}
                >
                  {student.courses.length > 0
                    ? `You have selected ${student.courses.length} course${student.courses.length === 1 ? '.' : 's.'}`
                    : 'You must have at least one course!'}
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
              {validationMessage.inputType === 'email' && (
                <Form.Text id='studentEmail' className='form-subtitles text-danger'>
                  Email is required and must be a valid email.
                </Form.Text>
              )}
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
                {validationMessage.inputType === 'address' && (
                  <Form.Text id='studentAddress' className='form-subtitles text-danger'>
                    Address is required and must be at least 7 characters long.
                  </Form.Text>
                )}
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
                {validationMessage.inputType === 'city' && (
                  <Form.Text id='studentCity' className='form-subtitles text-danger'>
                    City is required and must be at least 3 characters long.
                  </Form.Text>
                )}
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
                {validationMessage.inputType === 'phone' && (
                  <Form.Text id='studentPhone' className='form-subtitles text-danger'>
                    Phone is required and must be at least 10 characters long.
                  </Form.Text>
                )}
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
                {validationMessage.inputType === 'state' && (
                  <Form.Text id='studentState' className='form-subtitles text-danger'>
                    State is required.
                  </Form.Text>
                )}
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

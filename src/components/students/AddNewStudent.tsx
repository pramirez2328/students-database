import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { states, courses } from '../../util';
import { AddStudent, StudentInputs } from './types';
import validation from '../validation';

function AddNewStudent({ addStudent }: { addStudent: (student: AddStudent) => void }) {
  const [validationMessage, setValidationMessage] = useState({ inputType: '', message: '' });
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState({
    name: '',
    lastName: '',
    gpa: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    courses: [] as string[],
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSaved = async () => {
    const validationObj = validation(student as StudentInputs);
    if (validationObj.inputType !== 'valid') {
      setValidationMessage(validationObj);
    } else {
      if (student.phone[0] === '1') {
        student.phone = student.phone.slice(1);
      }

      const newPhone = student.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      const newStudent: AddStudent = {
        name: `${student.name} ${student.lastName}`,
        courses: [...new Set(student.courses)],
        gpa: student.gpa,
        email: student.email,
        phone: newPhone,
        address: `${student.address}, ${student.city}, ${student.state}`,
      };

      addStudent(newStudent);

      setStudent({
        name: '',
        lastName: '',
        gpa: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        courses: [] as string[],
      });
      setValidationMessage({ inputType: '', message: '' });
      setShow(false);
    }
  };

  return (
    <>
      <Button className='w-100' variant='primary' onClick={handleShow}>
        Add Student
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student Information:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='form-title'>
              <Form.Label htmlFor='inputName'>Name:</Form.Label>
              <Form.Control
                type='text'
                id='inputName'
                aria-describedby='studentName'
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
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      courses:
                        e.target.value !== ''
                          ? student.courses.includes(e.target.value)
                            ? student.courses.filter((course) => course !== e.target.value)
                            : [...student.courses, e.target.value]
                          : [...student.courses],
                    })
                  }
                  multiple
                >
                  <option value=''>Select course...</option>
                  {courses.map((course, index) => (
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
                onChange={(e) => setStudent({ ...student, email: e.target.value })}
              />
              {validationMessage.inputType === 'email' && (
                <Form.Text id='studentEmail' className='form-subtitles text-danger'>
                  Enter a valid email!
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
                  onChange={(e) => setStudent({ ...student, address: e.target.value })}
                />
                {validationMessage.inputType === 'address' && (
                  <Form.Text id='studentAddress' className='form-subtitles text-danger'>
                    Address must be at least 7 characters long.
                  </Form.Text>
                )}
              </div>
              <div className='form-title col-6 ps-1'>
                <Form.Label htmlFor='inputCity'>City:</Form.Label>
                <Form.Control
                  type='text'
                  id='inputCity'
                  aria-describedby='studentCity'
                  onChange={(e) => setStudent({ ...student, city: e.target.value })}
                />
                {validationMessage.inputType === 'city' && (
                  <Form.Text id='studentCity' className='form-subtitles text-danger'>
                    City must be at least 3 characters long.
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
                  onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                />
                {validationMessage.inputType === 'phone' && (
                  <Form.Text id='studentPhone' className='form-subtitles text-danger'>
                    Phone number must be at least 10 characters long. (e.g. 123-456-7890)
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
                  <option value=''>Select state...</option>
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
          <Button variant='primary' onClick={handleSaved}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewStudent;

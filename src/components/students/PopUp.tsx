import { Student } from './types';

function PopUp({ student, action }: { student: Student; action: string }) {
  return (
    <div className={`alert alert-${action === 'added' || action === 'updated' ? 'success' : 'danger'}`} role='alert'>
      <h5>
        ID: {student?._id && ('' + student?._id).slice(-7)} was {action}!
      </h5>
      <h5>Name: {student.name}</h5>
    </div>
  );
}

export default PopUp;

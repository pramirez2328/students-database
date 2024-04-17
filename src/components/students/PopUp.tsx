import { Student } from './types';

function PopUp({ student, action, onClose }: { student: Student; action: string; onClose: () => void }) {
  return (
    <div className='overlay'>
      <div
        className={`alert alert-${
          action === 'added' || action === 'updated' ? 'success' : 'danger'
        } alert-dismissible fade show`}
        role='alert'
      >
        <h5>
          {student.name} was {action}!
        </h5>
        <h5>ID: {student?._id && ('' + student?._id).slice(-7)} </h5>
        <button
          type='button'
          className='btn-close'
          data-bs-dismiss='alert'
          aria-label='Close'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopUp;

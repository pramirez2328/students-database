function Loading() {
  return (
    <div className='d-flex align-items-center justify-content center text-primary col-8 col-sm-6 col-md-4 m-auto'>
      <strong className=''>Fetching existing students...</strong>
      <div className='spinner-border ms-auto' role='status' aria-hidden='true'></div>
    </div>
  );
}

export default Loading;

function Nav({
  handleSearch,
  handleClear,
  searchValue,
}: {
  handleSearch: (search: string) => void;
  handleClear: () => void;
  searchValue: string;
}) {
  return (
    <div className='mt-4'>
      <nav className='navbar bg-body-tertiary'>
        <div className='container-fluid flex-column flex-sm-row'>
          <a className='navbar-brand title-nav '>Students</a>
          <div className='d-flex  col-8 col-md-5 col-xl-3' role='search'>
            <input
              className='form-control me-2'
              type='text'
              placeholder='Search'
              aria-label='Search'
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button className='btn btn-info' onClick={handleClear}>
              clear
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;

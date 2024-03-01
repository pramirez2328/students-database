function Nav({ handleSearch }: { handleSearch: (search: string) => void }) {
  return (
    <div className='mt-4'>
      <nav className='navbar bg-body-tertiary'>
        <div className='container-fluid flex-column flex-sm-row'>
          <a className='navbar-brand title-nav '>Students</a>
          <div className='d-flex  col-8 col-md-5 col-xl-3' role='search'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;

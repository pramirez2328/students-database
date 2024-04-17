import logo from '../assets/logo.png';
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
    <>
      <nav className='navbar bg-body-tertiary p-4'>
        <div className='container-fluid flex-column flex-sm-row'>
          <div className='d-flex flex-column flex-md-row align-items-center justify-content-center'>
            <img src={logo} alt='logo' className='logo' />
            <h2 className='navbar-brand title-nav text-center'>Students Database</h2>
          </div>

          <div className='d-flex col-8 col-md-5 col-xl-3' role='search'>
            <input
              className='form-control me-2'
              type='text'
              placeholder='Search'
              aria-label='Search'
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button className='btn clear' onClick={handleClear}>
              clear
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;

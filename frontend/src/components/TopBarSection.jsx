import Logo from '../assets/logo_livsstilen.jpg';

export function TopBarSection() {
  return (
    <section className='top-bar-section'>
      <div className='image-div'>
        <img className='logo-image' src={Logo} alt={'Form Logo'} />
      </div>
      <div>
        <form action='' className='search-form'>
          <input
            className='search-input'
            type='text'
            placeholder='Search in the forum'
          />
          <button className='search-button'>Search</button>
        </form>
      </div>
      <div>
        <button>Add a new post</button>
      </div>
    </section>
  );
}

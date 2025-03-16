import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo_livsstilen.jpg';
import { ActionButton } from './buttonComponents/ActionButton';

export function TopBarSection() {
  const navigate = useNavigate(); //✅ Enables navigation

  return (
    <section className='top-bar-section'>
      <div className='image-div'>
        <Link to='/'>
          <img className='logo-image' src={Logo} alt={'Form Logo'} />
        </Link>
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
        <ActionButton
          label='+ Add a New Post'
          onClick={() => navigate('/new-thread')}
          className={'add-post-button'}
        ></ActionButton>
      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { IoHeadsetSharp } from 'react-icons/io5';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
    state = {
      loading: false,
      user: {},
    }

    componentDidMount() {
      this.carregaHeader();
    }

  carregaHeader = async () => {
    this.setState({ loading: true });

    const usuario = await getUser();

    this.setState({
      loading: false,
      user: usuario,
    });
  }

  render() {
    const { loading, user } = this.state;

    return (
      <div data-testid="header-component">
        { loading ? (<Loading />)
          : (
            <header data-testid="header-user-name">
              <Link
                to="/"
                style={ { textDecoration: 'none' } }
                className="bel-tunes"
              >
                BelTunes
              </Link>
              <IoHeadsetSharp size={ 70 } color="rgb(43, 218, 81)" />
              <Link
                to="/profile"
                className="username"
                style={ { textDecoration: 'none' } }
              >
                {user.name}
              </Link>
            </header>) }
        <nav className="navbar">
          <Link
            to="/search"
            data-testid="link-to-search"
            style={ { textDecoration: 'none' } }
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            style={ { textDecoration: 'none' } }
          >
            Favorite Songs
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            style={ { textDecoration: 'none' } }
          >
            Profile
          </Link>
        </nav>
      </div>
    );
  }
}

export default Header;

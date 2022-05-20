import React from 'react';
import { Link } from 'react-router-dom';
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
              <h1>TrybeTunes</h1>
              <h2>{user.name}</h2>
            </header>) }
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </div>
    );
  }
}

export default Header;

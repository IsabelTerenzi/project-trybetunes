import React from 'react';
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
              <p>TrybeTunes</p>
              <p>{user.name}</p>
            </header>) }
      </div>
    );
  }
}

export default Header;

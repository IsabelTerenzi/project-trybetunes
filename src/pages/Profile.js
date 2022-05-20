import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  state = {
    loading: false,
    user: {},
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });

    const usuario = await getUser();

    this.setState({
      loading: false,
      user: usuario,
    });
  }

  render() {
    const { loading, user } = this.state;

    return (
      <section>
        { loading ? (<Loading />) : (
          <div data-testid="page-profile">
            <h1>Profile</h1>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
            <h3>{user.description}</h3>
            <img data-testid="profile-image" src={ user.image } alt={ user.name } />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </section>
    );
  }
}

export default Profile;

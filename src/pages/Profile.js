import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
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
          <div data-testid="page-profile" className="profile">
            <h2>{user.name}</h2>
            <h4>{user.email}</h4>
            <h4>{user.description}</h4>
            <img data-testid="profile-image" src={ user.image } alt={ user.name } />
            <Link
              style={ { textDecoration: 'none' } }
              to="/profile/edit"
              className="edit-profile"
            >
              Editar perfil
              <FaPencilAlt />
            </Link>
          </div>
        )}
      </section>
    );
  }
}

export default Profile;

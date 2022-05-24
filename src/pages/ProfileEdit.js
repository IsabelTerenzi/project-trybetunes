import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    name: '',
    email: '',
    description: '',
    image: '',
    isEditButtonDisabled: true,
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });

    const usuario = await getUser();
    const { name, email, description, image } = usuario;

    this.setState({
      loading: false,
      name,
      email,
      description,
      image,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.verificaBotaoEdit();
  }

  verificaBotaoEdit = () => {
    const { name, email, description, image } = this.state;
    if (name.length === 0
      || email.length === 0
      || description.length === 0
      || image.length === 0
      || !email.includes('@')
      || !email.includes('.com')) {
      this.setState({ isEditButtonDisabled: true });
    } else {
      this.setState({ isEditButtonDisabled: false });
    }
  }

  botaoEdit = async () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;

    await updateUser({ name, email, description, image });

    this.setState({
      name,
      email,
      description,
      image,
    });
    history.push('/profile');
  }

  render() {
    const { loading, isEditButtonDisabled,
      name, email, description, image } = this.state;
    return (
      <section>
        { loading ? (<Loading />) : (
          <div data-testid="page-profile-edit">
            <h1>Editar perfil</h1>
            <form>
              <label htmlFor="editar-nome">
                <input
                  type="text"
                  name="name"
                  data-testid="edit-input-name"
                  id="editar-nome"
                  defaultValue={ name }
                  placeholder="nome"
                  required
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="editar-email">
                <input
                  name="email"
                  data-testid="edit-input-email"
                  id="editar-email"
                  required
                  type="email"
                  onChange={ this.onInputChange }
                  defaultValue={ email }
                  placeholder="email"
                />
              </label>
              <label htmlFor="editar-descricao">
                <input
                  name="description"
                  type="text"
                  data-testid="edit-input-description"
                  id="editar-descricao"
                  required
                  onChange={ this.onInputChange }
                  defaultValue={ description }
                  placeholder="descrição"
                />
              </label>
              <label htmlFor="editar-imagem">
                <input
                  name="image"
                  type="text"
                  data-testid="edit-input-image"
                  id="editar-imagem"
                  required
                  onChange={ this.onInputChange }
                  defaultValue={ image }
                  placeholder="imagem"
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ isEditButtonDisabled }
                onClick={ this.botaoEdit }
              >
                Salvar
              </button>
            </form>
          </div>
        )}
      </section>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;

import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state ={
    isLoginButtonDisabled: true,
    nameLogin: '',
    userSave: false,
    loading: false,
  }

  verificaBotaoLogin = () => {
    const { nameLogin } = this.state;
    const minInput = 3;
    if (nameLogin.length >= minInput) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }),
      this.verificaBotaoLogin);
  }

  botaoSalvar = async () => {
    const { nameLogin } = this.state;

    this.setState({ loading: true });

    await createUser({ name: nameLogin });

    this.setState({
      loading: false,
      userSave: true,
    });
  }

  render() {
    const { isLoginButtonDisabled, nameLogin, userSave, loading } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        { loading ? (<Loading />) : (
          <form>
            <label htmlFor="nameLogin">
              <input
                name="nameLogin"
                value={ nameLogin }
                onChange={ this.onInputChange }
                type="text"
                id="nameLogin"
                data-testid="login-name-input"
              />
            </label>
            <button
              onClick={ this.botaoSalvar }
              disabled={ isLoginButtonDisabled }
              data-testid="login-submit-button"
              type="submit"
            >
              Entrar
            </button>
            {userSave && <Redirect to="/search" />}
          </form>
        )}
      </div>
    );
  }
}

export default Login;

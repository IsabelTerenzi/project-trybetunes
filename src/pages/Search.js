import React from 'react';

class Search extends React.Component {
  state = {
    isSearchButtonDisabled: true,
    artistName: '',
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }),
      this.verificaBotaoPesquisar);
  }

  verificaBotaoPesquisar = () => {
    const { artistName } = this.state;
    const numMin = 2;
    if (artistName.length >= numMin) {
      this.setState({ isSearchButtonDisabled: false });
    } else {
      this.setState({ isSearchButtonDisabled: true });
    }
  }

  render() {
    const { isSearchButtonDisabled, artistName } = this.state;

    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="search-input">
            <input
              data-testid="search-artist-input"
              value={ artistName }
              name="artistName"
              id="search-input"
              type="text"
              placeholder="Nome do Artista"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            // onClick={ this.botaoPesquisar }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

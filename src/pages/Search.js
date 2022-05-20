import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    isSearchButtonDisabled: true,
    artistName: '',
    loading: false,
    albums: [],
    artista: '',
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

  botaoPesquisar = async () => {
    const { artistName } = this.state;

    this.setState({
      loading: true,
      artistName: '',
      artista: artistName,
    });

    const resultado = await searchAlbumsAPI(artistName);

    this.setState({
      albums: resultado.length ? resultado : 0,
      loading: false,
    });
  }

  render() {
    const { isSearchButtonDisabled, artistName, loading,
      albums, artista } = this.state;

    return (
      <div data-testid="page-search" className="search">
        { loading ? (<Loading />) : (
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
              onClick={ this.botaoPesquisar }
            >
              Pesquisar
            </button>
          </form>
        )}
        { albums.length > 0 && (
          <section>
            <p>{ `Resultado de álbuns de: ${artista}`}</p>
            <div>
              {
                albums.map((album, index) => (
                  <div key={ index } className="albums">
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      <p>{`${album.collectionName}`}</p>
                      <p>{`Tracks: ${album.trackCount}`}</p>
                    </Link>
                  </div>))
              }
            </div>
          </section>
        )}
        { albums === 0 && <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;

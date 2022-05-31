import React from 'react';
import { Link } from 'react-router-dom';
import { IoHeadsetSharp } from 'react-icons/io5';
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
        <h1>Search:</h1>
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
          <section className="album-card">
            <IoHeadsetSharp size={ 30 } color="rgb(43, 218, 81)" />
            <p className="results">{ `Resultado de álbuns de: ${artista}`}</p>
            <div>
              {
                albums.map((album, index) => (
                  <div key={ index }>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                      style={ { textDecoration: 'none' } }
                      className="album-link"
                    >
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      <h3>{`${album.collectionName}`}</h3>
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

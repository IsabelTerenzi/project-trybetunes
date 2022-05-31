import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    loading: false,
    favorites: [],
  }

  componentDidMount() {
    this.atualizaLista();
  }

  atualizaLista = () => {
    this.setState({ loading: true }, async () => {
      const favoritas = await getFavoriteSongs();
      this.setState({ loading: false, favorites: favoritas });
    });
  };

  checkbox = async () => {
    const favoritasNova = await getFavoriteSongs();
    this.setState({ favorites: favoritasNova });
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <section>
        { loading ? (<Loading />) : (
          <div data-testid="page-favorites" className="favorites">
            <h1>Favoritas</h1>
            {favorites.map((favorite, index) => (
              <MusicCard
                key={ index }
                trackId={ favorite.trackId }
                trackName={ favorite.trackName }
                previerUrl={ favorite.previewUrl }
                favorites={ favorites }
                atualizaLista={ this.atualizaLista }
                onChange={ this.checkbox }
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Favorites;

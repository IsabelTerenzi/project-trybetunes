import React from 'react';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    loading: false,
    isFavorite: false,
    favorites: [],
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
      isFavorite: true,
    });

    const favoritas = await getFavoriteSongs();

    const { isFavorite } = this.state;

    if (isFavorite) {
      await addSong();
    } else {
      await removeSong();
    }

    this.setState({
      loading: false,
      favorites: favoritas,
    });
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <section>
        { loading ? (<Loading />) : (
          <div data-testid="page-favorites">
            <h1>Favoritas</h1>
            <MusicCard
              favorites={ favorites }
            />
          </div>
        )}
      </section>
    );
  }
}

export default Favorites;

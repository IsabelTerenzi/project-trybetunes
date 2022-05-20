import React from 'react';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    loading: false,
    isFavorite: false,
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
      isFavorite: true,
    });

    await getFavoriteSongs();

    const { isFavorite } = this.state;

    if (isFavorite) {
      await addSong();
    } else {
      await removeSong();
    }

    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <section>
        { loading ? (<Loading />) : (
          <div data-testid="page-favorites">
            <h1>Favorites</h1>
            <MusicCard />
          </div>
        )}
      </section>
    );
  }
}

export default Favorites;

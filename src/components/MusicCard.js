import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    isFavorite: false,
  }

  componentDidMount = () => {
    const { favorites, trackId } = this.props;
    const musicaFavorita = favorites.some((favorita) => favorita.trackId === trackId);
    if (musicaFavorita) {
      this.setState({ isFavorite: true });
    }
  }

  botaoFavorita = async ({ target: { checked } }) => {
    const { isFavorite } = this.state;
    this.setState({ isFavorite: checked, loading: true });

    const { trackId } = this.props;

    if (isFavorite) {
      await removeSong({ trackId });
    } else {
      await addSong({ trackId });
    }

    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, isFavorite } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        { loading ? (<Loading />) : (
          <div>
            <h3>{trackName}</h3>
            <label htmlFor="favorita">
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                value={ trackId }
                id="favorita"
                name="favorita"
                onChange={ this.botaoFavorita }
                checked={ isFavorite }
              />
            </label>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;

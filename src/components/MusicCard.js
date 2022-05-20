import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state ={
    loading: false,
    isFavorite: false,
  }

  botaoFavorita = async ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(() => ({ [name]: value }));

    this.setState({
      loading: true,
      isFavorite: true,
    });

    const { isFavorite } = this.state;

    if (isFavorite) {
      await addSong(value);
    } else {
      await removeSong(value);
    }

    this.setState({
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isFavorite } = this.state;

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
};

export default MusicCard;

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

  botaoFavorita = ({ target: { checked } }) => {
    const { isFavorite } = this.state;
    const { trackId, trackName, previewUrl, atualizaLista } = this.props;

    this.setState({ isFavorite: checked, loading: true }, async () => {
      if (isFavorite) {
        atualizaLista();
        await removeSong({ trackName, trackId, previewUrl });
      } else {
        await addSong({ trackName, trackId, previewUrl });
      }

      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { loading, isFavorite } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        { loading ? (<Loading />) : (
          <div>
            <h3>{trackName}</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <br />
            <br />
            <label htmlFor={ trackId }>
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id={ trackId }
                onChange={ this.botaoFavorita }
                checked={ isFavorite }
              />
            </label>
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
  atualizaLista: PropTypes.func.isRequired,
};

export default MusicCard;

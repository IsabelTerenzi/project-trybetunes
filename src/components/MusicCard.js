import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
  }

  botaoFavorita = ({ target: { checked } }) => {
    const { trackId, trackName, previewUrl, atualizaLista } = this.props;
    this.setState({ loading: true }, async () => {
      if (!checked) {
        await removeSong({ trackName, trackId, previewUrl });
        atualizaLista();
      } else {
        await addSong({ trackName, trackId, previewUrl });
        atualizaLista();
      }

      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { loading } = this.state;
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
                checked={ JSON.parse(localStorage.getItem('favorite_songs'))
                  .some((favorita) => favorita.trackId === trackId) }
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
  atualizaLista: PropTypes.func.isRequired,
};

export default MusicCard;

import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state ={
    musicas: [],
    favorites: [],
  }

  componentDidMount = () => {
    this.carregaAlbum();
    this.carregaFavoritas();
  }

  carregaAlbum = async () => {
    const { match } = this.props;
    const { id } = match.params;

    const resultado = await getMusics(id);

    this.setState({ musicas: resultado });
  }

  carregaFavoritas = async () => {
    const resultado2 = await getFavoriteSongs();

    this.setState({ favorites: resultado2 });
  }

  atualizaLista = async () => {
    const favoritas = await getFavoriteSongs();
    this.setState({ favorites: favoritas });
  };

  render() {
    const { musicas, favorites } = this.state;

    return (
      <div data-testid="page-album">
        {musicas.length > 0 && (
          <div className="album-cover">
            <h1 data-testid="artist-name">{musicas[0].artistName}</h1>
            <h3 data-testid="album-name">{musicas[0].collectionName}</h3>
            <img
              src={ musicas[0].artworkUrl100 }
              alt={ musicas[0].collectionName }
            />
          </div>
        )}
        { musicas.map(({ trackName, previewUrl, trackId }, index) => index > 0 && (
          <div className="music-card">
            <MusicCard
              key={ index }
              trackName={ trackName }
              previewUrl={ previewUrl }
              trackId={ trackId }
              musicas={ musicas }
              favorites={ favorites }
              atualizaLista={ this.atualizaLista }
            />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;

import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state ={
    musicas: [],
  }

  componentDidMount() {
    this.carregaAlbum();
  }

  carregaAlbum = async () => {
    const { match } = this.props;
    const { id } = match.params;

    const resultado = await getMusics(id);

    this.setState({
      musicas: resultado,
    });
  }

  render() {
    const { musicas } = this.state;

    return (
      <div data-testid="page-album">
        {musicas.length > 0 && (
          <div>
            <h1 data-testid="artist-name">{musicas[0].artistName}</h1>
            <h3 data-testid="album-name">{musicas[0].collectionName}</h3>
            <img src={ musicas[0].artworkUrl100 } alt={ musicas[0].collectionName } />
          </div>
        )}
        { musicas.map((musica, index) => index > 0 && (
          <div key={ index }>
            <MusicCard
              trackName={ musica.trackName }
              previewUrl={ musica.previewUrl }
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

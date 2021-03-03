import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import giphy from '../API/giphy';
import GifList from './GifList';
import SearchBar from './SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../styles.css';

class App extends React.Component {
  state = { gifs: [], count: 20, start: 0, inputPass: '' };

  componentDidMount() {
    this.onSearchSubmit('nature');
  }

  onSearchSubmit = async input => {
    const response = await giphy
      .get('/gifs/search', {
        params: {
          q: input,
          limit: 20,
          offset: this.state.start,
        },
      })
      .catch(err => {
        throw new Error(err.response);
      })
      .catch(err => console.log(err));

    this.state.inputPass = input;
    this.setState({ gifs: response.data.data });
  };

  loadGifs = async () => {
    this.setState({ start: this.state.start + this.state.count });

    const response = await giphy
      .get('/gifs/search', {
        params: {
          q: this.state.inputPass,
          limit: this.state.count,
          offset: this.state.start,
        },
      })
      .catch(err => {
        throw new Error(err.response);
      })
      .catch(err => console.log(err));

    this.setState({ gifs: this.state.gifs.concat(response.data.data) });
  };

  render() {
    return (
      <Container className="p-0">
        <header className="bg-white d-flex justify-content-center align-items-center header">
          <SearchBar onSubmit={this.onSearchSubmit} />
        </header>
        <main className="bg-light gif-container">
          <InfiniteScroll
            dataLength={this.state.gifs.length}
            next={this.loadGifs}
            hasMore={true}
          >
            <GifList gifs={this.state.gifs} />
          </InfiniteScroll>
        </main>
      </Container>
    );
  }
}

export default App;

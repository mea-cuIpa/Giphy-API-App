import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import giphy from '../API/giphy';
import GifList from './GifList';
import SearchBar from './SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../styles.css';

class App extends React.Component {
  state = { gifs: [], count: 20, start: 0, search: '' };

  componentDidMount() {
    this.onSearchSubmit('nature');
  }

  onSearchSubmit = async input => {
    const response = await giphy
      .get('/gifs/search', {
        params: {
          q: input,
          limit: 20,
          offset: 0,
        },
      })
      .catch(err => {
        //err > 500 ? server side : user
        err.response
          ? console.error(`Server responded with status ${err.response.status}`)
          : err.request
          ? console.error(`Can't get response ${err.request}`)
          : console.error(
              `Something happened in setting up the request ${err.message}`
            );
      });

    this.setState({ gifs: response.data.data, search: input });
  };

  loadGifs = async () => {
    this.setState({ start: this.state.start + this.state.count });
    const { start, count, search } = this.state;

    const response = await giphy
      .get('/gifs/search', {
        params: {
          q: search,
          limit: count,
          offset: start,
        },
      })
      .catch(err => {
        err.response
          ? console.error(
              `Server responded ${err.response.data}, ${err.response.headers} with status ${err.response.status}`
            )
          : err.request
          ? console.error(`Can't get response ${err.request}`)
          : console.error(
              `Something happened in setting up the request ${err.message}`
            );
      });

    this.setState({ gifs: [...this.state.gifs, ...response.data.data] });
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

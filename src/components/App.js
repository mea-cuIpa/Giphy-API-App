import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import giphy from '../API/giphy';
import GifList from './GifList';
import SearchBar from './SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../styles.css';

class App extends React.Component {
  state = { gifs: [], limit: 20, offset: 0, search: '' };

  componentDidMount() {
    this.onSearchSubmit('nature');
  }

  onSearchSubmit = async search => {
    const {
      data: { data },
    } = await giphy
      .get('/gifs/search', {
        params: {
          q: search,
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

    this.setState({ gifs: data, search });
  };

  loadGifs = async () => {
    this.setState({ offset: this.state.offset + this.state.limit });
    const { offset, limit, search, gifs } = this.state;

    const {
      data: { data },
    } = await giphy
      .get('/gifs/search', {
        params: {
          q: search,
          limit,
          offset,
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

    this.setState({ gifs: [...gifs, ...data] });
  };

  render() {
    const { gifs } = this.state;

    return (
      <Container className="p-0">
        <header className="bg-white d-flex justify-content-center align-items-center header">
          <SearchBar onSubmit={this.onSearchSubmit} />
        </header>
        <main className="bg-light gif-container">
          <InfiniteScroll
            dataLength={gifs.length}
            next={this.loadGifs}
            hasMore={true}
          >
            <GifList gifs={gifs} />
          </InfiniteScroll>
        </main>
      </Container>
    );
  }
}

export default App;

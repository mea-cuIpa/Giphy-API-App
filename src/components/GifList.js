import React from 'react';
import GifItem from './GifItem';

const GifList = ({ gifs }) => {
  const renderedGifs = gifs.map(gif => {
    return (
      <div className="gif-container__content" key={gif.id}>
        <GifItem gif={gif} className="gif-container__img" />
      </div>
    );
  });

  return renderedGifs;
};

export default GifList;

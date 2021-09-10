import React from 'react';
import { observer } from 'mobx-react';
import Converter from './Converter';

const Main = observer(() => {
  return (
    <div className="App">
      <header className="App-header">
        <Converter />
      </header>
    </div>
  );
})

export default Main
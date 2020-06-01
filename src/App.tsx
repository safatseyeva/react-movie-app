import * as React from 'react';
import { useState } from 'react';
import Header from './components/Header/Header.component';
import Footer from './components/Footer/Footer.component';
import Search from './components/Search/Search.component';

export interface SearchParams {
  searchStr: string;
  searchType: string;
}

const App: React.FunctionComponent = ():JSX.Element => {
  const [seachParams, setSearchParams] = useState({
    searchStr: '',
    searchType: ''
  });

  const onSearch = (searchObj: SearchParams): void => {
    setSearchParams(searchObj);
    console.log(searchObj);
  };

  return (
    <div className='main d-flex flex-column'>
      <Header />
      <section>
        <Search onSearch={onSearch} />
      </section>
      <Footer/>
    </div>
  );
};

export default App;

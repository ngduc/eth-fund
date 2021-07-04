import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../components/base';
import CardList from '../CardList/CardList';
import CardDetail from '../CardDetail/CardDetail';
import BadgeList from '../BadgeList/BadgeList';
import MetaMaskConnect from '../MetaMaskConnect/MetaMaskConnect';
import Logo from '../../static/logo.png';
import './Home.css';

function Home({ page, ...otherProps }: { page: string }) {
  const [menuVisible, setMenuVisible] = React.useState(true);
  return (
    <>
      <header className="headerBar">
        <aside>
          <Link to="/">
            <img src={Logo} style={{ margin: 10, height: 30 }} />
          </Link>
        </aside>
        <div>
          <h1 style={{ textAlign: 'center', fontSize: 24, marginTop: 30 }}>
            {page === 'badges' ? 'My Badges' : 'Fundraisers'}
          </h1>
        </div>
        <aside>
          <Link to="/badges">
            <Button style={{ width: 120 }}>My Badges</Button>
          </Link>
          <MetaMaskConnect />
        </aside>
      </header>

      <section className="sideBySide">
        <aside className={`show-${menuVisible}`}>
          <span
            onClick={() => {
              console.log('menuVisible', menuVisible);
              setMenuVisible(!menuVisible);
            }}
            style={{ margin: 10 }}
          >
            [ ☰ ]
          </span>
        </aside>
        <main>
          {page === 'badges' ? <BadgeList /> : null}
          {page === 'list' ? <CardList /> : null}
          {page === 'detail' ? <CardDetail /> : null}
        </main>
      </section>

      <p>&nbsp;</p>
    </>
  );
}

export default Home;

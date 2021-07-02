import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CardList from '../CardList/CardList';
import BadgeList from '../BadgeList/BadgeList';
import Logo from '../../static/logo.png';
import './Home.css';

function Home({ page }: { page: string }) {
  const [menuVisible, setMenuVisible] = React.useState(true);
  return (
    <>
      <header className="headerBar">
        <aside>
          <Link to="/">
            <img src={Logo} style={{ margin: 10, width: 100 }} />
          </Link>
        </aside>
        <div>
          <h1 style={{ textAlign: 'center', fontSize: 24, marginTop: 30 }}>
            {page === 'badges' ? 'My Badges' : 'Fundraisers'}
          </h1>
        </div>
        <aside>
          <Link to="/badges">My Badges</Link>
        </aside>
      </header>

      <section className="sideBySide">
        <aside className={`show-${menuVisible}`}>
          <span
            onClick={() => {
              console.log('menuVisible', menuVisible);
              setMenuVisible(!menuVisible);
            }}
          >
            [ ☰ ]
          </span>
        </aside>
        <main>{page === 'badges' ? <BadgeList /> : <CardList />}</main>
      </section>

      <p>&nbsp;</p>
    </>
  );
}

export default Home;

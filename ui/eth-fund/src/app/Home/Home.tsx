import React, { useState } from 'react';
import CardList from '../CardList/CardList';
import Logo from '../../static/logo.png';
import './Home.css';

function Home() {
  const [menuVisible, setMenuVisible] = React.useState(true);
  return (
    <>
      <header className="headerBar">
        <aside>
          <img src={Logo} style={{ margin: 10, width: 100 }} />
        </aside>
        <div>
          <h1 style={{ textAlign: 'center', fontSize: 24, marginTop: 30 }}>Fundraisers</h1>
        </div>
        <aside>Profile</aside>
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
        <main>
          <CardList />
        </main>
      </section>

      <p>&nbsp;</p>
    </>
  );
}

export default Home;

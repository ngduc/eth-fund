import React from 'react';
import { Link } from 'react-router-dom';
import './CardDetail.css'

export default () => {
  return (
    <section className="detail-container">
      <Link to="/">Back to Fundraisers</Link>
      <main>
        <h3>VR Project</h3>
        <div>Card Detail</div>
        <div>&nbsp;</div>

        <button>Fund This Campaign</button>
      </main>
    </section>
  );
};

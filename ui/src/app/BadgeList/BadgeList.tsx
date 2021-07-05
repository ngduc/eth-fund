import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './BadgeList.css';

export default () => {
  const data = [
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/donate/2/25/PlatinumBadge.png',
      title: '1st Donor - Platinum',
      raised: 100,
      goal: 500
    },
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/donate/6/64/GoldBadge.png',
      title: '2nd Donor - Gold',
      raised: 100,
      goal: 500
    },
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/donate/7/70/SilverBadge.png',
      title: '3rd Donor - Silver',
      raised: 100,
      goal: 500
    },
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/donate/1/1c/BronzeBadge.png',
      title: '4th Donor - Copper',
      raised: 400,
      goal: 500
    }
  ];
  const otherBadges = [
    {
      imageUrl: 'https://i.ibb.co/kGpmK91/eth-1.png',
      title: '1 Eth Club',
      raised: 400,
      goal: 500
    },
    {
      imageUrl: 'https://i.ibb.co/L13BSBs/eth-2.png',
      title: '2 Eths Club',
      raised: 400,
      goal: 500
    },
    {
      imageUrl: 'https://i.ibb.co/hHHRcDr/eth-3.png',
      title: '3 Eths Club',
      raised: 400,
      goal: 500
    }
  ];
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        <section className="cardListContainer">
          <Link to="/">❮ Back to Fundraisers</Link>

          <ul className="cardList">
            {data.map((item) => {
              return (
                <li className="card">
                  <div
                    className="cardImage"
                    style={{
                      background: `url(${item.imageUrl}) center no-repeat`,
                      backgroundSize: '40%'
                    }}
                  />
                  <div className="cardBody">
                    <div>{item.title}</div>
                  </div>
                </li>
              );
            })}
          </ul>

          <h1 style={{ fontSize: 24 }}>Unblock More Badges:</h1>
          
          <ul className="cardList">
            {otherBadges.map((item) => {
              return (
                <li className="card">
                  <div
                    className="cardImage"
                    style={{
                      background: `url(${item.imageUrl}) center no-repeat`,
                      backgroundSize: '25%'
                    }}
                  />
                  <div className="cardBody">
                    <div>{item.title}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

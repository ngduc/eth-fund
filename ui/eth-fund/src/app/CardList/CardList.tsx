import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './CardList.css';

const ProgressBar = ({ value, total }: any) => {
  const pct = (value / total) * 100;
  return (
    <div className="progressBar">
      <div className="progressBar" style={{ width: `${pct}%`, backgroundColor: '#00c300' }} />
    </div>
  );
};

export const fundList = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1508361727343-ca787442dcd7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGZ1dHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'Futuristic Office',
    description: `In order to create this beautiful new studio, we will be doing a full demolition and reconstruction of the interior of the studio, installing a fabulous sprung dance floor, and creating an exciting atmosphere with great sound and lighting systems.

    This is a huge financial undertaking, and every penny that can go towards the construction will help! We ask our dedicated students, friends and families for a little bit of help! And in return we promise to create the greatest ballroom dancing studio in the United States for you, our community!
    `,
    raised: 2500,
    goal: 5000
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1538388149542-5e24932d11a8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGZ1dHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'VR World',
    raised: 4000,
    goal: 5000
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGZ1dHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'The Pianist',
    raised: 500,
    goal: 5000
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1560390816-3400050aab0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fGZ1dHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'Hanging Garden',
    raised: 500,
    goal: 5000
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fGZ1dHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'Big Hero 6',
    raised: 5000,
    goal: 5000
  }
];

export default () => {
  const history = useHistory();
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        <section className="cardListContainer">
          <ul className="cardList">
            {fundList.map((item) => {
              return (
                <li className="card" onClick={() => history.push('/detail')}>
                  <div className="cardImage" style={{ background: `url(${item.imageUrl}) center` }} />
                  <div className="cardBody">
                    <div>{item.title}</div>

                    <div>
                      ${item.raised} raised of ${item.goal}
                    </div>
                    <ProgressBar value={item.raised} total={item.goal} />
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

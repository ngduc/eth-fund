import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CardList.css';

const ProgressBar = ({ value, total }: any) => {
  const pct = (value / total) * 100;
  return (
    <div className="progressBar">
      <div className="progressBar" style={{ width: `${pct}%`, backgroundColor: '#00c300' }} />
    </div>
  );
};

const data = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1538388149542-5e24932d11a8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGZ1dHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'VR World',
    raised: 400,
    goal: 500
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1508361727343-ca787442dcd7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGZ1dHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'Futuristic Office',
    raised: 100,
    goal: 500
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGZ1dHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'The Pianist',
    raised: 100,
    goal: 500
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1560390816-3400050aab0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fGZ1dHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'Hanging Garden',
    raised: 100,
    goal: 500
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fGZ1dHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'Big Hero 6',
    raised: 100,
    goal: 500
  }
];

export default () => {
  const history = useHistory();
  return (
    <section className="cardListContainer">
      <ul className="cardList">
        {data.map((item) => {
          return (
            <li className="card" onClick={() => history.push('/detail')}>
              <div className="cardImage" style={{ background: `url(${item.imageUrl}) center` }} />
              <div className="cardBody">
                <div>{item.title}</div>

                <div>&nbsp;</div>
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
  );
};

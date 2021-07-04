import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Field } from '../../components/base';
import './CardDetail.css';

export default () => {
  const [fundVisible, setFundVisible] = React.useState(false);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section className="detail-container">
          <Link to="/">❮ Back to Fundraisers</Link>
          <main>
            <h3>VR Project</h3>
            <div>Description</div>
            <div>&nbsp;</div>

            <ul className="phases">
              <li>
                <input type="radio" name="selectedPhase" defaultChecked /> Phase 1
              </li>
              <li>
                <input type="radio" name="selectedPhase" /> Phase 2
              </li>
              <li>
                <input type="radio" name="selectedPhase" /> Phase 3
              </li>
            </ul>

            <div>&nbsp;</div>
            <Button onClick={() => setFundVisible(!fundVisible)}>Fund This Campaign</Button>

            {fundVisible && (
              <form className="lg:w-1/2 sm:w-full p-4 border bg-gray-100">
                <Field label="Token" defaultValue="ETH" />
                <Field label="Amount" defaultValue="" autoFocus={true} />
                <Field label="Funding Method" className="my-2" fieldClassName="inline space-x-4 ml-4">
                  <label>
                    <input type="radio" name="time" value="ALL" /> All at once
                  </label>
                  <label>
                    <input type="radio" name="time" value="PERIOD" checked /> Over a period of time
                  </label>
                </Field>
                <Field label="Total time (months)" defaultValue="12" autoFocus={true} />
                <div className="mt-4">
                  <Button primary type="submit">
                    Submit
                  </Button>
                  <Button className="ml-2" type="reset">
                    Clear
                  </Button>
                </div>
              </form>
            )}
          </main>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

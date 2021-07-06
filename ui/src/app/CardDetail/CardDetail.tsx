import React from 'react';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

// @ts-ignore
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Field, Modal } from '../../components/base';
import { fundList } from '../CardList/CardList';
import './CardDetail.css';

// @ts-ignore
// import SuperfluidSDK from '@superfluid-finance/js-sdk'; 
// import { Web3Provider } from '@ethersproject/providers';
// import { toWei } from 'web3-utils'
// const {
//   toWad,
//   toBN,
//   fromWad,
//   wad4human
// } = require("@decentral.ee/web3-helpers");

// const testFlow = async () => {
//   const walletAddress = await (window as any).ethereum.request({
//     method: 'eth_requestAccounts',
//     params: [
//       {
//         eth_accounts: {}
//       }
//     ]
//   });
//   const sf = new SuperfluidSDK.Framework({
//     ethers: new Web3Provider((window as any).ethereum),
//     tokens: ['fDAI']
//   });
//   await sf.initialize();
  
//   const bob = sf.user({ address: '0x8770479B8d27fb0347E6B44871c06f96a3C9e402', token: sf.tokens.fDAI.address });
  
//   // const dai = await TestToken.at(sf.tokens.fDAI.address);
//   const fDAI = await sf.contracts.TestToken.at(
//     sf.tokens.fDAI.address
//   );
//   const daix = sf.tokens.fDAI;
//   console.log('fDAI', fDAI.mint)

//   console.log('mint---')
//   // await fDAI.mint(bob, toWad(100), { from: bob })
//   await fDAI.mint(sf.tokens.fDAI.address, 1)

//   console.log('mint---done')
//   // (async () => (wad4human(await fDAI.balanceOf(bob))))()

//   // const carol = sf.user({
//   //   address: walletAddress[0],
//   //   token: '0x8770479B8d27fb0347E6B44871c06f96a3C9e402'
//   // });

//   // await carol.flow({
//   //   recipient: '0x9c0749510c4c45674e6d7b5c628a1f16be56eeed',
//   //   flowRate: 385802469135802
//   // });
  
//   // const details = await carol.details();
//   // console.log(details);
// };
// testFlow();

export default () => {
  const [fundVisible, setFundVisible] = React.useState(false);
  const [modalShowed, setModalShowed] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const context = useWeb3React();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;

  const onPayClick = () => {
    if (library && library.send) {
      library
        .send('eth_sendTransaction', [
          {
            from: account,
            to: 'SERVICE_ETH_ADDRESS',
            value: '0x00', // utils.toWei('0.00001', 'ether'),
            gasPrice: '0x0000001F6EA08600',
            gas: '0x0001ADB0'
          }
        ])
        // .then((tid) => {
        //   setTransactionId(tid);
        // });
    }
  }

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
            <h3 className="font-bold my-4">{fundList[0].title}</h3>

            <div>{fundList[0].description}</div>
            <div>&nbsp;</div>
            <div>Organizer - Duc Nguyen</div>

            <h3 className="font-bold my-4">Phases</h3>
            <ul className="phases">
              <li>
                <label>
                  <input type="radio" name="selectedPhase" defaultChecked /> Phase 1 - Foundation
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="selectedPhase" /> Phase 2 - Structure 
                </label>
                <div className="mt-2 text-blue-300">Your contribution status: Delivered 06/01/2021 - Complete, On-time. <a className="font-bold" href="javascript:;">More Details.</a></div>
              </li>
              <li>
                <label>
                  <input type="radio" name="selectedPhase" /> Phase 3 - Complete
                </label>
              </li>
            </ul>
            <Button primary onClick={() => setFundVisible(!fundVisible)}>
              Fund This Campaign
            </Button>
            <Button className="ml-4" onClick={() => setFundVisible(false)}>
              Cancel Last Contribution
            </Button>

            {fundVisible && (
              <form onSubmit={() => {}} className="lg:w-1/2 sm:w-full p-4 border bg-gray-100">
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
                <Field label="Total time (months)" defaultValue="12" />
                <div className="mt-4">
                  <Button primary type="button" onClick={() => setModalShowed(true)}>
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

        {modalShowed === true ? (
          <Modal
            title="Confirm Transfer"
            content={
              <div>
                {submitted ? (
                  <div>
                    <p>Transfer complete!</p>
                    <p>&nbsp;</p>
                    <p>
                      Thank you for supporting our campaign!
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Please come back and check the status of your contribution once it's updated.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>Your fund will be transferred using Metamask.</p>
                    <p>&nbsp;</p>
                    <p>
                      At this time, please pay with Rinkeby Test Net as this is not tested or ready with the Main Net.
                    </p>
                  </div>
                )}
              </div>
            }
            onCancel={() => setModalShowed(false)}
            onConfirm={() => {
              if (submitted) {
                setModalShowed(false);
                setSubmitted(false);
                onPayClick();
              } else {
                setTimeout(() => {
                  setSubmitted(true);
                }, 2000)
              }
            }}
          />
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
};

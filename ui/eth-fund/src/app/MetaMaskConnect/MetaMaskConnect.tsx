import * as React from 'react';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import {
  URI_AVAILABLE,
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect
} from '@web3-react/walletconnect-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';

import { injected, network, walletconnect, walletlink } from '../../utils/metamask/connector';
import { useEagerConnect, useInactiveListener } from '../../utils/metamask/hooks';
// import { SERVICE_ETH_ADDRESS } from '../utils/envUtil';
// import { utils } from 'web3';

const connectorsByName = {
  Injected: injected,
  Network: network,
  WalletConnect: walletconnect,
  WalletLink: walletlink
};

function getErrorMessage(error: any) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.';
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details.';
  }
}

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MyComponent />
    </Web3ReactProvider>
  );
}

function MyComponent() {
  const [transactionId, setTransactionId] = React.useState(''); // transaction Id after sending payment.
  const context = useWeb3React();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>(null);
  React.useEffect(() => {
    console.log('running');
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // set up block listener
  const [blockNumber, setBlockNumber] = React.useState(null);
  React.useEffect(() => {
    console.log('running', library);
    if (library) {
      let stale = false;

      console.log('fetching block number!!');
      library
        .getBlockNumber()
        .then((blockNumber: any) => {
          if (!stale) {
            setBlockNumber(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        });

      const updateBlockNumber = (blockNumber: any) => {
        setBlockNumber(blockNumber);
      };
      library.on('block', updateBlockNumber);

      return () => {
        library.removeListener('block', updateBlockNumber);
        stale = true;
        setBlockNumber(null);
      };
    }
  }, [library, chainId]);

  // fetch eth balance of the connected account
  const [ethBalance, setEthBalance] = React.useState<any>(null);
  React.useEffect(() => {
    console.log('running');
    if (library && account) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setEthBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setEthBalance(null);
          }
        });

      return () => {
        stale = true;
        setEthBalance(null);
      };
    }
  }, [library, account, chainId]);

  // log the walletconnect URI
  React.useEffect(() => {
    console.log('running');
    const logURI = (uri: string) => {
      console.log('WalletConnect URI', uri);
    };
    walletconnect.on(URI_AVAILABLE, logURI);

    return () => {
      walletconnect.off(URI_AVAILABLE, logURI);
    };
  }, []);

  const injectedConnector = connectorsByName['Injected'];
  const walletConnected = injectedConnector === connector;
  const onPayClick = () => {
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
      .then((tid: string) => {
        setTransactionId(tid);
      });
  };

  return (
    <div className="ml-2 mt-4">
      <div>
        <div className="flex flex-row justify-between">
          <a className="w-100" href="/">
            <img src="logo-text.png" alt="Logo" style={{ height: 64 }} />
          </a>

          <div className="flex flex-row">
            <div className="mt-2">
              <span className="text-xs bg-gray-200 p-2 mr-2 border rounded">Account</span>
              <span className="text-sm">
                {account === undefined
                  ? ' N/A'
                  : account === null
                  ? 'None'
                  : `${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
              </span>
            </div>
            <div className="ml-4 mt-2">
              <span className="text-xs bg-gray-200 p-2 mr-2 border rounded">Balance</span>
              <span className="text-sm">
                {ethBalance === undefined
                  ? ' N/A'
                  : ethBalance === null
                  ? 'Error'
                  : `Ξ ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
              </span>
            </div>

            <div className="ml-4">
              {walletConnected ? (
                <button
                  onClick={() => {
                    deactivate();
                  }}
                >
                  Disconnect MetaMask
                </button>
              ) : (
                <button
                  onClick={() => {
                    const connector = connectorsByName['Injected'];
                    setActivatingConnector(connector);
                    activate(connector);
                  }}
                >
                  Connect MetaMask
                </button>
              )}
              <span className="ml-2 mr-2">{active ? '🟢' : error ? '🔴' : '🟠'}</span>
            </div>
          </div>
        </div>
      </div>
      {/* <hr className="my-4" /> */}

      {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
    </div>
  );
}

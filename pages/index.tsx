import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';
import { BrowserWallet } from '@martifylabs/mesh';
import { useWallet } from '@martifylabs/mesh-react';
import logo from '../public/logo.png';
export default function Home() {
  const { connect, connected, disconnect, wallet } = useWallet();
  const [everything, setEverything] = useState<any>({});
  // sf
  useEffect(() => {
    const getTotalValue = async () => {
      if (connected) {
        const assets = await wallet.getAssets();
        const balance = await wallet.getBalance();
        const lovelace = await wallet.getLovelace();
        const rewardAddress = await wallet.getRewardAddresses();
        const usedAddresses = await wallet.getUsedAddresses();
        const utxos = await wallet.getUtxos();
        const usedCollateral = await wallet.getUsedCollateral();
        const changeAddress = await wallet.getChangeAddress();
        const networkId = await wallet.getNetworkId();
        setEverything({
          assets,
          balance,
          lovelace,
          rewardAddress,
          usedAddresses,
          utxos,
          usedCollateral,
          changeAddress,
          networkId,
        });
      }
    };
    getTotalValue();
  }, [connected, wallet]);

  const [wallets, setWallets] = useState<
    Array<{ name: string; icon: string; version: string }>
  >([]);

  useEffect(() => {
    setWallets(BrowserWallet.getInstalledWallets());
  }, []);

  const connectWallet = async (walletName: string) => {
    try {
      await connect(walletName);
    } catch (error) {}
  };

  const LoadingSpinner = () => {
    return (
      <div className='loading-spinner'>
        <div className='loading-spinner-dot'></div>
        <div className='loading-spinner-dot'></div>
        <div className='loading-spinner-dot'></div>
        <style>
          {`
          .loading-spinner {
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }
          
          .loading-spinner-dot {
            width: 8px;
            height: 8px;
            margin: 0 4px;
            border-radius: 50%;
            background-color: white !important;
            animation: loading-spinner-animation 0.6s ease-in-out infinite;
          }
          
          @keyframes loading-spinner-animation {
            0% {
              transform: scale(0);
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
        `}
        </style>
      </div>
    );
  };

  return (
    <>
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/yadi.css/dist/index.css'
      />
      <nav
        style={{
          position: 'absolute',
          left: '20px',
          top: '20px',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingLeft: '50px',
          // justifyContent: 'space-between',
          alignItems: 'center',
          // padding: '10px',
          boxShadow: '-moz-initial',
        }}
      >
        <img
          src='logo.png'
          alt='Adalytics Logo'
          style={{ height: '50px', borderRadius: '50%', marginRight: '20px' }}
        />
        <h1 style={{ margin: '0' }}>Adalytics</h1>
      </nav>
      <h1>Dashboard</h1>
      {connected && !everything.balance && (
        // Write a spinner here

        <LoadingSpinner />
      )}
      {everything.balance && (
        <div
          style={{
            padding: '10px',
            boxShadow: '-moz-initial',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>
            Assets: {JSON.stringify(everything.assets)}
          </p>
          <p style={{ fontWeight: 'bold' }}>Balance:</p>
          <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
            {everything.balance.map(
              (
                item: {
                  unit:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  quantity:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                },
                index: Key | null | undefined
              ) => (
                <li key={index}>
                  Unit: {item.unit}, Quantity: {item.quantity}
                </li>
              )
            )}
          </ul>
          <p style={{ fontWeight: 'bold' }}>Lovelace: {everything.lovelace}</p>
          <p style={{ fontWeight: 'bold' }}>
            Reward Address: {JSON.stringify(everything.rewardAddress)}
          </p>
          <p style={{ fontWeight: 'bold' }}>
            Used Addresses: {JSON.stringify(everything.usedAddresses)}
          </p>
          <p style={{ fontWeight: 'bold' }}>
            UTXOs: {JSON.stringify(everything.utxos)}
          </p>
          <p style={{ fontWeight: 'bold' }}>
            Used Collateral: {JSON.stringify(everything.usedCollateral)}
          </p>
          <p style={{ fontWeight: 'bold' }}>
            Change Address: {everything.changeAddress}
          </p>
          <p style={{ fontWeight: 'bold' }}>
            Network ID: {everything.networkId}
          </p>
        </div>
      )}
      {!connected && (
        <>
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => connectWallet(wallet.name)}
              style={{
                background: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                color: '#333',
                cursor: 'pointer',
                display: 'inline-block',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '10px',
                padding: '10px 20px',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              Connect {wallet.name}
            </button>
          ))}
        </>
      )}
      {connected && (
        <button
          onClick={disconnect}
          style={{
            background: '#e74c3c',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer',
            display: 'inline-block',
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '10px',
            padding: '10px 20px',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          Disconnect
        </button>
      )}{' '}
    </>
  );
}

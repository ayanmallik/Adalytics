import { useState, useEffect } from "react";
import { BrowserWallet } from "@martifylabs/mesh";
import { useWallet } from "@martifylabs/mesh-react";

export default function Home() {
  const { connect, connected, disconnect } = useWallet();
  const [wallets, setWallets] = useState<
    Array<{ name: string; icon: string; version: string }>
  >([]);

  useEffect(() => {
    setWallets(BrowserWallet.getInstalledWallets());
  }, []);

  const connectWallet = async (walletName: string) => {
    try {
      await connect(walletName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!connected && (
        <>
          {wallets.map((wallet) => (
            <button key={wallet.name} onClick={() => connectWallet(wallet.name)}>
              Connect {wallet.name}
            </button>
          ))}
        </>
      )}

      {connected && <button onClick={disconnect}>Disconnect</button>}
    </>
  );
}

import React from "react";
import { ConnectButton } from "web3uikit";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4">
      <div className="text-xl font-bold text-gray-900">Certify</div>
      {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"></button> */}
      <ConnectButton moralisAuth={false} />
    </header>
  );
};

export default Header;

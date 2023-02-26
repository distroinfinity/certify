import React, { useState } from "react";
import { ethers } from "ethers";

import Web3Modal from "web3modal";
import { degree } from "../config";
import Degree from "../artifacts/contracts/Degree.sol/Degree.json";

export default function VerifyModal({ showModal, setShowModal }) {
  const [wallet, setWallet] = useState("");
  const [valid, setValid] = useState("");

  async function verifyDegree() {
    if (wallet === "") return;
    console.log("reached here");
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(degree, Degree.abi, signer);
    // const add = "0x6F7CFD0713e9985A3D8919855E76a8988C622793";
    let claimedDegreeID;
    try {
      claimedDegreeID = await contract.getDegree(wallet);
    } catch (error) {
      console.log("error while getting", error);
      setValid("no");
      return;
    }
    console.log("verify degree ", claimedDegreeID);
    setValid("yes");
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Verify a Degree</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Please add a addres to verify......
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {valid === "no" ? "Not Verified through us" : ""}
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {valid === "yes" ? "Verified through us" : ""}
                  </p>
                </div>
                <div>
                  <label htmlFor="wallet-address" className="sr-only">
                    Wallet Address
                  </label>
                  <input
                    id="wallet-address"
                    name="wallet"
                    //   type=""
                    //   autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Wallet Address"
                    value={wallet}
                    onChange={(e) => {
                      setWallet(e.target.value);
                    }}
                  />
                </div>
                <button
                  // type="submit"
                  className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
                  onClick={verifyDegree}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {/* <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  /> */}
                  </span>
                  Submit
                </button>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

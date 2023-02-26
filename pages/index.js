import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { degree } from "../config";
import Degree from "../artifacts/contracts/Degree.sol/Degree.json";
import { Button, Modal } from "web3uikit";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Header from "../components/Header";
import DegreeModal from "../components/DegreeModal";
import VerifyModal from "../components/VerifyModal";

const authorization =
  "Basic " +
  btoa(
    "2MGtG4xO5zdSXZINBJVzqkQGe3m" + ":" + "3be239e1397fa806c574a0bcaf5f344f"
  );

const ipfs = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);

  async function claimDegree() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(degree, Degree.abi, signer);
    let claimedDegreeID = await contract.claimDegree();
    console.log("claimed degree id", claimedDegreeID);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Certify</title>
        <meta name="description" content="Certificates over blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Certify</h1>
        <p className={styles.description}>
          Provide indestructible and non fungible certificates as SBTs overchain{" "}
        </p>
        <>
          <DegreeModal
            showModal={showModal}
            setShowModal={setShowModal}
          ></DegreeModal>
          <VerifyModal
            showModal={verifyModal}
            setShowModal={setVerifyModal}
          ></VerifyModal>

          {/* <Button onClick={handleModal} text="Issue Degree" theme="secondary" /> */}
          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Issue A Degree
          </button>
          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setVerifyModal(true)}
          >
            Verify A Degree
          </button>
          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={claimDegree}
          >
            Request Degree
          </button>
        </>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          by Team tstar
        </a>
      </footer>
    </div>
  );
}

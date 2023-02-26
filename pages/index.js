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
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const [cover, setCover] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function uploadCoverToIpfs() {
    return "https://certify.infura-ipfs.io/ipfs/Qmag6v5zB44tp2aSrbzFdVEaRGkLsVRdVDR5p8KA5sowpA";
    const data = JSON.stringify({
      name: "Test Degree",
      description:
        "This is to certify that 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 graduated from our college",
      image:
        "https://certify.infura-ipfs.io/ipfs/QmaHKzD9YXBFVV6TmA6mbbLdq68uTGqLM4mXLbpgZzNRPP",
      attributes: [
        { trait_type: "CGPA", value: "7.5" },
        { trait_type: "Degree Type", value: "Bachelor's" },
        { trait_type: "Major", value: "Computer Science" },
      ],
    });
    let jsonUrl;
    try {
      const added = await ipfs.add(data);
      jsonUrl = `https://certify.infura-ipfs.io/ipfs/${added.path}`;
    } catch (error) {
      console.log("Error uploading json data to ipfs: ", error);
    }
    console.log("updated json url", jsonUrl);

    // return "https://certify.infura-ipfs.io/ipfs/QmaHKzD9YXBFVV6TmA6mbbLdq68uTGqLM4mXLbpgZzNRPP";
    // let imageUrl;
    // try {
    //   const result = await ipfs.add(cover);
    //   console.log("infura result", result);
    //   imageUrl = `https://certify.infura-ipfs.io/ipfs/${result.path}`;
    // } catch (error) {
    //   console.log("Error uploading cover image to ipfs: ", error);
    // }
    // console.log("degree cover is ", imageUrl);
  }
  async function selectCover(e) {
    const file = e.target.files[0];
    setCover(file);
  }
  async function issueDegree() {
    // if (!cover) return;
    // let coverUrl = uploadCoverToIpfs();

    const url = await uploadCoverToIpfs();
    console.log("updating json metadata", url);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(degree, Degree.abi, signer);

    const address = "0x6F7CFD0713e9985A3D8919855E76a8988C622793";
    let isssueDeg = await contract.isssueDegree(address);
    console.log("Degree Issued", isssueDeg);
  }
  async function handleModal() {
    setShowModal(true);
  }

  async function claimDegree() {
    let jsonUrl = await uploadCoverToIpfs();
    console.log("while cliaming", jsonUrl);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(degree, Degree.abi, signer);
    let claimedDegreeID = await contract.claimDegree(jsonUrl);
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
          <div>
            <label>Select a image </label>
            <input
              onChange={selectCover}
              type="file"
              accept=".jpeg,.jpg,.png"
            />
          </div>
          {/* <Button onClick={handleModal} text="Issue Degree" theme="secondary" /> */}
          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Issue A Degree
          </button>

          <Button
            onClick={claimDegree}
            text="Request Degree"
            theme="secondary"
          />
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

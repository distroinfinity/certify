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
import Testimonials from "../components/testimonials";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Certify</title>
        <meta name="description" content="Certificates over blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Hero />
      <Testimonials />
      <main className={styles.main}>
        {/* <h1 className={styles.title}>Welcome to Certify</h1>
        <p className={styles.description}>
          Provide indestructible and non fungible certificates as SBTs overchain{" "}
        </p> */}
        <>
          {/* <Button onClick={handleModal} text="Issue Degree" theme="secondary" /> */}
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

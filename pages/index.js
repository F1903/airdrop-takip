// 1. pages/index.js
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [adminMode, setAdminMode] = useState(false);

  const getData = () => {
    fetch('/api/nfts')
      .then(res => res.json())
      .then(setNfts);
  };

  useEffect(() => {
    getData();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setAdminMode(true);
    }
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/delete?id=${id}`, { method: 'DELETE' })
      .then(() => getData());
  };

  return (
    <div className="container">
      <Head><title>NFT Listesi</title></Head>
      <h1>NFT Listesi</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Mint Price (SUI)</th>
            <th>Mint Price (USD)</th>
            {adminMode && <th>Sil</th>}
          </tr>
        </thead>
        <tbody>
          {nfts.map((nft) => (
            <tr key={nft.id}>
              <td><img src={nft.image} width="50" /></td>
              <td>{nft.name}</td>
              <td>{nft.priceSui}</td>
              <td>{nft.priceUsd}</td>
              {adminMode && (
                <td><button onClick={() => handleDelete(nft.id)}>Sil</button></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
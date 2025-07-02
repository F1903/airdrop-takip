// 1. pages/index.js
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [airdrops, setAirdrops] = useState([]);

  const getData = () => {
    fetch('/api/airdrops')
      .then(res => res.json())
      .then(setAirdrops);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <Head><title>Airdrop Takip</title></Head>
      <h1>Airdrop Takip Listesi</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stage</th>
            <th>Official Accounts</th>
            <th>Important Links</th>
            <th>Details - To Do List</th>
            <th>Funds Amount</th>
            <th>TGE/Mainnet Date</th>
            <th>Chain</th>
            <th>Live</th>
            <th>Estimated Cost</th>
          </tr>
        </thead>
        <tbody>
          {airdrops.map((item) => (
            <tr key={item.id}>
              <td>{item.Name}</td>
              <td>{item.Stage}</td>
              <td>{item.Official_Accounts}</td>
              <td>{item.Important_Links}</td>
              <td>{item.Details_to_do_list}</td>
              <td>{item.Funds_amount}</td>
              <td>{item.TGE_MAINNET_DATE}</td>
              <td>{item.Chain}</td>
              <td>{item.Live}</td>
              <td>{item.Estimated_Cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
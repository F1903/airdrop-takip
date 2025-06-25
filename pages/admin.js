// 2. pages/admin.js
import { useState } from 'react';
import './styles/globals.css';

export default function Admin() {
  const [showPanel, setShowPanel] = useState(false);
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({ image: '', name: '', priceSui: '', priceUsd: '' });
  const [nfts, setNfts] = useState([]);

   const getData = () => {
    fetch('/api/nfts')
      .then(res => res.json())
      .then(setNfts);
  };

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setShowPanel(true);
      getData();
    } else {
      alert('Şifre yanlış');
    }
  };

  const handleSubmit = () => {
  fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  })
  .then(res => res.json())
  .then(result => {
    if (result.success) {
      alert('NFT Eklendi!');
      window.location.href = '/';
    } else if (result.error) {
      alert('Hata: ' + result.error);
    }
  })
  .catch(err => {
    console.error('İstek Hatası:', err);
    alert('Sunucu hatası oluştu!');
  });
};

const handleDelete = (id) => {
    fetch(`/api/delete?id=${id}`, { method: 'DELETE' })
      .then(() => getData());
  };


  return (
   <div className="adminContainer">
      {!showPanel ? (
        <div className="adminPanel">
          <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Giriş Yap</button>
        </div>
      ) : (
        <div className="adminPanel">
          <input placeholder="NFT Image URL" onChange={e => setForm({...form, image: e.target.value})} />
          <input placeholder="NFT Name" onChange={e => setForm({...form, name: e.target.value})} />
          <input placeholder="Mint Price (SUI)" onChange={e => setForm({...form, priceSui: e.target.value})} />
          <input placeholder="Mint Price (USD)" onChange={e => setForm({...form, priceUsd: e.target.value})} />
          <button onClick={handleSubmit}>Ekle</button>

          <h2 style={{marginTop: '30px'}}>NFT Listesi</h2>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Mint Price (SUI)</th>
                <th>Mint Price (USD)</th>
                <th>Sil</th>
              </tr>
            </thead>
            <tbody>
              {nfts.map((nft) => (
                <tr key={nft.id}>
                  <td><img src={nft.image} width="50" /></td>
                  <td>{nft.name}</td>
                  <td>{nft.priceSui}</td>
                  <td>{nft.priceUsd}</td>
                  <td><button onClick={() => handleDelete(nft.id)}>Sil</button></td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}

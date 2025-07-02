// 2. pages/admin.js
import { useState, useEffect } from 'react';
import './styles/globals.css';

export default function Admin() {
  const [showPanel, setShowPanel] = useState(false);
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({
    Name: '',
    Stage: '',
    Official_Accounts: '',
    Important_Links: '',
    Details_to_do_list: '',
    Funds_amount: '',
    TGE_MAINNET_DATE: '',
    Chain: '',
    Live: '',
    Estimated_Cost: ''
  });
  const [airdrops, setAirdrops] = useState([]);

  const getData = () => {
    fetch('/api/airdrops')
      .then(res => res.json())
      .then(setAirdrops);
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
    fetch('/api/save-airdrop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(() => {
      alert('Kayıt Eklendi!');
      getData();
    });
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
          {Object.keys(form).map((key) => (
            <input
              key={key}
              placeholder={key}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
            />
          ))}
          <button onClick={handleSubmit}>Ekle</button>

          <h2 style={{marginTop: '30px'}}>Airdrop Listesi</h2>
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
      )}
    </div>
  );
}
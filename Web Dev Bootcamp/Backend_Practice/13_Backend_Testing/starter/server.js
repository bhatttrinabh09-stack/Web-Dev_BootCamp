import express from 'express';

export const app = express();
app.use(express.json());

export let accountsDb = [
  { id: "acc-1", email: "alex@example.com", balance: 500 },
  { id: "acc-2", email: "samira@example.com", balance: 1250 },
];

app.get('/api/accounts', (req, res) => {
  res.status(200).json(accountsDb);
});

app.get('/api/accounts/:id', (req, res) => {
  const account = accountsDb.find(a => a.id === req.params.id);
  if (!account) return res.status(404).json({ error: "Account not found" });
  res.status(200).json(account);
});

app.post('/api/accounts', (req, res) => {
  const { email, balance } = req.body;
  if (!email || balance === undefined || balance < 0) {
    return res.status(400).json({ error: "Invalid email or balance" });
  }
  const newAccount = { id: "acc-" + Date.now(), email, balance };
  accountsDb.push(newAccount);
  res.status(201).json(newAccount);
});

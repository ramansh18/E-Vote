# 🗳️ dVoting — Decentralised Voting System

A decentralized, blockchain-based voting platform designed to ensure secure, transparent, and tamper-proof elections. Built using **Ethereum Smart Contracts**, **Node.js**, **React**, and **MongoDB**.

> Developed by **Ramansh Saxena** as a final year CSE project, now shaped into a full-fledged decentralized voting application.

---

## 🔁 System Workflow

1. **Admin** deploys the smart contract and creates elections with relevant candidate details.
2. **Users** register as voters and request to participate.
3. **Admin** verifies and approves voters.
4. Approved **voters cast votes** on-chain.
5. After the election ends, **results** are displayed transparently.

---

## ⚙️ Setup & Development Guide

### ✅ Prerequisites

- [Node.js](https://nodejs.org) (v16+ recommended)
- [Truffle](https://trufflesuite.com/truffle)
- [Ganache CLI](https://github.com/trufflesuite/ganache-cli) or [Ganache GUI](https://trufflesuite.com/ganache)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB

---

### 🧪 Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/ramansh18/E-Vote.git
```

#### 2. Install Global Dependencies

```bash
npm install -g truffle
npm install -g ganache-cli
```

#### 3. Start Local Blockchain

```bash
ganache-cli --mnemonic "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" --accounts 10 --port 8545
```

> This mnemonic is required to match relayer and frontend wallet addresses.

Alternatively, open **Ganache GUI**, create a new workspace, and paste the same mnemonic in the settings.

#### 4. Deploy Smart Contracts

```bash
truffle migrate --network development

```

---

### 📁 Environment Configuration

#### Create a `.env` file inside both `backend/` and `client/` directories:

##### ✅ backend/.env

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dVoting
JWT_SECRET=yourSuperSecretJWTKey
MAIL_USER=your_email@example.com
MAIL_PASS=your_email_password
MAIL_HOST=smtp.example.com
RELAYER_PRIVATE_KEY=your_ganache_private_key
```

> Replace `RELAYER_PRIVATE_KEY` with a private key from one of the Ganache accounts (funded from the mnemonic above).



### 🖥️ Start the Project

#### 5. Start the Backend

```bash
cd backend
npm install
npm run start
```

Backend should run at: [http://localhost:5000](http://localhost:5000)

#### 6. Start the Frontend

```bash
cd ../client
npm install
npm run dev
```

Frontend should run at: [http://localhost:5173](http://localhost:5173)

---



## 📌 Important Notes

- Use **Ganache with the provided mnemonic** to match addresses across client and relayer setup.
- All voting interactions occur on the **local blockchain**.
- MongoDB URI should point to a working local or cloud MongoDB instance.
- No Metamask is required — interactions happen via backend relayer.

---

## 👨‍💻 Developed by Ramansh Saxena

Made with ❤️ for a transparent and secure digital future.

# Manipal Hackathon 2024 README

**Team Name:** Jonne Youjj Karo

**Problem Statement:**  
Small and medium-sized enterprises (SMEs) often struggle with limited access to essential resources, hindering their ability to explore new markets, secure funding, develop business skills, and build networks. Design a comprehensive online platform aimed at empowering SMEs by addressing these limitations. The platform should include features such as networking and collaboration tools, a focus on supporting rural businesses, a business directory with advanced search and filtering options, project management and collaboration capabilities, and a user management system with secure login and access controls. Additionally, incorporate a dedicated portal for interaction between SMEs, entrepreneurs, and investors to foster connections and drive economic growth.

---

## 📜 Introduction

Our project enables entrepreneurs, investors, warehouse owners, and shopkeepers to connect and collaborate effectively. The platform simplifies **financial management**, **networking**, and **inventory leasing** through tools like **KhaataBook**, **smart proposals**, and **warehouse listing services**. We leverage technologies such as **React.js, Node.js, MongoDB** and **JWT authentication** to ensure **secure and seamless experiences.**

---

## ✨ Features

### Website:
- **Warehouse Leasing Platform**: Flexible storage rentals, supporting rural and urban businesses.
- **Proposal System**: Exchange proposals with pitch decks and collaborate via real-time chat and video call meetings seamlessly. 
- **KhaataBook Module**: Track daily transactions and auto-generate monthly reports.  
- **Networking Tools**: Connect with investors and entrepreneurs    
- **Bulk Orders Marketplace**: Negotiate and finalize bulk deals in exclusive chatrooms.  
- **Event Management**: Host public/private events with automated e-ticket confirmations.

---
#
## ⚙️ Instructions For Local Deployment Without Docker

### Steps to Run Locally

---

### 1. Clone the Repository
```bash
git clone https://github.com/ManipalHackathon2024/Jonne-youjj-karo.git
cd Jonne-youjj-karo
```

---

### 2. Client Setup (Frontend)

1. **Navigate to the Client Directory:**
   ```bash
   cd client
   ```

2. **Set Up the `.env` File:**  
   Create a `.env` file inside the `client` directory with the following content:

   ```
   VITE_SERVER_URL=
   VITE_SOCKET_URL=
   VITE_SUPABASE_URL=
   VITE_SUPABASE_KEY=
   VITE_ZEGO_APP_ID=
   VITE_ZEGO_APP_SECRET=
   ```

   This will configure the client to communicate with the backend server.

3. **Install Client Dependencies:**
   ```bash
   yarn install
   ```

4. **Start the Client Server:**
   ```bash
   yarn dev
   ```

5. **Access the Frontend:**  
   The client will run at: http://localhost:5173

---

### 3. Server Setup (Backend)

1. **Open a New Terminal and Navigate to the Server Directory:**
   ```bash
   cd server
   ```

2. **Set Up the `.env` File:**  
   Create a `.env` file inside the `server` directory with the following content:

   ```
    PORT = "" 
    DATABASE_URL = ""
    JWT_SECRET="
    FRONTEND_URL=""
    EMAIL_USER=""
    APP_PASSWORD=""
   ```

3. **Install Server Dependencies:**
   ```bash
   yarn install
   ```

4. **Start the Backend Server:**
   ```bash
   yarn dev
   ```

5. **Access the Backend:**  
   The backend server will run at: http://localhost:3000

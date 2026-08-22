# ContentCue — Social Strategy Portal

A React 18 + Vite + TypeScript portal for social media strategists, with a floating AI chat popup powered by Azure OpenAI and a Node/Express backend.

## Full file tree

```text
socialmediaaug22/
├── .env
├── .env.example
├── .gitignore
├── README.md
├── netlify.toml
├── backend/
│   ├── package.json
│   └── server.js
├── netlify/
│   └── functions/
│       └── chat.ts
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── styles.css
│       ├── components/
│       │   ├── ChatPopup.tsx
│       │   └── Layout.tsx
│       ├── data/
│       │   ├── calendar.json
│       │   ├── clients.json
│       │   ├── dashboard.json
│       │   └── playbook.json
│       └── pages/
│           ├── ClientsPage.tsx
│           ├── ContentCalendarPage.tsx
│           ├── DashboardPage.tsx
│           └── PlaybookPage.tsx
└── node_modules/
```

## Local run

### 1) Install frontend dependencies

```bash
cd frontend
npm install
```

### 2) Install backend dependencies

```bash
cd ../backend
npm install
```

### 3) Create environment file

Create a `.env` in the project root with the Azure OpenAI values:

```env
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-azure-openai-key
AZURE_OPENAI_DEPLOYMENT=gpt-4o
```

### 4) Start backend

```bash
cd backend
npm run dev
```

### 5) Start frontend

Open a second terminal:

```bash
cd frontend
npm run dev
```

### 6) Open the app

```text
http://localhost:5173
```

## Netlify deployment

### 1) Create a GitHub repo

- Create a new GitHub repository.
- Push this project to GitHub.

### 2) Connect to Netlify

- Log in to Netlify.
- Click Add new project → Import from Git.
- Select your repo.
- Set the build command:

```bash
cd frontend && npm install && npm run build
```

- Set the publish directory:

```text
frontend/dist
```

- Use the functions directory:

```text
netlify/functions
```

### 3) Add environment variables in Netlify

In Netlify Project configuration → Environment variables, add:

```text
AZURE_OPENAI_ENDPOINT
AZURE_OPENAI_API_KEY
AZURE_OPENAI_DEPLOYMENT
```

These values stay server-side and are not exposed to the browser.

## Important precision controls to verify first

1. React 18 + Vite + TypeScript app under /frontend
2. Express backend under /backend
3. Branding colors match exactly:
   - primary #1f2a44
   - accent #e8536a
   - background #f7f6f3
   - text #1a1a1a
4. Header text: ContentCue — Social Strategy Portal
5. Chat launcher label: Ask Strategist
6. First assistant message exactly matches the required text
7. Four router pages exist: Dashboard, Content Calendar, Clients / Brands, Playbook
8. Azure env vars are named exactly: AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, AZURE_OPENAI_DEPLOYMENT
9. Netlify function path exists at netlify/functions/chat.ts
10. Demo fallback works when Azure variables are missing

## Notes

- The frontend calls the backend at /api/chat.
- The backend uses the official AzureOpenAI SDK.
- If the Azure environment is not configured, the chatbot still works in demo mode.

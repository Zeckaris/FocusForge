# FocusForge – One Goal, One Focus

[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/Zeckaris/FocusForge?label=release&sort=semver)](https://github.com/Zeckaris/FocusForge/releases)
[![GitHub last commit](https://img.shields.io/github/last-commit/Zeckaris/FocusForge)](https://github.com/Zeckaris/FocusForge/commits/main)

**A motivational single-goal tracking web application developed as a Software Configuration Management (SCM) mini-project by Group 7.**

FocusForge helps users focus on **one important goal at a time**, breaking it down into 3–7 milestones with progress tracking, streak counter, and motivational feedback.

The primary emphasis of this project is the **demonstration of full SCM practices** (planning, identification, version control, change control, baselines, releases, and audit) rather than complex functionality.

## Features

- Secure user authentication (register/login/logout)
- Create a single active goal with title, description, and milestones
- Interactive dashboard with:
  - Circular progress visualization
  - Milestone checklist (core functional action)
  - Daily streak counter
  - Celebration on goal completion
- "Start New Goal" button after completion
- Responsive and modern UI with daisyUI/Tailwind

## Project Structure
```
FocusForge/
├── docs/                  # All SCM deliverables (Markdown)
│   ├── SCMP_FocusForge.md
│   ├── CI_Register.md
│   ├── CR-001.md to CR-004.md
│   ├── Change_Log.md
│   ├── BL1_Record.md & BL2_Record.md
│   └── Configuration_Audit.md
├── src/
│   ├── client/            # React frontend (Vite + Tailwind + daisyUI)
│   └── server/            # Node.js/Express backend (Mongoose + MongoDB Atlas)
├── releases/              # Reserved for future build artifacts
└── README.md
```
## SCM Deliverables

All required SCM artifacts are available in the `/docs/` folder:
- Software Configuration Management Plan
- Configuration Item Register
- Change Requests (3 approved + 1 rejected)
- Change Log
- Baseline Records (BL1 & BL2)
- Configuration Audit Report

**Releases:**
- [v1.0 – Initial Working System](https://github.com/Zeckaris/FocusForge/releases/tag/v1.0)
- [v1.1 – Final Enhanced Version](https://github.com/Zeckaris/FocusForge/releases/tag/v1.1)

## Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, daisyUI, canvas-confetti
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **Authentication**: JWT + bcrypt
- **SCM Tools**: Git, GitHub, GitHub Releases

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Zeckaris/FocusForge.git
   cd FocusForge
   ```
2. Start the backend:
   ```bash
   cd src/server
   npm install
   npm run dev
   ```
3. Start the frontend (in a new terminal):
   ```bash
   cd src/client
   npm install
   npm run dev
   ```
4. Open http://localhost:5173 in your browser.


   

---
title:       Software Configuration Management Plan (SCMP)
subtitle:    FocusForge – One Goal, One Focus
author:
  - Amanuel Fisseha (Leader & Main Developer)          – ETS0156/14
  - Amanuel Firew (SCM Manager)                        – ETS0157/14
  - Amanuel Addisu (Documentation Support)             – ETS0162/14
  - Ammar Mohammed (Testing & Additional Developer)   – ETS0191/14
  - Amanuel Million (UI Review)                        – ETS0163/14
  - Amanuel Wonde (Additional Developer)               – ETS0166/14
date:        December 19, 2025
institute:   Department of Software Engineering\\Addis Ababa Science and Technology University
papersize:   a4
fontsize:    12pt
geometry:    margin=1in
header-includes:
  - \usepackage{graphicx}
  - \usepackage{fancyhdr}
  - \pagestyle{fancy}
  - \fancyhead[C]{SCM Mini Project – Group 7}
  - \fancyfoot[C]{\thepage}
---

# 1. Introduction and Purpose

Software Configuration Management (SCM) is a supporting discipline that ensures the integrity, traceability, and control of software artifacts throughout the entire software development life cycle. As highlighted in the course lectures, SCM enables teams to manage, organize, and control changes effectively, resulting in higher productivity, improved quality, and minimal mistakes in software projects.

This Software Configuration Management Plan (SCMP) establishes the policies, procedures, and responsibilities for applying SCM practices to **FocusForge** – a motivational single-goal tracking web application developed by Group 7 as part of the Software Configuration Management mini-project.

FocusForge consists of four main pages:
- A secure login/authentication page
- A goal creation page where users define a goal title, short description, and 3–7 milestones
- A central dashboard displaying the active goal with progress visualization, an interactive milestone checklist (where marking a milestone as complete represents the **core functional action**), motivational elements, streak counter, and daily reflection
- A completed goals archive page showing past achievements

Data persistence is achieved using MongoDB Atlas, with full-stack implementation using modern technologies (React + Vite + Tailwind/daisyUI for frontend, Node.js + Express + Mongoose for backend).

The primary purpose of this SCMP is to provide a structured framework for managing all configuration items and changes during the development of FocusForge, thereby demonstrating practical application of the complete SCM lifecycle as required by the mini-project assignment (due December 30, 2025).

Specifically, this plan enables the team to:
- Identify and control configuration items systematically
- Implement version control and branching strategies using Git and GitHub
- Manage changes through a formal Change Request process
- Establish and maintain baselines
- Perform release management and configuration audits
- Ensure full traceability and reproducibility of the software product

By adhering to this plan, Group 7 will fulfill all seven project objectives outlined in the assignment while aligning with IEEE Standard 828-2012 for Configuration Management Plans and the core SCM principles taught in the course (configuration identification, control, status accounting, and auditing).


# 2. Scope
This SCMP applies to all artifacts produced during the project lifecycle, including:

- Source code (frontend and backend)
- Documentation (requirements, design, SCMP, audit reports)
- Database schemas and models
- Release packages and notes
- Configuration files
  
It excludes third-party libraries and external services (e.g., MongoDB Atlas, daisyUI).

# 3. References
- IEEE Std 828-2012 — Standard for Configuration Management
- SCM Mini Project Assignment Document (12/30/2025)
- Course slides — Yimer Amedie (MSc.), AASTU, September 2025

# 4. Project Overview

FocusForge is a web application designed to help users focus on one important goal at a time. Key features include:

- User authentication (login page)
- Goal creation with title, description, and 3–7 milestones
- Interactive dashboard showing progress, milestone checklist (core functional action: marking milestone complete with confetti animation), streak counter, and motivational elements
- Archive page for completed goals

Technology stack:
- Frontend: React + Vite + Tailwind CSS + daisyUI
- Backend: Node.js + Express + Mongoose
- Database: MongoDB Atlas
- Authentication: JWT with httpOnly cookies

The application is intentionally simple in functionality but rich in SCM process demonstration.

# 5. Roles and Responsibilities
| Role                     | Member(s)                                   | Responsibilities                                      |
|--------------------------|---------------------------------------------|-------------------------------------------------------|
| Project Leader           | Amanuel Fisseha (ETS0156/14)                | Overall coordination, main development                |
| SCM Manager              | Amanuel Firew (ETS0157/14)                  | SCMP maintenance, baselines, change control, audit   |
| Main Developer           | Amanuel Fisseha (ETS0156/14)                | Core implementation, feature branches                 |
| Additional Developers    | Ammar Mohammed, Amanuel Wonde               | Support coding tasks                                  |
| Documentation & Review   | Amanuel Addisu, Amanuel Million             | Document preparation, UI/review support               |
| Change Control Board     | Amanuel Firew + Amanuel Fisseha             | Review and approve all Change Requests                |

# 6. Configuration Identification
All Configuration Items (CIs) are registered in `docs/CI_Register.md`.  
**Naming convention:** `FF-[Type]-[Name]-vX.Y`  
Examples: `FF-Code-Dashboard-v1.0.jsx`, `FF-Doc-SCMP-v1.0.pdf`

# 7. Versioning Rules
The project uses a simple and consistent versioning approach for configuration items, baselines, and releases.

- Individual Configuration Items (listed in the CI Register and file names) use the format **vX.Y** (e.g., v1.0, v1.1).
  - X.Y matches the current release version.
  - Updated only when the item is formally changed.

- Baselines are identified with simple Git tags:
  - **BL1**: Initial controlled state (repository setup, finalized documentation, CI Register)
  - **BL2**: Complete working prototype including all features and implemented Change Requests

- Releases published on GitHub Releases use semantic versioning within the 1.x series:
  - **v1.0**: Initial working system (login, goal creation, basic dashboard)
  - **v1.1**: Final version after processing and implementing the three required Change Requests

Git tags for releases will be v1.0 and v1.1.  
This versioning strategy ensures clear traceability and aligns with the scope and duration of the SCM mini-project.

# 8. Branching Model
- `main` → protected production branch  
- `feature/*` → all development (minimum 3 branches)  
- No direct commits to `main` — only via Pull Requests

# 9. Change Control Process

Change control is a core SCM activity to ensure that all modifications to baselined configuration items are properly identified, evaluated, approved, and tracked.

The project will follow a formal Change Request (CR) process to manage exactly three (3) required changes during development.

**Process steps:**

1. **Identify the need for change** (e.g., bug fix, UI improvement, feature enhancement).
2. **Fill out the Change Request Form** (template located at `/docs/CR_Template.md`) with:
   - Unique CR ID (e.g., CR-001)
   - Description of the change
   - Reason and priority
   - Impacted Configuration Items
   - Proposed solution
   - Requester and date
3. **Submit the CR** to the Change Control Board (CCB) — consisting of the SCM Manager (Amanuel Firew) and Project Leader (Amanuel Fisseha).
4. **CCB Review**: Evaluate impact on schedule, quality, and other CIs. Approve or reject within the same day.
5. If **approved**:
   - Create a dedicated branch (e.g., `change/cr-001`)
   - Implement the change
   - Commit with message referencing the CR ID
   - Open a Pull Request on GitHub with CR details in description
   - Perform self-review (or team member review)
   - Merge into `main` only after approval
6. **Update status accounting**:
   - Mark CR as "Implemented" in the form
   - Add entry to `/docs/Change_Log.md` (CR ID, date, description, status, impacted CIs)

**Exactly three Change Requests will be submitted, approved, implemented, and documented** to satisfy Deliverable 4.

This process ensures all changes are traceable, controlled, and auditable, aligning with IEEE 828-2012 and course teachings on configuration control.



```mermaid
flowchart TD
    A[Need for change identified] --> B[Fill CR Template<br>/docs/CR_Template.md]
    B --> C[Submit to CCB]
    C --> D{CCB Review}
    D -->|Rejected| E[Document reason<br>Update CR status]
    D -->|Approved| F[Create branch<br>change/cr-XXX]
    F --> G[Implement change]
    G --> H[Open PR with CR details]
    H --> I[Self/Team Review]
    I --> J[Merge to main]
    J --> K[Update Change_Log.md<br>Mark CR as Implemented]

# 11. Release Management
Two GitHub Releases:
- v1.0 — Initial working system
- v1.1 — After CR implementation and enhancements

# 12. Tools
- Git + GitHub
- VS Code
- Node.js, React (Vite), Tailwind CSS
- MongoDB Atlas
- Markdown + Markdown Preview Enhanced (documentation)

**Approved by:**  
Amanuel Firew – SCM Manager  
Amanuel Fisseha – Project Leader  
**Date:** December 19, 2025

<!-- page break -->
<div style="page-break-after: always;"></div>
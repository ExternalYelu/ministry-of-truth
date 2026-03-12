# Ministry of Truth — Official Web Portal

> *"Who controls the past controls the future. Who controls the present controls the past."*
> — George Orwell, *1984*

A satirical website built as an AP Literature final project, designed to replicate the Ministry of Truth from George Orwell's *1984* as a modern, polished government platform. The site critiques how institutions normalize control through language, design, and presentation — drawing parallels to modern misinformation culture.

## Overview

This project imagines what the Ministry of Truth's public-facing website would look like if it existed today. Every element — from the reassuring corporate tone to the euphemistic language — is crafted to feel disturbingly plausible. The site never breaks character: it presents propaganda as public service, censorship as correction, and control as care.

## Pages

| Page | Description |
|------|-------------|
| **Gate** | Clearance screen requiring a password to enter the site |
| **Homepage** | Hero banner with rotating slogans, live "accuracy" ticker, mission statement, and public service announcement |
| **About Us** | Institutional overview, organizational structure, and interactive timeline of "corrections" |
| **Commitment to Accuracy** | Satirical breakdown of the Ministry's "correction process" and monitoring technology |
| **Citizen Resources** | Forms for reporting inconsistencies, scheduling "cognitive alignment," and downloading compliance materials |
| **Careers** | Corporate recruitment page with positions like *Narrative Consistency Analyst* and *Memory Verification Associate* |
| **Frequently Corrected Questions** | Polite but evasive answers to uncomfortable questions about truth and memory |
| **Newsroom** | Press releases filtered by year, announcing "statistical improvements" and "record citizen confidence" |
| **Updated Slogans** | Minimalist display of Party slogans |
| **Posters Gallery** | Propaganda-style digital posters available for "download" |
| **Citizen Login** | Immersive login portal with Citizen ID and "Forgot Memory?" link |

## Features

- **Password-gated entry** — visitors must enter a clearance code to access the site
- **Admin CMS mode** — live text editing for content management (Ctrl+Shift+M or footer gear icon)
- **Rotating hero slogans** with smooth transitions
- **Live accuracy ticker** mimicking a financial news feed
- **Interactive accordions** for FCQ and career listings
- **Newsroom filtering** by year
- **Scroll-triggered animations** and fade-in effects
- **Session synchronization popup** — periodic "Your session has been synchronized" notification
- **Animated dashboard counters** on the Accuracy page

## Tech Stack

- HTML5, CSS3, JavaScript (vanilla — no frameworks)
- Google Fonts (Inter, Space Grotesk)
- Inline SVG icons
- localStorage for authentication state and CMS persistence

## Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ministry-of-truth.git
cd ministry-of-truth

# Start a local server
python3 -m http.server 8080

# Open in browser
# Navigate to http://localhost:8080/gate.html
```

## Project Context

This website was created as a final project for AP Literature, demonstrating thematic understanding of George Orwell's *1984*. It explores how authoritarian regimes use language, bureaucracy, and institutional aesthetics to manufacture consent and normalize the suppression of truth.

The satire operates on multiple levels:
- **Visual design** — clean, trustworthy corporate aesthetic that masks sinister purpose
- **Language** — euphemisms like "memory adjustment," "historical integrity," and "cognitive alignment"
- **Structure** — familiar website patterns (careers page, FAQ, newsroom) applied to an oppressive institution
- **Interaction** — the password gate and login portal make the visitor complicit in the system

## License

This project is for educational purposes only.

---

*Reality subject to revision.*

# Rijwal VP — Professional 3D Cybersecurity & Cloud Portfolio

> "Exploring Technology. Building Security. Engineering the Future."

A premium, interactive, responsive 3D personal portfolio website engineered for **Rijwal VP** — Cybersecurity Enthusiast, Cloud & DevOps Learner, and BCA student at Marian College Kuttikkanam (Autonomous), Kerala, India.

Inspired by advanced spatial WebGL interaction and high-performance frontend engineering (such as [Yashchauhan008/portfolio-3d](https://github.com/Yashchauhan008/portfolio-3d)), this portfolio delivers an extraordinary cyberpunk aesthetic tailored specifically to technical recruiters, DevSecOps leads, and cloud architects.

---

## 🚀 Key Features & Highlights

1. **Full-Screen 3D Cyber Core (Three.js WebGL)**
   - Interactive 3D cryptographic security sphere with dual orbiting planetary telemetry rings.
   - Satellite data nodes with real-time procedural orbital mechanics.
   - Mouse-responsive parallax and dynamic drag rotation with smooth inertia damping.
   - Interactive **Security Scan Pulse** (`[!] SCAN PULSE`) that triggers energy waves across the 3D geometry.
   - Graceful zero-dependency fallback canvas for low-power or restricted browser environments.

2. **Interactive Background Constellation (HTML5 Canvas)**
   - Dynamic floating network nodes with proximity line connections.
   - Floating binary bits and cybersecurity protocol tokens (`01`, `SYN`, `ACK`, `SEC`, `TCP`, `AWS`, `SSH`).
   - Mouse repulsion physics: cursor smoothly disperses surrounding nodes.

3. **Synthesized Web Audio Cyber Sound FX (`audio-fx.js`)**
   - Pure Web Audio API procedural synthesizer: zero external `.mp3` or `.wav` files required!
   - Synthesizes laser scans, UI clicks, access-granted chimes, and alert beeps.
   - Muted by default to respect accessibility standards, with one-click sound toggle in navbar.

4. **Interactive Cyber CLI Terminal (`terminal.js`)**
   - Floating `[ >_ CLI CONSOLE ]` launcher and navbar button (plus hotkey **`~`** backtick toggle).
   - Real terminal emulator (`rijwal@cyber-node:~$`) supporting commands:
     - `whoami`: Candidate identity and summary
     - `skills`: Categorized skill matrix
     - `projects`: Featured repositories with direct links
     - `labs`: Detailed breakdown of authorized lab testing
     - `cloud`: AWS cloud architecture capabilities
     - `education`: Academic degrees & institutions
     - `internship`: IPSR Solutions Ltd experience
     - `cv`: Directly triggers download of `RijwalVP-CV.pdf`
     - `scan`: Interactive simulated vulnerability audit
     - `clear` & `exit`: Screen management
   - Supports command history (Up/Down arrows) and autocomplete (Tab).

5. **Curated Showcase of Rijwal VP's Real Background**
   - **Identity**: BCA at Marian College Kuttikkanam, HSS at GBoys HSS Manjeri (Computer Science).
   - **IPSR Solutions Ltd Internship**: Linux administration, AWS, Azure, GNS3, DevOps, and OWASP.
   - **Featured Projects**:
     - **GhostWatch**: Python-based Linux behavioral security monitor detecting unauthorized file access and data exfiltration.
     - **Cloud-Based Student Portal**: AWS EC2 + RDS MySQL + Next.js full-stack system with GitHub Actions CI/CD.
     - **NetworkSimLab**: GNS3 enterprise network simulation with 802.1Q VLAN trunking and routing protocols.
     - **Flask Docker Todo App**: Multi-stage containerized Python web application.
   - **Dedicated AWS Cloud Experience**: EC2, S3 encryption, IAM least-privilege, RDS MySQL, CloudWatch, and CloudTrail.
   - **Authorized Cybersecurity Labs**: Kali Linux, Nmap, Metasploitable2, Burp Suite, FTP/SMB/NFS auditing, MQTT broker security, and Binwalk firmware analysis.
   - **Certificate Gallery**: Interactive modal inspector with verifiable learning milestones.

---

## 📂 Project Structure

```
rijwal-vp-cyber-portfolio-3d/
├── index.html                   # Master HTML5 layout with cyberpunk theme & SEO tags
├── css/
│   ├── style.css                # Master styling, glassmorphism, HUD brackets, colors
│   └── responsive.css           # Mobile, tablet, and reduced-motion optimizations
├── js/
│   ├── main.js                  # Navigation, scrollspy, filter tabs, modal controls
│   ├── cyber-3d.js              # Three.js 3D Cyber Core & WebGL interaction
│   ├── particle-matrix.js       # Background interactive digital constellation
│   ├── terminal.js              # Interactive Cybersecurity CLI Console
│   └── audio-fx.js              # Web Audio API futuristic sound synthesizer
├── assets/
│   ├── documents/
│   │   └── RijwalVP-CV.pdf      # Official CV PDF
│   └── images/
│       ├── rijwal-portrait.jpg  # Rijwal VP profile photograph
│       ├── rijwal-profile.png   # Transparent profile cutout
│       ├── projects/            # High-tech SVG architecture graphics
│       │   ├── ghostwatch.svg
│       │   ├── student-portal.svg
│       │   ├── network-sim-lab.svg
│       │   └── todo-app.svg
│       └── certs/               # High-res certificate preview graphics
│           ├── ipsr-internship-cert.svg
│           ├── aws-cloud-cert.svg
│           ├── linux-admin-cert.svg
│           └── networking-lab-cert.svg
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Pages CI/CD workflow
├── package.json                 # Optional Vite / Node configuration
├── vite.config.js               # Vite bundler configuration
├── vercel.json                  # Vercel deployment & security headers config
├── netlify.toml                 # Netlify deployment configuration
└── README.md                    # Documentation & deployment guide
```

---

## 💻 Local Quick Start

### Method 1: Instant Python HTTP Server (Zero Install)
Since Python 3 is installed on your system, you can run the portfolio immediately without installing any dependencies:

```bash
cd "C:\Users\VICTUS\.gemini\antigravity\scratch\rijwal-vp-cyber-portfolio-3d"
python -m http.server 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

### Method 2: Modern Vite Bundler (Optional)
If you install Node.js / Vite in the future:
```bash
npm install
npm run dev
```

---

## 🌐 Production Deployment Guide

### Option A: Deploy to GitHub Pages (Automated via GitHub Actions)
1. Initialize Git in the project directory:
   ```bash
   cd "C:\Users\VICTUS\.gemini\antigravity\scratch\rijwal-vp-cyber-portfolio-3d"
   git init
   git add .
   git commit -m "Initial commit: Rijwal VP 3D Cybersecurity Portfolio"
   ```
2. Create a new repository on your GitHub account (`vprijwal-bit/portfolio-3d` or `vprijwal-bit.github.io`).
3. Add remote and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/vprijwal-bit/portfolio-3d.git
   git push -u origin main
   ```
4. In your GitHub repository:
   - Navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - The included `.github/workflows/deploy.yml` workflow will automatically build and publish your site!

### Option B: Deploy to Vercel (1-Click)
1. Push your code to GitHub.
2. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub.
3. Click **Add New...** → **Project** and import your repository.
4. Keep the default settings (Framework: *Other*, Root Directory: `./`).
5. Click **Deploy**. The included `vercel.json` will automatically configure security headers and static asset caching.

### Option C: Deploy to Netlify
1. Go to **[netlify.com](https://netlify.com)** and sign in.
2. Drag and drop the `rijwal-vp-cyber-portfolio-3d` folder directly into Netlify Drop, or connect your GitHub repository.
3. The included `netlify.toml` will automatically set up production security headers and publish the root directory.

---

## 🔒 Verification & Contact Information

- **Name**: Rijwal VP
- **Location**: Malappuram, Kerala, India
- **GitHub**: [github.com/vprijwal-bit](https://github.com/vprijwal-bit)
- **LinkedIn**: [linkedin.com/in/rijwalvp](https://www.linkedin.com/in/rijwalvp)
- **Email**: [vprijwal@gmail.com](mailto:vprijwal@gmail.com)
- **Resume**: Available in `assets/documents/RijwalVP-CV.pdf` and downloadable via the hero section & terminal (`cv` command).

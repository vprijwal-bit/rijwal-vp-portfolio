/**
 * TERMINAL.JS
 * Interactive Cybersecurity CLI Console
 * Gives recruiters & engineers hands-on terminal access to Rijwal VP's profile
 * Developed for Rijwal VP Portfolio
 */

(function () {
  'use strict';

  const terminalModal = document.getElementById('terminal-modal');
  const terminalBody = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-cli-input');
  const closeBtn = document.getElementById('terminal-close-btn');
  const launchBtn = document.getElementById('terminal-launcher-btn');
  const navTerminalBtn = document.getElementById('nav-terminal-btn');

  if (!terminalModal || !terminalInput || !terminalBody) return;

  const commandHistory = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: `AVAILABLE COMMANDS:
  <span class="cmd-hl">whoami</span>        - Display candidate profile & summary
  <span class="cmd-hl">skills</span>        - Technical skills matrix & tools
  <span class="cmd-hl">projects</span>      - Featured projects & GitHub repositories
  <span class="cmd-hl">labs</span>          - Authorized cybersecurity laboratory experience
  <span class="cmd-hl">cloud</span>         - AWS cloud infrastructure & services
  <span class="cmd-hl">education</span>     - Academic degrees & institutions
  <span class="cmd-hl">internship</span>    - IPSR Solutions Ltd experience
  <span class="cmd-hl">certs</span>         - Practical certificates & verifications
  <span class="cmd-hl">contact</span>       - Communication coordinates & socials
  <span class="cmd-hl">cv</span>            - Download official CV PDF
  <span class="cmd-hl">scan</span>          - Execute simulated cyber vulnerability scan
  <span class="cmd-hl">pulse</span>         - Trigger 3D security core scan wave
  <span class="cmd-hl">clear</span>         - Clear the console screen
  <span class="cmd-hl">exit</span>          - Close this terminal modal`,

    whoami: `CANDIDATE IDENTITY:
  Name       : <span class="cyan-hl">Rijwal VP</span>
  Title      : <span class="purple-hl">Cybersecurity Enthusiast | Cloud & DevOps Learner | BCA Student</span>
  Location   : Kerala, India (Malappuram)
  Summary    : Dedicated and career-oriented BCA student with practical knowledge in 
               offensive/defensive cybersecurity labs, AWS cloud infrastructure, 
               Linux administration, and DevOps automation. Continuous learner with 
               hands-on problem-solving mindset.`,

    skills: `TECHNICAL SKILLS INVENTORY:
  • <span class="cyan-hl">Cloud Infrastructure</span> : AWS (EC2, S3, IAM, RDS, CloudWatch), Microsoft Azure
  • <span class="purple-hl">Cybersecurity</span>        : Nmap, Burp Suite, OWASP Top 10, Metasploitable2,
                                   Vulnerability Assessment, FTP/SMB/NFS Auditing, MQTT Security
  • <span class="cyan-hl">Networking</span>           : TCP/IP, Subnetting, VLAN (802.1Q), Routing, LAN/WAN, GNS3
  • <span class="purple-hl">Operating Systems</span>    : Kali Linux, Ubuntu/Linux, Windows
  • <span class="cyan-hl">Programming</span>          : Python, Java, JavaScript
  • <span class="purple-hl">Development</span>          : Node.js, Express.js, PHP fundamentals, MySQL, REST APIs
  • <span class="cyan-hl">DevOps & Tools</span>       : Git, GitHub Actions, CI/CD Pipelines, Docker, VirtualBox, PM2`,

    projects: `FEATURED PRODUCTION & LAB PROJECTS:
  1. <span class="cyan-hl">GhostWatch</span> (Python, Linux, fatrace, psutil, watchdog, Rich)
     Linux behavioral security monitor detecting unauthorized file access and data exfiltration.
     Repo: <a href="https://github.com/vprijwal-bit/GhostWatch" target="_blank" class="term-link">https://github.com/vprijwal-bit/GhostWatch</a>

  2. <span class="cyan-hl">Cloud-Based Student Portal</span> (AWS EC2, RDS, S3, Next.js, Node.js, MySQL, CI/CD)
     Full-stack enterprise portal with role-based auth, Nginx reverse proxy, and automated deployments.
     Repo: <a href="https://github.com/vprijwal-bit/student-portal" target="_blank" class="term-link">https://github.com/vprijwal-bit/student-portal</a>

  3. <span class="cyan-hl">NetworkSimLab</span> (GNS3, TCP/IP, Subnetting, Routing)
     Comprehensive network topology simulation with VLAN trunking, subnets, and packet flow analysis.
     Repo: <a href="https://github.com/vprijwal-bit/NetworkSimLab-Rijwal" target="_blank" class="term-link">https://github.com/vprijwal-bit/NetworkSimLab-Rijwal</a>

  4. <span class="cyan-hl">Flask Docker Todo Application</span> (Python, Flask, Docker)
     Containerized web application with isolated environments and multi-stage container build.
     Repo: <a href="https://github.com/vprijwal-bit/todo-app" target="_blank" class="term-link">https://github.com/vprijwal-bit/todo-app</a>`,

    labs: `AUTHORIZED CYBERSECURITY LAB EXPERIENCE:
  [NOTE: All activities performed in controlled, authorized educational laboratories]
  • <span class="cyan-hl">Kali Linux & Nmap</span>       : SYN stealth scans, OS detection, aggressive scans (-A), custom NSE scripts
  • <span class="purple-hl">Metasploitable2</span>          : Service vulnerability analysis, banner grabbing, port enumeration
  • <span class="cyan-hl">Burp Suite & OWASP</span>       : Proxy interception, SQL injection detection, XSS verification, auth bypass analysis
  • <span class="purple-hl">FTP / SMB / NFS</span>          : Anonymous FTP check, SMB share enumeration (null sessions), NFS showmount auditing
  • <span class="cyan-hl">MQTT IoT Security</span>        : Mosquitto broker authentication, topic-level ACL configuration, encrypted transit
  • <span class="purple-hl">Firmware Analysis</span>        : Binwalk filesystem extraction, squashfs unpacking, entropy curve graphing`,

    cloud: `AWS CLOUD INFRASTRUCTURE & ARCHITECTURE:
  • <span class="cyan-hl">Amazon EC2</span>        : Linux instance provisioning, security group ingress hardening, PM2, Nginx HTTPS
  • <span class="purple-hl">Amazon S3</span>         : Encrypted object storage (SSE-S3), bucket policies, CORS configuration
  • <span class="cyan-hl">AWS IAM</span>           : Principle of least privilege, custom role policies, credential rotation, MFA
  • <span class="purple-hl">Amazon RDS</span>        : Managed MySQL deployment, subnet group placement, automated snapshot routines
  • <span class="cyan-hl">CloudWatch</span>        : Metric alarms (CPU/memory), SNS alerts, unified logging
  • <span class="purple-hl">AWS Security</span>      : VPC segmentation, public/private subnets, stateful security groups`,

    education: `ACADEMIC CREDENTIALS:
  • <span class="cyan-hl">Bachelor of Computer Applications (BCA)</span>
    Marian College Kuttikkanam (Autonomous), Idukki, Kerala
    Key Studies: Networks, Cybersecurity, DBMS, Java, Python, OS, Web Dev.

  • <span class="purple-hl">Higher Secondary Education (Computer Science)</span>
    Government Boys Higher Secondary School, Manjeri, Kerala (2022–2024)`,

    internship: `INTERNSHIP EXPERIENCE:
  • <span class="cyan-hl">IPSR Solutions Ltd.</span>
    Role  : AI-Integrated Cloud, DevOps & Cybersecurity Intern
    Scope : Linux administration, AWS Cloud infrastructure, Microsoft Azure,
            GNS3 network simulation, DevOps fundamentals, OWASP Top 10,
            Burp Suite vulnerability assessment.`,

    certs: `VERIFIABLE PRACTICAL CERTIFICATES:
  1. AI-Integrated Cloud, DevOps & Cybersecurity - IPSR Solutions Ltd.
  2. AWS Cloud Architecture & Practical Infrastructure Foundations
  3. Linux System Administration & Security Hardening Labs
  4. GNS3 Enterprise Network Simulation & Routing Practicals`,

    contact: `COMMUNICATION CHANNELS:
  • Email    : <a href="mailto:vprijwal@gmail.com" class="term-link">vprijwal@gmail.com</a>
  • Phone    : <a href="tel:+919961207455" class="term-link">+91 9961207455</a>
  • GitHub   : <a href="https://github.com/vprijwal-bit" target="_blank" class="term-link">https://github.com/vprijwal-bit</a>
  • LinkedIn : <a href="https://www.linkedin.com/in/rijwalvp" target="_blank" class="term-link">https://www.linkedin.com/in/rijwalvp</a>
  • Location : Malappuram, Kerala, India`,

    cv: `INITIATING CV DOWNLOAD:
  Downloading RijwalVP-CV.pdf...`,

    pulse: `TRIGGERING 3D SECURITY SCAN PULSE...`
  };

  function openTerminal() {
    terminalModal.classList.add('open');
    terminalInput.focus();
    if (window.AudioFX) window.AudioFX.playClick();
  }

  function closeTerminal() {
    terminalModal.classList.remove('open');
    if (window.AudioFX) window.AudioFX.playClick();
  }

  if (launchBtn) launchBtn.addEventListener('click', openTerminal);
  if (navTerminalBtn) navTerminalBtn.addEventListener('click', openTerminal);
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) closeTerminal();
  });

  // Global keybind: Press backtick `~` to toggle terminal
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      if (terminalModal.classList.contains('open')) closeTerminal();
      else openTerminal();
    }
    if (e.key === 'Escape' && terminalModal.classList.contains('open')) {
      closeTerminal();
    }
  });

  function printLine(html) {
    const p = document.createElement('div');
    p.className = 'term-line';
    p.innerHTML = html;
    terminalBody.appendChild(p);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    printLine(`<span class="term-prompt">rijwal@cyber-node:~$</span> <span class="term-user-cmd">${escapeHtml(rawCmd)}</span>`);

    if (!cmd) return;

    commandHistory.push(rawCmd);
    historyIndex = commandHistory.length;

    if (cmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    if (cmd === 'exit') {
      closeTerminal();
      return;
    }

    if (cmd === 'cv') {
      printLine(COMMANDS.cv);
      const downloadLink = document.createElement('a');
      downloadLink.href = 'assets/documents/RijwalVP-CV.pdf';
      downloadLink.download = 'RijwalVP-CV.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      if (window.AudioFX) window.AudioFX.playAccessGranted();
      return;
    }

    if (cmd === 'pulse') {
      printLine(COMMANDS.pulse);
      if (typeof window.triggerCyberPulse === 'function') {
        window.triggerCyberPulse();
      }
      return;
    }

    if (cmd === 'scan') {
      runSimulatedScan();
      return;
    }

    if (COMMANDS[cmd]) {
      printLine(COMMANDS[cmd]);
      if (window.AudioFX) window.AudioFX.playAccessGranted();
    } else {
      printLine(`<span class="term-err">Command not recognized: '${escapeHtml(cmd)}'. Type '<span class="cmd-hl">help</span>' for authorized commands.</span>`);
      if (window.AudioFX) window.AudioFX.playBeep(220, 0.12, 'sawtooth');
    }
  }

  function runSimulatedScan() {
    printLine(`<span class="cyan-hl">[+] INITIALIZING RECONNAISSANCE SCAN ENGINE...</span>`);
    printLine(`Target host: 127.0.0.1 (rijwal-security-matrix)`);

    const steps = [
      { delay: 300, msg: `[>] Probing ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 3306 (MySQL)...` },
      { delay: 700, msg: `[>] Service fingerprinting: OpenSSH 8.9p1, Nginx 1.24.0, AWS RDS Aurora...` },
      { delay: 1100, msg: `[>] Auditing IAM least-privilege policies & S3 bucket access ACLs...` },
      { delay: 1500, msg: `[>] Checking GhostWatch behavioral monitor daemon status: <span class="cyan-hl">RUNNING</span>` },
      { delay: 1900, msg: `<span class="green-hl">[✓] SCAN COMPLETE: 0 Critical Vulnerabilities Found. System Hardened & Monitored.</span>` }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        printLine(step.msg);
        if (window.AudioFX) window.AudioFX.playClick();
      }, step.delay);
    });
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = terminalInput.value.trim().toLowerCase();
      const match = Object.keys(COMMANDS).find((k) => k.startsWith(current));
      if (match) terminalInput.value = match;
    }
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();

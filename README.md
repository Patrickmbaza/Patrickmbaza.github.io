<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MBAZA GOTEH PATRICK | Portfolio</title>
  <style>
    :root {
      --primary: #2563eb;
      --dark: #1e293b;
      --light: #f8fafc;
      --gray: #64748b;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Segoe UI", Arial, sans-serif;
    }
    body {
      background: var(--light);
      color: var(--dark);
      line-height: 1.6;
    }
    header {
      background: var(--dark);
      color: #fff;
      text-align: center;
      padding: 3rem 1rem;
    }
    header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    header p {
      font-size: 1.2rem;
      color: var(--gray);
    }
    nav {
      background: var(--primary);
      padding: 1rem;
      text-align: center;
    }
    nav a {
      color: #fff;
      margin: 0 15px;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s;
    }
    nav a:hover {
      color: #ffda79;
    }
    section {
      max-width: 1100px;
      margin: 2rem auto;
      padding: 1.5rem;
    }
    h2 {
      margin-bottom: 1rem;
      color: var(--primary);
      border-bottom: 2px solid var(--primary);
      display: inline-block;
    }
    /* About */
    #about p {
      font-size: 1.1rem;
      color: var(--gray);
    }
    /* Skills */
    #skills .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
    }
    .skill-card {
      background: #fff;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      text-align: center;
      font-weight: bold;
      color: var(--dark);
    }
    /* Projects */
    #projects .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .project-card {
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .project-card:hover {
      transform: translateY(-5px);
    }
    .project-card h3 {
      padding: 1rem;
      background: var(--primary);
      color: #fff;
    }
    .project-card p {
      padding: 1rem;
      color: var(--gray);
    }
    /* Contact */
    #contact p {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }
    #contact a {
      color: var(--primary);
      text-decoration: none;
    }
    footer {
      text-align: center;
      padding: 1rem;
      background: var(--dark);
      color: #fff;
      margin-top: 2rem;
    }
    footer a {
      color: #38bdf8;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <header>
    <h1>MBAZA GOTEH PATRICK</h1>
    <p>DevOps Engineer | Cloud | Kubernetes | Automation</p>
  </header>

  <nav>
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </nav>

  <section id="about">
    <h2>About Me</h2>
    <p>
      I am a results-driven DevOps Engineer with 3+ years of experience 
      in cloud computing, automation, and containerization. Skilled in AWS, 
      Terraform, Kubernetes, CI/CD, and monitoring solutions.
    </p>
  </section>

  <section id="skills">
    <h2>Skills</h2>
    <div class="grid">
      <div class="skill-card">☁️ AWS</div>
      <div class="skill-card">⚙️ Terraform & CloudFormation</div>
      <div class="skill-card">🐳 Docker & Kubernetes</div>
      <div class="skill-card">🔧 Jenkins & GitHub Actions ArgoCD</div>
      <div class="skill-card">📜 Bash, Python, Groovy</div>
      <div class="skill-card">📊 Prometheus & Grafana Cloudformation</div>
    </div>
  </section>

  <section id="projects">
    <h2>Projects</h2>
    <div class="grid">
      <div class="project-card">
        <h3>3-Tier Chat App</h3>
        <p>Built with Docker Compose, networking best practices, and multi-container orchestration.</p>
      </div>
      <div class="project-card">
        <h3>Kubernetes Cluster Management</h3>
        <p>Automated provisioning with Terraform and AWS ALB Ingress Controller.</p>
      </div>
      <div class="project-card">
        <h3>CI/CD Pipeline</h3>
        <p>End-to-end automated deployment pipeline with Jenkins and GitHub Actions.</p>
      </div>
    </div>
  </section>

  <section id="contact">
    <h2>Contact</h2>
    <p>📍 Port Harcourt, Rivers State, Nigeria</p>
    <p>📧 <a href="mailto:gotehmbaza@gmail.com">gotehmbaza@gmail.com</a></p>
    <p>📞 +234 813 632 0012</p>
    <p>🔗 <a href="https://linkedin.com/in/goteh-mbaza" target="_blank">LinkedIn</a> | 
        <a href="https://github.com/Patrickmbaza" target="_blank">GitHub</a></p>
  </section>

  <footer>
    <p>&copy; 2025 Mbaza Goteh Patrick | Hosted on <a href="https://pages.github.com/">GitHub Pages</a></p>
  </footer>

</body>
</html>

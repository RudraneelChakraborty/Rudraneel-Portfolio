# Rudraneel Portfolio

A professional AI Architect portfolio built with React, Vite, and Three.js. The page includes a fixed header, hero scene, technical expertise, impact metrics, featured architecture systems, expandable company experience, recognition, education, personal projects, and contact.

## You do not need to know Node.js deeply

Node.js is only the tool used to run the local development server and build the website. You mainly need four commands:

```powershell
npm install
npm run dev
npm run build
npm run lint
```

## Requirements

Install these once:

- Node.js LTS from https://nodejs.org/
- Docker Desktop only if you want to use Docker

Check installation in PowerShell:

```powershell
node --version
npm --version
```

## Start the website locally

Open PowerShell and run:

```powershell
cd "E:\Study Items\Git\Rudraneel-Portfolio"
npm install
npm run dev
```

Vite prints a local URL such as:

```text
http://localhost:5173/
```

Open that URL in your browser.

### Open from another device on the same Wi-Fi

The dev script already exposes the server to your local network. Find your computer's Wi-Fi address:

```powershell
ipconfig
```

Look for `IPv4 Address`, for example `192.168.0.158`, then open this on your phone:

```text
http://192.168.0.158:5173/
```

Your computer and phone must use the same Wi-Fi network. If Windows Firewall asks about Node.js, allow it on Private networks.

## Stop the development server

Go to the terminal where Vite is running and press:

```text
Ctrl + C
```

If PowerShell asks for confirmation, press `Y` and Enter.

## Build the production files

Run:

```powershell
npm run build
```

The optimized website is created in:

```text
dist/
```

To preview that production build locally:

```powershell
npm run preview
```

Stop preview with `Ctrl + C`.

## Check code quality

```powershell
npm run lint
```

## Project structure

```text
Rudraneel-Portfolio/
├── public/
│   ├── architectures/       Project PNG/JPG architecture images
│   └── profile.jpg          Optional profile photo
├── src/
│   ├── App.jsx              Page content and interactive behavior
│   ├── index.css             All layout, responsive, and visual styling
│   └── main.jsx              React entry point
├── Dockerfile                Production Docker image definition
├── nginx.conf                Production web server configuration
├── package.json              Commands and dependencies
└── README.md                 This guide
```

## How to change your name, email, phone, or LinkedIn

Open:

```text
src/App.jsx
```

Use VS Code search (`Ctrl + F`) for the existing value, then replace it.

The current contact values appear in the Contact section:

```jsx
<a href="mailto:Rudraneel350@gmail.com">Rudraneel350@gmail.com</a>
<a href="tel:+918013388429">+91 8013388429</a>
<a href="https://www.linkedin.com/in/rudraneel-chakraborty/">LinkedIn profile</a>
```

After editing, run:

```powershell
npm run build
```

## How to add your profile image

Place one of these files in `public/`:

```text
public/profile.jpg
```

or:

```text
public/profile.png
```

The Contact section tries `profile.jpg` first and then `profile.png`.

Recommended image:

- Portrait orientation
- At least 800 pixels wide
- JPG or PNG
- Clear professional photograph

## How to add architecture diagrams

Place your exported PNG or JPG files in:

```text
public/architectures/
```

Use these exact names:

```text
compliance.png or compliance.jpg
adk.png or adk.jpg
mcp.png or mcp.jpg
healing.png or healing.jpg
audit.png or audit.jpg
maintenance.png or maintenance.jpg
vision.png or vision.jpg
leak.png or leak.jpg
```

The architecture viewer tries `.png` first and `.jpg` second.

### Mermaid

1. Create your diagram in Mermaid Live Editor or a Mermaid VS Code extension.
2. Export it as PNG or SVG.
3. Convert/export to PNG or JPG if required.
4. Rename it using the exact project filename.
5. Copy it into `public/architectures/`.

Example:

```text
public/architectures/compliance.png
```

### Visio

1. Create the architecture page in Visio.
2. Use File > Export or Save As.
3. Choose PNG or JPG.
4. Rename the file, for example `mcp.png`.
5. Copy it into `public/architectures/`.

If no image exists, the interactive architecture flow remains available and no empty image tab is shown.

## How to edit project cards

In `src/App.jsx`, find the `systems` array. Each project follows this format:

```js
['compliance', '01', 'Enterprise Capability Gate', 'Short description', '1K+ tools']
```

The first value is the image filename slug. The second is the project number. The third is the title. The fourth is the card description. The fifth is the metric shown on the card.

The matching architecture description and flow are in the `details` object.

To add a new project:

1. Add one entry to `systems`.
2. Add one matching entry to `details`.
3. Add the PNG or JPG into `public/architectures/`.
4. Run `npm run build`.

## How to add another company or more work

In `src/App.jsx`, find the `experience` array. Add another object:

```js
{
  period: '2020 — 2021',
  company: 'Company Name',
  role: 'Your Role',
  summary: 'Short summary shown in the experience row.',
  work: [
    'First project or responsibility.',
    'Second project or responsibility.'
  ]
}
```

The company appears as a row. Clicking it opens all items in the `work` list.

## How to change colors and layout

Open:

```text
src/index.css
```

The main colors are at the beginning:

```css
:root {
  --bg: #080b0f;
  --surface: #111820;
  --ink: #eef1ef;
  --muted: #929ca5;
  --hot: #ff8066;
  --cool: #91aaff;
}
```

Change these values to update the overall palette. Keep the contrast readable on mobile.

## How to change fonts

Fonts are loaded in:

```text
index.html
```

The current families are:

- Manrope for body and headings
- IBM Plex Mono for navigation, labels, and technical metadata
- Georgia for italic editorial emphasis

If you change the Google Fonts URL, update the CSS variables in `src/index.css` too.

## Docker

Docker packages the production build into nginx. Build the image:

```powershell
docker build -t rudraneel-portfolio .
```

Run it on port 8080:

```powershell
docker run --name rudraneel-portfolio -p 8080:80 rudraneel-portfolio
```

Open:

```text
http://localhost:8080/
```

Stop the container:

```powershell
docker stop rudraneel-portfolio
```

Start it again later:

```powershell
docker start rudraneel-portfolio
```

Remove the stopped container:

```powershell
docker rm rudraneel-portfolio
```

Remove the image:

```powershell
docker rmi rudraneel-portfolio
```

Run Docker over the local network:

```powershell
docker run --name rudraneel-portfolio -p 8080:80 rudraneel-portfolio
```

Find your IP using `ipconfig`, then open this on another device:

```text
http://YOUR_IPV4_ADDRESS:8080/
```

## Deploying the production build

### Vercel

1. Push the `Rudraneel-Portfolio` folder to GitHub.
2. Import the repository into Vercel.
3. Set the project root to `Rudraneel-Portfolio` if needed.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

### Netlify

1. Push the project to GitHub.
2. Create a new site from the repository.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Deploy.

### Any static web host

Run:

```powershell
npm run build
```

Upload everything inside `dist/` to the host's public web directory.

### Docker host

Build and run:

```powershell
docker build -t rudraneel-portfolio .
docker run -d --restart unless-stopped --name rudraneel-portfolio -p 80:80 rudraneel-portfolio
```

## Troubleshooting

### `npm` is not recognized

Install Node.js LTS and restart VS Code.

### Port 5173 is already in use

Stop the old server with `Ctrl + C`, or start another port:

```powershell
npm run dev -- --port 5176
```

### The phone cannot open the site

- Confirm both devices use the same Wi-Fi.
- Do not use `localhost` on the phone.
- Use your computer's IPv4 address.
- Allow Node.js through Windows Firewall.
- Do not use a guest Wi-Fi network.

### An architecture image is not showing

Check that:

- The file is inside `public/architectures/`.
- The filename is exact.
- The extension is `.png` or `.jpg`.
- The slug matches the project entry in `src/App.jsx`.

## Normal daily workflow

```powershell
cd "E:\Study Items\Git\Rudraneel-Portfolio"
npm run dev
```

Edit files while the server is running. The browser updates automatically.

Before sharing or deploying:

```powershell
npm run lint
npm run build
```

When finished:

```text
Ctrl + C
```

### Optional project-diagram images

The interactive architecture flow is always available. The **Diagram image** tab appears automatically only when an image for that specific project exists, so visitors never see an empty image placeholder.

1. Create `public/architectures/` if it does not already exist.
2. Export only a sanitized PNG, JPG, JPEG, or WEBP diagram: do not include employer/client names, internal systems, repositories, account IDs, URLs, credentials, or confidential metrics.
3. Name the file using the project slug, for example `public/architectures/compliance.png` or `public/architectures/mcp.jpg`.
4. Refresh the page. The matching project modal will then show the Diagram image tab.

Supported project slugs: `compliance`, `mcp`, `healing`, `adk`, `audit`, `leak`, `vision`, and `maintenance`.

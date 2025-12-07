# Sri Kolagani - Terminal Portfolio

A modern, terminal-style personal portfolio website inspired by Claude Code. Built with React, TypeScript, and Vite for static deployment on GitHub Pages.

![Terminal Portfolio Preview](./preview.png)

## Features

- 🖥️ **Terminal Interface** - Interactive command-line experience
- 🌙 **Dark Theme** - Beautiful dark color scheme with subtle glow effects
- ⌨️ **Command System** - Type commands to explore different sections
- 📱 **Responsive** - Works on desktop and mobile devices
- 🚀 **Static Build** - Deploys easily to GitHub Pages

## Available Commands

| Command | Description |
|---------|-------------|
| `summary` | Professional summary |
| `experience` | Work history |
| `skills` | Technical skills by category |
| `certifications` | Professional certifications |
| `education` | Educational background |
| `talks` | Speaking engagements |
| `conferences` | Conferences attended |
| `publications` | Publications & research |
| `volunteering` | Volunteer work |
| `contact` | Contact information & links |
| `help` | List all available commands |
| `clear` | Clear terminal output |

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173/portfolio/ in your browser
```

## Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

The built files will be in the `dist/` directory.

## Deploy to GitHub Pages

### Option 1: User/Organization Site (`<username>.github.io`)

1. Create a repository named exactly `<username>.github.io`
2. Update `vite.config.ts`:
   ```typescript
   base: '/'
   ```
3. Build and push:
   ```bash
   npm run build
   # Copy contents of dist/ to your repo root
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```
4. Enable GitHub Pages in repo Settings → Pages → Source: main branch

### Option 2: Project Site (`<username>.github.io/<repo-name>`)

1. Create any repository (e.g., `portfolio`)
2. Keep `vite.config.ts` as:
   ```typescript
   base: '/portfolio/'  // Replace with your repo name
   ```
3. Build and deploy using gh-pages:
   ```bash
   npm run deploy
   ```
   Or manually push `dist/` contents to a `gh-pages` branch.

4. Enable GitHub Pages in repo Settings → Pages → Source: gh-pages branch

## Customizing Your Avatar

1. Create your pixel avatar:
   - Use a free online tool like [Canva](https://www.canva.com), [OpenArt](https://openart.ai), or [Pixel Me](https://pixel-me.tokyo/en/)
   - Upload your headshot and convert to pixel art
   - Download as PNG (recommended size: 200x200px)

2. Replace the placeholder:
   ```bash
   # Replace the avatar file in public/
   cp your-pixel-avatar.png public/avatar-pixel.png
   ```

## Customizing Content

Edit the content in `src/data/portfolioData.ts` to update:
- Professional summary
- Work experience
- Skills
- Certifications
- Education
- Speaking engagements
- Publications
- And more...

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **react-markdown** - Markdown rendering

## License

MIT License - Feel free to use this for your own portfolio!

---

Built with 💚 by [Sri Kolagani](https://linkedin.com/in/sriharideep)

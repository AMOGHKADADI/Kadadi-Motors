# 🤝 Contributing to Kadadi Motors

Thank you for your interest in contributing to **Kadadi Motors Insurance Advisory Platform**! We welcome contributions from developers, designers, accessibility specialists, and documentation authors.

---

## 📜 Code of Conduct

We are committed to providing a welcoming, inclusive, and professional environment for everyone. Please treat all contributors with respect, empathy, and professional composure.

---

## 🛠️ Getting Started with Development

### 1. Fork & Clone Repository
```bash
git clone https://github.com/amoghkadadi/kadadi-motors.git
cd kadadi-motors
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Local Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 4. Start Development Server
```bash
npm run dev
```

---

## 🌿 Git Commit Conventions

We follow the **Conventional Commits** specification (`<type>(<scope>): <subject>`):

- `feat`: A new user-facing feature (e.g., `feat(portal): add recent activity feed filtering`)
- `fix`: A bug fix (e.g., `fix(calculator): correct NCB discount calculation formula`)
- `docs`: Documentation changes (e.g., `docs(readme): update deployment instructions`)
- `style`: Code style changes, formatting, or UI visual polish without logic alterations
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests

---

## 📐 Code Style & Quality Guidelines

1. **TypeScript**:
   - Maintain strict typing. Avoid `any` types wherever possible.
   - Define interfaces and types in `/src/lib/store.ts` or component files.

2. **Styling & CSS**:
   - Use Tailwind CSS utility classes directly.
   - Adhere to the established color palette (Deep Slate `#0f172a`, Amber `#f59e0b`, Emerald `#10b981`, Blue `#3b82f6`).

3. **Component Structure**:
   - Keep components modular and self-contained.
   - Extract re-usable sub-components into `/src/components/`.

4. **Linting Verification**:
   Before submitting a Pull Request, verify that type checking passes:
   ```bash
   npm run lint
   ```

---

## 📋 Pull Request (PR) Checklist

Before submitting your PR, ensure the following:
- [ ] Code compiles cleanly without TypeScript errors (`npm run lint`).
- [ ] Production build succeeds (`npm run build`).
- [ ] No secret API keys or private credentials are included in code or commits.
- [ ] UI changes maintain responsive visual layout across Mobile, Tablet, and Desktop.
- [ ] Added or modified features include corresponding documentation updates.

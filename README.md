# Training Algorithm

Next.js project with code quality tools configured.

## 🚀 Features

- **Next.js 14** with App Router and TypeScript
- **ESLint** with code complexity rules
- **Prettier** for automatic code formatting
- **TypeScript** with strict type checking
- **Husky** with pre-commit hooks
- **Commitlint** with Conventional Commits
- **Lint-staged** to run linters only on staged files

## 📋 Prerequisites

- Node.js 18+
- npm or yarn

## 🛠️ Installation

```bash
npm install
```

## 📜 Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build application for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint and fix errors automatically
npm run format       # Format code with Prettier
npm run format:check # Check formatting without modifying files
npm run type-check   # Check TypeScript types
npm run test:unit    # Run unit tests
```

## 🔧 Tool Configuration

### ESLint

Configured with complexity rules:

- Maximum cyclomatic complexity: 10
- Lines per function: 100 (warning)
- Maximum depth: 4 (warning)
- Maximum parameters: 4 (warning)

### Pre-commit Hooks

Before each commit, the following are automatically executed:

1. `npm run lint` - ESLint verification
2. `npm run type-check` - Type checking
3. `npm run format:check` - Formatting verification
4. `lint-staged` - Linters only on staged files

### Conventional Commits

The project uses [Conventional Commits](https://www.conventionalcommits.org/) to maintain a consistent commit history.

#### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting changes (does not affect code)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Add or modify tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `revert`: Revert a previous commit

#### Examples

```bash
feat: add user authentication
fix: correct error in total calculation
docs: update README with installation instructions
refactor: simplify validation function
test: add tests for Button component
```

## 📁 Project Structure

```
training-algorithm/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Main layout
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── .husky/             # Git hooks
│   ├── pre-commit      # Pre-commit hook
│   └── commit-msg      # Commit-msg hook
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── commitlint.config.js # Commitlint configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## 🔍 Quality Verification

Before committing, make sure to run:

```bash
npm run test:unit
npm run format
npm run type-check
npm run lint
```

These commands are also automatically executed in the pre-commit hook.

## 📝 Notes

- Husky hooks are automatically installed when running `npm install`
- Files are automatically formatted before commit thanks to lint-staged
- Commit messages must follow the Conventional Commits format or the commit will be rejected

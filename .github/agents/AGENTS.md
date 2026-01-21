# Agent Registry for Jay Life Project

Maps specialized agents and workflows from `forAntiGravity` to project tasks.

**Base Path:** `C:\Users\dtrip\Downloads\forAntiGravity\`

| Resource  | Subfolder                                        |
| --------- | ------------------------------------------------ |
| Subagents | `awesome-claude-code-subagents-main\categories\` |
| Workflows | `claude-code-workflows-main\`                    |

---

## Workflows (from claude-code-workflows-main)

### Design Review Workflow

**Path:** `claude-code-workflows-main\design-review\design-review-agent.md`

**Purpose:** Comprehensive visual QA using Playwright automation

**When to use:**

- After UI changes or new component implementation
- Before merging frontend PRs
- When unifying the dual design system

**Review phases:**

1. Interaction & user flow testing
2. Responsiveness (1440px, 768px, 375px)
3. Visual polish & consistency
4. Accessibility (WCAG 2.1 AA)
5. Robustness (edge cases, errors)
6. Code health (tokens, patterns)
7. Console check

**Triage levels:** Blocker > High-Priority > Medium-Priority > Nitpick

---

### Code Review Workflow

**Path:** `claude-code-workflows-main\code-review\pragmatic-code-review-subagent.md`

**Purpose:** Balance engineering excellence with velocity

**When to use:**

- After completing a feature
- Before merging any PR
- After refactoring work

**Review hierarchy:**

1. Architectural design & integrity (Critical)
2. Functionality & correctness (Critical)
3. Security (Non-negotiable)
4. Maintainability & readability (High)
5. Testing strategy (High)
6. Performance & scalability (Important)
7. Dependencies & documentation (Important)

**Output:** Critical Issues > Improvements > Nitpicks

---

### Security Review Workflow

**Path:** `claude-code-workflows-main\security-review\security-review-slash-command.md`

**Purpose:** Focused security audit for HIGH-CONFIDENCE vulnerabilities

**When to use:**

- Before production deployment
- After adding auth/payment features
- When handling user input

**Categories examined:**

- Input validation (XSS, injection)
- Authentication & authorization
- Crypto & secrets management
- Data exposure

**Jay Life specific concerns:**

- Shopify Storefront API token handling
- Cart/checkout data security
- Customer email collection
- Payment redirect flows

---

## Subagents (from awesome-claude-code-subagents-main)

## Core Development Agents

### frontend-developer

**Path:** `01-core-development/frontend-developer.md`
**Use for:**

- Component scaffolding with TypeScript
- Responsive layout implementation
- State management integration
- Accessibility from the start

**Invoke when:**

- Building new UI components
- Implementing responsive designs
- Integrating with cart/checkout

---

### graphql-architect

**Path:** `01-core-development/graphql-architect.md`
**Use for:**

- Shopify Storefront API queries
- Federation patterns
- Query optimization (DataLoader)
- Subscription implementation

**Invoke when:**

- Writing product/collection queries
- Cart mutation operations
- Customer account queries

---

### ui-designer

**Path:** `01-core-development/ui-designer.md`
**Use for:**

- Design token implementation
- Component visual design
- Color system decisions
- Animation guidelines

**Invoke when:**

- Unifying the dual design system
- Creating new visual components
- Defining interaction states

---

## Language Specialists

### react-specialist

**Path:** `02-language-specialists/react-specialist.md`
**Use for:**

- React 18+ patterns
- Performance optimization (memo, useMemo, useCallback)
- Server components (Remix loader patterns)
- Custom hooks design

**Invoke when:**

- Optimizing component rendering
- Building complex interactive features
- Implementing data fetching patterns

---

### typescript-pro

**Path:** `02-language-specialists/typescript-pro.md`
**Use for:**

- Type-safe interfaces
- Strict mode compliance
- Branded types for domain modeling
- Full-stack type sharing

**Invoke when:**

- Consolidating Ritual/Product interfaces
- Defining GraphQL query types
- Creating type guards

**Priority task:** Unify `mock-data.ts` (Ritual) and `mockData.ts` (Product) interfaces

---

### javascript-pro

**Path:** `02-language-specialists/javascript-pro.md`
**Use for:**

- ES2022+ features
- Async patterns
- Module optimization

---

## Quality & Security Agents

### accessibility-tester

**Path:** `04-quality-security/accessibility-tester.md`
**Use for:**

- WCAG 2.1 AA compliance
- Screen reader testing
- Focus management
- Color contrast verification

**Known issues to fix:**

- Missing aria-label on NeoNavbar mobile toggle
- Form inputs lack labels in NeoFooter
- No focus ring on PDP variant buttons

---

### code-reviewer

**Path:** `04-quality-security/code-reviewer.md`
**Use for:**

- PR reviews
- Pattern consistency
- Security issues
- Performance concerns

---

### performance-engineer

**Path:** `04-quality-security/performance-engineer.md`
**Use for:**

- Core Web Vitals optimization
- Bundle size analysis
- Image optimization
- Code splitting

**Targets:**

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

### security-auditor

**Path:** `04-quality-security/security-auditor.md`
**Use for:**

- XSS prevention
- CSP configuration
- API security review

---

## Developer Experience Agents

### documentation-engineer

**Path:** `06-developer-experience/documentation-engineer.md`
**Use for:**

- Keeping docs in sync
- Component API docs
- README updates
- Storybook examples

**Docs to maintain:**

- `CLAUDE.md`
- `docs/WARM_SUNRISE_DESIGN_SYSTEM.md`
- `brand_guidelines.md`
- `.agent/STATE.md`

---

### refactoring-specialist

**Path:** `06-developer-experience/refactoring-specialist.md`
**Use for:**

- Code modernization
- Pattern migration
- Technical debt reduction

**Pending refactors:**

- Unify design systems
- Consolidate data models
- Remove deprecated layout components

---

### git-workflow-manager

**Path:** `06-developer-experience/git-workflow-manager.md`
**Use for:**

- Branch management
- Commit conventions
- PR workflows

---

## Agent Invocation Template

When invoking an agent, provide this context:

```json
{
  "requesting_agent": "[agent-name]",
  "request_type": "get_project_context",
  "payload": {
    "project": "Jay Life storefront",
    "stack": "Shopify Hydrogen (Remix) + Tailwind CSS",
    "state_file": ".agent/STATE.md",
    "critical_issue": "Dual design system needs unification",
    "query": "[specific task description]"
  }
}
```

---

## Task-to-Agent Mapping

| Task                    | Primary Agent          | Supporting Agent   |
| ----------------------- | ---------------------- | ------------------ |
| Unify design system     | ui-designer            | frontend-developer |
| Consolidate data models | typescript-pro         | react-specialist   |
| Fix a11y issues         | accessibility-tester   | frontend-developer |
| Write GraphQL queries   | graphql-architect      | typescript-pro     |
| Build new component     | react-specialist       | frontend-developer |
| Optimize performance    | performance-engineer   | react-specialist   |
| PR review               | code-reviewer          | -                  |
| Update docs             | documentation-engineer | -                  |
| Refactor code           | refactoring-specialist | code-reviewer      |

---

## Agent Communication Flow

```
[User Request]
      │
      ▼
[Read STATE.md for context]
      │
      ▼
[Identify relevant agent(s)]
      │
      ▼
[Invoke with project context]
      │
      ▼
[Execute task]
      │
      ▼
[Update STATE.md if needed]
```

---

## Session Workflow

1. **Start:** Read `.agent/STATE.md` for current context
2. **Plan:** Identify which agent(s) needed for task
3. **Execute:** Invoke agent with full context
4. **Track:** Update STATE.md with progress/decisions
5. **End:** Document any new issues or pending tasks

---

_Last updated: 2026-01-20_

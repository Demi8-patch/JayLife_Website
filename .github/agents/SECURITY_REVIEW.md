# Jay Life Security Review Configuration

**Adapted from:** `forAntiGravity\claude-code-workflows-main\security-review\`
**Context:** Shopify Hydrogen E-commerce (D2C Wellness)

---

## Project-Specific Security Concerns

### High Priority for E-commerce

| Area                | Risk             | Review Focus                           |
| ------------------- | ---------------- | -------------------------------------- |
| **Storefront API**  | Token exposure   | Ensure API tokens not in client bundle |
| **Cart Operations** | Data tampering   | Validate cart mutations server-side    |
| **Customer Data**   | PII exposure     | Email collection, account info         |
| **Checkout Flow**   | Redirect attacks | Validate Shopify checkout URLs         |
| **Forms**           | XSS/Injection    | Email capture, contact forms           |

### Shopify Hydrogen Specific

- [ ] Storefront API token in environment variables only
- [ ] No secrets in client-side code
- [ ] GraphQL queries don't expose sensitive fields
- [ ] Loader functions validate input parameters
- [ ] Action functions sanitize form data

---

## Security Checklist by Component

### API & Data Fetching

```
[ ] Storefront API token stored in .env (not committed)
[ ] GraphQL queries use parameterized variables
[ ] No customer PII in query responses beyond necessary
[ ] Error messages don't leak internal details
[ ] Rate limiting considered for forms
```

### Forms & User Input

```
[ ] Email capture: validate email format
[ ] Contact forms: sanitize all inputs
[ ] Search: prevent injection in query params
[ ] URL parameters: validate and sanitize
[ ] No dynamic code execution with user input
[ ] No unsafe HTML rendering with user content
```

### Cart & Checkout

```
[ ] Cart ID validated server-side
[ ] Price calculations done server-side (Shopify handles)
[ ] Checkout redirect URLs validated
[ ] No sensitive data in localStorage
[ ] Session handling follows Shopify best practices
```

### Authentication (Future)

```
[ ] Customer account tokens handled securely
[ ] Password reset flows validated
[ ] Session tokens HttpOnly and Secure
[ ] CSRF protection on mutations
```

---

## Files to Review

### Critical (Review Before Production)

| File                                  | Security Concern               |
| ------------------------------------- | ------------------------------ |
| `app/lib/shopify.ts`                  | API token handling             |
| `app/routes/cart.tsx`                 | Cart mutations                 |
| `app/components/ui/EmailCapture.tsx`  | Form input                     |
| `app/components/layout/NeoFooter.tsx` | Email form                     |
| `hydrogen.config.ts`                  | Environment config             |
| `.env`                                | Secrets (should be gitignored) |

### Medium Priority

| File                            | Security Concern   |
| ------------------------------- | ------------------ |
| `app/routes/account._index.tsx` | Customer data      |
| `app/routes/ritual.$handle.tsx` | URL param handling |
| Any GraphQL query files         | Data exposure      |

---

## Review Process

### Before Each Deploy

1. **Secrets Check**

   ```bash
   # Ensure no secrets committed
   git diff --cached | grep -i "api_key\|token\|secret\|password"
   ```

2. **Environment Variables**
   - Verify `.env` is in `.gitignore`
   - Confirm production env vars set in Oxygen

3. **Console Check**
   - No sensitive data logged
   - Error messages sanitized

### For PR Reviews

Run security-focused review using workflow:

```
Review the complete diff. Focus ONLY on:
1. Input validation vulnerabilities
2. Authentication/authorization issues
3. Data exposure risks
4. Secrets management
```

---

## OWASP Top 10 Relevance

| Risk                      | Relevance to Jay Life    | Mitigation                  |
| ------------------------- | ------------------------ | --------------------------- |
| **Injection**             | Form inputs, search      | Sanitize all user input     |
| **Broken Auth**           | Customer accounts        | Use Shopify's auth system   |
| **Sensitive Data**        | Customer emails, payment | HTTPS only, minimal storage |
| **XXE**                   | N/A (no XML processing)  | -                           |
| **Broken Access**         | Admin functions          | Shopify handles admin       |
| **Security Misconfig**    | Env vars, headers        | Review hydrogen.config      |
| **XSS**                   | User content display     | React escaping by default   |
| **Insecure Deserialize**  | N/A for this stack       | -                           |
| **Vulnerable Components** | npm packages             | Regular npm audit           |
| **Logging**               | Debug info in prod       | Remove console.logs         |

---

## Quick Security Commands

```bash
# Check for secrets in git history
git log -p | grep -i "api_key\|token\|secret" | head -20

# Audit npm packages
npm audit

# Check for console.log statements
grep -r "console.log" app/ --include="*.tsx" --include="*.ts"

# Find hardcoded URLs/tokens
grep -r "sk_\|pk_\|api_" app/ --include="*.tsx" --include="*.ts"
```

---

## Security Headers (Oxygen/Hydrogen)

Recommend adding to server.ts or config:

```typescript
// Content Security Policy
"Content-Security-Policy": "default-src 'self'; script-src 'self' cdn.shopify.com; style-src 'self' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data: cdn.shopify.com;"

// Other headers
"X-Content-Type-Options": "nosniff"
"X-Frame-Options": "DENY"
"Referrer-Policy": "strict-origin-when-cross-origin"
```

---

## Incident Response

If security issue found:

1. **Don't commit the fix publicly first**
2. Document the vulnerability
3. Assess impact (data exposed? exploited?)
4. Fix in private branch
5. Deploy fix
6. Then commit/PR

---

_Last updated: 2026-01-20_

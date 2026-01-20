# Security & Secrets Handling

## Overview

Jay Life storefront uses Shopify Oxygen for hosting with GraphQL Storefront API integration. All sensitive credentials must be managed securely.

---

## Required Environment Variables

| Variable | Purpose | Type | Storage |
|----------|---------|------|---------|
| `PUBLIC_STOREFRONT_API_TOKEN` | Shopify GraphQL API read access | Public (client-safe) | Oxygen Secrets |
| `PUBLIC_STORE_DOMAIN` | Shopify store domain (e.g., `jaylife-2.myshopify.com`) | Public | Oxygen Secrets |
| `SESSION_SECRET` | Remix session signing key (random string, ≥32 chars) | Private | Oxygen Secrets |

---

## Local Development Setup

### 1. Create `.env` file from template

```bash
cp .env.example .env
```

### 2. Fill in your credentials

```dotenv
# Get from Shopify Admin > Settings > Develop apps > API credentials
PUBLIC_STOREFRONT_API_TOKEN=shpss_xxxxxxxxxxxx
PUBLIC_STORE_DOMAIN=your-store.myshopify.com

# Generate random string (e.g., node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
SESSION_SECRET=your_random_secret_here
```

### 3. Start development server

```bash
npm run dev
```

**⚠️ CRITICAL:** Never commit `.env` to git. It's protected by `.gitignore`.

---

## Production Deployment (Shopify Oxygen)

### Setting Secrets in Oxygen

1. **Via Shopify CLI:**
   ```bash
   npx shopify hydrogen env:pull  # Fetch from Oxygen
   # Edit secrets
   npx shopify hydrogen env:push  # Deploy secrets
   ```

2. **Via Shopify Admin:**
   - Go to Hydrogen > Deployment > Secrets
   - Add each variable from the table above
   - Click "Deploy" to apply

3. **Via GitHub Actions (recommended):**
   - Store secrets as GitHub repository secrets:
     - `SHOPIFY_STOREFRONT_TOKEN`
     - `SHOPIFY_STORE_DOMAIN`
     - `SESSION_SECRET`
   - Reference in deployment workflow:
     ```yaml
     env:
       PUBLIC_STOREFRONT_API_TOKEN: ${{ secrets.SHOPIFY_STOREFRONT_TOKEN }}
       PUBLIC_STORE_DOMAIN: ${{ secrets.SHOPIFY_STORE_DOMAIN }}
       SESSION_SECRET: ${{ secrets.SESSION_SECRET }}
     ```

---

## Secret Rotation Schedule

| Secret | Rotation | How |
|--------|----------|-----|
| `PUBLIC_STOREFRONT_API_TOKEN` | Quarterly (90 days) | Shopify Admin > Develop apps > Regenerate token |
| `SESSION_SECRET` | Semi-annually (180 days) | Generate new random string, update Oxygen secrets |

**After rotation:** Retest authentication flows and cart functionality.

---

## Security Checklist

- ✅ `.env` is in `.gitignore` (prevents accidental commits)
- ✅ `.env.example` shows required variables (no secrets)
- ✅ CI/CD workflow runs `secrets-scan` on all PRs (TruffleHog)
- ✅ Hardcoded token patterns are flagged (workflow step: `Check for hardcoded tokens`)
- ✅ `server.ts` provides safe fallback mocks for missing env vars
- ✅ Production secrets stored only in Oxygen or GitHub Actions secrets
- ✅ No secrets in error messages or logs

---

## Troubleshooting

### "Cannot find module mockData" error during build

**Cause:** Missing environment variables during Oxygen build

**Fix:**
```bash
# Local: Ensure .env exists
npm run dev

# Oxygen: Verify secrets are set
npx shopify hydrogen env:pull
```

### Token authentication fails in production

**Cause:** Expired or rotated token

**Action:**
1. Verify token hasn't been regenerated in Shopify Admin
2. If rotated, update Oxygen secrets immediately
3. Monitor auth errors in Oxygen logs

### Session validation fails after deployment

**Cause:** `SESSION_SECRET` mismatch between local and production

**Fix:**
1. Generate new `SESSION_SECRET` locally
2. Update in Oxygen Secrets
3. Clear browser cookies (sessions will be invalidated)

---

## References

- [Shopify Hydrogen Docs](https://shopify.dev/docs/hydrogen)
- [Oxygen Configuration](https://shopify.dev/docs/oxygen/configuration)
- [GraphQL Storefront API](https://shopify.dev/docs/api/storefront)
- [Session Security (Remix)](https://remix.run/docs/en/main/guides/sessions)

---

**Last updated:** January 20, 2026  
**Audit:** ✅ Secrets properly isolated | ✅ CI checks enabled | ✅ Documentation complete

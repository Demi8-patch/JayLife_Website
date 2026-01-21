# Cross-IDE Setup Script for Windows
# Installs and configures .agent directory for VS Code, Claude Code, and AntiGravity

Write-Host "`n[RUN] JayLife Cross-IDE Agent Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# 1. Check Node version
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null

if (-not $nodeVersion) {
    Write-Host "[ERROR] Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

$versionNumber = $nodeVersion -replace 'v', ''
$majorVersion = [int]($versionNumber.Split('.')[0])

if ($majorVersion -lt 18) {
    Write-Host "[ERROR] Node version must be >=18 (found: $nodeVersion)" -ForegroundColor Red
    Write-Host "   Install Node 18+ from: https://nodejs.org" -ForegroundColor Gray
    exit 1
}

Write-Host "[OK] Node.js $nodeVersion detected" -ForegroundColor Green

# 2. Verify Git is installed
$gitVersion = git --version 2>$null
if (-not $gitVersion) {
    Write-Host "[WARN] Git not found (optional, but recommended)" -ForegroundColor Yellow
}
else {
    Write-Host "[OK] Git detected: $gitVersion" -ForegroundColor Green
}

# 3. Install npm dependencies
Write-Host "`nInstalling dependencies (optional)..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARN] Failed to install dependencies. You may need to run 'npm install' manually." -ForegroundColor Yellow
}
else {
    Write-Host "[OK] Dependencies installed" -ForegroundColor Green
}

# 4. Verify .agent structure exists
Write-Host "`nVerifying .agent directory structure..." -ForegroundColor Yellow

$requiredFiles = @(
    ".agent\PRIMER.md",
    ".agent\INSTALLATION.md",
    ".agent\PERMISSIONS.md",
    ".agent\IDE_COMPATIBILITY.md",
    ".agent\skills",
    ".agent\workflows"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "[ERROR] Missing required files/folders:" -ForegroundColor Red
    $missingFiles | ForEach-Object { Write-Host "   - $_" -ForegroundColor Gray }
    exit 1
}

Write-Host "[OK] .agent structure valid" -ForegroundColor Green

# 5. Create symlink for GitHub Copilot instructions (optional)
Write-Host "`nSetting up symlinks..." -ForegroundColor Yellow

$agentCopilotInstructions = ".agent\COPILOT_INSTRUCTIONS.md"
$githubCopilotInstructions = ".github\copilot-instructions.md"

if (Test-Path $githubCopilotInstructions) {
    # Backup existing file if it's not already a symlink
    if ((Get-Item $githubCopilotInstructions).LinkType -ne "SymbolicLink") {
        $backupPath = "$githubCopilotInstructions.backup"
        Write-Host "[WARN] Backing up existing copilot-instructions.md to $backupPath" -ForegroundColor Yellow
        Copy-Item $githubCopilotInstructions $backupPath -Force
        
        # Copy content to .agent location
        if (-not (Test-Path $agentCopilotInstructions)) {
            Copy-Item $githubCopilotInstructions $agentCopilotInstructions -Force
        }
        
        Remove-Item $githubCopilotInstructions -Force
    }
}

# Create symlink (requires admin privileges on older Windows versions)
if (-not (Test-Path $githubCopilotInstructions)) {
    try {
        New-Item -ItemType SymbolicLink -Path $githubCopilotInstructions -Target $agentCopilotInstructions -Force -ErrorAction Stop | Out-Null
        Write-Host "[OK] Created symlink: .github\copilot-instructions.md -> .agent\COPILOT_INSTRUCTIONS.md" -ForegroundColor Green
    }
    catch {
        Write-Host "[WARN] Could not create symlink (may need admin privileges)" -ForegroundColor Yellow
        Write-Host "   Creating regular copy instead..." -ForegroundColor Gray
        if (Test-Path $agentCopilotInstructions) {
            Copy-Item $agentCopilotInstructions $githubCopilotInstructions -Force
            Write-Host "[OK] Created copy: .github\copilot-instructions.md" -ForegroundColor Green
        }
    }
}

# 6. Update .claude settings if needed
Write-Host "`nConfiguring IDE-specific settings..." -ForegroundColor Yellow

$claudeSettings = ".claude\settings.local.json"
if (Test-Path $claudeSettings) {
    try {
        $settings = Get-Content $claudeSettings | ConvertFrom-Json
        
        # Add .agent read permission if not present
        $agentReadPerm = "Read(C:\Users\dtrip\OneDrive\Desktop\jaysite\JayLife_Website\.agent\**)"
        
        $hasPerm = $false
        if ($settings.permissions -and $settings.permissions.allow) {
            if ($settings.permissions.allow -contains $agentReadPerm) { $hasPerm = $true }
        }
        
        if (-not $hasPerm) {
            Write-Host "[INFO] Note: Add this to .claude\settings.local.json manually if needed:" -ForegroundColor Cyan
            Write-Host "   `"Read(C:\\Users\\dtrip\\OneDrive\\Desktop\\jaysite\\JayLife_Website\\.agent\\**)`"" -ForegroundColor Gray
        }
        else {
            Write-Host "[OK] Claude Code already has .agent read permission" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "[WARN] Could not parse .claude\settings.local.json" -ForegroundColor Yellow
    }
}
else {
    Write-Host "[INFO] .claude\settings.local.json not found (OK if not using Claude Code)" -ForegroundColor Yellow
}

# 7. Run verification script
Write-Host "`nRunning verification checks..." -ForegroundColor Green
node .agent\scripts\verify-install.cjs

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Verification failed. Please review errors above." -ForegroundColor Red
    exit 1
}

# 8. Success message
Write-Host "`n[DONE] Installation Complete! [DONE]`n" -ForegroundColor Green

Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Choose your IDE and follow the setup:" -ForegroundColor White
Write-Host ""
Write-Host "  AntiGravity (Current IDE)" -ForegroundColor Magenta
Write-Host "     Ready to use! No extra steps needed." -ForegroundColor Gray
Write-Host "     See: .agent\INSTALLATION.md for verification steps" -ForegroundColor Gray
Write-Host ""
Write-Host "  VS Code" -ForegroundColor Blue
Write-Host "     1. Install recommended extensions from .vscode\extensions.json" -ForegroundColor Gray
Write-Host "     2. Reload window: Ctrl+Shift+P -> 'Developer: Reload Window'" -ForegroundColor Gray
Write-Host "     3. Test: Ctrl+Shift+P -> 'Tasks: Run Task' -> 'Dev Server'" -ForegroundColor Gray
Write-Host ""
Write-Host "  Claude Code" -ForegroundColor Cyan
Write-Host "     1. Verify .claude\settings.local.json has skillsPath/workflowsPath" -ForegroundColor Gray
Write-Host "     2. Restart Claude Code completely" -ForegroundColor Gray
Write-Host "     3. Test: Type '/code-review' in chat" -ForegroundColor Gray
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Cyan
Write-Host "   - Installation guide:   .agent\INSTALLATION.md" -ForegroundColor Gray
Write-Host "   - Permissions:          .agent\PERMISSIONS.md" -ForegroundColor Gray
Write-Host "   - IDE compatibility:    .agent\IDE_COMPATIBILITY.md" -ForegroundColor Gray
Write-Host "   - Project primer:       .agent\PRIMER.md" -ForegroundColor Gray
Write-Host ""
Write-Host "Quick Start:" -ForegroundColor Cyan
Write-Host "   npm run dev    # Start development server" -ForegroundColor Gray
Write-Host "   npm run lint   # Check code quality" -ForegroundColor Gray

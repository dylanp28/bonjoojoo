#!/bin/bash

# Bonjoojoo Development Environment Setup Script
set -e

echo "🎉 Setting up Bonjoojoo Development Environment"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}$1${NC}"
}

# Check if running on macOS or Linux
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

print_header "📋 Detected OS: $MACHINE"

# Check Node.js version
print_header "🔍 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js version: $NODE_VERSION"
    
    # Check if version is 18 or higher
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d. -f1 | tr -d 'v')
    if [ "$MAJOR_VERSION" -lt 18 ]; then
        print_error "Node.js 18+ is required. Please update your Node.js installation."
        exit 1
    fi
else
    print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check npm
print_header "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_status "npm version: $NPM_VERSION"
else
    print_error "npm is not installed. Please install npm."
    exit 1
fi

# Install dependencies
print_header "📥 Installing dependencies..."
npm install

# Check if .env.local exists
print_header "⚙️  Setting up environment..."
if [ ! -f .env.local ]; then
    if [ -f .env.example ]; then
        cp .env.example .env.local
        print_status "Created .env.local from .env.example"
        print_warning "Please edit .env.local with your actual environment variables"
    else
        print_error ".env.example not found!"
        exit 1
    fi
else
    print_status ".env.local already exists"
fi

# Generate JWT secret if not exists
print_header "🔐 Setting up security..."
if ! grep -q "JWT_SECRET=" .env.local || grep -q "JWT_SECRET=\"your-jwt-secret-here\"" .env.local; then
    JWT_SECRET=$(openssl rand -base64 32 2>/dev/null || echo "$(date | shasum | head -c 32)")
    if command -v sed &> /dev/null; then
        if [ "$MACHINE" = "Mac" ]; then
            sed -i '' "s/JWT_SECRET=.*/JWT_SECRET=\"$JWT_SECRET\"/" .env.local
        else
            sed -i "s/JWT_SECRET=.*/JWT_SECRET=\"$JWT_SECRET\"/" .env.local
        fi
        print_status "Generated JWT secret"
    else
        print_warning "Please manually set JWT_SECRET in .env.local"
    fi
fi

# Check for required tools
print_header "🛠️  Checking optional development tools..."

# Check for PostgreSQL
if command -v psql &> /dev/null; then
    print_status "PostgreSQL is available"
else
    print_warning "PostgreSQL not found. Install it for full database functionality."
    if [ "$MACHINE" = "Mac" ]; then
        print_warning "Install with: brew install postgresql"
    else
        print_warning "Install with your package manager (e.g., apt install postgresql)"
    fi
fi

# Check for Redis
if command -v redis-cli &> /dev/null; then
    print_status "Redis is available"
else
    print_warning "Redis not found. Install it for caching and session management."
    if [ "$MACHINE" = "Mac" ]; then
        print_warning "Install with: brew install redis"
    else
        print_warning "Install with your package manager (e.g., apt install redis-server)"
    fi
fi

# Check for Git
if command -v git &> /dev/null; then
    print_status "Git is available"
else
    print_warning "Git not found. Install it for version control."
fi

# Development database setup (optional)
print_header "🗄️  Database Setup (Optional)"
echo "Would you like to set up a local development database? (PostgreSQL required)"
read -p "Setup local database? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]] && command -v psql &> /dev/null; then
    print_status "Setting up local development database..."
    
    # Check if database exists
    DB_NAME="bonjoojoo_dev"
    if psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
        print_status "Database $DB_NAME already exists"
    else
        createdb $DB_NAME 2>/dev/null && print_status "Created database $DB_NAME" || print_warning "Could not create database. Check PostgreSQL permissions."
    fi
    
    # Update .env.local with local database URL
    if command -v sed &> /dev/null; then
        LOCAL_DB_URL="postgresql://localhost:5432/$DB_NAME"
        if [ "$MACHINE" = "Mac" ]; then
            sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=\"$LOCAL_DB_URL\"|" .env.local
        else
            sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"$LOCAL_DB_URL\"|" .env.local
        fi
        print_status "Updated DATABASE_URL in .env.local"
    fi
fi

# VS Code setup
if command -v code &> /dev/null; then
    print_header "💻 VS Code Setup"
    echo "Would you like to install recommended VS Code extensions?"
    read -p "Install VS Code extensions? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Installing VS Code extensions..."
        code --install-extension bradlc.vscode-tailwindcss
        code --install-extension esbenp.prettier-vscode
        code --install-extension ms-vscode.vscode-typescript-next
        code --install-extension ms-vscode.vscode-eslint
        code --install-extension ms-vscode.vscode-json
        print_status "VS Code extensions installed"
    fi
fi

# Create .vscode/settings.json if it doesn't exist
if [ ! -d .vscode ]; then
    mkdir -p .vscode
fi

if [ ! -f .vscode/settings.json ]; then
    cat > .vscode/settings.json << EOF
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
EOF
    print_status "Created VS Code settings"
fi

# Build check
print_header "🔨 Testing build..."
if npm run build; then
    print_status "Build successful!"
else
    print_error "Build failed. Please check the errors above."
    exit 1
fi

# Final instructions
print_header "🎯 Setup Complete!"
echo ""
print_status "Development environment is ready!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your API keys and configuration"
echo "2. Start the development server: npm run dev"
echo "3. Visit http://localhost:3000"
echo ""
echo "Important files to configure:"
echo "• .env.local - Environment variables"
echo "• src/lib/stripe/server.ts - Stripe configuration"
echo "• src/lib/email/ - Email service configuration"
echo ""
echo "For production deployment, see DEPLOYMENT_GUIDE.md"
echo ""
print_status "Happy coding! 💎✨"
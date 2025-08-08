#!/bin/bash

# Movie Ticketing System API Installation Script
# This script will help you set up the project

echo "🎬 Movie Ticketing System API - Installation Script"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version must be 16 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL first."
    echo "Download from: https://dev.mysql.com/downloads/mysql/"
    exit 1
fi

echo "✅ MySQL is installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created. Please edit it with your configuration."
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run prisma:generate

if [ $? -eq 0 ]; then
    echo "✅ Prisma client generated successfully"
else
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

# Database setup instructions
echo ""
echo "🗄️  Database Setup Instructions:"
echo "================================"
echo "1. Make sure MySQL is running"
echo "2. Create the database by running:"
echo "   mysql -u root -p < db_api.sql"
echo "3. Update your .env file with correct database credentials"
echo "4. Run: npm run prisma:push"
echo ""

# Start development server
echo "🚀 Starting development server..."
echo "The server will be available at: http://localhost:3000"
echo "API documentation: http://localhost:3000/api/v1/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev

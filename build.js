#!/usr/bin/env node

// Production build script voor Vercel deployment
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🏗️  Starting production build...');

try {
  // Build de client met npx vite
  console.log('📦 Building client with Vite...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Build de server met npx esbuild
  console.log('📦 Building server with esbuild...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  // Check of alle bestanden zijn aangemaakt
  const distExists = fs.existsSync('dist');
  const publicExists = fs.existsSync('dist/public');
  const indexExists = fs.existsSync('dist/public/index.html');
  const serverExists = fs.existsSync('dist/index.js');
  
  if (!distExists || !publicExists || !indexExists || !serverExists) {
    throw new Error('Build output is incomplete');
  }
  
  console.log('✅ Build completed successfully!');
  console.log('📁 Generated files:');
  console.log('   - dist/public/index.html (React app)');
  console.log('   - dist/public/assets/ (CSS & JS)');
  console.log('   - dist/index.js (Express server)');
  console.log('   - dist/public/images/ (Static assets)');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
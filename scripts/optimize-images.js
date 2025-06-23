#!/usr/bin/env node

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONTENT_DIR = path.join(process.cwd(), 'src/content');
const OPTIMIZATION_QUALITY = 80;
const OPTIMIZED_FILE = path.join(process.cwd(), 'scripts', 'optimized.json');

// Dynamic import for sharp
async function loadSharp() {
  try {
    const sharpModule = await import('sharp');
    return sharpModule.default;
  } catch (error) {
    console.error('❌ Sharp is not installed. Please install it first:');
    console.error('npm install sharp --save-dev');
    process.exit(1);
  }
}

// Utility functions
function isPngFile(filePath) {
  return path.extname(filePath).toLowerCase() === '.png';
}

function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

// Load optimized files list
function loadOptimizedList() {
  try {
    if (fs.existsSync(OPTIMIZED_FILE)) {
      const content = fs.readFileSync(OPTIMIZED_FILE, 'utf8');
      return JSON.parse(content);
    }
    return [];
  } catch (error) {
    console.warn('Could not load optimized list:', error.message);
    return [];
  }
}

// Save optimized files list
function saveOptimizedList(optimizedList) {
  try {
    fs.writeFileSync(OPTIMIZED_FILE, JSON.stringify(optimizedList, null, 2));
    return true;
  } catch (error) {
    console.warn('Could not save optimized list:', error.message);
    return false;
  }
}

// Check if file was already optimized
function isFileOptimized(filePath, optimizedList) {
  const relativePath = path.relative(CONTENT_DIR, filePath);

  if (optimizedList.includes(relativePath)) {
    return true;
  }

  return false;
}

// Add file to optimized list
function addToOptimizedList(filePath, optimizedList) {
  const relativePath = path.relative(CONTENT_DIR, filePath);
  optimizedList.push(relativePath);

  console.log(`📝 Added to optimized list: ${relativePath}`);
  return optimizedList;
}

async function optimizeImage(filePath, sharp, optimizedList) {
  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    // Check if already optimized
    if (isFileOptimized(filePath, optimizedList)) {
      return { wasOptimized: false, optimizedList };
    }

    console.log(`🔄 Optimizing: ${path.relative(CONTENT_DIR, filePath)}`);

    // Optimize PNG
    const optimizedBuffer = await sharp(filePath)
      .png({
        quality: OPTIMIZATION_QUALITY,
        compressionLevel: 9,
        progressive: true
      })
      .toBuffer();

    // Write optimized image
    fs.writeFileSync(filePath, optimizedBuffer);

    const optimizedSize = optimizedBuffer.length;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    // Add to optimized list
    const updatedList = addToOptimizedList(filePath, optimizedList);

    console.log(`  ✓ Saved ${savings}% (${originalSize} → ${optimizedSize} bytes)`);
    return { wasOptimized: true, optimizedList: updatedList };

  } catch (error) {
    console.error(`❌ Failed to optimize ${filePath}:`, error.message);
    return { wasOptimized: false, optimizedList };
  }
}

function walkDirectory(dir, callback) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      walkDirectory(fullPath, callback);
    } else if (stats.isFile() && isPngFile(fullPath)) {
      callback(fullPath);
    }
  }
}

async function main() {
  console.log('🚀 Starting PNG image optimization...');
  console.log(`📁 Scanning directory: ${CONTENT_DIR}`);

  // Load sharp
  const sharp = await loadSharp();

  // Load optimized files list
  let optimizedList = loadOptimizedList();
  console.log(`📋 Loaded ${optimizedList.length} previously optimized files`);

  const imageFiles = [];

  // Collect all PNG files
  walkDirectory(CONTENT_DIR, (filePath) => {
    imageFiles.push(filePath);
  });

  if (imageFiles.length === 0) {
    console.log('📷 No PNG files found.');
    return;
  }

  console.log(`📷 Found ${imageFiles.length} PNG files`);

  let optimizedCount = 0;
  let skippedCount = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  // Process images sequentially to avoid overwhelming the system
  for (const filePath of imageFiles) {
    const stats = fs.statSync(filePath);
    totalOriginalSize += stats.size;

    const result = await optimizeImage(filePath, sharp, optimizedList);
    optimizedList = result.optimizedList;

    if (result.wasOptimized) {
      optimizedCount++;
      const newStats = fs.statSync(filePath);
      totalOptimizedSize += newStats.size;
    } else {
      skippedCount++;
      totalOptimizedSize += stats.size;
    }
  }

  // Save updated optimized list
  saveOptimizedList(optimizedList);
  console.log(`💾 Saved optimized files list with ${optimizedList.length} entries`);

  // Summary
  console.log('\n📊 Optimization Summary:');
  console.log(`  • Total files: ${imageFiles.length}`);
  console.log(`  • Optimized: ${optimizedCount}`);
  console.log(`  • Skipped: ${skippedCount}`);

  if (optimizedCount > 0) {
    const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    const savedBytes = totalOriginalSize - totalOptimizedSize;
    const savedMB = (savedBytes / 1024 / 1024).toFixed(2);

    console.log(`  • Total savings: ${totalSavings}% (${savedMB} MB)`);
    console.log(`  • Before: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  • After: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  }

  console.log('\n✅ PNG optimization completed!');
}

// Run the script (ES module check)
main().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});

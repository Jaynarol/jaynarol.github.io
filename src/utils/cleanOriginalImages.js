import { readdir, stat, unlink } from 'fs/promises';
import { join } from 'path';

/**
 * Custom Astro integration to clean original image files after build
 * This removes specified image extensions from the output directory while keeping optimized files
 */
export default function cleanOriginalImages(options = {}) {
  const {
    extensions = ['png', 'jpg', 'jpeg'],
    dryRun = false,
    excludePatterns = [],
    verbose = true
  } = options;

  return {
    name: 'clean-original-images',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        // แก้ไข path handling สำหรับ Windows
        let basePath;

        if (process.platform === 'win32') {
          // บน Windows ใช้ dir.href แล้วแปลงเป็น file path
          basePath = dir.href.replace('file:///', '').replace(/\//g, '\\');
        } else {
          basePath = dir.pathname;
        }

        const astroAssetsDir = join(basePath, '_astro');

        if (verbose) {
          console.log(`\n🧹 Cleaning original images from: ${astroAssetsDir}`);
          console.log(`📁 Original dir.pathname: ${dir.pathname}`);
          console.log(`📁 Processed basePath: ${basePath}`);
          console.log(`📁 Target extensions: ${extensions.join(', ')}`);
          if (dryRun) console.log('🔍 DRY RUN MODE - No files will be deleted');
        }

        try {
          const files = await readdir(astroAssetsDir);

          // Filter image files by extensions
          const imageFiles = files.filter(file => {
            const ext = file.split('.').pop()?.toLowerCase();
            return ext && extensions.includes(ext);
          });

          // Apply exclude patterns
          const filteredFiles = imageFiles.filter(file => {
            return !excludePatterns.some(pattern => {
              const regex = new RegExp(pattern);
              return regex.test(file);
            });
          });

          if (filteredFiles.length === 0) {
            if (verbose) console.log('🖼️  No original image files found to clean');
            return;
          }

          let totalSize = 0;
          let deletedCount = 0;

          if (verbose) {
            console.log(`\n📋 Files to be ${dryRun ? 'cleaned' : 'deleted'}:`);
          }

          for (const file of filteredFiles) {
            const filePath = join(astroAssetsDir, file);
            try {
              const stats = await stat(filePath);
              totalSize += stats.size;

              if (verbose) {
                const sizeKB = (stats.size / 1024).toFixed(2);
                console.log(`   ${dryRun ? '🔍' : '🗑️'} ${file} (${sizeKB} KB)`);
              }

              if (!dryRun) {
                await unlink(filePath);
              }
              deletedCount++;
            } catch (error) {
              console.warn(`⚠️  Failed to ${dryRun ? 'check' : 'delete'} ${file}:`, error.message);
            }
          }

          const savedKB = (totalSize / 1024).toFixed(2);
          const savedMB = (totalSize / (1024 * 1024)).toFixed(2);

          if (verbose) {
            console.log(`\n✨ ${dryRun ? 'Found' : 'Cleaned'} ${deletedCount} original image files`);
            console.log(`💾 ${dryRun ? 'Would save' : 'Saved'} ${savedKB} KB (${savedMB} MB) of disk space`);
          }

        } catch (error) {
          console.warn('⚠️  Failed to clean original images:', error.message);
        }
      }
    }
  };
} 
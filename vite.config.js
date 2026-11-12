import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    // 1. Tắt hoàn toàn Source Map để chống kẻ xấu đọc và đảo ngược mã nguồn (Reverse Engineering)
    sourcemap: false,
    
    // 2. Kích hoạt bộ nén & làm rối mã nguồn Terser (Obfuscation & Minification)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Xóa sạch console.log để không lộ dữ liệu debug
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug', 'console.warn'],
      },
      format: {
        comments: false, // Xóa sạch mọi comment trong code
      },
      mangle: {
        toplevel: true, // Làm rối tên hàm, tên biến cấp cao nhất
      }
    },
    rollupOptions: {
      output: {
        // Mã hóa tên file bundle bằng hash ngẫu nhiên không thể đoán trước
        entryFileNames: 'assets/[hash].js',
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]'
      }
    }
  }
})

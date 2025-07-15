import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

export default defineConfig({
  root: resolve(__dirname, "../test"),
  plugins: [vue()],
  build: {
    // 输出目录相对于 root，所以这里写回到项目根的 dist
    outDir: resolve(__dirname, 'test/dist'),
    emptyOutDir: true,

    // 指定 Rollup 的输入文件，确保它使用 test/index.html
    rollupOptions: {
      input: resolve(__dirname, 'test/main.ts'),
    }
  },
})

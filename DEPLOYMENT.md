# 🚀 DEPLOYMENT GUIDE

## Deploy to Vercel (Recommended - Free & Easy)

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Code đã push lên GitHub

### Steps:

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**
   - Vào: https://vercel.com/new
   - Click "Import Git Repository"
   - Chọn repository của bạn
   - Click "Import"

3. **Configure Project**
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add:
     - Name: `VITE_SHEET_ID`
     - Value: `your_sheet_id` (copy từ Google Sheets URL)

5. **Deploy**
   - Click "Deploy"
   - Chờ 1-2 phút
   - Done! 🎉

6. **Get Your URL**
   - Vercel sẽ tạo URL: `your-project.vercel.app`
   - Có thể custom domain nếu muốn

### Auto Deployment
- Mỗi lần push code lên GitHub, Vercel tự động deploy
- Preview deployments cho mỗi pull request

---

## Deploy to Netlify (Alternative)

### Steps:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Login to Netlify**
   ```bash
   netlify login
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

5. **Set Environment Variables**
   - Vào: Netlify Dashboard → Site Settings → Environment Variables
   - Add: `VITE_SHEET_ID=your_sheet_id`

---

## Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

3. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Set Environment Variables**
   - GitHub không support env variables cho static sites
   - Hardcode VITE_SHEET_ID trong `.env` và commit (chỉ nên dùng cho public data)

---

## Custom Domain

### Vercel:
1. Vào Project → Settings → Domains
2. Add your domain
3. Update DNS records theo hướng dẫn

### Netlify:
1. Vào Site Settings → Domain Management
2. Add custom domain
3. Update DNS

---

## Performance Optimization

### 1. Enable Caching
- Vercel/Netlify tự động cache static assets
- Cache headers đã được set trong build

### 2. Image Optimization
- Sử dụng Cloudinary hoặc ImageKit cho images
- Lazy loading đã được implement

### 3. Analytics
- Add Vercel Analytics (free):
  ```bash
  npm install @vercel/analytics
  ```
  
  ```javascript
  // main.jsx
  import { Analytics } from '@vercel/analytics/react';
  
  <Analytics />
  ```

---

## Monitoring

### Vercel:
- Real-time logs: Dashboard → Deployments → View Logs
- Analytics: Dashboard → Analytics
- Function logs (nếu dùng serverless)

### Uptime Monitoring (Free):
- UptimeRobot: https://uptimerobot.com
- StatusCake: https://statuscake.com

---

## Troubleshooting

### Build Failed?
- Check build logs
- Ensure all dependencies trong package.json
- Test build locally: `npm run build`

### Environment Variables không hoạt động?
- Phải prefix với `VITE_`
- Redeploy sau khi add env vars
- Check trong build logs

### 404 on routes?
- Vercel: Tự động handle SPA routing
- Netlify: Add `_redirects` file:
  ```
  /*    /index.html   200
  ```

---

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] Google Sheets data hiển thị
- [ ] Images load
- [ ] Social links work
- [ ] Share button works
- [ ] Admin login works
- [ ] Mobile responsive
- [ ] Performance good (check PageSpeed Insights)

---

## Update Website

1. Make changes locally
2. Test: `npm run dev`
3. Commit & push:
   ```bash
   git add .
   git commit -m "Update: description"
   git push
   ```
4. Vercel/Netlify auto deploys

---

## Rollback

### Vercel:
1. Dashboard → Deployments
2. Find previous deployment
3. Click "..." → Promote to Production

### Netlify:
1. Dashboard → Deploys
2. Find previous deploy
3. Click "Publish deploy"

---

Cần support? Check deployment logs hoặc contact platform support!

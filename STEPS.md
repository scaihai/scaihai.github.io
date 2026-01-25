### **Part 1: Local Testing in VS Code**

Before deploying, you need to ensure the app runs locally and connects to the Gemini API correctly.

#### **1. Prerequisites**

* **Node.js**: Ensure you have Node.js installed (Run `node -v` in terminal).
* **Git**: Ensure Git is installed.
* **VS Code Extension**: "ES7+ React/Redux/React-Native snippets" (optional but helpful).

#### **2. Setup the Project**

1. **Open VS Code**: Open the folder containing your files.
2. **Install Dependencies**: Open the terminal (`Ctrl + ~`) and run:
```bash
npm install

```


*This downloads React, Vite, Framer Motion, and other libraries listed in your `package.json`.*

#### **5. Run the Development Server**

In the VS Code terminal:

```bash
npm run dev

```

* Hold `Ctrl` and click the link shown (usually `http://localhost:3000`) to open it in your browser.
* Test the animations and the "Ask My Portfolio" chat interface.

---

### **Part 2: Deploying to scaihai.github.io**

Since you are deploying to a **User Page** (`scaihai.github.io`) rather than a Project Page (`github.com/scaihai/project-name`), the configuration is slightly specific.

#### **1. Update `package.json**`

You need the `gh-pages` tool to handle the deployment logic easily.

1. Stop the server (`Ctrl + C`).
2. Install the deployer:
```bash
npm install gh-pages --save-dev

```


3. Open `package.json` and add these **two** lines to the `"scripts"` section:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist -b main -r https://github.com/scaihai/scaihai.github.io.git"
}

```


* **Explanation**:
* `predeploy`: Ensures we build a fresh version before deploying.
* `deploy`: Uploads the `dist` folder (the built website) to the `main` branch of your specific GitHub repository.
* **Important**: User pages (`username.github.io`) **must** be served from the `main` (or `master`) branch. This script forces the built content onto that branch.





#### **2. Prepare the Repository**

1. Go to **GitHub.com** and create a **New Repository**.
2. **Repository Name**: You **must** name it exactly: `scaihai.github.io`.
3. **Public/Private**: Set it to **Public**.
4. Do **not** initialize with README/gitignore (you have code locally).

#### **3. Push Source Code (Optional but Recommended)**

It is best practice to keep your source code (the React files) on a branch named `source` or `dev`, and the built website (HTML/CSS) on `main`.

```bash
# Initialize git if not already done
git init

# Create a source branch for your code
git checkout -b source

# Add files
git add .
git commit -m "Initial portfolio commit"

# Link to your new GitHub repo
git remote add origin https://github.com/scaihai/scaihai.github.io.git

# Push your source code to the 'source' branch
git push -u origin source

```

#### **4. Deploy the Site**

Now, run the deploy script we created. This will compile your React code into standard HTML/JS and push it to the `main` branch (which GitHub Pages serves automatically for user repos).

```bash
npm run deploy

```

*If it asks for a password, this is your GitHub credentials.*

#### **5. Final Configuration**

1. Go to your Repository on GitHub.
2. Click **Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, ensure it is set to **main** (and folder `/ (root)`).
* *(The `npm run deploy` command usually handles the branch creation, but verifying here is good).*


4. Wait about 1-2 minutes.
5. Visit `https://scaihai.github.io`.

### **Summary of Branches**

* **`source` branch**: Contains your React code (`App.tsx`, `package.json`, etc.). You work here.
* **`main` branch**: Contains the built website (`index.html`, `assets/`). GitHub Pages serves this. **Do not edit this branch manually.**

### **A Note on API Keys in Deployment**

Since this is a static frontend site, your `GEMINI_API_KEY` will be visible in the user's browser "Network" tab if they look for it. For a portfolio, this is often acceptable risk if you set **usage quotas** in your Google Cloud Console to prevent cost overruns. For a fully secure app, you would need a backend proxy.
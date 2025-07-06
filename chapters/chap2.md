# Chapter 2: Setting Up Development Environment & Creating First Angular Project

## 🛠️ Prerequisites for Angular Development

Before we start building Angular applications, we need to set up our development environment with the necessary tools.

### Required Tools

| Tool                    | Purpose                                           | Version Required    |
|-------------------------|---------------------------------------------------|---------------------|
| **Node.js**             | JavaScript runtime for running Angular CLI       | 16.x or higher      |
| **npm**                 | Package manager (comes with Node.js)             | 8.x or higher       |
| **Angular CLI**         | Command-line tool for Angular projects           | Latest version      |
| **Code Editor**         | For writing code (VS Code recommended)           | Latest version      |
| **Web Browser**         | For testing applications (Chrome recommended)    | Latest version      |

---

## 📥 Installing Node.js and npm

### Step-by-Step Installation

| Step | Action                                                     |
|------|------------------------------------------------------------|
| 1    | Visit [nodejs.org](https://nodejs.org)                   |
| 2    | Download the **LTS (Long Term Support)** version         |
| 3    | Run the installer and follow the setup wizard            |
| 4    | Verify installation using command prompt/terminal        |

### Verification Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

### Expected Output

| Command            | Expected Result        |
|--------------------|------------------------|
| `node --version`   | v18.x.x (or higher)    |
| `npm --version`    | 8.x.x (or higher)      |

---

## ⚡ Installing Angular CLI

### What is Angular CLI?

| Feature                  | Description                                      |
|--------------------------|--------------------------------------------------|
| **Command Line Tool**    | Helps create, build, and manage Angular apps    |
| **Project Scaffolding**  | Generates project structure automatically       |
| **Development Server**   | Provides live reload during development         |
| **Build Tools**          | Compiles and optimizes code for production      |

### Installation Command

```bash
# Install Angular CLI globally
npm install -g @angular/cli
```

### Verify Angular CLI Installation

```bash
# Check Angular CLI version
ng version
```

### Expected Output Structure

| Information          | Details                           |
|---------------------|-----------------------------------|
| **Angular CLI**      | 16.x.x (or current version)      |
| **Node**            | 18.x.x                            |
| **Package Manager**  | npm 8.x.x                         |
| **OS**              | Your operating system             |

---

## 🎯 Creating Your First Angular Project

### Using Angular CLI to Generate Project

```bash
# Create new Angular project
ng new my-first-app

# Navigate to project directory
cd my-first-app

# Start development server
ng serve
```

### Project Creation Options

| Option                    | Description                           | Recommendation  |
|---------------------------|---------------------------------------|-----------------|
| **Add Angular routing?**  | Include routing for navigation        | Yes             |
| **Stylesheet format?**    | CSS, SCSS, SASS, or LESS            | CSS (for now)   |

---

## 📁 Angular Project Structure

### Generated Files and Folders

| File/Folder              | Purpose                                        |
|--------------------------|------------------------------------------------|
| **src/**                 | Source code of your application               |
| **src/app/**             | Main application module and components        |
| **src/assets/**          | Static assets (images, fonts, etc.)          |
| **src/environments/**    | Environment-specific configurations           |
| **angular.json**         | Angular project configuration                 |
| **package.json**         | Project dependencies and scripts             |
| **tsconfig.json**        | TypeScript configuration                      |

### Key Files in src/app/

| File                     | Purpose                                        |
|--------------------------|------------------------------------------------|
| **app.component.ts**     | Main application component logic              |
| **app.component.html**   | Main application component template           |
| **app.component.css**    | Main application component styles             |
| **app.module.ts**        | Root module that bootstraps the application   |

---

## 🌐 Running Your First Angular Application

### Development Server Commands

| Command                  | Purpose                                        |
|--------------------------|------------------------------------------------|
| `ng serve`               | Start development server on default port      |
| `ng serve --port 4200`   | Start on specific port (4200 is default)      |
| `ng serve --open`        | Start server and open browser automatically   |

### What Happens When You Run ng serve?

| Step | Process                                               |
|------|-------------------------------------------------------|
| 1    | Compiles TypeScript to JavaScript                    |
| 2    | Bundles all files together                           |
| 3    | Starts a local development server                    |
| 4    | Watches for file changes and auto-reloads            |

### Accessing Your Application

| URL                      | What You'll See                                |
|--------------------------|------------------------------------------------|
| `http://localhost:4200`  | Your Angular application running in browser   |

---

## 🔍 Understanding the Default Application

### What's Displayed Initially?

| Element                  | Description                                    |
|--------------------------|------------------------------------------------|
| **Angular Logo**         | Default Angular branding                      |
| **Welcome Message**      | "Welcome to [your-app-name]!"                |
| **Resources Links**      | Links to Angular documentation and tools      |
| **Next Steps**           | Suggested actions for development             |

### Where This Content Comes From

| File                     | Contains                                       |
|--------------------------|------------------------------------------------|
| **app.component.html**   | The HTML template with welcome content        |
| **app.component.ts**     | Component logic and properties                |
| **app.component.css**    | Styling for the component                     |

---

## 🛠️ Basic Angular CLI Commands

### Essential Commands for Development

| Command                  | Purpose                                        |
|--------------------------|------------------------------------------------|
| `ng new [project-name]`  | Create a new Angular project                  |
| `ng serve`               | Start the development server                  |
| `ng build`               | Build the project for production              |
| `ng generate component`  | Generate a new component                      |
| `ng generate service`    | Generate a new service                        |
| `ng test`                | Run unit tests                                |
| `ng e2e`                 | Run end-to-end tests                          |

### Command Shortcuts

| Full Command             | Shortcut     | Purpose                      |
|--------------------------|--------------|------------------------------|
| `ng generate component`  | `ng g c`     | Generate component           |
| `ng generate service`    | `ng g s`     | Generate service             |
| `ng serve`               | `ng s`       | Start dev server             |

---

## 🎨 Customizing Your First Application

### Modifying the Welcome Message

```typescript
// src/app/app.component.ts
export class AppComponent {
  title = 'My Awesome Angular App';
  message = 'Hello, Angular World!';
}
```

```html
<!-- src/app/app.component.html -->
<h1>Welcome to {{ title }}!</h1>
<p>{{ message }}</p>
```

### Adding Basic Styling

```css
/* src/app/app.component.css */
h1 {
  color: #1976d2;
  text-align: center;
  font-family: Arial, sans-serif;
}

p {
  text-align: center;
  font-size: 18px;
  color: #666;
}
```

---

## 🔧 Development Tools Setup

### Recommended VS Code Extensions

| Extension                    | Purpose                                    |
|------------------------------|--------------------------------------------|
| **Angular Language Service** | IntelliSense for Angular templates        |
| **Angular Snippets**         | Code snippets for faster development      |
| **TypeScript Hero**          | Better TypeScript support                 |
| **Prettier**                 | Code formatting                           |
| **Auto Rename Tag**          | Automatically rename paired HTML tags     |

### Browser Developer Tools

| Tool                     | Purpose                                    |
|-------------------------|--------------------------------------------|
| **Angular DevTools**     | Debug Angular applications in Chrome      |
| **Chrome DevTools**      | Standard web development debugging        |

---

## 📚 Chapter Summary

### What You've Accomplished

| Achievement                                                              |
|--------------------------------------------------------------------------|
| ✅ Installed Node.js and npm on your system                            |
| ✅ Installed Angular CLI globally                                       |
| ✅ Created your first Angular project                                   |
| ✅ Started the development server                                       |
| ✅ Viewed your running Angular application in the browser               |
| ✅ Understood the basic project structure                               |
| ✅ Learned essential Angular CLI commands                               |

### Key Concepts Learned

| Concept                  | Key Takeaway                                    |
|-------------------------|-------------------------------------------------|
| **Angular CLI**          | Command-line tool for Angular development      |
| **Project Structure**    | Organized folder structure for maintainability |
| **Development Server**   | Live reload for efficient development          |
| **Component-Based**      | Angular apps are built with components         |

---

### 🎯 What You've Learned

- [x] How to set up a complete Angular development environment
- [x] Installing and using Angular CLI
- [x] Creating a new Angular project from scratch
- [x] Understanding the generated project structure
- [x] Running the development server
- [x] Basic customization of an Angular application
- [x] Essential Angular CLI commands for development

### 🔜 Next Steps

In the next chapter, we'll dive deeper into Angular components and learn how to create our own custom components!

---

### 🚨 Troubleshooting Common Issues

| Issue                           | Solution                                    |
|---------------------------------|---------------------------------------------|
| **Node.js not recognized**      | Restart terminal/command prompt             |
| **Angular CLI not found**       | Ensure global installation with `-g` flag  |
| **Port 4200 already in use**    | Use `ng serve --port 4201`                |
| **Permission errors**           | Run terminal as administrator (Windows)     |
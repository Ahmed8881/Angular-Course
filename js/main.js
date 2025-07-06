class ProfessionalCourseManager {
    constructor() {
        this.chapters = [];
        this.currentChapterIndex = 0;
        this.completedChapters = new Set();
        this.bookmarkedChapters = new Set();
        this.chapterRatings = new Map();
        this.studyStartTime = Date.now();
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.sidebarCollapsed = false;
        
        this.initializeApp();
    }

    async initializeApp() {
        this.showLoadingScreen();
        await this.loadChaptersFromFiles();
        this.loadUserProgress();
        this.setupEventListeners();
        this.initializeTheme();
        this.renderChapterList();
        this.updateStudyStats();
        this.hideLoadingScreen();
        
        // Auto-load first chapter if available
        if (this.chapters.length > 0) {
            this.loadChapter(0);
        }
    }

    showLoadingScreen() {
        document.getElementById('loadingScreen').style.display = 'flex';
    }

    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loadingScreen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loadingScreen').style.display = 'none';
            }, 500);
        }, 1000);
    }

    async loadChaptersFromFiles() {
        // First, try to load from chapters folder
        try {
            // This would work with a local server or if files are in the same domain
            await this.loadFromChaptersFolder();
        } catch (error) {
            console.log('Loading from folder failed, using sample data');
            this.loadSampleChapters();
        }
    }

    async loadFromChaptersFolder() {
        // Generate chapter file names (you can modify this pattern)
        const chapterFiles = [];
        for (let i = 1; i <= 196; i++) {
            chapterFiles.push(`chapters/chapter-${i.toString().padStart(3, '0')}.md`);
        }

        const loadPromises = chapterFiles.map(async (file, index) => {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const content = await response.text();
                    return this.parseMarkdownFile(content, index + 1);
                }
            } catch (error) {
                console.log(`Could not load ${file}`);
            }
            return null;
        });

        const results = await Promise.all(loadPromises);
        this.chapters = results.filter(chapter => chapter !== null);

        if (this.chapters.length === 0) {
            throw new Error('No chapters loaded');
        }
    }

    parseMarkdownFile(content, chapterNumber) {
        const lines = content.split('\n');
        let title = `Chapter ${chapterNumber}`;
        let category = 'basics';
        let difficulty = 'Beginner';
        let duration = '5 min read';

        // Extract metadata from frontmatter or first heading
        for (const line of lines) {
            if (line.startsWith('# ')) {
                title = line.substring(2).trim();
                break;
            }
        }

        // Determine category and difficulty based on chapter number
        if (chapterNumber <= 50) {
            category = 'basics';
            difficulty = 'Beginner';
        } else if (chapterNumber <= 120) {
            category = 'intermediate';
            difficulty = 'Intermediate';
        } else if (chapterNumber <= 170) {
            category = 'advanced';
            difficulty = 'Advanced';
        } else {
            category = 'projects';
            difficulty = 'Expert';
        }

        return {
            id: chapterNumber,
            title: title,
            content: content,
            category: category,
            difficulty: difficulty,
            duration: duration
        };
    }

    loadSampleChapters() {
        // Sample chapters with rich content
        this.chapters = [
            {
                id: 1,
                title: "Introduction to HTML - The Foundation of Web Development",
                category: "basics",
                difficulty: "Beginner",
                duration: "8 min read",
                content: `# Introduction to HTML - The Foundation of Web Development

## What is HTML?

HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It provides the basic structure and content of websites, working alongside CSS for styling and JavaScript for interactivity.

### Key Concepts

**HyperText** refers to the linking capability of HTML - the ability to connect documents and resources through hyperlinks.

**Markup Language** means HTML uses tags to structure and describe content, telling the browser how to display information.

## Why Learn HTML?

- **Universal Foundation**: Every website uses HTML
- **Easy to Learn**: Simple syntax and logical structure  
- **Career Essential**: Required for web development roles
- **Creative Control**: Build anything from simple pages to complex applications

## Basic HTML Structure

Every HTML document follows this basic structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is your first paragraph.</p>
</body>
</html>
\`\`\`

### Breaking Down the Structure

1. **DOCTYPE Declaration**: Tells the browser this is HTML5
2. **html Element**: Root element containing all content
3. **head Section**: Metadata not displayed on the page
4. **body Section**: Visible content of the webpage

## Your Learning Journey

This course will take you from complete beginner to advanced HTML developer. You'll learn:

- Basic HTML elements and attributes
- Semantic HTML for better accessibility
- Forms and user input
- Advanced layout techniques
- HTML5 features and APIs
- Best practices and optimization

> **Pro Tip**: Practice as you learn! Try creating simple HTML files and viewing them in your browser.

Ready to start building the web? Let's dive into the next chapter!`
            },
            {
                id: 2,
                title: "Setting Up Your Development Environment",
                category: "basics", 
                difficulty: "Beginner",
                duration: "12 min read",
                content: `# Setting Up Your Development Environment

## Essential Tools for HTML Development

Before we start coding, let's set up a professional development environment that will make your HTML learning journey smooth and efficient.

### Text Editors and IDEs

**Visual Studio Code (Recommended)**
- Free, powerful, and feature-rich
- Excellent HTML support with IntelliSense
- Vast extension marketplace
- Built-in terminal and Git integration

**Other Great Options:**
- **Sublime Text**: Fast and lightweight
- **Atom**: Hackable text editor by GitHub
- **Brackets**: Adobe's web-focused editor
- **WebStorm**: Professional IDE by JetBrains

### Browser Developer Tools

Modern browsers come with powerful development tools:

**Chrome DevTools**
- Right-click → "Inspect Element"
- Elements panel for HTML inspection
- Console for debugging
- Network tab for performance analysis

**Firefox Developer Tools**
- Similar functionality to Chrome
- Excellent CSS Grid and Flexbox tools
- Accessibility inspector

### Essential Extensions for VS Code

\`\`\`
1. Live Server - Real-time preview
2. HTML CSS Support - Enhanced autocomplete
3. Prettier - Code formatting
4. Auto Rename Tag - Sync tag changes
5. Bracket Pair Colorizer - Visual bracket matching
\`\`\`

## Project Structure Best Practices

Organize your HTML projects like this:

\`\`\`
my-website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
│   ├── logo.png
│   └── banner.jpg
└── assets/
    └── fonts/
\`\`\`

### Why This Structure Matters

- **Maintainability**: Easy to find and update files
- **Scalability**: Structure grows with your project
- **Collaboration**: Team members understand the organization
- **Deployment**: Servers expect standard structures

## Setting Up Live Server

Live Server provides real-time preview of your HTML changes:

1. Install the Live Server extension in VS Code
2. Right-click your HTML file
3. Select "Open with Live Server"
4. Your page opens in the browser with auto-refresh

### Benefits of Live Server

- **Instant Feedback**: See changes immediately
- **Mobile Testing**: Access from other devices
- **No Manual Refresh**: Automatic browser updates
- **Development Server**: Simulates real hosting environment

## Version Control with Git

Even for learning projects, version control is essential:

\`\`\`bash
# Initialize a Git repository
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial HTML project setup"
\`\`\`

### Git Best Practices for HTML Projects

- Commit frequently with descriptive messages
- Use .gitignore for temporary files
- Create branches for experimental features
- Learn basic Git commands early

## Browser Testing Setup

Test your HTML across different browsers:

**Desktop Browsers:**
- Chrome (latest)
- Firefox (latest)  
- Safari (if on Mac)
- Edge (Windows)

**Mobile Testing:**
- Chrome DevTools device emulation
- Firefox responsive design mode
- Real device testing when possible

## Performance and Accessibility Tools

**Lighthouse (Built into Chrome)**
- Performance auditing
- Accessibility checking
- SEO analysis
- Best practices validation

**Wave Web Accessibility Evaluator**
- Detailed accessibility reports
- Visual feedback on issues
- Free browser extension

## Your Development Workflow

1. **Plan**: Sketch your HTML structure
2. **Code**: Write semantic HTML
3. **Preview**: Use Live Server for real-time feedback
4. **Test**: Check across different browsers
5. **Validate**: Use HTML validators
6. **Commit**: Save your progress with Git

> **Next Steps**: Now that your environment is ready, let's create your first HTML document in the next chapter!`
            },
            {
                id: 3,
                title: "Creating Your First HTML Document",
                category: "basics",
                difficulty: "Beginner", 
                duration: "10 min read",
                content: `# Creating Your First HTML Document

## Let's Build Your First Webpage!

Now that your development environment is set up, it's time to create your very first HTML document. This hands-on approach will give you immediate results and build your confidence.

### Step 1: Create Your HTML File

1. Open Visual Studio Code
2. Create a new file (Ctrl+N or Cmd+N)
3. Save it as \`index.html\` (Ctrl+S or Cmd+S)
4. VS Code will automatically recognize it as an HTML file

### Step 2: The HTML5 Boilerplate

Type this basic structure into your file:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
</head>
<body>
    
</body>
</html>
\`\`\`

### Understanding Each Line

**\`<!DOCTYPE html>\`**
- Declares this as an HTML5 document
- Must be the very first line
- Ensures browsers render in standards mode

**\`<html lang="en">\`**
- Root element of the page
- \`lang="en"\` specifies English language
- Helps screen readers and search engines

**\`<head>\` Section**
- Contains metadata (information about the page)
- Content here isn't displayed to users
- Critical for SEO and browser functionality

**\`<meta charset="UTF-8">\`**
- Specifies character encoding
- UTF-8 supports all international characters
- Prevents display issues with special characters

**\`<meta name="viewport"...>\`**
- Makes your page mobile-responsive
- Controls how the page displays on mobile devices
- Essential for modern web development

**\`<title>\` Element**
- Text shown in browser tab
- Used by search engines as clickable headline
- Keep it descriptive and under 60 characters

### Step 3: Adding Content to the Body

Let's add some content inside the \`<body>\` tags:

\`\`\`html
<body>
    <h1>Welcome to My Website!</h1>
    <p>This is my first HTML document. I'm learning web development!</p>
    
    <h2>About Me</h2>
    <p>I'm excited to learn HTML and build amazing websites.</p>
    
    <h2>My Goals</h2>
    <ul>
        <li>Master HTML fundamentals</li>
        <li>Learn CSS for styling</li>
        <li>Add JavaScript for interactivity</li>
        <li>Build my first complete website</li>
    </ul>
</body>
\`\`\`

### Complete First Document

Here's your complete first HTML document:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage - Learning HTML</title>
</head>
<body>
    <h1>Welcome to My Website!</h1>
    <p>This is my first HTML document. I'm learning web development!</p>
    
    <h2>About Me</h2>
    <p>I'm excited to learn HTML and build amazing websites. This journey 
       starts with understanding the basics and gradually building more 
       complex and interactive web pages.</p>
    
    <h2>My Learning Goals</h2>
    <ul>
        <li>Master HTML fundamentals and semantic markup</li>
        <li>Learn CSS for beautiful styling and layouts</li>
        <li>Add JavaScript for interactivity and dynamic content</li>
        <li>Build my first complete responsive website</li>
        <li>Understand web accessibility best practices</li>
    </ul>
    
    <h2>What I've Learned So Far</h2>
    <p>In this course, I've already learned about:</p>
    <ol>
        <li>Setting up a development environment</li>
        <li>Understanding HTML document structure</li>
        <li>Creating my first HTML file</li>
    </ol>
    
    <p>I'm ready to continue learning and building more advanced web pages!</p>
</body>
</html>
\`\`\`

### Step 4: Viewing Your Page

1. Save your file (Ctrl+S or Cmd+S)
2. Right-click in VS Code and select "Open with Live Server"
3. Your browser will open showing your webpage!
4. Try making changes and watch them update automatically

### Common Beginner Mistakes to Avoid

**Forgetting Closing Tags**
\`\`\`html
<!-- Wrong -->
<p>This paragraph has no closing tag

<!-- Correct -->
<p>This paragraph is properly closed</p>
\`\`\`

**Incorrect Nesting**
\`\`\`html
<!-- Wrong -->
<p><strong>Bold text</p></strong>

<!-- Correct -->
<p><strong>Bold text</strong></p>
\`\`\`

**Missing DOCTYPE**
- Always start with \`<!DOCTYPE html>\`
- Without it, browsers use "quirks mode"
- Can cause unexpected layout issues

### Best Practices for HTML Documents

1. **Use Semantic HTML**: Choose elements based on meaning, not appearance
2. **Indent Properly**: Makes code readable and maintainable
3. **Add Comments**: Explain complex sections
4. **Validate Your Code**: Use online HTML validators
5. **Test Across Browsers**: Ensure compatibility

### Next Steps

Congratulations! You've created your first HTML document. In the next chapter, we'll explore HTML elements in detail and learn how to structure content semantically.

> **Challenge**: Try modifying your page by adding more paragraphs, headings, or list items. Experiment and see what happens!`
            }
        ];

        // Generate additional placeholder chapters
        for (let i = 4; i <= 196; i++) {
            this.chapters.push({
                id: i,
                title: `Chapter ${i}: ${this.generateChapterTitle(i)}`,
                category: this.getCategoryForChapter(i),
                difficulty: this.getDifficultyForChapter(i),
                duration: `${Math.floor(Math.random() * 10) + 5} min read`,
                content: this.generatePlaceholderContent(i)
            });
        }
    }

    generateChapterTitle(chapterNumber) {
        const titles = [
            "HTML Elements and Tags Deep Dive",
            "Semantic HTML for Better Structure",
            "Working with Text Content",
            "Creating Lists and Navigation",
            "Understanding HTML Attributes",
            "Building Forms and Input Elements",
            "Working with Images and Media",
            "HTML Tables for Data Display",
            "Advanced Form Controls",
            "HTML5 Semantic Elements",
            "Accessibility Best Practices",
            "Meta Tags and SEO Optimization",
            "Responsive HTML Techniques",
            "HTML5 APIs and Features",
            "Project: Building a Complete Website"
        ];
        
        const baseTitle = titles[(chapterNumber - 4) % titles.length];
        const variation = Math.floor((chapterNumber - 4) / titles.length) + 1;
        return variation > 1 ? `${baseTitle} - Part ${variation}` : baseTitle;
    }

    getCategoryForChapter(chapterNumber) {
        if (chapterNumber <= 50) return 'basics';
        if (chapterNumber <= 120) return 'intermediate';
        if (chapterNumber <= 170) return 'advanced';
        return 'projects';
    }

    getDifficultyForChapter(chapterNumber) {
        if (chapterNumber <= 50) return 'Beginner';
        if (chapterNumber <= 120) return 'Intermediate';
        if (chapterNumber <= 170) return 'Advanced';
        return 'Expert';
    }

    generatePlaceholderContent(chapterNumber) {
        return `# Chapter ${chapterNumber}: ${this.generateChapterTitle(chapterNumber)}

## Overview

This chapter covers important concepts in HTML development. You can replace this placeholder content with your actual chapter material.

### Learning Objectives

By the end of this chapter, you will:

- Understand the key concepts covered in this section
- Be able to apply these techniques in your projects
- Have hands-on experience with practical examples

### Key Topics

1. **Topic One**: Detailed explanation of the first major concept
2. **Topic Two**: In-depth coverage of the second important area
3. **Topic Three**: Advanced techniques and best practices

### Practical Examples

\`\`\`html
<!-- Example HTML code for Chapter ${chapterNumber} -->
<div class="chapter-${chapterNumber}">
    <h2>Chapter ${chapterNumber} Example</h2>
    <p>This is a practical example demonstrating the concepts.</p>
</div>
\`\`\`

### Exercises

Try implementing these concepts in your own projects:

1. Create a basic example using the techniques shown
2. Experiment with different variations
3. Apply the concepts to your personal projects

> **Note**: Replace this placeholder content with your actual chapter material from markdown files.

### Next Steps

Continue to the next chapter to build upon these concepts and learn more advanced techniques.`;
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        
        searchInput.addEventListener('input', (e) => this.filterChapters(e.target.value));
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            this.filterChapters('');
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filterByCategory(e.target.value);
        });

        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.previousChapter());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextChapter());

        // Start first chapter button
        document.getElementById('startFirstChapter').addEventListener('click', () => {
            this.loadChapter(0);
        });

        // Sidebar collapse
        document.getElementById('collapseBtn').addEventListener('click', () => this.toggleSidebar());

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Action buttons
        document.getElementById('bookmarkBtn').addEventListener('click', () => this.toggleBookmark());
        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('printBtn').addEventListener('click', () => this.printChapter());

        // Chapter completion
        document.getElementById('completeBtn').addEventListener('click', () => this.toggleChapterCompletion());

        // Chapter rating
        document.querySelectorAll('#chapterRating i').forEach((star, index) => {
            star.addEventListener('click', () => this.rateChapter(index + 1));
        });

        // Table of contents
        document.getElementById('tocToggle').addEventListener('click', () => this.toggleTOC());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Auto-save progress
        setInterval(() => this.saveUserProgress(), 30000); // Save every 30 seconds
    }

    filterChapters(searchTerm) {
        const category = document.getElementById('categoryFilter').value;
        let filteredChapters = this.chapters;

        if (searchTerm) {
            filteredChapters = filteredChapters.filter(chapter =>
                chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                chapter.id.toString().includes(searchTerm)
            );
        }

        if (category) {
            filteredChapters = filteredChapters.filter(chapter => chapter.category === category);
        }

        this.renderChapterList(filteredChapters);
    }

    filterByCategory(category) {
        const searchTerm = document.getElementById('searchInput').value;
        this.filterChapters(searchTerm);
    }

    renderChapterList(chaptersToShow = this.chapters) {
        const chapterList = document.getElementById('chapterList');
        chapterList.innerHTML = '';

        chaptersToShow.forEach((chapter) => {
            const chapterElement = document.createElement('div');
            chapterElement.className = 'chapter-item';
            
            if (chapter.id === this.chapters[this.currentChapterIndex]?.id) {
                chapterElement.classList.add('active');
            }
            
            if (this.completedChapters.has(chapter.id)) {
                chapterElement.classList.add('completed');
            }

            chapterElement.innerHTML = `
                <div class="chapter-number">Chapter ${chapter.id}</div>
                <div class="chapter-title">${chapter.title}</div>
                <div class="chapter-meta-info">
                    <span class="difficulty">${chapter.difficulty}</span>
                    <span class="duration">${chapter.duration}</span>
                </div>
            `;

            chapterElement.addEventListener('click', () => {
                this.currentChapterIndex = this.chapters.findIndex(ch => ch.id === chapter.id);
                this.loadChapter(this.currentChapterIndex);
            });

            chapterList.appendChild(chapterElement);
        });
    }

    loadChapter(index) {
        if (index < 0 || index >= this.chapters.length) return;

        this.currentChapterIndex = index;
        const chapter = this.chapters[index];

        // Update chapter info
        document.getElementById('chapterBadge').textContent = `Chapter ${chapter.id}`;
        document.getElementById('chapterTitle').textContent = chapter.title;
        document.getElementById('chapterDifficulty').textContent = chapter.difficulty;
        document.getElementById('chapterDuration').textContent = chapter.duration;
        document.getElementById('chapterCategory').textContent = chapter.category;

        // Update chapter counter and progress
        document.getElementById('chapterCounter').textContent = 
            `Chapter ${chapter.id} of ${this.chapters.length}`;
        
        const progress = ((index + 1) / this.chapters.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('chapterProgressFill').style.width = `${progress}%`;

        // Update content using marked.js for better markdown parsing
        const htmlContent = marked.parse(chapter.content);
        document.getElementById('chapterContent').innerHTML = htmlContent;

        // Update navigation buttons
        document.getElementById('prevBtn').disabled = index === 0;
        document.getElementById('nextBtn').disabled = index === this.chapters.length - 1;

        // Update bookmark button
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        const bookmarkIcon = bookmarkBtn.querySelector('i');
        if (this.bookmarkedChapters.has(chapter.id)) {
            bookmarkIcon.className = 'fas fa-bookmark';
        } else {
            bookmarkIcon.className = 'far fa-bookmark';
        }

        // Update completion button
        const completeBtn = document.getElementById('completeBtn');
        if (this.completedChapters.has(chapter.id)) {
            completeBtn.innerHTML = '<i class="fas fa-check"></i> Completed';
            completeBtn.classList.add('completed');
        } else {
            completeBtn.innerHTML = '<i class="fas fa-check"></i> Mark as Complete';
            completeBtn.classList.remove('completed');
        }

        // Update chapter rating
        this.updateChapterRating(chapter.id);

        // Generate table of contents
        this.generateTOC(htmlContent);

        // Update sidebar
        this.renderChapterList();

        // Scroll to top
        document.getElementById('chapterContent').scrollTop = 0;

        // Add fade-in animation
        document.getElementById('chapterContent').classList.add('fade-in');
        setTimeout(() => {
            document.getElementById('chapterContent').classList.remove('fade-in');
        }, 500);

        // Update progress overview
        this.updateProgressOverview();

        // Save progress
        this.saveUserProgress();
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const content = document.querySelector('.content');
        const collapseBtn = document.getElementById('collapseBtn');
        const icon = collapseBtn.querySelector('i');

        this.sidebarCollapsed = !this.sidebarCollapsed;

        if (this.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            content.classList.add('expanded');
            icon.className = 'fas fa-chevron-right';
        } else {
            sidebar.classList.remove('collapsed');
            content.classList.remove('expanded');
            icon.className = 'fas fa-chevron-left';
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');

        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
        } else {
            document.documentElement.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
        }

        localStorage.setItem('darkMode', this.isDarkMode);
    }

    initializeTheme() {
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            const icon = document.querySelector('#themeToggle i');
            icon.className = 'fas fa-sun';
        }
    }

    toggleBookmark() {
        const currentChapter = this.chapters[this.currentChapterIndex];
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        const icon = bookmarkBtn.querySelector('i');

        if (this.bookmarkedChapters.has(currentChapter.id)) {
            this.bookmarkedChapters.delete(currentChapter.id);
            icon.className = 'far fa-bookmark';
        } else {
            this.bookmarkedChapters.add(currentChapter.id);
            icon.className = 'fas fa-bookmark';
        }

        this.saveUserProgress();
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    // filepath: js/main.js
class ProfessionalCourseManager {
    constructor() {
        this.chapters = [];
        this.currentChapterIndex = 0;
        this.completedChapters = new Set();
        this.bookmarkedChapters = new Set();
        this.chapterRatings = new Map();
        this.studyStartTime = Date.now();
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.sidebarCollapsed = false;
        
        this.initializeApp();
    }

    async initializeApp() {
        this.showLoadingScreen();
        await this.loadChaptersFromFiles();
        this.loadUserProgress();
        this.setupEventListeners();
        this.initializeTheme();
        this.renderChapterList();
        this.updateStudyStats();
        this.hideLoadingScreen();
        
        // Auto-load first chapter if available
        if (this.chapters.length > 0) {
            this.loadChapter(0);
        }
    }

    showLoadingScreen() {
        document.getElementById('loadingScreen').style.display = 'flex';
    }

    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loadingScreen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loadingScreen').style.display = 'none';
            }, 500);
        }, 1000);
    }

    async loadChaptersFromFiles() {
        // First, try to load from chapters folder
        try {
            // This would work with a local server or if files are in the same domain
            await this.loadFromChaptersFolder();
        } catch (error) {
            console.log('Loading from folder failed, using sample data');
            this.loadSampleChapters();
        }
    }

    async loadFromChaptersFolder() {
        // Generate chapter file names (you can modify this pattern)
        const chapterFiles = [];
        for (let i = 1; i <= 196; i++) {
            chapterFiles.push(`chapters/chapter-${i.toString().padStart(3, '0')}.md`);
        }

        const loadPromises = chapterFiles.map(async (file, index) => {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const content = await response.text();
                    return this.parseMarkdownFile(content, index + 1);
                }
            } catch (error) {
                console.log(`Could not load ${file}`);
            }
            return null;
        });

        const results = await Promise.all(loadPromises);
        this.chapters = results.filter(chapter => chapter !== null);

        if (this.chapters.length === 0) {
            throw new Error('No chapters loaded');
        }
    }

    parseMarkdownFile(content, chapterNumber) {
        const lines = content.split('\n');
        let title = `Chapter ${chapterNumber}`;
        let category = 'basics';
        let difficulty = 'Beginner';
        let duration = '5 min read';

        // Extract metadata from frontmatter or first heading
        for (const line of lines) {
            if (line.startsWith('# ')) {
                title = line.substring(2).trim();
                break;
            }
        }

        // Determine category and difficulty based on chapter number
        if (chapterNumber <= 50) {
            category = 'basics';
            difficulty = 'Beginner';
        } else if (chapterNumber <= 120) {
            category = 'intermediate';
            difficulty = 'Intermediate';
        } else if (chapterNumber <= 170) {
            category = 'advanced';
            difficulty = 'Advanced';
        } else {
            category = 'projects';
            difficulty = 'Expert';
        }

        return {
            id: chapterNumber,
            title: title,
            content: content,
            category: category,
            difficulty: difficulty,
            duration: duration
        };
    }

    loadSampleChapters() {
        // Sample chapters with rich content
        this.chapters = [
            {
                id: 1,
                title: "Introduction to HTML - The Foundation of Web Development",
                category: "basics",
                difficulty: "Beginner",
                duration: "8 min read",
                content: `# Introduction to HTML - The Foundation of Web Development

## What is HTML?

HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It provides the basic structure and content of websites, working alongside CSS for styling and JavaScript for interactivity.

### Key Concepts

**HyperText** refers to the linking capability of HTML - the ability to connect documents and resources through hyperlinks.

**Markup Language** means HTML uses tags to structure and describe content, telling the browser how to display information.

## Why Learn HTML?

- **Universal Foundation**: Every website uses HTML
- **Easy to Learn**: Simple syntax and logical structure  
- **Career Essential**: Required for web development roles
- **Creative Control**: Build anything from simple pages to complex applications

## Basic HTML Structure

Every HTML document follows this basic structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is your first paragraph.</p>
</body>
</html>
\`\`\`

### Breaking Down the Structure

1. **DOCTYPE Declaration**: Tells the browser this is HTML5
2. **html Element**: Root element containing all content
3. **head Section**: Metadata not displayed on the page
4. **body Section**: Visible content of the webpage

## Your Learning Journey

This course will take you from complete beginner to advanced HTML developer. You'll learn:

- Basic HTML elements and attributes
- Semantic HTML for better accessibility
- Forms and user input
- Advanced layout techniques
- HTML5 features and APIs
- Best practices and optimization

> **Pro Tip**: Practice as you learn! Try creating simple HTML files and viewing them in your browser.

Ready to start building the web? Let's dive into the next chapter!`
            },
            {
                id: 2,
                title: "Setting Up Your Development Environment",
                category: "basics", 
                difficulty: "Beginner",
                duration: "12 min read",
                content: `# Setting Up Your Development Environment

## Essential Tools for HTML Development

Before we start coding, let's set up a professional development environment that will make your HTML learning journey smooth and efficient.

### Text Editors and IDEs

**Visual Studio Code (Recommended)**
- Free, powerful, and feature-rich
- Excellent HTML support with IntelliSense
- Vast extension marketplace
- Built-in terminal and Git integration

**Other Great Options:**
- **Sublime Text**: Fast and lightweight
- **Atom**: Hackable text editor by GitHub
- **Brackets**: Adobe's web-focused editor
- **WebStorm**: Professional IDE by JetBrains

### Browser Developer Tools

Modern browsers come with powerful development tools:

**Chrome DevTools**
- Right-click → "Inspect Element"
- Elements panel for HTML inspection
- Console for debugging
- Network tab for performance analysis

**Firefox Developer Tools**
- Similar functionality to Chrome
- Excellent CSS Grid and Flexbox tools
- Accessibility inspector

### Essential Extensions for VS Code

\`\`\`
1. Live Server - Real-time preview
2. HTML CSS Support - Enhanced autocomplete
3. Prettier - Code formatting
4. Auto Rename Tag - Sync tag changes
5. Bracket Pair Colorizer - Visual bracket matching
\`\`\`

## Project Structure Best Practices

Organize your HTML projects like this:

\`\`\`
my-website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
│   ├── logo.png
│   └── banner.jpg
└── assets/
    └── fonts/
\`\`\`

### Why This Structure Matters

- **Maintainability**: Easy to find and update files
- **Scalability**: Structure grows with your project
- **Collaboration**: Team members understand the organization
- **Deployment**: Servers expect standard structures

## Setting Up Live Server

Live Server provides real-time preview of your HTML changes:

1. Install the Live Server extension in VS Code
2. Right-click your HTML file
3. Select "Open with Live Server"
4. Your page opens in the browser with auto-refresh

### Benefits of Live Server

- **Instant Feedback**: See changes immediately
- **Mobile Testing**: Access from other devices
- **No Manual Refresh**: Automatic browser updates
- **Development Server**: Simulates real hosting environment

## Version Control with Git

Even for learning projects, version control is essential:

\`\`\`bash
# Initialize a Git repository
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial HTML project setup"
\`\`\`

### Git Best Practices for HTML Projects

- Commit frequently with descriptive messages
- Use .gitignore for temporary files
- Create branches for experimental features
- Learn basic Git commands early

## Browser Testing Setup

Test your HTML across different browsers:

**Desktop Browsers:**
- Chrome (latest)
- Firefox (latest)  
- Safari (if on Mac)
- Edge (Windows)

**Mobile Testing:**
- Chrome DevTools device emulation
- Firefox responsive design mode
- Real device testing when possible

## Performance and Accessibility Tools

**Lighthouse (Built into Chrome)**
- Performance auditing
- Accessibility checking
- SEO analysis
- Best practices validation

**Wave Web Accessibility Evaluator**
- Detailed accessibility reports
- Visual feedback on issues
- Free browser extension

## Your Development Workflow

1. **Plan**: Sketch your HTML structure
2. **Code**: Write semantic HTML
3. **Preview**: Use Live Server for real-time feedback
4. **Test**: Check across different browsers
5. **Validate**: Use HTML validators
6. **Commit**: Save your progress with Git

> **Next Steps**: Now that your environment is ready, let's create your first HTML document in the next chapter!`
            },
            {
                id: 3,
                title: "Creating Your First HTML Document",
                category: "basics",
                difficulty: "Beginner", 
                duration: "10 min read",
                content: `# Creating Your First HTML Document

## Let's Build Your First Webpage!

Now that your development environment is set up, it's time to create your very first HTML document. This hands-on approach will give you immediate results and build your confidence.

### Step 1: Create Your HTML File

1. Open Visual Studio Code
2. Create a new file (Ctrl+N or Cmd+N)
3. Save it as \`index.html\` (Ctrl+S or Cmd+S)
4. VS Code will automatically recognize it as an HTML file

### Step 2: The HTML5 Boilerplate

Type this basic structure into your file:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
</head>
<body>
    
</body>
</html>
\`\`\`

### Understanding Each Line

**\`<!DOCTYPE html>\`**
- Declares this as an HTML5 document
- Must be the very first line
- Ensures browsers render in standards mode

**\`<html lang="en">\`**
- Root element of the page
- \`lang="en"\` specifies English language
- Helps screen readers and search engines

**\`<head>\` Section**
- Contains metadata (information about the page)
- Content here isn't displayed to users
- Critical for SEO and browser functionality

**\`<meta charset="UTF-8">\`**
- Specifies character encoding
- UTF-8 supports all international characters
- Prevents display issues with special characters

**\`<meta name="viewport"...>\`**
- Makes your page mobile-responsive
- Controls how the page displays on mobile devices
- Essential for modern web development

**\`<title>\` Element**
- Text shown in browser tab
- Used by search engines as clickable headline
- Keep it descriptive and under 60 characters

### Step 3: Adding Content to the Body

Let's add some content inside the \`<body>\` tags:

\`\`\`html
<body>
    <h1>Welcome to My Website!</h1>
    <p>This is my first HTML document. I'm learning web development!</p>
    
    <h2>About Me</h2>
    <p>I'm excited to learn HTML and build amazing websites.</p>
    
    <h2>My Goals</h2>
    <ul>
        <li>Master HTML fundamentals</li>
        <li>Learn CSS for styling</li>
        <li>Add JavaScript for interactivity</li>
        <li>Build my first complete website</li>
    </ul>
</body>
\`\`\`

### Complete First Document

Here's your complete first HTML document:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage - Learning HTML</title>
</head>
<body>
    <h1>Welcome to My Website!</h1>
    <p>This is my first HTML document. I'm learning web development!</p>
    
    <h2>About Me</h2>
    <p>I'm excited to learn HTML and build amazing websites. This journey 
       starts with understanding the basics and gradually building more 
       complex and interactive web pages.</p>
    
    <h2>My Learning Goals</h2>
    <ul>
        <li>Master HTML fundamentals and semantic markup</li>
        <li>Learn CSS for beautiful styling and layouts</li>
        <li>Add JavaScript for interactivity and dynamic content</li>
        <li>Build my first complete responsive website</li>
        <li>Understand web accessibility best practices</li>
    </ul>
    
    <h2>What I've Learned So Far</h2>
    <p>In this course, I've already learned about:</p>
    <ol>
        <li>Setting up a development environment</li>
        <li>Understanding HTML document structure</li>
        <li>Creating my first HTML file</li>
    </ol>
    
    <p>I'm ready to continue learning and building more advanced web pages!</p>
</body>
</html>
\`\`\`

### Step 4: Viewing Your Page

1. Save your file (Ctrl+S or Cmd+S)
2. Right-click in VS Code and select "Open with Live Server"
3. Your browser will open showing your webpage!
4. Try making changes and watch them update automatically

### Common Beginner Mistakes to Avoid

**Forgetting Closing Tags**
\`\`\`html
<!-- Wrong -->
<p>This paragraph has no closing tag

<!-- Correct -->
<p>This paragraph is properly closed</p>
\`\`\`

**Incorrect Nesting**
\`\`\`html
<!-- Wrong -->
<p><strong>Bold text</p></strong>

<!-- Correct -->
<p><strong>Bold text</strong></p>
\`\`\`

**Missing DOCTYPE**
- Always start with \`<!DOCTYPE html>\`
- Without it, browsers use "quirks mode"
- Can cause unexpected layout issues

### Best Practices for HTML Documents

1. **Use Semantic HTML**: Choose elements based on meaning, not appearance
2. **Indent Properly**: Makes code readable and maintainable
3. **Add Comments**: Explain complex sections
4. **Validate Your Code**: Use online HTML validators
5. **Test Across Browsers**: Ensure compatibility

### Next Steps

Congratulations! You've created your first HTML document. In the next chapter, we'll explore HTML elements in detail and learn how to structure content semantically.

> **Challenge**: Try modifying your page by adding more paragraphs, headings, or list items. Experiment and see what happens!`
            }
        ];

        // Generate additional placeholder chapters
        for (let i = 4; i <= 196; i++) {
            this.chapters.push({
                id: i,
                title: `Chapter ${i}: ${this.generateChapterTitle(i)}`,
                category: this.getCategoryForChapter(i),
                difficulty: this.getDifficultyForChapter(i),
                duration: `${Math.floor(Math.random() * 10) + 5} min read`,
                content: this.generatePlaceholderContent(i)
            });
        }
    }

    generateChapterTitle(chapterNumber) {
        const titles = [
            "HTML Elements and Tags Deep Dive",
            "Semantic HTML for Better Structure",
            "Working with Text Content",
            "Creating Lists and Navigation",
            "Understanding HTML Attributes",
            "Building Forms and Input Elements",
            "Working with Images and Media",
            "HTML Tables for Data Display",
            "Advanced Form Controls",
            "HTML5 Semantic Elements",
            "Accessibility Best Practices",
            "Meta Tags and SEO Optimization",
            "Responsive HTML Techniques",
            "HTML5 APIs and Features",
            "Project: Building a Complete Website"
        ];
        
        const baseTitle = titles[(chapterNumber - 4) % titles.length];
        const variation = Math.floor((chapterNumber - 4) / titles.length) + 1;
        return variation > 1 ? `${baseTitle} - Part ${variation}` : baseTitle;
    }

    getCategoryForChapter(chapterNumber) {
        if (chapterNumber <= 50) return 'basics';
        if (chapterNumber <= 120) return 'intermediate';
        if (chapterNumber <= 170) return 'advanced';
        return 'projects';
    }

    getDifficultyForChapter(chapterNumber) {
        if (chapterNumber <= 50) return 'Beginner';
        if (chapterNumber <= 120) return 'Intermediate';
        if (chapterNumber <= 170) return 'Advanced';
        return 'Expert';
    }

    generatePlaceholderContent(chapterNumber) {
        return `# Chapter ${chapterNumber}: ${this.generateChapterTitle(chapterNumber)}

## Overview

This chapter covers important concepts in HTML development. You can replace this placeholder content with your actual chapter material.

### Learning Objectives

By the end of this chapter, you will:

- Understand the key concepts covered in this section
- Be able to apply these techniques in your projects
- Have hands-on experience with practical examples

### Key Topics

1. **Topic One**: Detailed explanation of the first major concept
2. **Topic Two**: In-depth coverage of the second important area
3. **Topic Three**: Advanced techniques and best practices

### Practical Examples

\`\`\`html
<!-- Example HTML code for Chapter ${chapterNumber} -->
<div class="chapter-${chapterNumber}">
    <h2>Chapter ${chapterNumber} Example</h2>
    <p>This is a practical example demonstrating the concepts.</p>
</div>
\`\`\`

### Exercises

Try implementing these concepts in your own projects:

1. Create a basic example using the techniques shown
2. Experiment with different variations
3. Apply the concepts to your personal projects

> **Note**: Replace this placeholder content with your actual chapter material from markdown files.

### Next Steps

Continue to the next chapter to build upon these concepts and learn more advanced techniques.`;
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        
        searchInput.addEventListener('input', (e) => this.filterChapters(e.target.value));
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            this.filterChapters('');
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filterByCategory(e.target.value);
        });

        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.previousChapter());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextChapter());

        // Start first chapter button
        document.getElementById('startFirstChapter').addEventListener('click', () => {
            this.loadChapter(0);
        });

        // Sidebar collapse
        document.getElementById('collapseBtn').addEventListener('click', () => this.toggleSidebar());

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Action buttons
        document.getElementById('bookmarkBtn').addEventListener('click', () => this.toggleBookmark());
        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('printBtn').addEventListener('click', () => this.printChapter());

        // Chapter completion
        document.getElementById('completeBtn').addEventListener('click', () => this.toggleChapterCompletion());

        // Chapter rating
        document.querySelectorAll('#chapterRating i').forEach((star, index) => {
            star.addEventListener('click', () => this.rateChapter(index + 1));
        });

        // Table of contents
        document.getElementById('tocToggle').addEventListener('click', () => this.toggleTOC());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Auto-save progress
        setInterval(() => this.saveUserProgress(), 30000); // Save every 30 seconds
    }

    filterChapters(searchTerm) {
        const category = document.getElementById('categoryFilter').value;
        let filteredChapters = this.chapters;

        if (searchTerm) {
            filteredChapters = filteredChapters.filter(chapter =>
                chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                chapter.id.toString().includes(searchTerm)
            );
        }

        if (category) {
            filteredChapters = filteredChapters.filter(chapter => chapter.category === category);
        }

        this.renderChapterList(filteredChapters);
    }

    filterByCategory(category) {
        const searchTerm = document.getElementById('searchInput').value;
        this.filterChapters(searchTerm);
    }

    renderChapterList(chaptersToShow = this.chapters) {
        const chapterList = document.getElementById('chapterList');
        chapterList.innerHTML = '';

        chaptersToShow.forEach((chapter) => {
            const chapterElement = document.createElement('div');
            chapterElement.className = 'chapter-item';
            
            if (chapter.id === this.chapters[this.currentChapterIndex]?.id) {
                chapterElement.classList.add('active');
            }
            
            if (this.completedChapters.has(chapter.id)) {
                chapterElement.classList.add('completed');
            }

            chapterElement.innerHTML = `
                <div class="chapter-number">Chapter ${chapter.id}</div>
                <div class="chapter-title">${chapter.title}</div>
                <div class="chapter-meta-info">
                    <span class="difficulty">${chapter.difficulty}</span>
                    <span class="duration">${chapter.duration}</span>
                </div>
            `;

            chapterElement.addEventListener('click', () => {
                this.currentChapterIndex = this.chapters.findIndex(ch => ch.id === chapter.id);
                this.loadChapter(this.currentChapterIndex);
            });

            chapterList.appendChild(chapterElement);
        });
    }

    loadChapter(index) {
        if (index < 0 || index >= this.chapters.length) return;

        this.currentChapterIndex = index;
        const chapter = this.chapters[index];

        // Update chapter info
        document.getElementById('chapterBadge').textContent = `Chapter ${chapter.id}`;
        document.getElementById('chapterTitle').textContent = chapter.title;
        document.getElementById('chapterDifficulty').textContent = chapter.difficulty;
        document.getElementById('chapterDuration').textContent = chapter.duration;
        document.getElementById('chapterCategory').textContent = chapter.category;

        // Update chapter counter and progress
        document.getElementById('chapterCounter').textContent = 
            `Chapter ${chapter.id} of ${this.chapters.length}`;
        
        const progress = ((index + 1) / this.chapters.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('chapterProgressFill').style.width = `${progress}%`;

        // Update content using marked.js for better markdown parsing
        const htmlContent = marked.parse(chapter.content);
        document.getElementById('chapterContent').innerHTML = htmlContent;

        // Update navigation buttons
        document.getElementById('prevBtn').disabled = index === 0;
        document.getElementById('nextBtn').disabled = index === this.chapters.length - 1;

        // Update bookmark button
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        const bookmarkIcon = bookmarkBtn.querySelector('i');
        if (this.bookmarkedChapters.has(chapter.id)) {
            bookmarkIcon.className = 'fas fa-bookmark';
        } else {
            bookmarkIcon.className = 'far fa-bookmark';
        }

        // Update completion button
        const completeBtn = document.getElementById('completeBtn');
        if (this.completedChapters.has(chapter.id)) {
            completeBtn.innerHTML = '<i class="fas fa-check"></i> Completed';
            completeBtn.classList.add('completed');
        } else {
            completeBtn.innerHTML = '<i class="fas fa-check"></i> Mark as Complete';
            completeBtn.classList.remove('completed');
        }

        // Update chapter rating
        this.updateChapterRating(chapter.id);

        // Generate table of contents
        this.generateTOC(htmlContent);

        // Update sidebar
        this.renderChapterList();

        // Scroll to top
        document.getElementById('chapterContent').scrollTop = 0;

        // Add fade-in animation
        document.getElementById('chapterContent').classList.add('fade-in');
        setTimeout(() => {
            document.getElementById('chapterContent').classList.remove('fade-in');
        }, 500);

        // Update progress overview
        this.updateProgressOverview();

        // Save progress
        this.saveUserProgress();
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const content = document.querySelector('.content');
        const collapseBtn = document.getElementById('collapseBtn');
        const icon = collapseBtn.querySelector('i');

        this.sidebarCollapsed = !this.sidebarCollapsed;

        if (this.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            content.classList.add('expanded');
            icon.className = 'fas fa-chevron-right';
        } else {
            sidebar.classList.remove('collapsed');
            content.classList.remove('expanded');
            icon.className = 'fas fa-chevron-left';
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');

        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
        } else {
            document.documentElement.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
        }

        localStorage.setItem('darkMode', this.isDarkMode);
    }

    initializeTheme() {
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            const icon = document.querySelector('#themeToggle i');
            icon.className = 'fas fa-sun';
        }
    }

    toggleBookmark() {
        const currentChapter = this.chapters[this.currentChapterIndex];
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        const icon = bookmarkBtn.querySelector('i');

        if (this.bookmarkedChapters.has(currentChapter.id)) {
            this.bookmarkedChapters.delete(currentChapter.id);
            icon.className = 'far fa-bookmark';
        } else {
            this.bookmarkedChapters.add(currentChapter.id);
            icon.className = 'fas fa-bookmark';
        }

        this.saveUserProgress();
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

}
class CourseManager {
    constructor() {
        this.chapters = [];
        this.currentChapterIndex = 0;
        this.initializeChapters();
        this.bindEvents();
        this.loadChapter(0);
    }

    initializeChapters() {
        // Sample chapters - Replace this with your actual chapter data
        this.chapters = [
            {
                id: 1,
                title: "Introduction to HTML",
                content: `# Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages.

## What is HTML?

HTML describes the structure of a web page using markup. HTML elements are the building blocks of HTML pages.

### Key Features:
- Easy to learn and use
- Platform independent
- Supported by all browsers
- Free and open standard

**Example:**
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>
\`\`\`

> HTML is the foundation of web development.`
            },
            {
                id: 2,
                title: "Introduction to Angular | Getting Started with Angular",
                content: `# Introduction to Angular

Angular is a platform and framework for building single-page client applications using HTML and TypeScript.

## Getting Started

Angular is developed by Google and provides:
- Component-based architecture
- Powerful CLI tools
- TypeScript support
- Comprehensive testing utilities

### Installation:
\`\`\`bash
npm install -g @angular/cli
ng new my-app
cd my-app
ng serve
\`\`\``
            },
            {
                id: 3,
                title: "Creating a new Angular Project",
                content: `# Creating a new Angular Project

Learn how to create and set up a new Angular project from scratch.

## Steps:

1. **Install Angular CLI**
   \`\`\`bash
   npm install -g @angular/cli
   \`\`\`

2. **Create New Project**
   \`\`\`bash
   ng new project-name
   \`\`\`

3. **Navigate to Project**
   \`\`\`bash
   cd project-name
   \`\`\`

4. **Serve the Application**
   \`\`\`bash
   ng serve
   \`\`\``
            }
            // Add more chapters here...
        ];

        // Generate additional placeholder chapters to reach 196
        for (let i = 4; i <= 196; i++) {
            this.chapters.push({
                id: i,
                title: `Chapter ${i}: Advanced HTML Concepts`,
                content: `# Chapter ${i}: Advanced HTML Concepts

This is chapter ${i} content. You can replace this with your actual markdown content.

## Overview
This chapter covers advanced concepts in HTML development.

### Topics Covered:
- Topic 1
- Topic 2
- Topic 3

### Example Code:
\`\`\`html
<div class="example">
    <p>Chapter ${i} example</p>
</div>
\`\`\`

> Replace this content with your actual chapter material.`
            });
        }
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => this.filterChapters(e.target.value));

        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.previousChapter());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextChapter());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousChapter();
            } else if (e.ctrlKey && e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextChapter();
            }
        });
    }

    renderChapterList(chaptersToShow = this.chapters) {
        const chapterList = document.getElementById('chapterList');
        chapterList.innerHTML = '';

        chaptersToShow.forEach((chapter, index) => {
            const chapterElement = document.createElement('div');
            chapterElement.className = 'chapter-item';
            if (index === this.currentChapterIndex) {
                chapterElement.classList.add('active');
            }

            chapterElement.innerHTML = `
                <div class="chapter-number">Chapter ${chapter.id}</div>
                <div class="chapter-title">${chapter.title}</div>
            `;

            chapterElement.addEventListener('click', () => {
                this.currentChapterIndex = this.chapters.findIndex(ch => ch.id === chapter.id);
                this.loadChapter(this.currentChapterIndex);
            });

            chapterList.appendChild(chapterElement);
        });
    }

    filterChapters(searchTerm) {
        const filteredChapters = this.chapters.filter(chapter =>
            chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chapter.id.toString().includes(searchTerm)
        );
        this.renderChapterList(filteredChapters);
    }

    loadChapter(index) {
        if (index < 0 || index >= this.chapters.length) return;

        this.currentChapterIndex = index;
        const chapter = this.chapters[index];

        // Update chapter title
        document.getElementById('chapterTitle').textContent = chapter.title;

        // Update chapter counter
        document.getElementById('chapterCounter').textContent = 
            `Chapter ${chapter.id} of ${this.chapters.length}`;

        // Update chapter content (convert markdown to HTML)
        document.getElementById('chapterContent').innerHTML = this.markdownToHtml(chapter.content);

        // Update navigation buttons
        document.getElementById('prevBtn').disabled = index === 0;
        document.getElementById('nextBtn').disabled = index === this.chapters.length - 1;

        // Update sidebar
        this.renderChapterList();

        // Scroll to top of content
        document.getElementById('chapterContent').scrollTop = 0;
    }

    previousChapter() {
        if (this.currentChapterIndex > 0) {
            this.loadChapter(this.currentChapterIndex - 1);
        }
    }

    nextChapter() {
        if (this.currentChapterIndex < this.chapters.length - 1) {
            this.loadChapter(this.currentChapterIndex + 1);
        }
    }

    // Simple markdown to HTML converter
    markdownToHtml(markdown) {
        let html = markdown;

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold
        html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

        // Code blocks
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code>$2</code></pre>');

        // Inline code
        html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

        // Blockquotes
        html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

        // Lists
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        // Paragraphs
        html = html.replace(/^\n(.+)/gm, '<p>$1</p>');

        // Line breaks
        html = html.replace(/\n/gim, '<br>');

        return html;
    }
}

// Initialize the course manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CourseManager();
});
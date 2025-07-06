// Global variables
let currentChapter = 1;
let totalChapters = 196;
let completedChapters = new Set();
let bookmarkedChapters = new Set();

// Sample chapter data (replace with your actual data source)
const chapters = [
    { id: 1, title: "Introduction to HTML", category: "basics", difficulty: "Beginner", duration: "5 min", completed: false },
    { id: 2, title: "HTML Document Structure", category: "basics", difficulty: "Beginner", duration: "8 min", completed: false },
    { id: 3, title: "HTML Elements and Tags", category: "basics", difficulty: "Beginner", duration: "10 min", completed: false },
    // Add more chapters as needed
];

// Function to load markdown content from file
async function loadChapterContent(chapterPath) {
    try {
        const response = await fetch(chapterPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        return content;
    } catch (error) {
        console.error('Error loading chapter:', error);
        return `# Chapter ${currentChapter}\n\nContent for this chapter is being prepared. Please check back later.\n\nThis is a placeholder content for demonstration purposes.`;
    }
}

// Function to convert basic markdown to HTML
function markdownToHTML(markdown) {
    if (!markdown) return '';
    
    return markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // Code blocks
        .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]*)`/gim, '<code>$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
        // Line breaks
        .replace(/\n/gim, '<br>');
}

// Function to update chapter header information
function updateChapterHeader(chapterData) {
    const chapterBadge = document.getElementById('chapterBadge');
    const chapterTitle = document.getElementById('chapterTitle');
    const chapterDifficulty = document.getElementById('chapterDifficulty');
    const chapterDuration = document.getElementById('chapterDuration');
    const chapterCategory = document.getElementById('chapterCategory');
    
    if (chapterBadge) chapterBadge.textContent = `Chapter ${chapterData.id}`;
    if (chapterTitle) chapterTitle.textContent = chapterData.title;
    if (chapterDifficulty) chapterDifficulty.textContent = chapterData.difficulty;
    if (chapterDuration) chapterDuration.textContent = chapterData.duration;
    if (chapterCategory) chapterCategory.textContent = chapterData.category;
}

// Function to update navigation buttons
function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const chapterCounter = document.getElementById('chapterCounter');
    const chapterProgressFill = document.getElementById('chapterProgressFill');
    
    if (prevBtn) {
        prevBtn.disabled = currentChapter <= 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentChapter >= totalChapters;
    }
    
    if (chapterCounter) {
        chapterCounter.textContent = `Chapter ${currentChapter} of ${totalChapters}`;
    }
    
    if (chapterProgressFill) {
        const progress = (currentChapter / totalChapters) * 100;
        chapterProgressFill.style.width = `${progress}%`;
    }
}

// Function to update overall progress
function updateOverallProgress() {
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');
    const completedChaptersSpan = document.getElementById('completedChapters');
    
    const completed = completedChapters.size;
    
    if (progressText) {
        progressText.textContent = `${completed} of ${totalChapters} chapters`;
    }
    
    if (progressFill) {
        const progress = (completed / totalChapters) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    if (completedChaptersSpan) {
        completedChaptersSpan.textContent = `${completed} completed`;
    }
}

// Function to display chapter content
async function displayChapter(chapterNumber) {
    currentChapter = chapterNumber;
    
    const contentDiv = document.getElementById('chapterContent');
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Show loading
    if (loadingScreen) loadingScreen.style.display = 'flex';
    
    const chapterPath = `chapters/chap${chapterNumber}.md`;
    const markdownContent = await loadChapterContent(chapterPath);
    const htmlContent = markdownToHTML(markdownContent);
    
    // Update content
    if (contentDiv) {
        contentDiv.innerHTML = htmlContent;
        contentDiv.classList.add('fade-in');
    }
    
    // Update chapter information
    const chapterData = chapters.find(ch => ch.id === chapterNumber) || {
        id: chapterNumber,
        title: `Chapter ${chapterNumber}`,
        category: "General",
        difficulty: "Beginner",
        duration: "5 min"
    };
    
    updateChapterHeader(chapterData);
    updateNavigation();
    updateChapterList();
    generateTableOfContents();
    
    // Hide loading
    setTimeout(() => {
        if (loadingScreen) loadingScreen.style.display = 'none';
    }, 500);
}

// Function to create chapter list
function createChapterList(chaptersToShow = chapters) {
    const chapterList = document.getElementById('chapterList');
    if (!chapterList) return;
    
    chapterList.innerHTML = '';
    
    chaptersToShow.forEach(chapter => {
        const chapterItem = document.createElement('div');
        chapterItem.className = `chapter-item ${currentChapter === chapter.id ? 'active' : ''} ${completedChapters.has(chapter.id) ? 'completed' : ''}`;
        
        chapterItem.innerHTML = `
            <div class="chapter-number">Chapter ${chapter.id}</div>
            <div class="chapter-title">${chapter.title}</div>
            <div class="chapter-meta-info">
                <span><i class="fas fa-clock"></i> ${chapter.duration}</span>
                <span><i class="fas fa-signal"></i> ${chapter.difficulty}</span>
            </div>
        `;
        
        chapterItem.addEventListener('click', () => {
            displayChapter(chapter.id);
        });
        
        chapterList.appendChild(chapterItem);
    });
}

// Function to update chapter list active state
function updateChapterList() {
    const chapterItems = document.querySelectorAll('.chapter-item');
    chapterItems.forEach((item, index) => {
        item.classList.toggle('active', index + 1 === currentChapter);
    });
}

// Function to generate table of contents
function generateTableOfContents() {
    const tocContent = document.getElementById('tocContent');
    const chapterContent = document.getElementById('chapterContent');
    
    if (!tocContent || !chapterContent) return;
    
    const headings = chapterContent.querySelectorAll('h1, h2, h3');
    tocContent.innerHTML = '';
    
    headings.forEach((heading, index) => {
        const link = document.createElement('a');
        link.href = `#heading-${index}`;
        link.textContent = heading.textContent;
        link.style.paddingLeft = `${(parseInt(heading.tagName.charAt(1)) - 1) * 1}rem`;
        
        heading.id = `heading-${index}`;
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth' });
        });
        
        tocContent.appendChild(link);
    });
}

// Function to handle search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredChapters = chapters.filter(chapter =>
                chapter.title.toLowerCase().includes(searchTerm) ||
                chapter.category.toLowerCase().includes(searchTerm)
            );
            createChapterList(filteredChapters);
        });
    }
    
    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            createChapterList();
        });
    }
}

// Function to handle category filter
function setupCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            const category = e.target.value;
            const filteredChapters = category ? 
                chapters.filter(chapter => chapter.category === category) : 
                chapters;
            createChapterList(filteredChapters);
        });
    }
}

// Function to handle theme toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.toggleAttribute('data-theme', 'dark');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = document.body.hasAttribute('data-theme') ? 
                    'fas fa-sun' : 'fas fa-moon';
            }
        });
    }
}

// Function to handle sidebar collapse
function setupSidebarToggle() {
    const collapseBtn = document.getElementById('collapseBtn');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    
    if (collapseBtn && sidebar && content) {
        collapseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            content.classList.toggle('expanded');
        });
    }
}

// Function to handle chapter completion
function setupChapterCompletion() {
    const completeBtn = document.getElementById('completeBtn');
    
    if (completeBtn) {
        completeBtn.addEventListener('click', () => {
            if (completedChapters.has(currentChapter)) {
                completedChapters.delete(currentChapter);
                completeBtn.innerHTML = '<i class="fas fa-check"></i> Mark as Complete';
                completeBtn.classList.remove('completed');
            } else {
                completedChapters.add(currentChapter);
                completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
                completeBtn.classList.add('completed');
            }
            updateOverallProgress();
            updateChapterList();
        });
    }
}

// Function to handle navigation buttons
function setupNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const startFirstChapter = document.getElementById('startFirstChapter');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentChapter > 1) {
                displayChapter(currentChapter - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentChapter < totalChapters) {
                displayChapter(currentChapter + 1);
            }
        });
    }
    
    if (startFirstChapter) {
        startFirstChapter.addEventListener('click', () => {
            displayChapter(1);
        });
    }
}

// Function to handle floating TOC
function setupFloatingTOC() {
    const tocToggle = document.getElementById('tocToggle');
    const tocContent = document.getElementById('tocContent');
    
    if (tocToggle && tocContent) {
        tocToggle.addEventListener('click', () => {
            tocContent.classList.toggle('visible');
        });
        
        // Close TOC when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.floating-toc')) {
                tocContent.classList.remove('visible');
            }
        });
    }
}

// Function to handle star rating
function setupStarRating() {
    const stars = document.querySelectorAll('#chapterRating i');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                s.className = i <= index ? 'fas fa-star active' : 'far fa-star';
            });
        });
        
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                s.className = i <= index ? 'fas fa-star' : 'far fa-star';
            });
        });
    });
    
    const chapterRating = document.getElementById('chapterRating');
    if (chapterRating) {
        chapterRating.addEventListener('mouseleave', () => {
            stars.forEach(star => {
                if (!star.classList.contains('active')) {
                    star.className = 'far fa-star';
                }
            });
        });
    }
}

// Function to initialize the application
function initializeApp() {
    // Hide loading screen after initialization
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 1000);
    
    // Create chapter list
    createChapterList();
    
    // Setup all event listeners
    setupSearch();
    setupCategoryFilter();
    setupThemeToggle();
    setupSidebarToggle();
    setupChapterCompletion();
    setupNavigation();
    setupFloatingTOC();
    setupStarRating();
    
    // Update initial progress
    updateOverallProgress();
    updateNavigation();
    
    // Load first chapter by default (or show welcome screen)
    const chapterContent = document.getElementById('chapterContent');
    if (chapterContent && chapterContent.querySelector('.welcome-content')) {
        // Keep welcome screen visible initially
        currentChapter = 0;
    } else {
        displayChapter(1);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', initializeApp);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (currentChapter > 1) displayChapter(currentChapter - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (currentChapter < totalChapters) displayChapter(currentChapter + 1);
                break;
            case 'f':
                e.preventDefault();
                document.getElementById('searchInput')?.focus();
                break;
        }
    }
});

// Export functions for global access
window.displayChapter = displayChapter;
window.currentChapter = () => currentChapter;
window.totalChapters = () => totalChapters;
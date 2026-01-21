// --- TYPEWRITER ---
const phrases = ['Data Science Student @ SDU', 'HR Consultant @ OUH', 'Dad @ Home', 'Coffee Driven'];
let phraseIndex = 0, letterIndex = 0, isDeleting = false;
const textEl = document.getElementById('typed-text');

function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
        textEl.textContent = current.substring(0, letterIndex - 1); letterIndex--;
    } else {
        textEl.textContent = current.substring(0, letterIndex + 1); letterIndex++;
    }
    if (!isDeleting && letterIndex === current.length) {
        isDeleting = true; setTimeout(type, 2000);
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}
document.addEventListener('DOMContentLoaded', type);

// --- SYNCHRONIZED THEME LOGIC ---
const toggleLink = document.getElementById('theme-toggle-link');
const themeSelect = document.getElementById('theme-select');
const htmlEl = document.documentElement;
const themes = ['dark', 'light', 'dracula', 'catppuccin', 'monokai', 'tokyo-night'];

// Funktion der sætter temaet (opdaterer både HTML og Dropdown)
function setTheme(themeName) {
    if (themes.includes(themeName)) {
        // Sæt tema på HTML
        htmlEl.setAttribute('data-theme', themeName);
        // Gem i localStorage
        localStorage.setItem('theme', themeName);
        // Opdater dropdown så den matcher
        if (themeSelect) themeSelect.value = themeName;
    }
}

// 1. Initialiser ved load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('dark');
}

// 2. Klik på Link: Gå til næste tema i listen
if (toggleLink) {
    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    });
}

// 3. Ændring i Dropdown: Hop direkte til valgt tema
if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
        setTheme(e.target.value);
    });
}

// --- RANDOM GIT JOKE ---
const gitJokes = [
    { cmd: 'git -mv -on -up', url: 'https://www.youtube.com/watch?v=6Z66wVo7uNw' }, 
    { cmd: 'git push it --real-good', url: 'https://www.youtube.com/watch?v=vCadcBR95oU' }, 
    { cmd: 'git push origin limit --force', url: 'https://www.youtube.com/watch?v=vT8OU5WtfkQ' }, 
    { cmd: 'git blame --on-the-boogie', url: 'https://www.youtube.com/watch?v=nqxVMLVe62U' }, 
    { cmd: 'git branch grapevine', url: 'https://www.youtube.com/watch?v=hajBdDM2qdg' }, 
];

function randomGitJoke() {
    const footerLink = document.getElementById('git-footer');
    if (footerLink) {
        const random = gitJokes[Math.floor(Math.random() * gitJokes.length)];
        footerLink.innerText = random.cmd;
        footerLink.href = random.url;
    }
}
document.addEventListener('DOMContentLoaded', randomGitJoke);

// --- GITHUB WIDGET ---
const githubUser = 'dennisoersted'; 

async function getRepos() {
    const container = document.getElementById('github-projects');
    try {
        const res = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=pushed&per_page=6`);
        if(!res.ok) throw new Error();
        const data = await res.json();
        container.innerHTML = '';
        data.forEach(repo => {
            // Create elements
            const card = document.createElement('a');
            const title = document.createElement('h3');
            const description = document.createElement('p');
            const stats = document.createElement('div');
            const language = document.createElement('span');
            const stars = document.createElement('span');

            // Set attributes and text content (SAFE)
            card.href = repo.html_url;
            card.target = '_blank';
            card.className = 'project-card';
            title.textContent = repo.name;
            description.textContent = repo.description || 'Ingen beskrivelse.';
            stats.className = 'repo-stats';
            language.textContent = `● ${repo.language || 'Code'}`;
            stars.textContent = `★ ${repo.stargazers_count}`;

            // Append elements to the DOM
            stats.append(language, stars);
            card.append(title, description, stats);
            container.append(card);
        });
    } catch(e) { container.innerHTML = 'Kunne ikke hente GitHub data.'; }
}
getRepos();

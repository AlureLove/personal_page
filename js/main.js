document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    
    themeToggle.addEventListener('click', () => {
        document.documentElement.setAttribute(
            'data-theme',
            document.documentElement.getAttribute('data-theme') === 'dark' 
                ? 'light' 
                : 'dark'
        );
    });

    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.width = `${level}%`;
        skill.style.backgroundColor = 'var(--primary-color)';
        skill.style.height = '6px';
        skill.style.borderRadius = '3px';
        skill.style.transition = 'width 1s ease-in-out';
    });
}); 
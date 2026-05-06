document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.gallery-column');
    
    // Store original offset derived from inline styles (e.g. translateY(10vh))
    const initialOffsets = Array.from(columns).map(column => {
        const style = window.getComputedStyle(column);
        const transform = style.getPropertyValue('transform');
        
        // If there's an existing translate, parse it (simplified for basic inline style setting)
        const inlineStyle = column.getAttribute('style');
        let initialY = 0;
        if (inlineStyle && inlineStyle.includes('translateY')) {
             const match = inlineStyle.match(/translateY\(([\d.]+)vh\)/);
             if (match) {
                 initialY = parseFloat(match[1]) * window.innerHeight / 100;
             }
        }
        return initialY;
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        columns.forEach((column, index) => {
            const speed = parseFloat(column.getAttribute('data-speed'));
            const initialY = initialOffsets[index];
            
            // Calculate the parallax movement. Moving upwards as we scroll down.
            const moveY = initialY - (scrollPosition * speed);
            
            // Apply the transformation smoothly based on manual scroll
            column.style.transform = `translateY(${moveY}px)`;
        });
    });
});
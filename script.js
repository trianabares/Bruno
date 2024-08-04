document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel');
    let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0;

    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('mousemove', dragging);
    carousel.addEventListener('mouseup', endDrag);
    carousel.addEventListener('mouseleave', endDrag);

    carousel.addEventListener('touchstart', startDrag);
    carousel.addEventListener('touchmove', dragging);
    carousel.addEventListener('touchend', endDrag);

    function startDrag(e) {
        isDragging = true;
        startPos = getPositionX(e);
        carousel.style.transition = 'none';
    }

    function dragging(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPos;
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }

    function endDrag() {
        isDragging = false;
        prevTranslate = currentTranslate;
        carousel.style.transition = 'transform 0.5s ease';
        // Optional: adjust final position to snap to item boundaries
        const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;
        const maxTranslate = -(itemWidth * (carousel.children.length - 1));
        currentTranslate = Math.max(Math.min(currentTranslate, 0), maxTranslate);
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }
});

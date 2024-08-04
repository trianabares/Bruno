document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel');
    let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0, animationID = 0, currentIndex = 0;
    
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

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
        animationID = requestAnimationFrame(animation);
        carousel.style.cursor = 'grabbing';
    }

    function dragging(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }

    function endDrag() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100 && currentIndex < totalItems - 1) currentIndex += 1;
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
        setPositionByIndex();
        carousel.style.cursor = 'grab';
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function animation() {
        setCarouselPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setCarouselPosition() {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -carousel.offsetWidth;
        prevTranslate = currentTranslate;
        setCarouselPosition();
    }
});

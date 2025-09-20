// Gallery and Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let images = [];

    // Initialize gallery
    function initGallery() {
        images = Array.from(galleryItems).map((item, index) => {
            const img = item.querySelector('img');
            const caption = item.getAttribute('data-caption') || img.alt;
            
            // Add click event to gallery item
            item.addEventListener('click', () => openLightbox(index));
            
            // Add keyboard support
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View image: ${caption}`);
            
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                }
            });
            
            return {
                src: img.src,
                alt: img.alt,
                caption: caption
            };
        });
    }

    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        
        // Focus management
        closeBtn.focus();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add keyboard event listeners
        document.addEventListener('keydown', handleLightboxKeydown);
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Remove keyboard event listeners
        document.removeEventListener('keydown', handleLightboxKeydown);
        
        // Return focus to the gallery item that was clicked
        if (galleryItems[currentImageIndex]) {
            galleryItems[currentImageIndex].focus();
        }
    }

    // Update lightbox image
    function updateLightboxImage() {
        if (images[currentImageIndex]) {
            const image = images[currentImageIndex];
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.textContent = image.caption;
            
            // Update navigation button states
            prevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
            nextBtn.style.display = currentImageIndex < images.length - 1 ? 'block' : 'none';
        }
    }

    // Navigate to previous image
    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxImage();
        }
    }

    // Navigate to next image
    function showNextImage() {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateLightboxImage();
        }
    }

    // Handle keyboard navigation in lightbox
    function handleLightboxKeydown(e) {
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'Home':
                currentImageIndex = 0;
                updateLightboxImage();
                break;
            case 'End':
                currentImageIndex = images.length - 1;
                updateLightboxImage();
                break;
        }
    }

    // Event listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevImage);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }

    // Close lightbox when clicking on background
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - show next image
                showNextImage();
            } else {
                // Swiped right - show previous image
                showPrevImage();
            }
        }
    }

    // Initialize gallery if gallery items exist
    if (galleryItems.length > 0) {
        initGallery();
    }

    // Lazy loading for gallery images
    if ('IntersectionObserver' in window) {
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('img');
                    if (img && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    galleryObserver.unobserve(entry.target);
                }
            });
        });

        galleryItems.forEach(item => {
            galleryObserver.observe(item);
        });
    }

    // Add loading animation for images
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.alt = 'Image failed to load';
        });
    });
});
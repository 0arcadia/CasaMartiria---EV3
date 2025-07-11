// media-expand.js
document.addEventListener('DOMContentLoaded', function() {
    // Crear el modal dinámicamente
    const modalHTML = `
        <div id="mediaModal" class="media-modal">
            <span class="media-close">&times;</span>
            <div class="media-container">
                <img class="media-content" id="expandedMedia">
                <!-- Para videos se creará dinámicamente -->
            </div>
            <div id="mediaCaption"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Seleccionar todas las imágenes y videos para expandir
    const mediaElements = document.querySelectorAll('.process-thumbnail img, .process-thumbnail video');
    
    mediaElements.forEach(media => {
        // Agregar clase para el cursor pointer
        media.classList.add('expandable-media');
        
        // Agregar evento click
        media.addEventListener('click', function() {
            expandMedia(this);
        });
    });

    // Cerrar modal al hacer click en la X
    document.querySelector('.media-close').addEventListener('click', closeMediaModal);
    
    // Cerrar modal al hacer click fuera del contenido
    document.getElementById('mediaModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeMediaModal();
        }
    });
});

function expandMedia(media) {
    const modal = document.getElementById("mediaModal");
    const mediaContainer = modal.querySelector('.media-container');
    const captionText = document.getElementById("mediaCaption");
    
    // Limpiar contenedor primero
    mediaContainer.innerHTML = '';
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Evitar scroll de fondo
    
    if (media.tagName === 'IMG') {
        // Para imágenes
        const img = document.createElement('img');
        img.src = media.src;
        img.alt = media.alt;
        img.className = 'media-content';
        mediaContainer.appendChild(img);
        captionText.textContent = media.alt || '';
    } else if (media.tagName === 'VIDEO') {
        // Para videos
        const video = media.cloneNode(true);
        video.controls = true;
        video.autoplay = true;
        video.className = 'media-content';
        mediaContainer.appendChild(video);
        captionText.textContent = media.parentElement.nextElementSibling.querySelector('h3').textContent || '';
    }
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function escListener(e) {
        if (e.key === "Escape") {
            closeMediaModal();
            document.removeEventListener('keydown', escListener);
        }
    });
}

function closeMediaModal() {
    const modal = document.getElementById("mediaModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restaurar scroll
    
    // Pausar cualquier video que esté reproduciéndose
    const videos = modal.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
    });
}

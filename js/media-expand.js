document.addEventListener('DOMContentLoaded', function() {
    // Crear el modal dinámicamente
    const modalHTML = `
        <div id="mediaModal" class="media-modal">
            <span class="media-close">&times;</span>
            <div class="media-container"></div>
            <div id="mediaCaption"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Seleccionar imágenes y videos de process y products
    const mediaElements = document.querySelectorAll(
        '.process-thumbnail img, .process-thumbnail video, .product-thumbnail'
    );

    mediaElements.forEach(media => {
        media.classList.add('expandable-media');

        // ✅ Si está dentro de un <a>, prevenir que navegue
        if (media.closest('a')) {
            media.closest('a').addEventListener('click', function(e) {
                e.preventDefault();
            });
        }

        // Evento click para abrir modal
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

    mediaContainer.innerHTML = '';
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Evitar scroll

    if (media.tagName === 'IMG') {
        const img = document.createElement('img');
        img.src = media.src;
        img.alt = media.alt;
        img.className = 'media-content';
        mediaContainer.appendChild(img);

        // ✅ Buscar título cercano
        const title = media.closest('.product-item')?.querySelector('.product-title')?.textContent || media.alt || '';
        captionText.textContent = title;
    } else if (media.tagName === 'VIDEO') {
        const video = media.cloneNode(true);
        video.controls = true;
        video.autoplay = true;
        video.className = 'media-content';
        mediaContainer.appendChild(video);

        const title = media.parentElement.nextElementSibling?.querySelector('h3')?.textContent || '';
        captionText.textContent = title;
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
    document.body.style.overflow = "auto";

    // Pausar cualquier video que esté reproduciéndose
    modal.querySelectorAll('video').forEach(video => video.pause());
}


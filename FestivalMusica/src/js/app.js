function scrollNav() {
    const links = document.querySelectorAll('.main-nav a')
    links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault()
                const section = document.querySelector(e.target.attributes.href.value)
                section.scrollIntoView({
                    behavior: 'smooth'
                })
            })
        }
    )
}

document.addEventListener("DOMContentLoaded", function () {
    appInit();
});

function navFixed() {
    const bar = document.querySelector('.header')
    const aboutFestival = document.querySelector('.about-festival')
    const body  = document.querySelector('body')
    window.addEventListener('scroll', function () {
        if(aboutFestival.getBoundingClientRect().bottom < 0) {
            bar.classList.add('fixed')
            body.classList.add('body-scroll')
        }
        else {
            bar.classList.remove('fixed')
            body.classList.remove('body-scroll')
        }
    })
}


function appInit() {
    navFixed()
    createGallery();
    scrollNav();
}

function showImage(id) {
    const image = document.createElement('picture')
    image.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="image vocalista">
        `
    // create overlay with the image
    const overlay = document.createElement('div')
    overlay.appendChild(image)
    overlay.classList.add('overlay')
    overlay.onclick = function () {
        const body = document.querySelector('body')
        body.classList.remove('fixed')
        overlay.remove()
    }
    //button to close the image
    const closeImage = document.createElement('p')
    closeImage.textContent = 'X'
    closeImage.classList.add('btn-close')
    closeImage.onclick = function () {
        const body = document.querySelector('body')
        body.classList.remove('fixed')
        overlay.remove()

    }
    overlay.appendChild(closeImage)
    // add overlay to the body
    const body = document.querySelector('body')
    body.classList.add('fixed')
    body.appendChild(overlay)
}


function createGallery() {
    const gallery = document.querySelector('.gallery-images')
    for (let i = 1; i <= 12; i++) {
        const image = document.createElement('picture')
        image.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="image vocalista">
        `
        image.onclick = function () {
            showImage(i);
        }
        gallery.appendChild(image)
    }

}
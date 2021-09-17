let counterImg = 0;
const currentWidth = []
let index = 0;

let widthWindow = document.querySelector('.slider__container').offsetWidth
let widthImage = widthWindow;
let row; // Ширина на которую нужно сдвинуть Row при адаптиве

document.addEventListener("DOMContentLoaded", () => {
    counterImg = document.querySelectorAll('.slider__slide').length;
    const resize = () => {
        widthWindow = document.querySelector('.slider__container').offsetWidth
        document.querySelector('.slider__row').style.width = widthWindow * counterImg;
        document.querySelectorAll('.slider__slide').forEach(slide => {
            slide.style.width = widthWindow + 'px'
        })
        for (let i = 0; i < counterImg; i++) {
            currentWidth[i] = -widthWindow;
        }
        widthImage = widthWindow;
        row = 1312 - widthWindow
        document.querySelector('.slider__row').style.transform = 'translate(' + (row) + 'px)'
    }

    resize();
    window.addEventListener('resize', resize);

    function right() {
        index++;
        let nextIndex = (index - 1) % counterImg;

        (nextIndex === counterImg - 1) ? activeDot(0) : activeDot(nextIndex + 1)

        for (let i = 0; i < counterImg; i++) {
            const sliderImage = document.querySelectorAll('.slider__slide')[i];
            sliderImage.style.visibility = 'visible';
            sliderImage.style.transform = 'translate(' + (currentWidth[i] - widthImage - row) + 'px)';
            currentWidth[i] = currentWidth[i] - widthImage;
        }
        const outerImg = document.querySelectorAll('.slider__slide')[nextIndex];
        outerImg.style.transform = 'translate(' + (currentWidth[nextIndex] + widthImage * (counterImg) - row) + 'px)';
        outerImg.style.visibility = 'hidden';
        currentWidth[nextIndex] = currentWidth[nextIndex] + widthImage * (counterImg);
    }

    function left() {
        index--;
        if (index === -1) index = counterImg - 1;
        let nextIndex = (index) % counterImg;

        activeDot(nextIndex)

        for (let i = 0; i < counterImg; i++) {
            const sliderImage = document.querySelectorAll('.slider__slide')[i];
            sliderImage.style.visibility = 'visible';
            sliderImage.style.transform = 'translate(' + (currentWidth[i] + widthImage - row) + 'px)';
            currentWidth[i] = currentWidth[i] + widthImage;
        }

        const nextImage = document.querySelectorAll('.slider__slide')[nextIndex];
        nextImage.style.transform = 'translate(' + (currentWidth[nextIndex] - widthImage * (counterImg) - row) + 'px)';
        nextImage.style.visibility = 'hidden';
        currentWidth[nextIndex] = currentWidth[nextIndex] - widthImage * (counterImg);
    }

    // <=========================================================================================>//
    // ---- Активация точек -----
    // <=========================================================================================>//

    const dots = document.querySelectorAll('.slider__dot')
    const activeDot = ind => {
        for (const dot of dots) {
            dot.classList.remove('_active')
        }
        dots[ind].classList.add('_active')
    }

    document.querySelector('.prev').addEventListener('click', left)
    document.querySelector('.next').addEventListener('click', right)

    // <=========================================================================================>//
    // ---- Управление слайдером по стрелочкам клавиатуры -----
    // <=========================================================================================>//

    document.addEventListener('keydown', (e) => {
        if (e.keyCode == '37') left()
        else if (e.keyCode == '39') right()
    })
});

//setInterval(right, 7000)
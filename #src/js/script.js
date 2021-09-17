// <=========================================================================================>//
// --- Якорные ссылки ----
// <=========================================================================================>//

const links = document.querySelectorAll('a[href*="#"]');
for (const link of links) {
    link.addEventListener('click', (event) => {
        event.preventDefault()
        const linksID = link.getAttribute('href').substr(1);
        document.getElementById(linksID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

// <=========================================================================================>//
// ---- Блок загрузки миниатюры и ее информации -----
// <=========================================================================================>//

const PhotoUpload = document.getElementById('photo_upload')
PhotoUpload.onchange = uploadImage;

function uploadImage() {
    // Загрузка имени изображения
    let fileName = this.value;
    let lastIndex = fileName.lastIndexOf('\\')
    if (lastIndex >= 0) fileName = fileName.substring(++lastIndex).split('.')
    document.getElementById('read-name').value = fileName[0]
    // Главная информация
    InfoImg(fileName[1])
    document.getElementById('part-4').classList.add('_visible')

    // Отрисовка img
    const TypeImg = (PhotoUpload.files[0].type).split('/')[0] // Выдает image или application или text
    if (TypeImg === 'image') {
        PreviewLoadImage()
        document.querySelector('.preview-image__img').style.display = 'block'
    }
    else document.querySelector('.preview-image__img').style.display = 'none'

    // Делаем кнопку кликабельной
    const SubmitButton = document.querySelector('.submit-area__btn')
    SubmitButton.classList.add('_active')
    SubmitButton.removeAttribute('disabled')
}

// Загрузка формата, веса и имени изображения
const InfoImg = fileName => {
    let imgSize,
        unit;
    const fileSize = PhotoUpload.files[0].size
    if ((fileSize + 1) / 1024 >= 1 && (fileSize + 1) / 1024 / 1024 < 1) {
        imgSize = fileSize / 1024
        unit = 'kb'
        imgSize = imgSize.toFixed(0)
    } else {
        imgSize = fileSize / 1024 / 1024;
        imgSize = imgSize.toFixed(2)
        unit = 'mb'
    }
    const info = [fileName.toUpperCase(), imgSize, unit].join(' ')
    document.getElementById('format').value = info
}
// Предпросмотр изображения
const PreviewLoadImage = () => {
    const [file] = photo_upload.files;
    preview.src = URL.createObjectURL(file);
}

// <=========================================================================================>//
// ---- Кнопка мусорки -----
// <=========================================================================================>//

document.querySelector('.preview-image__trash').addEventListener('click', () => {
    document.getElementById('part-4').classList.remove('_visible')
    PhotoUpload.value = '' // На всякий случай
    PhotoUpload.type = '' // На всякий случай
    PhotoUpload.type = 'file' // На всякий случай
    setTimeout(() => {
        document.querySelector('.preview-image__img').style.display = 'block'
    }, 1000) // Чтоб пока идет анимация не видно было миниатюрку
    document.querySelector('.submit-area__btn').classList.remove('_active')
})

// <=========================================================================================>//
// ---- Делаем активный input -----
// <=========================================================================================>//

for (const input of document.getElementsByTagName('input')) {
    input.addEventListener('click', function () {
        input.addEventListener('input', () => {
            (this.value.length === 0) ? input.classList.remove('_active') : input.classList.add('_active');
        })
    })
}

// Вспомогалка
const CheckFullInputBoxTwo = () => {
    const [...box] = document.getElementById('part-2').getElementsByTagName('input')
    let counter = 0;
    box.forEach(element => {
        if (element.value !== '') counter++
    })
    if (counter === 3) return true
}

// <=========================================================================================>//
// ---- Отрисовывает блок формы с датой, страной и городом -----
// <=========================================================================================>//

document.getElementById('sex').addEventListener('input', () => {
    if (document.getElementById('name').value !== '') document.getElementById('part-2').classList.add('_visible')
})

document.getElementById('name').addEventListener('input', () => {
    const gender = document.getElementById('sex')
    const selectedValue = gender.options[gender.selectedIndex].value;
    if (selectedValue !== '-') document.getElementById('part-2').classList.add('_visible')
})

// <=========================================================================================>//
// ---- Отрисовывает блок с прикреплением файлов -----
// <=========================================================================================>//

const Block3 = document.getElementById('part-3');
document.getElementById('country').addEventListener('input', () => {
    if (CheckFullInputBoxTwo()) Block3.classList.add('_visible')
})

document.getElementById('city').addEventListener('input', () => {
    if (CheckFullInputBoxTwo()) Block3.classList.add('_visible')
})
document.getElementById('date').addEventListener('input', () => {
    if (CheckFullInputBoxTwo()) Block3.classList.add('_visible')
})


@@include('validateForm.js', {})

@@include('slider.js', {})
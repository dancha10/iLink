// <=========================================================================================>//
// --- Вспомогалки ----
// <=========================================================================================>//

const onlyletters = tag => !/^[A-Za-zA-Яа-яЁё ]*$/.test(tag.value)

const errorAdd = tag => {
    tag.classList.add('_error')
    tag.parentElement.classList.add('_error-message')
}

const errorRemove = tag => {
    tag.classList.remove('_error')
    tag.parentElement.classList.remove('_error-message')
}

const checkYear = tag => tag.value.split('-')[0] > 2021 || tag.value.split('-')[0] < 1920


// <=========================================================================================>//
// ---- Валидация форм -----
// <=========================================================================================>//

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        let errors = 0
        const required = document.querySelectorAll('._req') // Отслеживаем обязательные поля
        for (const requiredElement of required) {
            errorRemove(requiredElement)
            if (requiredElement.classList.contains('_date')) {
                if (checkYear(requiredElement)) {
                    errorAdd(requiredElement)
                    errors++;
                }
            } else if (requiredElement.value === '' || onlyletters(requiredElement)) {
                errorAdd(requiredElement)
                errors++;
            } else if (requiredElement.id === 'name') {
                if (requiredElement.value.includes(' ') || onlyletters(requiredElement)) {
                    errorAdd(requiredElement)
                    errors++;
                }
            }
        }
        if (errors === 0) document.getElementById('submit-active').style.display = "flex"
    });
});

// <=========================================================================================>//
// ---- Валидация Select'a -----
// <=========================================================================================>//

const sex = document.getElementById('sex')
sex.addEventListener('focus', function () {
    errorRemove(sex)
    sex.classList.add('_active')
    sex.addEventListener('blur', () => {
        if (sex.options[sex.selectedIndex].value == '-') {
            errorAdd(sex)
            sex.classList.remove('_active')
        }
    })
    sex.addEventListener('change', () => {
        this.style.color = '#303030'
    })
})

document.getElementById('date').addEventListener('click', (e) => {
    e.preventDefault() // Чтоб убрать data-picker в мозилке
})

const fieldError = document.querySelectorAll('.field-error')
const inputs = document.querySelectorAll('input')
const dayError = document.getElementById('day-error')
const monthError = document.getElementById('month-error')
const yearError = document.getElementById('year-error')
const yearsResult = document.getElementById('years-result')
const monthsResult = document.getElementById('months-result')
const daysResult = document.getElementById('days-result')
const submitButton = document.querySelector('.button-submit')

function validateForm() {
    function validateInputs() {
        fieldError.forEach(error => {
            error.innerHTML = ''
        })
        inputs.forEach(input => {
            input.style.borderColor = ''
            input.previousElementSibling.style.color = ''
        })

        const emptyInputs = Array.from(inputs).filter(input => input.value === '')

        if (emptyInputs.length > 0) {
            emptyInputs.forEach(emptyInput => {
                const emptyIndex = Array.from(inputs).indexOf(emptyInput)
                fieldError[emptyIndex].innerHTML = 'Campo Obrigatório !'
                inputs[emptyIndex].style.borderColor = '#ff5757'
                inputs[emptyIndex].previousElementSibling.style.color = '#ff5757'
            })

            return
        }

        const day = inputs[0]
        const dayValue = parseInt(day.value, 10)

        if (isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
            dayError.innerHTML = 'Dia Inválido'
            dayError.style.color = '#ff5757'
            day.style.borderColor = '#ff5757'
            day.previousElementSibling.style.color = '#ff5757'
            return
        } else {
            dayError.innerHTML = ''
            dayError.style.color = ''
            day.style.borderColor = ''
        }

        const month = inputs[1]
        const monthValue = parseInt(month.value, 10)

        if (isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
            monthError.innerHTML = 'Mês Inválido'
            monthError.style.color = '#ff5757'
            month.style.borderColor = '#ff5757'
            month.previousElementSibling.style.color = '#ff5757'
            return
        } else {
            monthError.innerHTML = ''
            monthError.style.color = ''
            month.style.borderColor = ''
        }

        const year = inputs[2];
        const yearValue = parseInt(year.value, 10)
        const currentYear = new Date().getFullYear()

        if (isNaN(yearValue) || yearValue.toString().length !== 4 || yearValue > currentYear) {
            yearError.innerHTML = 'Ano Inválido'
            yearError.style.color = '#ff5757'
            year.style.borderColor = '#ff5757'
            year.previousElementSibling.style.color = '#ff5757'
            return
        } else {
            yearError.innerHTML = ''
            yearError.style.color = ''
            year.style.borderColor = ''
        }

        const validDate = validateDate(dayValue, monthValue, yearValue)
        if (!validDate) {
            dayError.innerHTML = 'Data Inválida'
            dayError.style.color = '#ff5757'
            inputs.forEach(input => {
                input.style.borderColor = '#ff5757'
                input.previousElementSibling.style.color = '#ff5757'
            })
        } else {
            const age = calculateAge(dayValue, monthValue, yearValue)
            updateAge(age)
        }

        if (dayError.innerHTML === '' && monthError.innerHTML === '' && yearError.innerHTML == '') {
            console.log('Formulário Enviado')
        }
    }

    inputs.forEach((input, index) => {
        input.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault()
                validateInputs()
            }
        })
    })

    submitButton.addEventListener('click', function () {
        validateInputs()
    })
}

function validateDate(day, month, year) {
    const testDate = new Date(year, month - 1, day)
    return (
        testDate.getDate() === day && testDate.getMonth() === month - 1 && testDate.getFullYear() === year
    )
}

function calculateAge(day, month, year) {
    const currentDate = new Date()
    const birthDate = new Date(year, month - 1, day)

    let years = currentDate.getFullYear() - birthDate.getFullYear()
    let months = currentDate.getMonth() - birthDate.getMonth()
    let days = currentDate.getDate() - birthDate.getDate()

    if (days < 0) {
        months--

        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
        days += lastMonth.getDate()
    }

    if (months < 0) {
        years--
        months += 12
    }

    return { years, months, days }
}

function updateAge(age) {
    yearsResult.innerHTML = `${age.years}`
    monthsResult.innerHTML = `${age.months}`
    daysResult.innerHTML = `${age.days}`
}

validateForm()
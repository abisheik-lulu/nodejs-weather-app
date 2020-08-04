const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


weather_form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = "/weather?address=" + location

    message1.textContent = "Loading..."
    message2.textContent = ""

    //fetch the forecast form

    fetch(url).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast

            }
        })
    })

})
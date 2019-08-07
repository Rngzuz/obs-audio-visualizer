(function () {
    if (location.host != 'music.youtube.com') {
        return
    }

    let currentTitle = ''

    setInterval(async function () {
        const title = document.querySelector('title')

        if (title.textContent === 'YouTube Music') {
            return
        }

        if (title.textContent === currentTitle) {
            return
        } else {
            currentTitle = title.textContent

            const response = await fetch('http://localhost:4112', {
                method: 'post',
                body: title.textContent,
                headers: {
                    'Content-Type': 'text/plain'
                }
            })

            const text = await response.text()
            console.log(text)
        }
    }, 500)
})()
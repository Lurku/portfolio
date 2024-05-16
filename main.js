// First Page Typing Animation

const textDisplay = document.getElementById('intrest')
const phrases = ['Full Stack Developer.', 'Autodidactic.', 'Tech Enthusiast.', 'Team Player.', 'Solution provider.']
let i = 0
let j = 0
let currentPhrase = []
let isDeleting = false


let blinking_text = document.getElementById('cursor');

function loop() {
    isEnd = false
    textDisplay.innerHTML = currentPhrase.join('')
    if (i < phrases.length) {


        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j])
            j++
            textDisplay.innerHTML = currentPhrase.join('')
        }

        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop(phrases[i][j])
            j--
            textDisplay.innerHTML = currentPhrase.join('')
        }

        if (j == phrases[i].length) {

            isDeleting = true
            isEnd = true
        }

        if (isDeleting && j === 0) {
            currentPhrase = []
            isDeleting = false
            i++

            
            if (i == phrases.length) {
                i = 0
            }
        }
    }
    const spedUp = Math.random() * (80 - 50) + 50
    const normalSpeed = Math.random() * (280 - 250) + 150
    const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed
    setTimeout(loop, time)
}

loop()
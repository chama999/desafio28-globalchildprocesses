function Calculo(n) {
    let numbers = []
    let numbersCount = []
    let randomNumber = 0
    let randomNumberCount = 0
        try {
            for (let i = 0; i < n ; i++) {
                randomNumber = Math.floor(Math.random() * 100)
                randomNumberCount = 0
                for (let j = 0; j < numbers.length; j++) {
                    if (randomNumber == numbers[j]) {
                        randomNumberCount++
                    }
                }
                if (randomNumberCount == 0) {

                    //devolver el número y la cantidad de veces que se repite en un objeto
                    numbers.push(randomNumber)
                    numbersCount.push({ number: randomNumber, count: 1 })
                } else {
                    numbersCount[randomNumberCount - 1].count++
                }
            }
            return JSON.stringify(numbersCount)
        }
        catch (error) {
            console.log(error)
            return error
        } 
}

process.on ('message', (data) => {
    console.log('Child Process - Recibiendo mensaje:', data)
    const n = data
    const result = Calculo(n)
    console.log('Child Process - Enviando mensaje:', result)
    process.send(result)
})
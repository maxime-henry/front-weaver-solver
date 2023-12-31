// public/scripts.js
async function solveWordle() {
    
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    console.log(start, end)

    try {
        const response = await fetch('/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `start=${start}&end=${end}`,
        });

        const data = await response.json();
        console.log(data)
        console.log(data.result)
        displaySolutions(data.result.result);
        displayJoke(data.result.joke)
    } catch (error) {
        console.error('Error solving puzzle:', error.message);
    }
}

function displayJoke(joke) {
    const jokeDiv = document.getElementById('joke');
    jokeDiv.innerHTML = `<p>${joke}</p>`;
}

function displaySolutions(solutions) {
    const solutionsDiv = document.getElementById('solutions');
    solutionsDiv.innerHTML = '<h2>Solution:</h2>';
    
    console.log(solutions)

    if (solutions.length === 0) {
        solutionsDiv.innerHTML += '<p>No solutions found.</p>';
    } else {
        solutions.forEach((solution, index) => {
            solutionsDiv.innerHTML += `<p>${index + 1}. ${solution}</p>`;
        });
    }
}

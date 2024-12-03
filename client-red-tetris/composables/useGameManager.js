import {setInterval} from "#app/compat/interval.js";
import {useTetrimino} from "~/composables/useTetrimino.js";

export const useGameManager = () => {
    const tetrimino = useTetrimino('I');

    onMounted(() => {
        const letters = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
        tetrimino.init();
        const {startGame, restartGame} = useLoopGame(tetrimino, letters, 1000);
        useKeyboardManager(tetrimino, restartGame);
        startGame();
    })
    return {
        tetrimino
    };
}

const useKeyboardManager = (tetrimino, restartGame) => {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            tetrimino.rotate();
        } else if (e.key === 'ArrowDown') {
            tetrimino.moveDown();
            restartGame();
        } else if (e.key === 'ArrowLeft') {
            tetrimino.moveLeft();
        } else if (e.key === 'ArrowRight') {
            tetrimino.moveRight();
        } else if (e.key === 'Space') {
            console.log("SPACE");
        }
    });
}

const useLoopGame = (tetrimino, letters, timeEachFrame) => {
    let intervalId = null;

    const startGame = () => {
        if (intervalId) {
            clearInterval(intervalId)
        }
        intervalId = setInterval(() => Update(tetrimino, letters), timeEachFrame);
    }
    const stopGame = () => {
        if (intervalId) {
            clearInterval(intervalId)
        }
    }
    const restartGame = () => {
        stopGame()
        startGame()
    }
    const pauseGame = () => {
        stopGame()
    }
    return {
        startGame,
        stopGame,
        pauseGame,
        restartGame
    }
}

const Update = (tetrimino, letters) => {
    if (tetrimino.maxRow() === 20) { // or touch the bottom
        shuffle(letters)
        tetrimino.reset(letters[0]) // no reset, stop position and add new tetrimino
    } else {
        tetrimino.moveDown()
    }
}

// utility tmp
function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

import {useTetrominoStore} from "~/stores/tetromino.js";
import type {Position} from "~/composables/useInfoTetromino";
import {useGameStateStore} from "~/stores/gameState";
import {useUserStore} from "~/stores/user";
import {defineStore} from "pinia";
import {ref} from "vue";
import {useSocketStore} from "~/stores/useSocket";
import {useRoute} from "#app";

interface PenaltyMessage {
    playerName: string;
    playerId: string;
    lines: number;
}
export const useBoardStore = defineStore('boardStore', () => {
    const board = ref([] as Board[]);
    const tetrominoStore = useTetrominoStore();
    const refBoard = ref(null as Element | null);
    const penaltyMessage = ref({} as PenaltyMessage);
    const initBoard = () => {
        for (let i = 1; i <= 20; i++) {
            for (let j = 1; j <= 10; j++) {
                board.value.push({
                    col: j,
                    row: i,
                    color: null,
                    isFilled: false
                });
            }
        }
    }

    const setRefBoard = (newRefBoard: any) => {
        refBoard.value = newRefBoard;
    }

    const updateBoardFromTetromino = () => {
        if (!tetrominoStore.refName || !tetrominoStore.refColor) {
            throw new Error("You must init tetromino before updating board");
        }
        if (!board.value.length) {
            throw new Error("You must init board before updating board");
        }
        const finalPosition = tetrominoStore.getPosition();
        const color = tetrominoStore.refColor;

        finalPosition.map((position: Position) => {
            const index = position.row * 10 - (10 - position.col) - 1;

            board.value[index].color = color;
            board.value[index].isFilled = true;
        });
    }

    const tryToRemoveLines =  () => {
        const userStore = useUserStore();
        if (!board.value.length) {
            throw new Error("You must init board before updating board");
        }
        let linesRemoved = 0;
        const rowsGroup = Object.groupBy(board.value
        .filter((block) => block.isFilled && !block.indestructible),
          (block) => block.row);

        Object.keys(rowsGroup).forEach((row: any) => {
            if (rowsGroup[row]?.length === 10) {
                linesRemoved++;
                board.value.forEach((block) => {
                    if (block.row == row) {
                        block.isFilled = false;
                        block.color = null;
                        block.row = 0;
                    }
                });

                board.value.forEach((block) => {
                    if (block.row < parseInt(row)) {
                        block.row += 1;
                    }
                });

                recalculateColAndRowValue()
            }
        });


        const addScore = Math.round(100 * linesRemoved ** 1.5);
        const route = useRoute();
        userStore.incrementScore(addScore);

        if (linesRemoved > 1) {
            const socketStore = useSocketStore();
            console.log("EMIT CLEAR LINES");
            socketStore.socket.emit('clear-lines', route.params.id_room, linesRemoved);
            setPenaltyMessage({
                playerName: userStore.player_name as string,
                playerId: socketStore.socket.id as string,
                lines: linesRemoved
            })
        }
    }

    const recalculateColAndRowValue = () => {
        const newBoard = [] as Board[];
        for (let i = 1; i <= 20; i++) {
            for (let j = 1; j <= 10; j++) {
                const block : Board | undefined = board.value.find((block) => block.row === i && block.col === j);
                if (block)
                    newBoard.push(block);
            }
        }
        board.value = newBoard;
    }

    // TODO: Rename this function, it's not clear
    const maxIsFilled = () => {
        if (!board.value.length) {
            throw new Error("You must init board before adding penalty lines");
        }
        const minCol = tetrominoStore.minCol();
        const maxCol = tetrominoStore.maxCol();

        const colsGroup = Object.groupBy(board.value
        .filter((block) => !block.isFilled && block.col >= minCol && block.col <= maxCol), (block) => block.col);
        return Math.min(...Object.values(colsGroup).map((group) => group?.length ?? -1) );
    }

    const reset = () => {
        board.value = [];
        initBoard();
    }

    const addPenaltyLines = (n_lines: number) => {
        if (!board.value.length) {
            throw new Error("You must init board before adding penalty lines");
        }
        if (n_lines > 20) {
            throw new Error("You cannot have penality lines greater than 20");
        }
        let linesRestant = 20;

        const newBoard = [] as Board[];
        for (let i = 20; i > 20 - n_lines ; i--) {
            linesRestant--;
            for (let j = 10; j >= 1; j--) {
                newBoard.unshift({
                    row: i,
                    col: j,
                    isFilled: true,
                    color: 'bg-[#666]',
                    indestructible: true
                })
            }
        }
        const firstLineFilled = board.value.find((block: Board) => block.isFilled)?.row;

        // Copy if exist
        if (firstLineFilled) {
            for (let i = 20; i >= firstLineFilled ; i--) {
                linesRestant--;
                for (let j = 10; j >= 1; j--) {
                    const block = board.value[i * 10 - j];
                    newBoard.unshift({
                        row: block.row - n_lines,
                        col: block.col,
                        color: block.color,
                        isFilled: block.isFilled,
                        indestructible: block.indestructible
                    })
                }
            }
        }

        if (linesRestant <= 0) {
            const gameState = useGameStateStore();
            gameState.setGameOver();
            return ;
        }


        // Fill to have 20 * 10 elements
        for (let i = linesRestant; i > 0 ; i--) {
            for (let j = 10; j >= 1; j--) {
                newBoard.unshift({
                    row: i,
                    col: j,
                    isFilled: false,
                    color: null
                })
            }
        }
        board.value = newBoard;
        recalculateColAndRowValue();
    }

    const addPenalty = (penaltyInfo: {playerId: string;playerName:string;lines:number}) => {
        addPenaltyLines(penaltyInfo.lines);
        setPenaltyMessage(penaltyInfo);

    }
    const setPenaltyMessage = (penaltyInfo: {playerId: string;playerName:string;lines:number}) => {
        penaltyMessage.value = {
            playerName: penaltyInfo.playerName,
            playerId: penaltyInfo.playerId,
            lines: penaltyInfo.lines
        }
        setTimeout(() => {
            penaltyMessage.value = {} as PenaltyMessage;
        }, 4000);
    }

    return {
        board,
        initBoard,
        tryToRemoveLines,
        updateBoardFromTetromino,
        maxIsFilled,
        reset,
        refBoard,
        setRefBoard,
        penaltyMessage,
        addPenalty,
    }
});
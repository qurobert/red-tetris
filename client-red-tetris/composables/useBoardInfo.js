export const useBoardInfo = () => {
    const board = ref([]);
    const score = ref(0);

    const initBoard = () => {
        for (let i = 0; i < 20; i++) {
            board.value.push([]);
            for (let j = 0; j < 10; j++) {
                board.value[i].push(0);
            }
        }
    }
    onMounted(() => {
        initBoard();
    });
    return {
        initBoard,
        board,
        score
    }
}
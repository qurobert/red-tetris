import {useInfoTetrimino} from "~/composables/useInfoTetrimino.js";

export const useTetrimino = (name) => {
    const refName = ref(name);
    const colPosition = ref(4);
    const rowPosition = ref(1);
    const rotatePosition = ref({});
    const color = ref('');
    const modeRotate = ref('rotate0');

    const moveDown = () => {
        rowPosition.value += 1;
        setPositionFromColAndRowPosition();
    }
    const minCol = () => {
        if (!rotatePosition.value[modeRotate.value]) return 0;
        return Math.min(...rotatePosition.value?.[modeRotate.value]?.map(item => item.col));
    }
    const maxCol = () => {
        if (!rotatePosition.value[modeRotate.value]) return 0;
        return Math.min(...rotatePosition.value?.[modeRotate.value]?.map(item => item.col));
    }
    const minRow = () => {
        if (!rotatePosition.value[modeRotate.value]) return 0;
        return Math.min(...rotatePosition.value[modeRotate.value].map(item => item.row));
    }
    const maxRow = () => {
        if (!rotatePosition.value[modeRotate.value]) return 0;
        return Math.max(...rotatePosition.value?.[modeRotate.value]?.map(item => item.row));
    }
    const moveLeft = () => {
        if (minCol() === 1) return;
        colPosition.value -= 1;
        setPositionFromColAndRowPosition();
    }
    const moveRight = () => {
        if (maxCol() === 10) return;
        colPosition.value += 1;
        setPositionFromColAndRowPosition();
    }
    const rotate = () => {
        let newModeRotate = ''
        if (modeRotate.value === 'rotate0') newModeRotate = 'rotate90';
        else if (modeRotate.value === 'rotate90') newModeRotate = 'rotate180';
        else if (modeRotate.value === 'rotate180') newModeRotate = 'rotate270';
        else if (modeRotate.value === 'rotate270') newModeRotate = 'rotate0';

        modeRotate.value = newModeRotate;
        if (minCol() < 1) {
            colPosition.value = 1;
        }
        else if (maxCol() > 10) {
            colPosition.value = 10 - (maxCol - minCol);
        }
        setPositionFromColAndRowPosition()
    }

    const reset = (newName) => {
        refName.value = newName;
        colPosition.value = 1;
        rowPosition.value = 1;
        modeRotate.value = 'rotate0';
        init();
    }
    const init = () => {
        const {rotatePosition: rotatePositionInfo, color: colorInfo } = useInfoTetrimino(colPosition.value, rowPosition.value, refName.value)
        rotatePosition.value = rotatePositionInfo;
        color.value = colorInfo;
    }
    const setPositionFromColAndRowPosition = () => {
        const {rotatePosition: rotatePositionInfo} = useInfoTetrimino(colPosition.value, rowPosition.value, refName.value)
        rotatePosition.value = rotatePositionInfo;
    }
    return {
        modeRotate,
        rotate,
        rotatePosition,
        colPosition,
        rowPosition,
        color,
        moveLeft,
        moveRight,
        moveDown,
        reset,
        minRow,
        maxRow,
        minCol,
        maxCol,
        init
    }
}
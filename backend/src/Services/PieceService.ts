import type {TetrominosName} from "../types/tetrominos";

export class PieceService {
    type: TetrominosName;

    constructor(type: TetrominosName) {
        this.type = type;
    }
}
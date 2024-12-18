export interface Board {
    col: number;
    row: number;
    color: string | null;
    isFilled: boolean;
    indestructible?: boolean;
}
import { ChessPieceProps } from "./Piece";

export const chessPieces = {
  king: "♔",
  queen: "♕",
  rook: "♖",
  bishop: "♗",
  knight: "♘",
  pawn: "♙",
};

export const initialBoard: Array<Array<ChessPieceProps | null>> = [
  [
    { name: "rook", side: 0 },
    { name: "knight", side: 0 },
    { name: "bishop", side: 0 },
    { name: "queen", side: 0 },
    { name: "king", side: 0 },
    { name: "bishop", side: 0 },
    { name: "knight", side: 0 },
    { name: "rook", side: 0 },
  ],
  Array(8).fill({ name: "pawn", side: 0 }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ name: "pawn", side: 1 }),
  [
    { name: "rook", side: 1 },
    { name: "knight", side: 1 },
    { name: "bishop", side: 1 },
    { name: "queen", side: 1 },
    { name: "king", side: 1 },
    { name: "bishop", side: 1 },
    { name: "knight", side: 1 },
    { name: "rook", side: 1 },
  ],
];

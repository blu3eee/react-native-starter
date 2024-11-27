import { BoardType, ChessPieceOnBoard } from "./Board";
import { ChessPieceProps } from "./Piece";

export const possibleMovements = (
  pieceOnBoard: { piece: ChessPieceProps; i: number; j: number },
  board: BoardType,
) => {
  const ifCanMoveHere = (target: { i: number; j: number }) => {
    // the piece can move to the target if the target is within the board and the target is empty or has an enemy piece
    if (
      target.i >= 0 &&
      target.i < 8 &&
      target.j >= 0 &&
      target.j < 8 &&
      (board[target.i][target.j] === null ||
        board[target.i][target.j]?.side !== pieceOnBoard.piece.side)
    ) {
      return {
        canMove: true,
        target: board[target.i][target.j] === null ? "empty" : "enemy",
      };
    }
    return { canMove: false };
  };

  const { piece, i, j } = pieceOnBoard;
  switch (piece.name) {
    case "pawn": {
      // determine if this is the first time the piece moving
      let possibleMove: Array<{ i: number; j: number }> = [];
      if (piece.side === 0) {
        possibleMove = [{ i: i + 1, j }];
        if (i == 1) {
          possibleMove.push({ i: i + 2, j });
        }
      } else {
        possibleMove = [{ i: i - 1, j }];
        if (i == 6) {
          possibleMove.push({ i: i - 2, j });
        }
      }

      const result = [];
      for (let move of possibleMove) {
        const checkResult = ifCanMoveHere(move);
        if (checkResult.canMove) {
          result.push(move);
          if (checkResult.target === "enemy") {
            break;
          }
        }
      }
      // check for diagonal moves
      const diagonalMoves = [
        { i: i - 1, j: j - 1 },
        { i: i - 1, j: j + 1 },
      ];
      if (piece.side === 0) {
        diagonalMoves[0] = { i: i + 1, j: j - 1 };
        diagonalMoves[1] = { i: i + 1, j: j + 1 };
      }
      for (let move of diagonalMoves) {
        const checkResult = ifCanMoveHere(move);
        if (checkResult.canMove && checkResult.target === "enemy") {
          result.push(move);
        }
      }
      return result;
    }
    case "rook": {
      // look in 4 directions for possible movements
      const possibleMove = [];
      let k = 1;
      const directions = [
        { di: 1, dj: 0 },
        { di: -1, dj: 0 },
        { di: 0, dj: 1 },
        { di: 0, dj: -1 },
      ];

      for (const { di, dj } of directions) {
        let k = 1;
        while (true) {
          const checkResult = ifCanMoveHere({ i: i + k * di, j: j + k * dj });
          if (checkResult.canMove) {
            possibleMove.push({ i: i + k * di, j: j + k * dj });
            if (checkResult.target === "enemy") {
              break;
            }
          } else {
            break;
          }
          k += 1;
        }
      }

      return possibleMove;
    }
    case "knight": {
      // look in 8 directions for possible movements
      const possibleMove = [];
      const moves = [];

      if (i + 2 < 8 && board[i + 2][j] === null) {
        if (j + 1 < 8) {
          moves.push({ i: i + 2, j: j + 1 });
        }
        if (j - 1 >= 0) {
          moves.push({ i: i + 2, j: j - 1 });
        }
      }

      if (i - 2 >= 0 && board[i - 2][j] === null) {
        if (j + 1 < 8) {
          moves.push({ i: i - 2, j: j + 1 });
        }
        if (j - 1 >= 0) {
          moves.push({ i: i - 2, j: j - 1 });
        }
      }

      if (j + 2 < 8 && board[i][j + 2] === null) {
        if (i + 1 < 8) {
          moves.push({ i: i + 1, j: j + 2 });
        }
        if (i - 1 >= 0) {
          moves.push({ i: i - 1, j: j + 2 });
        }
      }
      if (j - 2 >= 0 && board[i][j - 2] === null) {
        if (i + 1 < 8) {
          moves.push({ i: i + 1, j: j - 2 });
        }
        if (i - 1 >= 0) {
          moves.push({ i: i - 1, j: j - 2 });
        }
      }
      for (let move of moves) {
        const checkResult = ifCanMoveHere(move);

        if (checkResult.canMove) {
          possibleMove.push(move);
        }
      }
      return possibleMove;
    }
    case "bishop": {
      // check in 4 directions for possible movements
      const possibleMove = [];
      const directions = [
        { di: 1, dj: 1 },
        { di: 1, dj: -1 },
        { di: -1, dj: 1 },
        { di: -1, dj: -1 },
      ];

      for (const { di, dj } of directions) {
        let k = 1;
        while (true) {
          const checkResult = ifCanMoveHere({ i: i + k * di, j: j + k * dj });
          if (checkResult.canMove) {
            possibleMove.push({ i: i + k * di, j: j + k * dj });
            if (checkResult.target === "enemy") {
              break;
            }
          } else {
            break;
          }
          k += 1;
        }
      }
      return possibleMove;
    }
    case "queen": {
      const possibleMove = [];
      // check in 8 directions for possible movements
      const directions = [
        { di: 1, dj: 0 },
        { di: -1, dj: 0 },
        { di: 0, dj: 1 },
        { di: 0, dj: -1 },
        { di: 1, dj: 1 },
        { di: 1, dj: -1 },
        { di: -1, dj: 1 },
        { di: -1, dj: -1 },
      ];
      for (const { di, dj } of directions) {
        let k = 1;
        while (true) {
          const checkResult = ifCanMoveHere({ i: i + k * di, j: j + k * dj });
          if (checkResult.canMove) {
            possibleMove.push({ i: i + k * di, j: j + k * dj });
            if (checkResult.target === "enemy") {
              break;
            }
          } else {
            break;
          }
          k += 1;
        }
      }
      return possibleMove;
    }
    case "king":
      // check in 8 directions for possible movements
      let possibleMove = [
        { i: i - 1, j },
        { i: i + 1, j },
        { i, j: j - 1 },
        { i, j: j + 1 },
        { i: i - 1, j: j - 1 },
        { i: i - 1, j: j + 1 },
        { i: i + 1, j: j - 1 },
        { i: i + 1, j: j + 1 },
      ];
      const result = [];
      for (let move of possibleMove) {
        const checkResult = ifCanMoveHere(move);
        if (checkResult.canMove) {
          result.push(move);
        }
      }
      return result;
  }
};

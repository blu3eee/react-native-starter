import React, { useState, use } from "react";
import { View, Text } from "react-native";

const SHAPES = ["I", "J", "L", "O", "S", "T", "Z"];

type Piece = {
  shape: string;
  color: string;
  rotation: number;
};

const COLORS = [
  "#0000FF",
  "#00FF00",
  "#FF0000",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
];

type Coordinates = {
  x: number;
  y: number;
};

type CurrentPiece = {
  piece: Piece;
  position: Coordinates;
};

export const TetrisScreen = () => {
  const [currentPiece, setCurrentPiece] = useState<CurrentPiece | undefined>(
    undefined,
  );

  const [board, setBoard] = useState<(string | null)[][]>(
    Array.from({ length: 20 }, () => Array(10).fill(null)),
  );

  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<
    "playing" | "gameOver" | undefined
  >(undefined);

  const [bag, setBag] = useState<string[]>(generateBag());

  return (
    <View style={{ flex: 1 }}>
      <TetrisBoard board={board} currentPiece={currentPiece} />
    </View>
  );
};

// AsyncDisposableStack
const TetrisBoard = ({
  board,
  currentPiece,
}: {
  board: (string | null)[][];
  currentPiece: CurrentPiece | undefined;
}) => {
  const displayGrid = toDisplayGrid(board, currentPiece);
  return (
    <View>
      {displayGrid.map((row, rowIndex) => {
        return (
          <View key={rowIndex} className="flex flex-row">
            <View>
              {row.map((cell, columnIndex) => {
                return (
                  <View
                    key={columnIndex}
                    style={{
                      flex: 1,
                      aspectRatio: 1,
                      borderColor: "black",
                      borderWidth: 1,
                    }}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const toDisplayGrid = (
  board: (string | null)[][],
  currentPiece: CurrentPiece | undefined,
) => {
  if (!currentPiece) {
    return board;
  }
  return board.map((row, rowIndex) => {
    return row.map((cell, columnIndex) => {
      if (
        currentPiece?.position.x === columnIndex &&
        currentPiece?.position.y === rowIndex
      ) {
        return currentPiece.piece.color;
      }
      return cell;
    });
  });
};

const generateBag = () => {
  const bag = [...SHAPES];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
};

import React, { useMemo } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { initialBoard } from "./pieces";
import ChessPiece, { ChessPieceProps } from "./Piece";

type ChessPieceOnBoard = { i: number; j: number; piece: ChessPieceProps };

const { width } = Dimensions.get("window");

const Board = () => {
  const [board, setBoard] = React.useState(initialBoard);

  const [currentSide, setCurrentSide] = React.useState(1);
  const [selectedPiece, setSelectedPiece] =
    React.useState<ChessPieceOnBoard | null>(null);

  const ifCanMoveHere = (
    pieceOnBoard: ChessPieceOnBoard,
    target: { i: number; j: number },
  ) => {
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

  const possibleMovements = (piece: ChessPieceProps, i: number, j: number) => {
    switch (piece.name) {
      case "pawn": {
        let possibleMove = [
          { i: i - 1, j },
          { i: i - 2, j },
        ];
        if (piece.side === 0) {
          possibleMove = [
            { i: i + 1, j },
            { i: i + 2, j },
          ];
        }
        const result = [];
        for (let move of possibleMove) {
          const checkResult = ifCanMoveHere({ i, j, piece }, move);
          if (checkResult.canMove) {
            result.push(move);
            if (checkResult.target === "enemy") {
              break;
            }
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
            const checkResult = ifCanMoveHere(
              { i, j, piece },
              { i: i + k * di, j: j + k * dj },
            );
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
          const checkResult = ifCanMoveHere({ i, j, piece }, move);
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
            const checkResult = ifCanMoveHere(
              { i, j, piece },
              { i: i + k * di, j: j + k * dj },
            );
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
            const checkResult = ifCanMoveHere(
              { i, j, piece },
              { i: i + k * di, j: j + k * dj },
            );
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
          const checkResult = ifCanMoveHere({ i, j, piece }, move);
          if (checkResult.canMove) {
            result.push(move);
          }
        }
        return result;
    }
  };

  const movements = useMemo(() => {
    if (selectedPiece) {
      const movements = possibleMovements(
        selectedPiece.piece,
        selectedPiece.i,
        selectedPiece.j,
      );
      console.log(movements);
      return movements;
    }
  }, [selectedPiece]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
        padding: 20,
      }}
    >
      <View
        style={{
          borderWidth: 2,
          borderColor: "black",
        }}
      >
        {board.map((row, i) => (
          <View key={i} style={[{ flexDirection: "row" }]}>
            {row.map((piece, j) => (
              <View
                key={j}
                style={[
                  {
                    width: (width - 40) / 8,
                    height: (width - 40) / 8,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  (i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)
                    ? styles.greyTile
                    : {},
                  selectedPiece &&
                    (selectedPiece?.i === i && selectedPiece?.j === j
                      ? { backgroundColor: "yellow" }
                      : { opacity: 0.7 }),
                ]}
              >
                {selectedPiece &&
                  (movements?.find((m) => m.i === i && m.j === j) ? (
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        if (selectedPiece) {
                          const newBoard = board.map((r) => r.slice());
                          if (newBoard[i][j]?.name === "king") {
                            Alert.alert(
                              "Game Over",
                              `The ${newBoard[i][j]?.side === 1 ? "black" : "red"} side won`,
                              [
                                {
                                  text: "Restart",
                                  onPress: () => {
                                    setBoard(initialBoard);
                                  },
                                },
                              ],
                            );
                          }

                          newBoard[selectedPiece.i][selectedPiece.j] = null;
                          newBoard[i][j] = selectedPiece.piece;
                          setBoard(newBoard);
                          setSelectedPiece(null);
                          setCurrentSide((currentSide + 1) % 2);
                        }
                      }}
                    >
                      <Text
                        style={{
                          color: "red",
                          fontWeight: "300",
                          fontSize: 36,
                        }}
                      >
                        {board[i][j] && board[i][j].side !== currentSide
                          ? "x"
                          : "."}
                      </Text>
                    </TouchableOpacity>
                  ) : selectedPiece?.i === i &&
                    selectedPiece?.j === j ? null : (
                    <View
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.5)",
                      }}
                    ></View>
                  ))}
                <TouchableOpacity
                  onPress={() => {
                    if (piece?.side !== currentSide) {
                      return;
                    }
                    if (selectedPiece) {
                      if (selectedPiece?.i === i && selectedPiece?.j === j) {
                        setSelectedPiece(null);
                      }
                    } else {
                      if (piece) {
                        setSelectedPiece({ piece, i, j });
                      }
                    }
                  }}
                  style={[{ zIndex: 1 }]}
                >
                  {piece ? (
                    <ChessPiece name={piece.name} side={piece.side} />
                  ) : null}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View>
        <Text>
          It's{" "}
          <Text
            style={{
              color: currentSide === 1 ? "red" : "black",
              fontWeight: "700",
            }}
          >
            {currentSide === 1 ? "red" : "black"}
          </Text>{" "}
          side turn
        </Text>
      </View>
      <View style={{ display: "flex", gap: 6 }}>
        <TouchableOpacity
          onPress={() => {
            setBoard(initialBoard);
          }}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: "#A1CEDC",
            borderRadius: 8,
            alignSelf: "center",
          }}
        >
          <Text>Restart game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greyTile: {
    backgroundColor: "#d3d3d3",
  },
});

export default Board;

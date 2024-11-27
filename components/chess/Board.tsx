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
import { possibleMovements } from "./logic";
import Button from "../ui/Button";

export type ChessPieceOnBoard = {
  i: number;
  j: number;
  piece: ChessPieceProps;
};
export type BoardType = (ChessPieceProps | null)[][];

const { width } = Dimensions.get("window");

const Board = () => {
  const [board, setBoard] = React.useState<BoardType>(initialBoard);
  const [prevBoards, setPrevBoards] = React.useState<BoardType[]>([]);

  const [currentSide, setCurrentSide] = React.useState(1);
  const [selectedPiece, setSelectedPiece] =
    React.useState<ChessPieceOnBoard | null>(null);

  const movements = useMemo(() => {
    if (selectedPiece) {
      const movements = possibleMovements(selectedPiece, board);
      console.log(movements);
      return movements;
    }
  }, [selectedPiece]);

  const boardSlotSize = (width - 40) / 8;

  const undoMove = () => {
    if (prevBoards.length === 0) return;
    const prevBoard = prevBoards[prevBoards.length - 1];
    setBoard(prevBoard);
    setPrevBoards(prevBoards.slice(0, prevBoards.length - 1));
    setCurrentSide((currentSide + 1) % 2);
  };

  const onMovement = (i: number, j: number) => {
    if (selectedPiece) {
      setPrevBoards((prev) => [...prev, board]);
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
  };
  return (
    <View style={styles.contentContainer}>
      <View style={styles.board}>
        {board.map((row, i) => (
          <View key={i} style={[{ flexDirection: "row" }]}>
            {row.map((piece, j) => (
              <View
                key={j}
                style={[
                  {
                    width: boardSlotSize,
                    height: boardSlotSize,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  (i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)
                    ? styles.greyTile
                    : {},
                  selectedPiece &&
                    (selectedPiece?.i === i && selectedPiece?.j === j
                      ? styles.selectedPiece
                      : styles.notSelectedPiece),
                ]}
              >
                {selectedPiece &&
                  (movements?.find((m) => m.i === i && m.j === j) ? (
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        width: boardSlotSize,
                        height: boardSlotSize,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => onMovement(i, j)}
                    >
                      <Text style={styles.movementTarget}>
                        {board[i][j] && board[i][j].side !== currentSide
                          ? "x"
                          : "."}
                      </Text>
                    </TouchableOpacity>
                  ) : selectedPiece?.i === i &&
                    selectedPiece?.j === j ? null : (
                    <View
                      style={[
                        styles.overlayTile,
                        { width: boardSlotSize, height: boardSlotSize },
                      ]}
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
        <Button
          onPress={() => {
            setBoard(initialBoard);
          }}
        >
          <Text>Restart game</Text>
        </Button>
        <Button onPress={undoMove}>
          <Text>Undo</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greyTile: {
    backgroundColor: "#d3d3d3",
  },
  overlayTile: {
    position: "absolute",
    zIndex: 2,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  movementTarget: {
    color: "red",
    fontWeight: "300",
    fontSize: 36,
  },
  selectedPiece: { backgroundColor: "yellow" },
  notSelectedPiece: { opacity: 0.7 },
  board: {
    borderWidth: 2,
    borderColor: "black",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
    padding: 20,
  },
});

export default Board;

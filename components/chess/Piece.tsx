import React from "react";
import { Text, View } from "react-native";
import { chessPieces } from "./pieces";
import { cn } from "@/lib/utils";

export interface ChessPieceProps {
  name: keyof typeof chessPieces;
  side: 0 | 1;
}

const ChessPiece = ({ name, side }: ChessPieceProps) => {
  return (
    <Text
      style={{
        fontSize: 36,
        color: side === 0 ? "black" : "red",
      }}
    >
      {chessPieces[name]}
    </Text>
  );
};

export default ChessPiece;

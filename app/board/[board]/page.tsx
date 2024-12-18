"use client";
import Canvas from "./_component/Canvas";
import { Room } from "@/app/Room";
type BoardParams = {
  params: {
    board: string;
  };
};
export default function Board({ params }: BoardParams) {
  return (
    <div>
      <Room id={params.board}>
        <Canvas />
      </Room>
    </div>
  );
}

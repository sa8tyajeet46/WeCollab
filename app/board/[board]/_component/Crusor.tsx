import { useOther } from "@liveblocks/react";
import { MousePointer2 } from "lucide-react";
import { getBorder } from "./../../../../lib/utils";
import { memo } from "react";
export default memo(function Crusor({
  connectionId,
}: {
  connectionId: number;
}) {
  const name = useOther(connectionId, (user) => user?.info?.name);
  const cursor = useOther(connectionId, (user) => user?.presence?.cursor);

  if (!cursor) return null;
  if (!name) return null;

  return (
    <foreignObject
      transform={`translate(${cursor.x}, ${cursor.y})`}
      width={name.length * 10 + 24}
      height={50}
      className="absolute drop-shadow-sm"
    >
      <MousePointer2
        className="h-5 w-5"
        fill={getBorder(connectionId)}
      ></MousePointer2>
      <div
        className={`relative left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold w-fit`}
        style={{ backgroundColor: getBorder(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

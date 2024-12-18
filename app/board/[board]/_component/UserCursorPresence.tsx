import {
  shallow,
  useOthersConnectionIds,
  useOthersMapped,
} from "@liveblocks/react";
import Crusor from "./Crusor";
import { Path } from "./Path";
import { liveColorToCss } from "@/lib/utils";

export default function UserCrusorPresence() {
  const ids = useOthersConnectionIds();

  return (
    <>
      <Draft />
      {ids.map((id, i) => {
        return <Crusor key={i} connectionId={id}></Crusor>;
      })}
    </>
  );
}

const Draft = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      pencilColor: other.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={
                other.pencilColor ? liveColorToCss(other.pencilColor) : "#000"
              }
            />
          );
        }
        return null;
      })}
    </>
  );
};

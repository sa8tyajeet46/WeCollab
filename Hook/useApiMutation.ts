"use client";
import { useMutation } from "convex/react";
import { useState } from "react";

export default function useApiMutation(mutationFunction: any) {
  const [pending, setPending] = useState(false);
  const mutateFun = useMutation(mutationFunction);

  const mutate = (payload: any) => {
    setPending(true);
    return mutateFun(payload)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw Error("something went wrong");
      })
      .finally(() => setPending(false));
  };
  return { mutate, pending };
}

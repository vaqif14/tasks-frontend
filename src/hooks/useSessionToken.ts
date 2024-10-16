import { useMutation } from "@tanstack/react-query";
import { getSessionToken } from "../services/api";

export const useSessionToken = () => {
  return useMutation<string>({
    mutationKey: ["sessionToken"],
    mutationFn: getSessionToken,
  });
};

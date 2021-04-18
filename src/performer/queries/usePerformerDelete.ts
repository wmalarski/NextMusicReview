import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  PerformerDetailsFragment,
  useDeletePerformerMutation
} from "../../graphql/types";

export interface UsePerformerDeleteProps {
  performer: PerformerDetailsFragment;
}

export default function usePerformerDelete(): ReturnType<
  typeof useDeletePerformerMutation
> {
  const router = useRouter();
  const toast = useToast();

  return useDeletePerformerMutation({
    onSuccess(data) {
      if (!data.deletePerformer.success) {
        toast({
          description: (data.deletePerformer.errors ?? []).join(","),
          isClosable: true,
          position: "bottom",
          status: "error",
          title: "Cannot remove performer"
        });
      } else {
        router.push("/");
      }
    },
    onError(error) {
      toast({
        description: String(error),
        isClosable: true,
        position: "bottom",
        status: "error",
        title: "Cannot remove performer"
      });
    }
  });
}

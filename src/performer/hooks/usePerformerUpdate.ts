import { useToast } from "@chakra-ui/react";
import { QueryKey, useQueryClient } from "react-query";
import {
  PerformerDetailsFragment,
  PerformerDetailsQuery,
  useUpdatePerformerMutation
} from "../../graphql/types";

export interface UsePerformerUpdateProps {
  performer: PerformerDetailsFragment;
  onCancel: () => void;
}

export default function usePerformerUpdate(
  props: UsePerformerUpdateProps
): ReturnType<typeof useUpdatePerformerMutation> {
  const { performer, onCancel } = props;
  const { id } = performer;

  const toast = useToast();

  const queryClient = useQueryClient();
  const key: QueryKey = ["PerformerDetails", { id }];

  return useUpdatePerformerMutation({
    onMutate: async variables => {
      await queryClient.cancelQueries(key);
      const previous = queryClient.getQueryData<PerformerDetailsQuery>(key);
      queryClient.setQueryData<PerformerDetailsQuery | undefined>(
        key,
        old =>
          old && {
            performer: {
              ...old.performer,
              name: variables.input.name
            }
          }
      );
      return { previous };
    },
    onSuccess() {
      onCancel();
      toast({
        description: "Performer updated",
        isClosable: true,
        position: "bottom",
        status: "success",
        title: "Success"
      });
    },
    onError(error, _variables, context: any) {
      queryClient.setQueryData(key, context.previous);
      toast({
        description: String(error),
        isClosable: true,
        position: "bottom",
        status: "error",
        title: "Save not completed"
      });
    },
    onSettled() {
      queryClient.invalidateQueries(key);
    }
  });
}

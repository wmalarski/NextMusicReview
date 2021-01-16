import { act } from "react-dom/test-utils";

export const waitForComponentToPaint = async (wrapper: any): Promise<void> => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
  });
};

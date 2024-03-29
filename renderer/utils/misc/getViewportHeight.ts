import { headerHeight } from "@/components/layouts/Default";
import { useViewportSize } from "@mantine/hooks";

/**
 *
 * Calculates the viewport height after subtracting the header height and padding.
 * @returns {number} The calculated viewport height.
 *
 */
export const getViewportHeight = () => {
  const { height } = useViewportSize();
  const appShellPadding = 30; // px

  return height - headerHeight - appShellPadding;
};

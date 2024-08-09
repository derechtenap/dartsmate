import { rem } from "@mantine/core";

/**
 * Returns a style object with `height` and `width` properties for icon sizing.
 * The height and width are set in `rem` units based on the provided size.
 *
 * @param {number} [size=20] - The size of the icon. Defaults to 20 if not provided.
 * @returns {{ height: string, width: string }} - An object containing `height` and `width` properties in `rem` units.
 */
const getDefaultIconSize = (size = 20) => {
  return { height: rem(size), width: rem(size) };
};

export default getDefaultIconSize;

import { RefObject } from "react";
import AvatarEditor from "react-avatar-editor";

/**
 * Returns a base64 representation of an image that is edited with AvatarEditor.
 *
 * @async
 * @function
 *
 * @param {MutableRefObject<AvatarEditor>} editor - The editor reference for
 * AvatarEditor.
 *
 * @returns {Promise<string | undefined>} The base64 representation of the edited
 * image or undefined if editor is undefined.
 *
 */
export const getBase64 = async (
  editor: RefObject<AvatarEditor>
): Promise<string | undefined> => {
  if (editor.current) {
    const dataURL = editor.current.getImageScaledToCanvas().toDataURL();
    const { url: base64 } = await fetch(dataURL);

    return base64;
  }

  return undefined;
};

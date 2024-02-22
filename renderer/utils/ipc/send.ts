/**
 *
 * Sends an IPC message to the main process.
 *
 * @param {string} channel - The IPC channel to send the message on.
 * @param {unknown} [args=null] - The arguments to be sent with the IPC message.
 * @returns {void}
 *
 */
const sendIPC = (channel: string, args: unknown = null): void => {
  if (window) {
    window.ipc.send(channel, args);
  }
};

export default sendIPC;

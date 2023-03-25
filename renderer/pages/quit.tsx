import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { quitApp } from "utils/ui/quitApp";

const QuitPage: NextPage = () => {
  const router = useRouter();

  const handleQuit = (): void => {
    quitApp();
  };

  const handleCancel = (): void => {
    // Redirect back to the index page, cancelling the quitting process
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Quit App - DartMate</title>
      </Head>
      <Modal
        state={true}
        title="Are you sure you want to quit the application?"
      >
        Any unsaved changes will be lost.
        <footer className="mt-12 flex gap-4">
          <Button action={() => handleQuit()} color="error" outline={true}>
            Quit
          </Button>
          <Button action={() => handleCancel()} color="ghost">
            Cancel
          </Button>
        </footer>
      </Modal>
    </>
  );
};

export default QuitPage;

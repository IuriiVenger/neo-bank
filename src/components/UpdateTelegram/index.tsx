import { Button } from '@nextui-org/react';

const UpdateTelegram = () => (
  <div className="m-auto self-center px-4 text-center">
    <h1 className="mb-3 text-2xl font-medium">Update Telegram</h1>
    <p className="text-foreground-2 mb-6 text-sm">
      Your version of Telegram is outdated. <br />
      To continue, please update Telegram or switch to the web version.
    </p>

    <Button color="primary" as="a" href="/">
      Continue in web-version
    </Button>
  </div>
);

export default UpdateTelegram;

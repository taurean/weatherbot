import * as Ariakit from "@ariakit/react";
import "./SettingsModal.css";

export function SettingsModal() {
  const dialog = Ariakit.useDialogStore({ animated: true });
  return (
    <>
      <Ariakit.Button onClick={dialog.show} className="button">
        Settings
      </Ariakit.Button>
      <Ariakit.Dialog
        store={dialog}
        backdrop={<div className="backdrop" />}
        className="dialog"
      >
        <Ariakit.DialogHeading className="heading">
          Settings
        </Ariakit.DialogHeading>
        <p className="description">
          Your payment has been successfully processed. We have emailed your
          receipt.
        </p>
        <div>
          <Ariakit.DialogDismiss className="button">OK</Ariakit.DialogDismiss>
        </div>
      </Ariakit.Dialog>
    </>
  );
}

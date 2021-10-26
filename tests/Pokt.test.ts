import {
  openTransportReplayer,
  RecordStore,
} from "@ledgerhq/hw-transport-mocker";
import Pokt from "../src/Pokt";

test("Pokt init", async () => {
  const transport = await openTransportReplayer(RecordStore.fromString(""));
  const pkt = new Pokt(transport);
  expect(pkt).not.toBe(undefined);
});

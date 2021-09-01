import {
  openTransportReplayer,
  RecordStore,
} from "@ledgerhq/hw-transport-mocker";
import Kadena from "../src/Kadena";

test("Kadena init", async () => {
  const transport = await openTransportReplayer(RecordStore.fromString(""));
  const kda = new Kadena(transport);
  expect(kda).not.toBe(undefined);
});

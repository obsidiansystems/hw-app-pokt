const Pokt = require("hw-app-pkt").default;
const SpeculosTransport = require("@ledgerhq/hw-transport-node-speculos").default;

async function main() {
  const apduPort = 8000;
  const transport = await SpeculosTransport.open({ apduPort });
  const pokt = new Pokt(transport);

  //console.log("menu");
  //pokt.menu();

  // console.log("getPublicKey");
  // const pk = await pokt.getPublicKey("0");
  // console.log(pk);

  console.log("signTransaction");
  const result = await pokt.signTransaction("0", "0123456789abcdef");
  console.log(result);

  process.exit()
}

main().catch(e => console.error(e));

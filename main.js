const Kadena = require("@ledgerhq/hw-app-kda").default;
const SpeculosTransport = require("@ledgerhq/hw-transport-node-speculos").default;

async function main() {
  const apduPort = 8000;
  const transport = await SpeculosTransport.open({ apduPort });
  const kda = new Kadena(transport);

  //console.log("menu");
  //kda.menu();

  // console.log("getPublicKey");
  // const pk = await kda.getPublicKey("0");
  // console.log(pk);

  console.log("signHash");
  const result = await kda.signHash("0", "0123456789abcdef");
  console.log(result);

  process.exit()
}

main().catch(e => console.error(e));

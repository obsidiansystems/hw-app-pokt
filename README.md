[Github](https://github.com/LedgerHQ/ledgerjs/),
[Ledger OP3N Discord](https://discord.gg/hTy7ZXvR7y)

# hw-app-pokt

[Ledger Hardware Wallet](https://www.ledger.com/) JavaScript bindings for [Pocket](https://www.pokt.network/), based on [LedgerJS](https://github.com/LedgerHQ/ledgerjs).

## Using LedgerJS for Pocket

Here is a sample app for Node:

```javascript
const Transport = require("@ledgerhq/hw-transport").default;
const Pocket = require("hw-app-pokt").default;

const getPublicKey = async () => {
  const pokt = new Pocket(await Transport.create());
  return await pokt.getPublicKey("44'/535348'/0'/0/0");
};

const signTransaction = async () => {
  const transport = await Transport.create();
  const pokt = new Pocket(await Transport.create());
  return await pokt.signTransaction(
    "44'/535348'/0'/0/0",
    "<transaction contents>"
  );
};

const getVersion = async () => {
  const transport = await Transport.create();
  const pokt = new Pocket(await Transport.create());
  return await pokt.getVersion();
};

const doAll = async () => {
  console.log(await getPublicKey());
  console.log(await signTransaction());
  console.log(await getVersion());
};

doAll().catch(err => console.log(err));
```

## API

### Table of Contents

-   [Pocket](#pokt)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
    -   [getPublicKey](#getpublickey)
        -   [Parameters](#parameters-1)
        -   [Examples](#examples-1)
    -   [signTransaction](#signtransaction)
        -   [Parameters](#parameters-2)
        -   [Examples](#examples-2)
    -   [getVersion](#signtransaction)
        -   [Parameters](#parameters-3)
        -   [Examples](#examples-3)


### Parameters

-   `transport` **`Transport<any>`**
-   `scrambleKey` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `"Pocket"`)

### Examples

```javascript
import Pocket from "hw-app-pokt";
const pokt = new Pocket(transport);
```

### getPublicKey

Get Pocket address for a given BIP-32 path.

#### Parameters

-   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a path in BIP-32 format

#### Examples

```javascript
const publicKey = await pokt.getPublicKey("44'/535348'/0'/0/0");
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** an object with a public key.


### signTransaction

Sign a transaction with a given BIP-32 path.

#### Parameters

-   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a path in BIP-32 format

#### Examples

```javascript
const publicKey = await pokt.signTransaction(
  "44'/535348'/0'/0/0",
  "<transaction contents>"
  );
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** an object with text field containing a signature.

### getVersion

Get the version of the application installed on the hardware device.

#### Examples

```javascript
console.log(await pokt.getVersion());
```

for version 0.1.0, it produces something like

```
{
  major: 0
  minor: 1
  patch: 0
}
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;{[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)}>** an object with major, minor, and patch of the version.


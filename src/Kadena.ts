/********************************************************************************
 *   Ledger Node JS API
 *   (c) 2016-2017 Ledger
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ********************************************************************************/
import type Transport from "@ledgerhq/hw-transport";

export type GetPublicKeyResult = {
  publicKey: string;
};
export type SignHashResult = {
  signature: string;
};
export type GetVersionResult = {
  major: number;
  minor: number;
  patch: number;
};

/**
 * Kadena API
 *
 * @example
 * import Kadena from "hw-app-kda";
 * const kda = new Kadena(transport)
 */

export default class Kadena {
  transport: Transport;

  constructor(transport: Transport) {
    this.transport = transport;
    transport.decorateAppAPIMethods(
      this,
      ["menu", "getPublicKey", "signHash", "getVersion"],
      "KDA"
    );
  }

  // This does not yet work, requires an SDK bug to be fixed.
  // The send function adds a single byte representing the size of the payload
  // in bytes, but the rust SDK doesn't handle it.
  async getPublicKey(
    path: string,
  ): Promise<GetPublicKeyResult> {
    const cla = 0x00;
    const ins = 0x02;
    const p1 = 0;
    const p2 = 0;
    const payload = buildBip32KeyPayload(path);
    console.log("getPublicKey payload", payload.toString("hex")); // TODO remove
    const response = await this.transport.send(cla, ins, p1, p2, payload);
    console.log("getPublicKey response", response.toString("hex")); // TODO remove
    const responseSize = response[0];
    const publicKey = response.slice(1, 1 + responseSize);
    const res: GetPublicKeyResult = {
      publicKey: publicKey.toString("hex"),
    };
    return res;
  }

  async signHash(
    path: string,
    hash: string,
  ): Promise<SignHashResult> {
    const paths = splitPath(path);
    const cla = 0x00;
    const ins = 0x03;
    const p1 = 0;
    const p2 = 0;
    // Hash payload is the byte length as uint32le followed by the bytes
    const rawHash = Buffer.from(hash, "hex");
    const hashSize = Buffer.alloc(4);
    hashSize.writeUInt32LE(rawHash.length, 0);
    // Bip32key payload same as getPublicKey
    const bip32KeyPayload = buildBip32KeyPayload(path);
    // These are just squashed together
    const payload = Buffer.concat([hashSize, rawHash, bip32KeyPayload])
    console.log("signHash payload", payload.toString("hex")); // TODO remove
    // TODO batch this since the payload length can be uint32le.max long
    const response = await this.transport.send(cla, ins, p1, p2, payload);
    console.log("signHash response", response.toString("hex")); // TODO remove
    // TODO check this
    const signature = response.toString("hex");
    return {
      signature,
    };
  }

  async menu(): Promise<string> {
    const cla = 0x00;
    const ins = 0x04;
    const payload = await this.transport.send(cla, ins, 0, 0);
    return payload.toString("hex");
  }

  // TODO this doesn't exist yet
  async getVersion(): Promise<GetVersionResult> {
    const [major, minor, patch] = await this.transport.send(
      0x80,
      0x00,
      0x00,
      0x00,
      Buffer.alloc(0)
    );
    return {
      major,
      minor,
      patch,
    };
  }
}

function buildBip32KeyPayload(path: string): Buffer {
  const paths = splitPath(path);
  // Bip32Key payload is:
  // 1 byte with number of elements in u32 array path
  // Followed by the u32 array itself
  const payload = Buffer.alloc(1 + paths.length * 4);
  payload[0] = paths.length
  paths.forEach((element, index) => {
    payload.writeUInt32LE(element, 1 + 4 * index);
  });
  return payload
}

// TODO use bip32-path library
function splitPath(path: string): number[] {
  const result: number[] = [];
  const components = path.split("/");
  components.forEach((element) => {
    let number = parseInt(element, 10);

    if (isNaN(number)) {
      return; // FIXME shouldn't it throws instead?
    }

    if (element.length > 1 && element[element.length - 1] === "'") {
      number += 0x80000000;
    }

    result.push(number);
  });
  return result;
}

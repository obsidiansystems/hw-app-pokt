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
import { Common, GetPublicKeyResult, SignTransactionResult, GetVersionResult } from "hw-app-obsidian-common";

// @ts-ignore -- optional interface, should be any if not installed.
import { AbstractSigner, Account } from "@pokt-foundation/pocketjs-signer";

export { GetPublicKeyResult, SignTransactionResult, GetVersionResult };

/*
interface class IAbstractSigner {
  getAddress(): string
  getAccount(): Account
  getPublicKey(): string
  getPrivateKey(): string
  sign(payload: string): Promise<string>
}

type Signer = any extends AbstractSigner ? any : AbstractSigner;
*/

export class LedgerPoktSigner extends AbstractSigner {
  address: string;
  publicKey: string;
  pokt: Pokt;
  path: string;

  constructor(pokt: Pokt, path: string, pkr: GetPublicKeyResult) {
    super();
    this.address = pkr.address!;
    this.publicKey = pkr.publicKey;
    this.pokt = pokt;
    this.path = path;
  }

  getAddress() : string {
    return this.address;
  }

  getAccount() : Account {
    return { address: this.address, publicKey: this.publicKey, privateKey: "UNAVAILABLE" };
  }

  getPublicKey() : string {
    return this.publicKey;
  }

  getPrivateKey() : string {
    return "UNAVAILABLE";
  }

  async sign(payload: string): Promise<string> {
    return (await this.pokt.signTransaction(this.path, payload)).signature;
  }
}

/**
 * Pokt API
 *
 * @example
 * import Pokt from "hw-app-pokt";
 * const pokt = new Pokt(transport)
 */

export default class Pokt extends Common {
  
  constructor(transport: Transport) {
    super(transport, "PKT");
    this.sendChunks = this.sendWithBlocks;
  }

  async getSigner(path: string): Promise<LedgerPoktSigner> {
    const pkr = await this.getPublicKey(path);
    return new LedgerPoktSigner(this, path, pkr);
  }
}



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

export { GetPublicKeyResult, SignTransactionResult, GetVersionResult };

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
}


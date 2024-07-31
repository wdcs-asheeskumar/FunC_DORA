import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type FunCVerifierConfig = {};

export function funCVerifierConfigToCell(config: FunCVerifierConfig): Cell {
    return beginCell().endCell();
}

export class FunCVerifier implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new FunCVerifier(address);
    }

    static createFromConfig(config: FunCVerifierConfig, code: Cell, workchain = 0) {
        const data = funCVerifierConfigToCell(config);
        const init = { code, data };
        return new FunCVerifier(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}

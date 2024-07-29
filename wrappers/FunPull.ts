import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type FunPullConfig = {};

export function funPullConfigToCell(config: FunPullConfig): Cell {
    return beginCell().endCell();
}

export class FunPull implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new FunPull(address);
    }

    static createFromConfig(config: FunPullConfig, code: Cell, workchain = 0) {
        const data = funPullConfigToCell(config);
        const init = { code, data };
        return new FunPull(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}

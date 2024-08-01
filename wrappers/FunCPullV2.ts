import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type FunCPullV2Config = {};

export function funCPullV2ConfigToCell(config: FunCPullV2Config): Cell {
    return beginCell().endCell();
}

export class FunCPullV2 implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new FunCPullV2(address);
    }

    static createFromConfig(config: FunCPullV2Config, code: Cell, workchain = 0) {
        const data = funCPullV2ConfigToCell(config);
        const init = { code, data };
        return new FunCPullV2(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}

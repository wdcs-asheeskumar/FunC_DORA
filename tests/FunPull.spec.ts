import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { FunPull } from '../wrappers/FunPull';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('FunPull', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('FunPull');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let funPull: SandboxContract<FunPull>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        funPull = blockchain.openContract(FunPull.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await funPull.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: funPull.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and funPull are ready to use
    });
});

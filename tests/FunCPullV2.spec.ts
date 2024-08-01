import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { FunCPullV2 } from '../wrappers/FunCPullV2';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('FunCPullV2', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('FunCPullV2');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let funCPullV2: SandboxContract<FunCPullV2>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        funCPullV2 = blockchain.openContract(FunCPullV2.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await funCPullV2.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: funCPullV2.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and funCPullV2 are ready to use
    });
});

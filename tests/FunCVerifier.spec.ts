import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { FunCVerifier } from '../wrappers/FunCVerifier';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('FunCVerifier', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('FunCVerifier');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let funCVerifier: SandboxContract<FunCVerifier>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        funCVerifier = blockchain.openContract(FunCVerifier.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await funCVerifier.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: funCVerifier.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and funCVerifier are ready to use
    });
});

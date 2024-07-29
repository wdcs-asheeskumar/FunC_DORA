import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { FunCPull } from '../wrappers/FunCPull';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('FunCPull', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('FunCPull');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let funCPull: SandboxContract<FunCPull>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        funCPull = blockchain.openContract(
            FunCPull.createFromConfig(
                {
                    id: 0,
                    counter: 0,
                },
                code
            )
        );

        deployer = await blockchain.treasury('deployer');

        const deployResult = await funCPull.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: funCPull.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and funCPull are ready to use
    });

    it('should increase counter', async () => {
        const increaseTimes = 3;
        for (let i = 0; i < increaseTimes; i++) {
            console.log(`increase ${i + 1}/${increaseTimes}`);

            const increaser = await blockchain.treasury('increaser' + i);

            const counterBefore = await funCPull.getCounter();

            console.log('counter before increasing', counterBefore);

            const increaseBy = Math.floor(Math.random() * 100);

            console.log('increasing by', increaseBy);

            const increaseResult = await funCPull.sendIncrease(increaser.getSender(), {
                increaseBy,
                value: toNano('0.05'),
            });

            expect(increaseResult.transactions).toHaveTransaction({
                from: increaser.address,
                to: funCPull.address,
                success: true,
            });

            const counterAfter = await funCPull.getCounter();

            console.log('counter after increasing', counterAfter);

            expect(counterAfter).toBe(counterBefore + increaseBy);
        }
    });
});

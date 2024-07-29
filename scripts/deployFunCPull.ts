import { toNano } from '@ton/core';
import { FunCPull } from '../wrappers/FunCPull';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const funCPull = provider.open(
        FunCPull.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('FunCPull')
        )
    );

    await funCPull.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(funCPull.address);

    console.log('ID', await funCPull.getID());
}

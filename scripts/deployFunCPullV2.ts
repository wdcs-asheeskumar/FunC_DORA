import { toNano } from '@ton/core';
import { FunCPullV2 } from '../wrappers/FunCPullV2';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const funCPullV2 = provider.open(FunCPullV2.createFromConfig({}, await compile('FunCPullV2')));

    await funCPullV2.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(funCPullV2.address);

    // run methods on `funCPullV2`
}

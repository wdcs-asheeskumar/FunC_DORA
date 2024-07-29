import { toNano } from '@ton/core';
import { FunPull } from '../wrappers/FunPull';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const funPull = provider.open(FunPull.createFromConfig({}, await compile('FunPull')));

    await funPull.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(funPull.address);

    // run methods on `funPull`
}

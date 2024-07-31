import { toNano } from '@ton/core';
import { FunCVerifier } from '../wrappers/FunCVerifier';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const funCVerifier = provider.open(FunCVerifier.createFromConfig({}, await compile('FunCVerifier')));

    await funCVerifier.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(funCVerifier.address);

    // run methods on `funCVerifier`
}

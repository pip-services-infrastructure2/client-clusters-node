import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { ClustersMemoryPersistence } from 'service-clusters-node';
import { ClustersController } from 'service-clusters-node';
import { ClustersDirectClientV1 } from '../../../src/clients/version1/ClustersDirectClientV1';
import { ClustersClientFixtureV1 } from './ClustersClientFixtureV1';

suite('ClustersDirectClientV1', ()=> {
    let client: ClustersDirectClientV1;
    let fixture: ClustersClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new ClustersMemoryPersistence();
        let controller = new ClustersController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-clusters', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-clusters', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new ClustersDirectClientV1();
        client.setReferences(references);

        fixture = new ClustersClientFixtureV1(client);

        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});

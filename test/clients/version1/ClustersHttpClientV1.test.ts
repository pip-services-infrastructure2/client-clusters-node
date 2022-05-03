import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { ClustersMemoryPersistence } from 'service-clusters-node';
import { ClustersController } from 'service-clusters-node';
import { ClustersHttpServiceV1 } from 'service-clusters-node';
import { ClustersHttpClientV1 } from '../../../src/clients/version1/ClustersHttpClientV1';
import { ClustersClientFixtureV1 } from './ClustersClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('ClustersRestClientV1', ()=> {
    let service: ClustersHttpServiceV1;
    let client: ClustersHttpClientV1;
    let fixture: ClustersClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new ClustersMemoryPersistence();
        let controller = new ClustersController();

        service = new ClustersHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-clusters', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-clusters', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-clusters', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new ClustersHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new ClustersClientFixtureV1(client);

        await service.open(null);
        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
        await service.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});

import { ClustersMemoryClientV1 } from '../../../src/clients/version1/ClustersMemoryClientV1';
import { ClustersClientFixtureV1 } from './ClustersClientFixtureV1';

suite('ClustersMemoryClientV1', ()=> {
    let client: ClustersMemoryClientV1;
    let fixture: ClustersClientFixtureV1;

    setup(() => {
        client = new ClustersMemoryClientV1();

        fixture = new ClustersClientFixtureV1(client);
    });
    
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});

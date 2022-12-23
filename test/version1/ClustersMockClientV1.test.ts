import { ClustersMockClientV1 } from '../../src/version1/ClustersMockClientV1';
import { ClustersClientFixtureV1 } from './ClustersClientFixtureV1';

suite('ClustersMockClientV1', ()=> {
    let client: ClustersMockClientV1;
    let fixture: ClustersClientFixtureV1;

    setup(() => {
        client = new ClustersMockClientV1();

        fixture = new ClustersClientFixtureV1(client);
    });
    
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});

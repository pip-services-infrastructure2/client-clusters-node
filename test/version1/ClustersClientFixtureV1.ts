const assert = require('chai').assert;

import { PagingParams } from 'pip-services3-commons-nodex';

import { ClusterV1 } from '../../src/data/version1/ClusterV1';
import { IClustersClientV1 } from '../../src/version1/IClustersClientV1';

let CLUSTER1: ClusterV1 = {
    id: '1',
    name: 'Cluster #1',
    type: 'root',
    active: true,
    api_host: 'api.mycluster1.com',
    service_ports: { myservice1: 30001, myservice2: 30002 },
    max_tenant_count: 1,
    tenants_count: 1,
    active_tenants: ['1']
};
let CLUSTER2: ClusterV1 = {
    id: '2',
    name: 'Cluster #2',
    type: 'tenants',
    active: true,
    api_host: 'api.mycluster2.com',
    service_ports: { myservice1: 30001, myservice2: 30002 },
    max_tenant_count: 10,
    tenants_count: 4,
    active_tenants: ['2', '3'],
    inactive_tenants: ['4']
};

export class ClustersClientFixtureV1 {
    private _client: IClustersClientV1;
    
    constructor(client: IClustersClientV1) {
        this._client = client;
    }
        
    public async testCrudOperations() {
        let cluster1, cluster2: ClusterV1;

        // Create one cluster
        let cluster = await this._client.createCluster(null, CLUSTER1);

        assert.isObject(cluster);
        assert.equal(cluster.name, CLUSTER1.name);
        assert.equal(cluster.api_host, CLUSTER1.api_host);

        cluster1 = cluster;

        // Create another cluster
        cluster = await this._client.createCluster(null, CLUSTER2);

        assert.isObject(cluster);
        assert.equal(cluster.name, CLUSTER2.name);
        assert.equal(cluster.api_host, CLUSTER2.api_host);

        cluster2 = cluster;

        // Get all clusters
        let clusters = await this._client.getClusters(null, null, new PagingParams(0, 5, false));

        assert.isObject(clusters);
        assert.isTrue(clusters.data.length >= 2);

        // Update the cluster
        cluster1.active = false;
        cluster1.max_tenant_count = 2;
        cluster1.tenants_count = 2;

        cluster = await this._client.updateCluster(null, cluster1);

        assert.isObject(cluster);
        assert.isFalse(cluster.active);
        assert.equal(cluster.max_tenant_count, 2);
        assert.equal(cluster.tenants_count, 2);
        assert.isFalse(cluster.open);

        cluster1 = cluster;

        // Add tenant to cluster
        cluster = await this._client.addTenant(null, '5');

        assert.isObject(cluster);
        assert.isTrue(cluster.active);

        assert.isTrue(cluster.active_tenants.indexOf('5') >= 0);

        // Get cluster by tenant
        cluster = await this._client.getClusterByTenant(null, '5');

        assert.isObject(cluster);
        assert.isTrue(cluster.active);

        assert.isTrue(cluster.active_tenants.indexOf('5') >= 0);

        // Remove tenant from cluster
        cluster = await this._client.removeTenant(null, '5');

        assert.isObject(cluster);
        assert.isTrue(cluster.active_tenants.indexOf('5') < 0);

        // Delete cluster
        await this._client.deleteClusterById(null, cluster1.id);

        // Try to get delete cluster
        cluster = await this._client.getClusterById(null, cluster1.id);

        assert.isNull(cluster || null);
    }
}

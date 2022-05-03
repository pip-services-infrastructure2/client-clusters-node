# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Clusters Microservice Client SDK for Node.js

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* Service
  - [Clusters service](https://github.com/pip-services-infrastructure2/service-clusters-node)

This is a Node.js client SDK for [service-clusters](https://github.com/pip-services-infrastructure2/service-clusters-node) microservice.

 It provides an easy to use abstraction over communication protocols:

- Direct client for monolythic deployments
- Http client
- Lambda client for AWS
- Memory client
- Proxy http client
- Null client to be used in testing

## Install

Add dependency to the client SDK into **package.json** file of your project
```typescript
{
    ...
    "dependencies": {
        ....
        "client-clusters-node": "^1.0.*",
        ...
    }
}
```

Then install the dependency using **npm** tool
```bash
# Install new dependencies
npm install

# Update already installed dependencies
npm update
```

## Use

Inside your code get the reference to the client SDK
```typescript
 import { ClustersHttpClientV1 } from 'client-clusters-node';
```

Define client configuration parameters.

```typescript
// Client configuration
var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);
client.configure(httpConfig);
```

Instantiate the client and open connection to the microservice
```typescript
// Create the client instance
client = new ClustersHttpClientV1();

// Connect to the microservice
try {
    await client.open(null);
    // Work with the microservice
    ...
} catch(err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```
Now the client is ready to perform operations:

Create new cluster:
```typescript 
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

try {
    let cluster = await client.createCluster("123", CLUSTER1);
    console.dir('Cluster was created successfull');
} catch(err) {
    console.error('Can\'t create cluster!');
    console.error(err);
}
```
Update exists cluster:
```typescript
    CLUSTER1.name = "Cluster #2";
try {
    let cluster = await client.updateCluster("123", CLUSTER1);
    console.dir('Cluster was updated successfull');
} catch(err) {
    console.error('Can\'t update cluster!');
    console.error(err);
}
```
Delete existing cluster by cluster_id
```typescript
try {
    let cluster = await client.deleteClusterById("123", 1);
    console.dir('Cluster was delete successfull');
    console.dir('Deleted cluster:');
    console.dir(cluster.toString());
} catch(err) {
    console.error('Can\'t delete cluster!');
    console.error(err);
} 
```
Add new tenant into active cluster
```typescript
try {
    let cluster = await client.addTenant("123", "5");
    console.dir('Tenant was added successfull');
    console.dir('Cluster:');
    console.dir(cluster.toString());
} catch(err) {
    console.error('Can\'t add tenant to cluster!');
    console.error(err);
}
```
Remove existing tenant by tenantId
```typescript
try {
    let cluster = await client.removeTenant("123", "5");
    console.dir('Tenant was deleted successfull');
    console.dir('Cluster:');
    console.dir(cluster.toString());
} catch(err) {
    console.error('Can\'t delete tenant from cluster!');
    console.error(err);
}
```
Get list of all clusters:
```typescript
    let filter = FilterParams.fromTuples(
        'active', true,
        'open', true
    );
try {
    let clusters = await client.getClusters("123", filter, new PagingParams());
    console.dir("Cluster list length:");
    console.dir(clusters.data.length);
} catch(err) {
    console.error('Can\'t find cluster by filter!');
    console.error(err);
}
```
Get cluster by cluster_id:
```typescript
try {
    let cluster = await client.getClusterById("123", "1");
    console.dir('Cluster was finded successfull');
    console.dir('Cluster:');
    console.dir(cluster.toString());
} catch(err) {
    console.error('Can\'t find cluster by cluster id!');
    console.error(err);
}
```
Get cluster by tenant:
```typescript
try {
    let cluster = await client.getClusterByTenant("123", "5");
    console.dir('Cluster was finded successfull');
    console.dir('Cluster:');
    console.dir(cluster.toString());
} catch(err) {
    console.error('Can\'t find cluster by tenant id!');
    console.error(err);
}
```

## Acknowledgements

This client SDK was created and currently maintained by *Sergey Seroukhov*.

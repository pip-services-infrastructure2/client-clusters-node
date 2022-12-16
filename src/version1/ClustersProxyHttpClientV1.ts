import { ConfigParams } from 'pip-services3-commons-nodex';
import { IClosable } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { ReferenceException } from 'pip-services3-commons-nodex';
import { InternalException } from 'pip-services3-commons-nodex';

import { ClusterV1 } from '../data/version1/ClusterV1';
import { IClustersClientV1 } from './IClustersClientV1';
import { ProxyReference } from '../refs/ProxyReference';

export class ClustersProxyHttpClientV1<T>
    implements IConfigurable, IReferenceable, IClosable { 

    private _factory: any;
    private _serviceName: string;
    private _defaultPort: number;
    private _cacheTimeout: number = 900000;
    private _clientTimeout: number = 300000;
    private _defaultProtocol: string = 'http';
    private _cache: { [tenantId: string]: ProxyReference<T> } = {};

    private _config: ConfigParams;
    private _references: IReferences;
    private _clustersClient: IClustersClientV1;

    constructor(factory: any, serviceName: string, defaultPort: number) {
        this._factory = factory;
        this._serviceName = serviceName;
        this._defaultPort = defaultPort;
    }

    public configure(config: ConfigParams): void {
        this._config = config;

        this._serviceName = config.getAsStringWithDefault('service_name', this._serviceName);
        this._cacheTimeout = config.getAsLongWithDefault('options.cache_timeout', this._cacheTimeout);
        this._clientTimeout = config.getAsLongWithDefault('options.client_timeout', this._clientTimeout);
        this._defaultProtocol = config.getAsStringWithDefault('connection.protocol', this._defaultProtocol);
        this._defaultPort = config.getAsLongWithDefault('connection.port', this._defaultPort);
    }
        
    public setReferences(references: IReferences): void {
        this._references = references;

        this._clustersClient = references.getOneRequired<IClustersClientV1>(
            new Descriptor('service-clusters', 'client', '*', '*', '1.0'));
    }

    public async close(correlationId: string): Promise<void> {
        this._cache = {};
    }

    protected clearCache(force: boolean = false): void {
        let now = new Date().getTime();
        let cacheCutoffTime = now - this._cacheTimeout;
        let clientCutoffTime = now - this._clientTimeout;

        for (let tenantId in this._cache) {
            let ref = this._cache[tenantId];

            if (ref.connected < clientCutoffTime) {
                ref.client = null;
            }
            if (force || ref.created < cacheCutoffTime) {
                delete this._cache[tenantId];
            }
        }
    }

    protected async getClient(correlationId: string, tenantId: string): Promise<T> {
        
        // Check tenant id
        if (tenantId == null) {
            throw new InternalException(
                correlationId, 'NO_TENANT_ID', 'Tenant ID is not specified'
            );
        }

        // Clearn cached references
        this.clearCache();

        // Try to get client from cache
        let ref = this._cache[tenantId];
        if (ref != null && ref.client != null) {
            return ref.client;
        }

        // Check for clusters client
        if (this._clustersClient == null) {
            throw new ReferenceException(
                correlationId, 'service-clusters:client:*:*:1.0'
            );
        }

        let cluster: ClusterV1 = null;

        // Retrieve configuration from cluster
        if (ref) {
            return;
        }

        cluster = await this._clustersClient.getClusterByTenant(correlationId, tenantId);

        // Check for cluster
        if (cluster == null) {
            throw new InternalException(
                correlationId, 'TENANT_CLUSTER_NOT_FOUND', 'Tenant cluster was not found'
            );
        }
        if (!cluster.active) {
            throw new InternalException(
                correlationId, 'CLUSTER_INACTIVE', 'Tenant cluster is not active'
            );
        }
        if (cluster.maintenance) {
            throw new InternalException(
                correlationId, 'MAINTENANCE', 'Tenant cluster is on maintenance'
            );
        }
        if (cluster.api_host == null || cluster.api_host == "") {
            throw new InternalException(
                correlationId, 'NO_CLUSTER_API_HOST', 'API host is not set in tenant cluster'
            );
        }

        // Create and set reference
        cluster.service_ports = cluster.service_ports || {};
        ref = <ProxyReference<T>>{
            created: new Date().getTime(),
            url: null,
            protocol: this._defaultProtocol,
            host: cluster.api_host,
            port: cluster.service_ports[this._serviceName] || this._defaultPort
        }
        this._cache[tenantId] = ref;

        // Create client using factory
        let client = new this._factory();

        // Configure client
        let config = ConfigParams.fromTuples(
            'connection.url', ref.url,
            'connection.protocol', ref.protocol,
            'connection.host', ref.host,
            'connection.port', ref.port
        );
        if (this._config)
            config = config.setDefaults(this._config);
        if (client.configure)
            client.configure(config);

        // Set references
        if (client.setReferences && this._references)
            client.setReferences(this._references);

        // Open the client and store client reference
        if (client.open) {
            await client.open(correlationId);
            ref.connected = new Date().getTime();
            ref.client = client;
        }
        // If client does not require opening 
        else {
            ref.connected = new Date().getTime();
            ref.client = client;
        }

        return ref ? ref.client : null;
    }
    
}

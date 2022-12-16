"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClustersProxyHttpClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
class ClustersProxyHttpClientV1 {
    constructor(factory, serviceName, defaultPort) {
        this._cacheTimeout = 900000;
        this._clientTimeout = 300000;
        this._defaultProtocol = 'http';
        this._cache = {};
        this._factory = factory;
        this._serviceName = serviceName;
        this._defaultPort = defaultPort;
    }
    configure(config) {
        this._config = config;
        this._serviceName = config.getAsStringWithDefault('service_name', this._serviceName);
        this._cacheTimeout = config.getAsLongWithDefault('options.cache_timeout', this._cacheTimeout);
        this._clientTimeout = config.getAsLongWithDefault('options.client_timeout', this._clientTimeout);
        this._defaultProtocol = config.getAsStringWithDefault('connection.protocol', this._defaultProtocol);
        this._defaultPort = config.getAsLongWithDefault('connection.port', this._defaultPort);
    }
    setReferences(references) {
        this._references = references;
        this._clustersClient = references.getOneRequired(new pip_services3_commons_nodex_2.Descriptor('service-clusters', 'client', '*', '*', '1.0'));
    }
    close(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            this._cache = {};
        });
    }
    clearCache(force = false) {
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
    getClient(correlationId, tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check tenant id
            if (tenantId == null) {
                throw new pip_services3_commons_nodex_4.InternalException(correlationId, 'NO_TENANT_ID', 'Tenant ID is not specified');
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
                throw new pip_services3_commons_nodex_3.ReferenceException(correlationId, 'service-clusters:client:*:*:1.0');
            }
            let cluster = null;
            // Retrieve configuration from cluster
            if (ref) {
                return;
            }
            cluster = yield this._clustersClient.getClusterByTenant(correlationId, tenantId);
            // Check for cluster
            if (cluster == null) {
                throw new pip_services3_commons_nodex_4.InternalException(correlationId, 'TENANT_CLUSTER_NOT_FOUND', 'Tenant cluster was not found');
            }
            if (!cluster.active) {
                throw new pip_services3_commons_nodex_4.InternalException(correlationId, 'CLUSTER_INACTIVE', 'Tenant cluster is not active');
            }
            if (cluster.maintenance) {
                throw new pip_services3_commons_nodex_4.InternalException(correlationId, 'MAINTENANCE', 'Tenant cluster is on maintenance');
            }
            if (cluster.api_host == null || cluster.api_host == "") {
                throw new pip_services3_commons_nodex_4.InternalException(correlationId, 'NO_CLUSTER_API_HOST', 'API host is not set in tenant cluster');
            }
            // Create and set reference
            cluster.service_ports = cluster.service_ports || {};
            ref = {
                created: new Date().getTime(),
                url: null,
                protocol: this._defaultProtocol,
                host: cluster.api_host,
                port: cluster.service_ports[this._serviceName] || this._defaultPort
            };
            this._cache[tenantId] = ref;
            // Create client using factory
            let client = new this._factory();
            // Configure client
            let config = pip_services3_commons_nodex_1.ConfigParams.fromTuples('connection.url', ref.url, 'connection.protocol', ref.protocol, 'connection.host', ref.host, 'connection.port', ref.port);
            if (this._config)
                config = config.setDefaults(this._config);
            if (client.configure)
                client.configure(config);
            // Set references
            if (client.setReferences && this._references)
                client.setReferences(this._references);
            // Open the client and store client reference
            if (client.open) {
                yield client.open(correlationId);
                ref.connected = new Date().getTime();
                ref.client = client;
            }
            // If client does not require opening 
            else {
                ref.connected = new Date().getTime();
                ref.client = client;
            }
            return ref ? ref.client : null;
        });
    }
}
exports.ClustersProxyHttpClientV1 = ClustersProxyHttpClientV1;
//# sourceMappingURL=ClustersProxyHttpClientV1.js.map
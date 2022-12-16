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
exports.ClustersCommandableHttpClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class ClustersCommandableHttpClientV1 extends pip_services3_rpc_nodex_1.CommandableHttpClient {
    constructor(config) {
        super('v1/clusters');
        if (config != null)
            this.configure(pip_services3_commons_nodex_1.ConfigParams.fromValue(config));
    }
    getClusters(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_clusters', correlationId, {
                filter: filter,
                paging: paging
            });
        });
    }
    getClusterById(correlationId, clusterId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_cluster_by_id', correlationId, {
                cluster_id: clusterId
            });
        });
    }
    getClusterByTenant(correlationId, tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_2.FilterParams.fromTuples('active', true, 'tenant_id', tenantId);
            let page = yield this.getClusters(correlationId, filter, null);
            if (page && page.data && page.data.length > 0)
                return page.data[0];
            else
                return null;
        });
    }
    createCluster(correlationId, cluster) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('create_cluster', correlationId, {
                cluster: cluster
            });
        });
    }
    updateCluster(correlationId, cluster) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('update_cluster', correlationId, {
                cluster: cluster
            });
        });
    }
    deleteClusterById(correlationId, clusterId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('delete_cluster_by_id', correlationId, {
                cluster_id: clusterId
            });
        });
    }
    addTenant(correlationId, tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('add_tenant', correlationId, {
                tenant_id: tenantId
            });
        });
    }
    removeTenant(correlationId, tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('remove_tenant', correlationId, {
                tenant_id: tenantId
            });
        });
    }
}
exports.ClustersCommandableHttpClientV1 = ClustersCommandableHttpClientV1;
//# sourceMappingURL=ClustersCommandableHttpClientV1.js.map
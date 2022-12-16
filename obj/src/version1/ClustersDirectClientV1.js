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
exports.ClustersDirectClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class ClustersDirectClientV1 extends pip_services3_rpc_nodex_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("service-clusters", "controller", "*", "*", "*"));
    }
    getClusters(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'clusters.get_clusters');
            try {
                let res = yield this._controller.getClusters(correlationId, filter, paging);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    getClusterById(correlationId, clusterId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'clusters.get_cluster_by_id');
            try {
                let res = yield this._controller.getClusterById(correlationId, clusterId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    getClusterByTenant(correlationId, tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_2.FilterParams.fromTuples('active', true, 'tenant_id', tenantId);
            let timing = this.instrument(correlationId, 'clusters.get_cluster_by_tenant');
            try {
                let page = yield this.getClusters(correlationId, filter, null);
                timing.endTiming();
                if (page && page.data && page.data.length > 0)
                    return page.data[0];
                else
                    return null;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    createCluster(correlationId, cluster) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'clusters.create_cluster');
            try {
                let res = yield this._controller.createCluster(correlationId, cluster);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    updateCluster(correlationId, cluster) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'clusters.update_cluster');
            try {
                let res = yield this._controller.updateCluster(correlationId, cluster);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    deleteClusterById(correlationId, clusterId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'clusters.delete_cluster_by_id');
            try {
                let res = yield this._controller.deleteClusterById(correlationId, clusterId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    addTenant(correlationId, tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'clusters.add_tenant');
            try {
                let res = yield this._controller.addTenant(correlationId, tenantId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    removeTenant(correlationId, tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'clusters.remove_tenant');
            try {
                let res = yield this._controller.removeTenant(correlationId, tenantId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
}
exports.ClustersDirectClientV1 = ClustersDirectClientV1;
//# sourceMappingURL=ClustersDirectClientV1.js.map
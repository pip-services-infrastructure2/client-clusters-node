import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams} from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';

import { IClustersClientV1 } from './IClustersClientV1';
//import { IClustersController } from 'service-clusters-node';
import { ClusterV1 } from '../data/version1/ClusterV1';

export class ClustersDirectClientV1 extends DirectClient<any> implements IClustersClientV1 {
            
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor("service-clusters", "controller", "*", "*", "*"))
    }

    public async getClusters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ClusterV1>> {
        let timing = this.instrument(correlationId, 'clusters.get_clusters');
        
        try {
            return await this._controller.getClusters(correlationId, filter, paging);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getClusterById(correlationId: string, clusterId: string): Promise<ClusterV1> {
        let timing = this.instrument(correlationId, 'clusters.get_cluster_by_id');
        try {
            return await this._controller.getClusterById(correlationId, clusterId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getClusterByTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {

        let filter = FilterParams.fromTuples(
            'active', true,
            'tenant_id', tenantId
        );
        
        let timing = this.instrument(correlationId, 'clusters.get_cluster_by_tenant');

        try {
            let page = await this.getClusters(correlationId, filter, null);
            if (page && page.data && page.data.length > 0)
                return page.data[0];
            else return null;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async createCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1> {
        let timing = this.instrument(correlationId, 'clusters.create_cluster');
        try {
            return await this._controller.createCluster(correlationId, cluster);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async updateCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1> {
        let timing = this.instrument(correlationId, 'clusters.update_cluster');
        
        try {
            return await this._controller.updateCluster(correlationId, cluster);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async deleteClusterById(correlationId: string, clusterId: string): Promise<ClusterV1> {
        let timing = this.instrument(correlationId, 'clusters.delete_cluster_by_id');

        try {
            return await this._controller.deleteClusterById(correlationId, clusterId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async addTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {
        let timing = this.instrument(correlationId, 'clusters.add_tenant');
        
        try {
            return await this._controller.addTenant(correlationId, tenantId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async removeTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {
        let timing = this.instrument(correlationId, 'clusters.remove_tenant');
        
        try {
            return await this._controller.removeTenant(correlationId, tenantId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
    
}
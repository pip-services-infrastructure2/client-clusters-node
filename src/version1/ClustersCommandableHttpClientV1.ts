import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';

import { ClusterV1 } from '../data/version1/ClusterV1';
import { IClustersClientV1 } from './IClustersClientV1';

export class ClustersCommandableHttpClientV1 extends CommandableHttpClient implements IClustersClientV1 {       
    
    constructor(config?: any) {
        super('v1/clusters');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
                
    public async getClusters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ClusterV1>> {
        return await this.callCommand(
            'get_clusters',
            correlationId,
            {
                filter: filter,
                paging: paging
            }
        );
    }

    public async getClusterById(correlationId: string, clusterId: string): Promise<ClusterV1> {
        return await this.callCommand(
            'get_cluster_by_id',
            correlationId,
            {
                cluster_id: clusterId
            }
        );  
    }

    public async getClusterByTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {

        let filter = FilterParams.fromTuples(
            'active', true,
            'tenant_id', tenantId
        );

        let page = await this.getClusters(correlationId, filter, null);
        if (page && page.data && page.data.length > 0)
            return page.data[0];
        else return null;
    }

    public async createCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1> {
        return await this.callCommand(
            'create_cluster',
            correlationId,
            {
                cluster: cluster
            }
        );
    }

    public async updateCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1> {
        return await this.callCommand(
            'update_cluster',
            correlationId,
            {
                cluster: cluster
            }
        );
    }

    public async deleteClusterById(correlationId: string, clusterId: string): Promise<ClusterV1> {
        return await this.callCommand(
            'delete_cluster_by_id',
            correlationId,
            {
                cluster_id: clusterId
            }
        );
    }
    
    public async addTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {
        return await this.callCommand(
            'add_tenant',
            correlationId,
            {
                tenant_id: tenantId
            }
        );
    }

    public async removeTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {
        return await this.callCommand(
            'remove_tenant',
            correlationId,
            {
                tenant_id: tenantId
            }
        );
    }

}

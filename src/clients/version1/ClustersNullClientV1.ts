import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams} from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { IClustersClientV1 } from './IClustersClientV1';
import { ClusterV1 } from '../../data/version1/ClusterV1';

export class ClustersNullClientV1 implements IClustersClientV1 {

    public async getClusterById(correlationId: string, cluster_id: string): Promise<ClusterV1> {
        return  null;
    }

    public async getClusterByTenant(correlationId: string, tenant_id: string): Promise<ClusterV1> {
        return  null;
    }

    public async deleteClusterById(correlationId: string, cluster_id: string): Promise<ClusterV1> {
        return  null;
    }

    public async addTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {
        return  null;
    }

    public async removeTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {
        return  null;
    }
            
    public async getClusters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ClusterV1>> {
        return new DataPage<ClusterV1>([], 0);
    }

    public async createCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1> {
        return cluster;
    }

    public async updateCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1> {
        return cluster;
    }   
}
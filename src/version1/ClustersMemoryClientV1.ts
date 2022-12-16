import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams} from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';

import { IClustersClientV1 } from './IClustersClientV1';
import { ClusterV1 } from '../data/version1/ClusterV1';

export class ClustersMemoryClientV1 implements IClustersClientV1 {
    private _clusters: ClusterV1[] = [];
            
    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: ClusterV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.name, search))
            return true;
        return false;
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let name = filter.getAsNullableString('name');
        let type = filter.getAsNullableString('type');
        let active = filter.getAsNullableBoolean('active');
        let open = filter.getAsNullableBoolean('open');
        let tenantId = filter.getAsNullableString('tenant_id');
        let tenantIds = filter.getAsObject('tenant_ids');
        
        // Process ids filter
        if (typeof tenantIds == 'string')
            tenantIds = tenantIds.split(',');
        if (!Array.isArray(tenantIds))
            tenantIds = null;

        return (item) => {
            if (id && item.id != id) 
                return false;
            if (tenantId && (item.active_tenants == null || item.active_tenants.indexOf(tenantId) < 0))
                return false;
            if (tenantIds && !this.contains(tenantIds, item.active_tenants))
                return false;
            if (name && item.name != name) 
                return false;
            if (type && item.type != type) 
                return false;
            if (active && item.active != active) 
                return false;
            if (open && item.open != open) 
                return false;
            if (search && !this.matchSearch(item, search)) 
                return false;
            return true; 
        };
    }

    public async getClusters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ClusterV1>> {
        
        let clusters = this._clusters.filter(this.composeFilter(filter));
        return new DataPage<ClusterV1>(clusters, clusters.length);
    }

    public async getClusterById(correlationId: string, clusterId: string): Promise<ClusterV1> {

        let cluster = this._clusters.find((d) => d.id == clusterId);
        return cluster;
    }

    public async getClusterByTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {

        let cluster = this._clusters.find((d) => d.active && d.active_tenants.indexOf(tenantId) >= 0);
        return cluster;
    }

    public async createCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1> {

        cluster.id = cluster.id || IdGenerator.nextLong();
        cluster.update_time = cluster.update_time || new Date();
        cluster.active = cluster.active != null || true;
        cluster.open = cluster.max_tenant_count > cluster.tenants_count;

        this._clusters.push(cluster);
        return cluster;
    }

    public async updateCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1> {

        cluster.open = cluster.max_tenant_count > cluster.tenants_count;

        this._clusters = this._clusters.filter((d) => d.id != cluster.id);
        this._clusters.push(cluster);
        
        return cluster;
    }

    public async deleteClusterById(correlationId: string, clusterId: string): Promise<ClusterV1> {

        let cluster = this._clusters.find((d) => d.id == clusterId);
        this._clusters = this._clusters.filter((d) => d.id != clusterId);
        
        return cluster;
    }

    public async addTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {

        let cluster = this._clusters.find(c => c.active && c.open);
        if (cluster) {
            cluster.active_tenants = cluster.active_tenants || [];
            cluster.active_tenants.push(tenantId);
            cluster.tenants_count++;
            cluster.open = cluster.max_tenant_count > cluster.tenants_count;
        }

        return cluster;
    }

    public async removeTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {

        let cluster = this._clusters.find(c => c.active_tenants && c.active_tenants.indexOf(tenantId) >= 0);
        if (cluster) {
            cluster.active_tenants = cluster.active_tenants.filter(s => s != tenantId);
            cluster.tenants_count--;
            cluster.open = cluster.max_tenant_count > cluster.tenants_count;
        }

        return cluster;
    }

}
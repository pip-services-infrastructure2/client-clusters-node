import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';

import { ClustersNullClientV1 } from '../version1/ClustersNullClientV1';
import { ClustersMemoryClientV1 } from '../version1/ClustersMemoryClientV1';
import { ClustersDirectClientV1 } from '../version1/ClustersDirectClientV1';
import { ClustersCommandableHttpClientV1 } from '../version1/ClustersCommandableHttpClientV1';
import { ClustersCommandableLambdaClientV1 } from '../version1/ClustersCommandableLambdaClientV1';

export class ClustersClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('service-clusters', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('service-clusters', 'client', 'null', 'default', '1.0');
	public static MemoryClientV1Descriptor = new Descriptor('service-clusters', 'client', 'memory', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('service-clusters', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('service-clusters', 'client', 'commandable-http', 'default', '1.0');
	public static LambdaClientV1Descriptor = new Descriptor('service-clusters', 'client', 'commandable-lambda', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(ClustersClientFactory.NullClientV1Descriptor, ClustersNullClientV1);
		this.registerAsType(ClustersClientFactory.MemoryClientV1Descriptor, ClustersMemoryClientV1);
		this.registerAsType(ClustersClientFactory.DirectClientV1Descriptor, ClustersDirectClientV1);
		this.registerAsType(ClustersClientFactory.HttpClientV1Descriptor, ClustersCommandableHttpClientV1);
		this.registerAsType(ClustersClientFactory.LambdaClientV1Descriptor, ClustersCommandableLambdaClientV1);
	}
	
}

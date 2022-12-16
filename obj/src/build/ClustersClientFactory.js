"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClustersClientFactory = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const ClustersNullClientV1_1 = require("../version1/ClustersNullClientV1");
const ClustersMemoryClientV1_1 = require("../version1/ClustersMemoryClientV1");
const ClustersDirectClientV1_1 = require("../version1/ClustersDirectClientV1");
const ClustersCommandableHttpClientV1_1 = require("../version1/ClustersCommandableHttpClientV1");
const ClustersCommandableLambdaClientV1_1 = require("../version1/ClustersCommandableLambdaClientV1");
class ClustersClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(ClustersClientFactory.NullClientV1Descriptor, ClustersNullClientV1_1.ClustersNullClientV1);
        this.registerAsType(ClustersClientFactory.MemoryClientV1Descriptor, ClustersMemoryClientV1_1.ClustersMemoryClientV1);
        this.registerAsType(ClustersClientFactory.DirectClientV1Descriptor, ClustersDirectClientV1_1.ClustersDirectClientV1);
        this.registerAsType(ClustersClientFactory.HttpClientV1Descriptor, ClustersCommandableHttpClientV1_1.ClustersCommandableHttpClientV1);
        this.registerAsType(ClustersClientFactory.LambdaClientV1Descriptor, ClustersCommandableLambdaClientV1_1.ClustersCommandableLambdaClientV1);
    }
}
exports.ClustersClientFactory = ClustersClientFactory;
ClustersClientFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'factory', 'default', 'default', '1.0');
ClustersClientFactory.NullClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'client', 'null', 'default', '1.0');
ClustersClientFactory.MemoryClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'client', 'memory', 'default', '1.0');
ClustersClientFactory.DirectClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'client', 'direct', 'default', '1.0');
ClustersClientFactory.HttpClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'client', 'commandable-http', 'default', '1.0');
ClustersClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'client', 'commandable-lambda', 'default', '1.0');
//# sourceMappingURL=ClustersClientFactory.js.map
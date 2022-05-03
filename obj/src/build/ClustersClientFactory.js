"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClustersClientFactory = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const ClustersNullClientV1_1 = require("../clients/version1/ClustersNullClientV1");
const ClustersMemoryClientV1_1 = require("../clients/version1/ClustersMemoryClientV1");
const ClustersDirectClientV1_1 = require("../clients/version1/ClustersDirectClientV1");
const ClustersHttpClientV1_1 = require("../clients/version1/ClustersHttpClientV1");
const ClustersLambdaClientV1_1 = require("../clients/version1/ClustersLambdaClientV1");
class ClustersClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(ClustersClientFactory.NullClientV1Descriptor, ClustersNullClientV1_1.ClustersNullClientV1);
        this.registerAsType(ClustersClientFactory.MemoryClientV1Descriptor, ClustersMemoryClientV1_1.ClustersMemoryClientV1);
        this.registerAsType(ClustersClientFactory.DirectClientV1Descriptor, ClustersDirectClientV1_1.ClustersDirectClientV1);
        this.registerAsType(ClustersClientFactory.HttpClientV1Descriptor, ClustersHttpClientV1_1.ClustersHttpClientV1);
        this.registerAsType(ClustersClientFactory.LambdaClientV1Descriptor, ClustersLambdaClientV1_1.ClustersLambdaClientV1);
    }
}
exports.ClustersClientFactory = ClustersClientFactory;
ClustersClientFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'factory', 'default', 'default', '1.0');
ClustersClientFactory.NullClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'client', 'null', 'default', '1.0');
ClustersClientFactory.MemoryClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'client', 'memory', 'default', '1.0');
ClustersClientFactory.DirectClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'client', 'direct', 'default', '1.0');
ClustersClientFactory.HttpClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'client', 'http', 'default', '1.0');
ClustersClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'client', 'lambda', 'default', '1.0');
//# sourceMappingURL=ClustersClientFactory.js.map
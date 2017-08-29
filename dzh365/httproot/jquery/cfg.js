ENVIRONMENT = 0; // 环境配置(外网:0, beta:1, alpha:2, dev:3)
PRODUCT = 123; //产品编号

try {
    external.env = ENVIRONMENT;
    external.prod = PRODUCT;
} catch (e) {
}
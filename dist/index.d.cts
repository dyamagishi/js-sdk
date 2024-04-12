import * as ts_toolbelt_out_Function_Curry from 'ts-toolbelt/out/Function/Curry';

type Pod = {
    name: string;
    imageName: string;
    gpuTypeId: string;
    cloudType?: string;
    supportPublicIp?: boolean;
    startSsh?: boolean;
    dataCenterId?: string;
    countryCode?: string;
    gpuCount?: number;
    volumeInGb?: number;
    containerDiskInGb?: number;
    minVcpuCount?: number;
    minMemoryInGb?: number;
    dockerArgs?: string;
    ports?: string;
    volumeMountPath?: string;
    env?: {
        [key: string]: string;
    };
    templateId?: string;
    networkVolumeId?: string;
    allowedCudaVersions?: string[];
};
declare class RunPodApi {
    apiKey: string;
    constructor(apiKey: string);
    runGraphqlQuery(query: string): Promise<any>;
    getUser(): Promise<any>;
    updateUserSettings(pubkey: string): Promise<any>;
    getGpus(): Promise<any>;
    getGpu(gpuId: string, gpuQuantity?: number): Promise<any>;
    getPods(): Promise<any>;
    getPod(podId: string): Promise<any>;
    createPod({ name, imageName, gpuTypeId, cloudType, supportPublicIp, startSsh, dataCenterId, countryCode, gpuCount, volumeInGb, containerDiskInGb, minVcpuCount, minMemoryInGb, dockerArgs, ports, volumeMountPath, env, templateId, networkVolumeId, allowedCudaVersions, }: Pod): Promise<any>;
    stopPod(podId: string): Promise<any>;
    resumePod(podId: string, gpuCount: number): Promise<any>;
}

type ExecutionPolicy = {
    ttl?: number;
    executionTimeout?: number;
};
type S3Config = {
    accessId: string;
    accessSecret: string;
    bucketName: string;
    endpointUrl: string;
    objectPath?: string;
};
type EndpointInputPayload = {
    input: any;
    webhook?: string;
    webhookV2?: string;
    s3Config?: S3Config;
    policy?: ExecutionPolicy;
};
type EndpointIncompleteOutput = {
    delayTime?: number;
    status: string;
    id: string;
};
type EndpointCompletedOutput = {
    status: string;
    id: string;
    output: any;
    executionTime: number;
    delayTime: number;
};
type EndpointOutput = EndpointCompletedOutput | EndpointIncompleteOutput;
type EndpointStreamOutput = {
    status: string;
    stream: [any];
};
type CancelOutput = {
    status: string;
    id: string;
    executionTime: number;
    delayTime: number;
};
type HealthCheck = {
    jobs: {
        completed: number;
        failed: number;
        inProgress: number;
        inQueue: number;
        retried: number;
    };
    workers: {
        idle: number;
        initializing: number;
        ready: number;
        running: number;
        throttled: number;
    };
};
type PurgeQueueOutput = {
    removed: number;
    status: string;
};
type SdkOptions = {
    baseUrl: string;
};
declare const runpodServerlessBaseUrlProd = "https://api.runpod.ai/v2";
declare const runpodServerlessBaseUrlDev = "https://dev-api.runpod.ai/v2";
declare const runSync: ts_toolbelt_out_Function_Curry.Curry<(baseUrl: string, apiKey: string, endpointId: string, request: EndpointInputPayload, timeout?: number) => Promise<{
    started: boolean;
    completed: boolean;
    delayTime?: number | undefined;
    status: string;
    id: string;
} | {
    started: boolean;
    completed: boolean;
    status: string;
    id: string;
    output: any;
    executionTime: number;
    delayTime: number;
} | {
    started: boolean;
    completed: boolean;
    succeeded: boolean;
    delayTime?: number | undefined;
    status: string;
    id: string;
} | {
    started: boolean;
    completed: boolean;
    succeeded: boolean;
    status: string;
    id: string;
    output: any;
    executionTime: number;
    delayTime: number;
}>>;
declare const run: ts_toolbelt_out_Function_Curry.Curry<(baseUrl: string, apiKey: string, endpointId: string, request: EndpointInputPayload, timeout?: number) => Promise<any>>;
declare const status: ts_toolbelt_out_Function_Curry.Curry<(baseUrl: string, apiKey: string, endpointId: string, requestId: string, timeout?: number) => Promise<any>>;
declare function stream(baseUrl: string, apiKey: string, endpointId: string, requestId: string, timeout?: number): AsyncGenerator<any, void, unknown>;
declare const health: ts_toolbelt_out_Function_Curry.Curry<(baseUrl: string, apiKey: string, endpointId: string, timeout?: number) => Promise<any>>;
declare const purgeQueue: ts_toolbelt_out_Function_Curry.Curry<(baseUrl: string, apiKey: string, endpointId: string, timeout?: number) => Promise<any>>;
declare class Endpoint {
    endpointId: string;
    baseUrl: string;
    private apiKey;
    constructor(baseUrl: string, apiKey: string, endpointId: string);
    runSync(request: EndpointInputPayload, timeout?: number): Promise<EndpointCompletedOutput>;
    run(request: EndpointInputPayload, timeout?: number): Promise<EndpointIncompleteOutput>;
    status(requestId: string, timeout?: number): Promise<EndpointOutput>;
    statusSync(requestId: string, timeout?: number): Promise<EndpointOutput>;
    stream(requestId: string, timeout?: number): AsyncGenerator<any>;
    cancel(requestId: string, timeout?: number): Promise<CancelOutput>;
    health(timeout?: number): Promise<HealthCheck>;
    purgeQueue(timeout?: number): Promise<PurgeQueueOutput>;
}

declare class RunpodSdk {
    private apiKey;
    baseUrl: string;
    constructor(apiKey: string, options: SdkOptions);
    endpoint(endpointId: string): Endpoint | null;
    pod(): RunPodApi;
}
declare const _default: (apiKey: string, options?: SdkOptions) => RunpodSdk;

export { type CancelOutput, type EndpointCompletedOutput, type EndpointIncompleteOutput, type EndpointInputPayload, type EndpointOutput, type EndpointStreamOutput, type ExecutionPolicy, type HealthCheck, type PurgeQueueOutput, type S3Config, type SdkOptions, _default as default, health, purgeQueue, run, runSync, runpodServerlessBaseUrlDev, runpodServerlessBaseUrlProd, status, stream };

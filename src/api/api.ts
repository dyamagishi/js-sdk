import * as userQueries from './queries/user';
import * as userMutations from './mutations/user'
import * as gpus from './queries/gpus';
import * as podQueries from './queries/pods';
import * as podMutations from './mutations/pods';

interface Env {
    [key: string]: string;
}

import xior, { XiorResponse as AxiosResponse, XiorError as AxiosError } from "xior"

const axios = xior.create();
const HTTP_STATUS_UNAUTHORIZED = 401;

interface GraphQLResponse {
  data?: any;
  errors?: {
    message: string;
  }[];
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class QueryError extends Error {
  constructor(message: string, query: string) {
    super(`${message} - while processing query: ${query}`);
    this.name = "QueryError";
  }
}

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
  env?: { [key: string]: string };
  templateId?: string;
  networkVolumeId?: string;
  allowedCudaVersions?: string[];
};

export class RunPodApi {
  public apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async runGraphqlQuery(query: string): Promise<any> {
    const url = `https://api.runpod.io/graphql?api_key=${this.apiKey}`;
  
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "RunPodClient/1.0", // Replace 'RunPodClient/1.0' with your actual User-Agent
    };
  
    const data = { query };
  
    return axios.post(url, data, { headers, timeout: 30000 })
      .then(response => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === HTTP_STATUS_UNAUTHORIZED) {
          throw new AuthenticationError("Unauthorized request, please check your API key.");
        }
  
        if (error.response) {
          const jsonResponse = error.response.data as GraphQLResponse;
          if (jsonResponse && jsonResponse.errors && jsonResponse.errors.length > 0) {
            throw new QueryError(jsonResponse.errors[0].message, query);
          }
        }
  
        // Preserve axios's original error if not handled above
        throw error;
      });
  }
  
  async getUser(): Promise<any> {
    const rawResponse = await this.runGraphqlQuery(userQueries.QUERY_USER);
    const cleanedResponse = rawResponse.data.myself;
    return cleanedResponse;
  }

  async updateUserSettings(pubkey: string): Promise<any> {
    const rawResponse = await this.runGraphqlQuery(userMutations.generateUserMutation(pubkey));
    const cleanedResponse = rawResponse.data.updateUserSettings;
    return cleanedResponse;
  }

  async getGpus(): Promise<any> {
    const rawResponse = await this.runGraphqlQuery(gpus.QUERY_GPU_TYPES);
    const cleanedResponse = rawResponse.data.gpuTypes;
    return cleanedResponse;
  }

  async getGpu(gpuId: string, gpuQuantity = 1): Promise<any> {
    const rawResponse = await this.runGraphqlQuery(gpus.generateGpuQuery(gpuId, gpuQuantity));
    const cleanedResponse = rawResponse.data.gpuTypes;
    if (cleanedResponse.length < 1) {
      throw new Error("No GPU found with the specified ID, run getGpus() to get a list of all GPUs");
    }
    return cleanedResponse[0];
  }

  async getPods(): Promise<any> {
    const rawResponse = await this.runGraphqlQuery(podQueries.QUERY_POD);
    const cleanedResponse = rawResponse.data.myself.pods;
    return cleanedResponse;
  }

  async getPod(podId: string): Promise<any> {
    const rawResponse = await this.runGraphqlQuery(podQueries.generatePodQuery(podId));
    return rawResponse.data.pod;
  }

  async createPod({
      name,
      imageName,
      gpuTypeId,
      cloudType = "ALL",
      supportPublicIp = false,
      startSsh = false,
      dataCenterId = undefined,
      countryCode = undefined,
      gpuCount = 1,
      volumeInGb = 10,
      containerDiskInGb = undefined,
      minVcpuCount = 1,
      minMemoryInGb = 1,
      dockerArgs = "",
      ports = undefined,
      volumeMountPath = "",
      env = undefined,
      templateId = undefined,
      networkVolumeId = undefined,
      allowedCudaVersions = [],
  }:Pod): Promise<any> {
      // Input Validation
      await this.getGpu(gpuTypeId);  // Check if GPU exists, will throw Error if not.

      if (!["ALL", "COMMUNITY", "SECURE"].includes(cloudType)) {
          throw new Error("cloudType must be one of ALL, COMMUNITY or SECURE");
      }

      if (networkVolumeId && !dataCenterId) {
          const userInfo = await this.getUser();
          for (const networkVolume of userInfo.networkVolumes) {
              if (networkVolume.id === networkVolumeId) {
                  dataCenterId = networkVolume.dataCenterId;
                  break;
              }
          }
      }

      if (containerDiskInGb === null && templateId === null) {
          containerDiskInGb = 10;
      }

      const rawResponse = await this.runGraphqlQuery(
          podMutations.generatePodDeploymentMutation({
              name,
              imageName,
              gpuTypeId,
              cloudType,
              supportPublicIp,
              startSsh,
              dataCenterId,
              countryCode,
              gpuCount,
              volumeInGb,
              containerDiskInGb,
              minVcpuCount,
              minMemoryInGb,
              dockerArgs,
              ports,
              volumeMountPath,
              env,
              templateId,
              networkVolumeId,
              allowedCudaVersions,
          })
      );

      const cleanedResponse = rawResponse.data.podFindAndDeployOnDemand;
      return cleanedResponse;
  }

  async stopPod(podId: string): Promise<any> {
    const rawResponse = await this.runGraphqlQuery(podMutations.generatePodStopMutation(podId));
    const cleanedResponse = rawResponse.data.podStop;
    return cleanedResponse;
  }

  async resumePod(podId: string, gpuCount: number): Promise<any> {
    const rawResponse = await this.runGraphqlQuery(podMutations.generatePodResumeMutation(podId, gpuCount));
    const cleanedResponse = rawResponse.data.podResume;
    return cleanedResponse;
  }
}
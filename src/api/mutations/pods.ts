type PodDeploymentOptions = {
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
  env?: Record<string, string>;
  templateId?: string;
  networkVolumeId?: string;
  allowedCudaVersions?: string[];
};

export function generatePodDeploymentMutation(options: PodDeploymentOptions): string {
  let inputFields: string[] = [
    `name: "${options.name}"`,
    `imageName: "${options.imageName}"`,
    `gpuTypeId: "${options.gpuTypeId}"`,
  ];

  // Default Fields
  inputFields.push(`cloudType: ${options.cloudType || "ALL"}`);

  inputFields.push(options.startSsh !== false ? 'startSsh: true' : 'startSsh: false');
  inputFields.push(options.supportPublicIp !== false ? 'supportPublicIp: true' : 'supportPublicIp: false');

  // Optional Fields
  if (options.dataCenterId) {
    inputFields.push(`dataCenterId: "${options.dataCenterId}"`);
  }
  if (options.countryCode) {
    inputFields.push(`countryCode: "${options.countryCode}"`);
  }
  if (options.gpuCount) {
    inputFields.push(`gpuCount: ${options.gpuCount}`);
  }
  if (options.volumeInGb) {
    inputFields.push(`volumeInGb: ${options.volumeInGb}`);
  }
  if (options.containerDiskInGb) {
    inputFields.push(`containerDiskInGb: ${options.containerDiskInGb}`);
  }
  if (options.minVcpuCount) {
    inputFields.push(`minVcpuCount: ${options.minVcpuCount}`);
  }
  if (options.minMemoryInGb) {
    inputFields.push(`minMemoryInGb: ${options.minMemoryInGb}`);
  }
  if (options.dockerArgs) {
    inputFields.push(`dockerArgs: "${options.dockerArgs}"`);
  }
  if (options.ports) {
    const cleanedPorts = options.ports.replace(" ", "");
    inputFields.push(`ports: "${cleanedPorts}"`);
  }
  if (options.volumeMountPath) {
    inputFields.push(`volumeMountPath: "${options.volumeMountPath}"`);
  }
  if (options.env) {
    const envString = Object.entries(options.env)
      .map(([key, value]) => `{ key: "${key}", value: "${value}"}`)
      .join(', ');
    inputFields.push(`env: [${envString}]`);
  }
  if (options.templateId) {
    inputFields.push(`templateId: "${options.templateId}"`);
  }
  if (options.networkVolumeId) {
    inputFields.push(`networkVolumeId: "${options.networkVolumeId}"`);
  }
  if (options.allowedCudaVersions) {
    const allowedCudaVersionsString = options.allowedCudaVersions.map(version => `"${version}"`).join(', ');
    inputFields.push(`allowedCudaVersions: [${allowedCudaVersionsString}]`);
  }

  const inputString = inputFields.join(', ');

  return `
    mutation {
      podFindAndDeployOnDemand(
        input: {
          ${inputString}
        }
      ) {
        id
        desiredStatus
        imageName
        env
        machineId
        machine {
          podHostId
        }
      }
    }
  `;
}

export function generatePodStopMutation(podId: string): string {
  return `
    mutation {
      podStop(input: { podId: "${podId}" }) {
        id
        desiredStatus
      }
    }
  `;
}

export function generatePodResumeMutation(podId: string, gpuCount: number): string {
  return `
    mutation {
      podResume(input: { podId: "${podId}", gpuCount: ${gpuCount} }) {
        id
        desiredStatus
        imageName
        env
        machineId
        machine {
          podHostId
        }
      }
    }
  `;
}

export function generatePodTerminateMutation(podId: string): string {
  return `
    mutation {
      podTerminate(input: { podId: "${podId}" })
    }
  `;
}
export type EndpointOptions = {
  templateId: string;
  gpuIds?: string;
  networkVolumeId?: string | null;
  locations?: string | null;
  idleTimeout?: number;
  scalerType?: string;
  scalerValue?: number;
  workersMin?: number;
  workersMax?: number;
  flashboot?: boolean;
};

export function generateEndpointMutation(name: string, options: EndpointOptions): string {
  const {
      templateId,
      gpuIds = "AMPERE_16",
      networkVolumeId = null,
      locations = null,
      idleTimeout = 5,
      scalerType = "QUEUE_DELAY",
      scalerValue = 4,
      workersMin = 0,
      workersMax = 3,
      flashboot = false,
  } = options;

  if (flashboot) {
      name += "-fb";
  }

  const inputFields: string[] = [
      `name: "${name}"`,
      `templateId: "${templateId}"`,
      `gpuIds: "${gpuIds}"`,
      `networkVolumeId: "${networkVolumeId || ""}"`,
      `locations: "${locations || ""}"`,
      `idleTimeout: ${idleTimeout}`,
      `scalerType: "${scalerType}"`,
      `scalerValue: ${scalerValue}`,
      `workersMin: ${workersMin}`,
      `workersMax: ${workersMax}`,
  ];

  const inputFieldsString = inputFields.join(', ');

  return `
  mutation {
      saveEndpoint(
          input: {
              ${inputFieldsString}
          }
      ) {
          id
          name
          templateId
          gpuIds
          networkVolumeId
          locations
          idleTimeout
          scalerType
          scalerValue
          workersMin
          workersMax
      }
  }
  `;
}

export function updateEndpointTemplateMutation(endpointId: string, templateId: string): string {
  const inputFields: string[] = [
      `templateId: "${templateId}"`,
      `endpointId: "${endpointId}"`
  ];

  const inputFieldsString = inputFields.join(', ');
  return `
  mutation {
      updateEndpointTemplate(input: {${inputFieldsString}}) {
          id
          templateId
      }
  }
  `;
}


// Example usage:
// const mutationString = generateEndpointMutation("example-endpoint", { templateId: "template123" });
// console.log(mutationString);
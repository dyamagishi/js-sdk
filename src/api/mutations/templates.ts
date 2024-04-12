/**
 * Define the interface for the pod template options.
 */
export type PodTemplateOptions = {
  name: string;
  imageName: string;
  dockerStartCmd?: string;
  containerDiskInGb?: number;
  volumeInGb?: number;
  volumeMountPath?: string;
  ports?: string;
  env?: { [key: string]: string };
  isServerless?: boolean;
  registryAuthId?: string;
}

/**
* Generate a string for a GraphQL mutation to create a new pod template.
*/
export function generatePodTemplate(options: PodTemplateOptions): string {
  const {
      name,
      imageName,
      dockerStartCmd = "",
      containerDiskInGb = 10,
      volumeInGb = 0,
      volumeMountPath = "",
      ports = "",
      env = {},
      isServerless = false,
      registryAuthId = "",
  } = options;

  const inputFields: string[] = [
      `name: "${name}"`,
      `imageName: "${imageName}"`,
      `dockerArgs: "${dockerStartCmd.replace(/"/g, '\\"')}"`,
      `containerDiskInGb: ${containerDiskInGb}`,
      `volumeInGb: ${volumeInGb}`,
      volumeMountPath ? `volumeMountPath: "${volumeMountPath}"` : "",
      ports ? `ports: "${ports.replace(/ /g, "")}"` : "",
      `env: [${Object.entries(env).map(([key, value]) => `{ key: "${key}", value: "${value}" }`).join(", ")}]`,
      `isServerless: ${isServerless}`,
      registryAuthId ? `containerRegistryAuthId: "${registryAuthId}"` : "",
      "startSsh: true",
      "isPublic: false",
      'readme: ""'
  ]
  const inputFieldsString = inputFields.filter(Boolean).join(', ');

  return `
  mutation {
      saveTemplate(
          input: {
              ${inputFieldsString}
          }
      ) {
          id
          name
          imageName
          dockerArgs
          containerDiskInGb
          volumeInGb
          volumeMountPath
          ports
          env {
              key
              value
          }
          isServerless
      }
  }
  `;
}

// Example usage:
// const myTemplate = generatePodTemplate({
//   name: "examplePod",
//   imageName: "exampleImage:latest",
//   dockerStartCmd: "npm start",
//   env: { NODE_ENV: "production" },
//   isServerless: true,
// });
export function generateContainerRegistryAuth(name: string, username: string, password: string): string {
  // Prepare the input object
  const inputObj = { name, username, password };

  // Convert the input object to a string, properly formatted for GraphQL
  const inputStr = Object.entries(inputObj).map(([key, value]) => `${key}: "${value}"`).join(", ");

  return `
  mutation SaveRegistryAuth {
      saveRegistryAuth(input: {${inputStr}}) {
          id
          name
      }
  }
  `;
}

// Example usage:
// console.log(generateContainerRegistryAuth("myRegistry", "user123", "pass456"));
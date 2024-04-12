export function generateUserMutation(pubkey: string): string {
  const escapedPubkey = pubkey.replace(/\n/g, '\\n');
  const inputFields: string[] = [`pubKey: "${escapedPubkey}"`];

  // Format input fields
  const inputString = inputFields.join(", ");

  return `
  mutation {
      updateUserSettings(
          input: {
              ${inputString}
          }
      ) {
          id
          pubKey
      }
  }
  `;
}

// Example usage
// const publicKey = `Your public\nkey here`;
// console.log(generateUserMutation(publicKey));
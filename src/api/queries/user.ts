export const QUERY_USER: string = `
query myself {
  myself {
    id
    pubKey
    networkVolumes {
      id
      name
      size
      dataCenterId
    }
  }
}
`;
// Basic query to fetch available GPU types
export const QUERY_GPU_TYPES: string = `
query GpuTypes {
  gpuTypes {
    id
    displayName
    memoryInGb
  }
}
`;

// Function to generate a query for a specific GPU type
export const generateGpuQuery = (gpuId:string, gpuCount=1): string => {
  return `
    query GpuTypes {
      gpuTypes(input: {id: "${gpuId}"}) {
        maxGpuCount
        id
        displayName
        manufacturer
        memoryInGb
        cudaCores
        secureCloud
        communityCloud
        securePrice
        communityPrice
        oneMonthPrice
        threeMonthPrice
        oneWeekPrice
        communitySpotPrice
        secureSpotPrice
        lowestPrice(input: {gpuCount: ${gpuCount}}) {
          minimumBidPrice
          uninterruptablePrice
        }
      }
    }
  `;
}

// // Example usage
// console.log(generateGpuQuery({ gpuId: '12345', gpuCount: 2 }));
// Analytics tracking for lab-grown diamond optimization
export const labGrownAnalytics = {
  track: (event: any) => {
    console.log('Analytics event:', event);
  }
};

export const useAnalytics = () => {
  return labGrownAnalytics;
};
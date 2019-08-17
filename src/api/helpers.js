async function simulateLoading(loadingTime = 600) {
  await new Promise(resolve => setTimeout(resolve, loadingTime));
}

export { simulateLoading };

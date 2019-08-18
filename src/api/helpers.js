async function simulateLoading(loadingTime = 500) {
  await new Promise(resolve => setTimeout(resolve, loadingTime));
}

export { simulateLoading };

export function convertUSDToOMR(usdPrice) {
  const conversionRate = 0.385;
  return (usdPrice * conversionRate).toFixed(2);
}

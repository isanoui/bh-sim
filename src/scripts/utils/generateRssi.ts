// if prevRssi exists, then drone_id is same and number needs to be similar
// otherwise random value between -110.0000 and -65.0000
const generateRssi = (prevRssi?: number): number => {
  if (!prevRssi) return parseFloat((Math.random() * 45 - 110).toFixed(4));

  // ensure rssi adjustment doesnt go below or above threshold using .max/.min
  const min = Math.max(-110, prevRssi - Math.random() * 3);
  const max = Math.min(-65, prevRssi + Math.random() * 3);
  return parseFloat((Math.random() * (max - min) + min).toFixed(4));
};

export default generateRssi;

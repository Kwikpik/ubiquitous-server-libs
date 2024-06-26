/**
 * Calculate straight line distance between two geographical points.
 *
 * @param latitude0 Latitude of first point.
 * @param longitude0 Longitude of first point.
 * @param latitude1 Latitude of second point.
 * @param longitude1 Longitude of second point.
 * @returns
 */
export const calculateDistanceUsingCoordinates = (
  latitude0: number,
  longitude0: number,
  latitude1: number,
  longitude1: number
) => {
  try {
    const R = 6371; // earth's radius in KM
    const radians = Math.PI / 180;

    const lat0 = latitude0 * radians;
    const lat1 = latitude1 * radians;

    const latitudeDelta = (latitude1 - latitude0) * radians;
    const longitudeDelta = (longitude1 - longitude0) * radians;

    const a =
      Math.pow(Math.sin(latitudeDelta / 2), 2) +
      Math.cos(lat0) * Math.cos(lat1) * Math.pow(Math.sin(longitudeDelta / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  } catch (error: any) {
    return Number.NEGATIVE_INFINITY;
  }
};

import { GeoMath } from "../src";

describe("KWIKPIK: UTILITY TESTS", () => {
  const lat0 = 6.4698;
  const lon0 = 3.5852;
  const lat1 = 6.6018;
  const lon1 = 3.3515;

  it("should calculate distance", () => {
    const distance = GeoMath.calculateDistanceInKMUsingCoordinates(lat0, lon0, lat1, lon1);
    expect(distance).toBeCloseTo(30, 0);
  });
});

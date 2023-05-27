export interface IRoundWhiteButtonProps {
  onPress: () => void;
  image: HTMLImageElement;
  disabled?: boolean;
}
export interface IMapCoords {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

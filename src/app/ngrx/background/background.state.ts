export interface BackgroundState {
  backgrounds:
    | {
        id: string;
        fileName: string;
        fileLocation: string;
      }[]
    | null;
  isGettingBackgrounds: boolean;
  isGetBackgroundsSuccess: boolean;
  getBackgroundsError: string | null;
}

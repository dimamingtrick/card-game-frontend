export interface GameModalData {
  title?: String;
  message?: String;
  firstButtonText?: String;
  secondButtonText?: String;
  timeout?: number;
  onFirstButtonClick?: Function | null,
  onSecondButtonClick?: Function | null,
};

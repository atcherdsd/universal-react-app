export enum StatusCode {
  BadRequest = '400',
  Unauthorized = '401',
  Forbidden = '403',
  TooManyRequests = '429',
  InternalServerError = '500',
}
export enum ErrorMessage {
  BadRequest = 'Your request is not valid. Please fill in the search field and try again',
  Unauthorized = 'Your API key is incorrect. Use a valid key',
  Forbidden = 'You have reached your daily request limit, the next reset is at 00:00 UTC',
  TooManyRequests = 'You have made more requests per second than you are allowed',
  InternalServerError = 'We had a problem with our server. Try again later',
  AnotherError = 'Server error. Try again later',
}

export enum SortByType {
  date = 'publishedAt',
  relevance = 'relevance',
}
export enum FilterByCountry {
  Australia = 'au',
  Canada = 'ca',
  France = 'fr',
  Germany = 'de',
  HongKong = 'hk',
  India = 'in',
  Japan = 'jp',
  UnitedState = 'us',
}
export enum FilterByLanguage {
  English = 'en',
  French = 'fr',
  German = 'de',
  Hindi = 'hi',
  Japanese = 'ja',
}

export enum NewsCount {
  Five = '5',
  Ten = '10',
}

export enum PageNumber {
  One = '1',
  Two = '2',
}

interface TelegramWebApp {
  setBackgroundColor: (color: string) => void;
  setHeaderColor: (color: string) => void;
  setBottomBarColor: (color: string) => void;
}

interface Telegram {
  WebApp: TelegramWebApp;
}

interface Window {
  Telegram: Telegram;
}

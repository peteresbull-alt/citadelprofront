"use client";

// SVG Icons for each wallet
export const WalletIcons = {
  AktionariatWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#8B7355" />
      <path d="M12 6L15 12L12 18L9 12L12 6Z" fill="#D4AF37" />
      <circle cx="12" cy="12" r="3" fill="#FFF" />
    </svg>
  ),

  BinanceWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#F3BA2F" />
      <path d="M12 7L14.5 9.5L12 12L9.5 9.5L12 7Z" fill="#fff" />
      <path d="M7 12L9.5 14.5L7 17L4.5 14.5L7 12Z" fill="#fff" />
      <path d="M17 12L19.5 14.5L17 17L14.5 14.5L17 12Z" fill="#fff" />
      <path d="M12 12L14.5 14.5L12 17L9.5 14.5L12 12Z" fill="#fff" />
    </svg>
  ),

  BitcoinWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#F7931A" />
      <path
        d="M13.5 9.5C13.5 8.5 13 8 11.5 8H10V11H11.5C13 11 13.5 10.5 13.5 9.5Z"
        fill="#fff"
      />
      <path
        d="M13.8 13.5C13.8 12.3 13.2 12 11.5 12H10V15H11.5C13.2 15 13.8 14.7 13.8 13.5Z"
        fill="#fff"
      />
      <path
        d="M11 7V8M11 15V16M13 7V8M13 15V16"
        stroke="#fff"
        strokeWidth="1.5"
      />
    </svg>
  ),

  BitkeepWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#7524F9" />
      <path d="M9 9L12 6L15 9L12 12L9 9Z" fill="#fff" />
      <path d="M9 15L12 12L15 15L12 18L9 15Z" fill="#A78BFA" />
    </svg>
  ),

  Bitpay: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#1A3B8B" />
      <path
        d="M10 8H12C13.5 8 14.5 9 14.5 10.5C14.5 11.5 14 12.2 13 12.5C14.2 12.8 15 13.7 15 15C15 16.7 13.8 17.5 12 17.5H10V8Z"
        fill="#fff"
      />
    </svg>
  ),

  Blockchain: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#1D4E89" />
      <rect x="8" y="8" width="4" height="4" fill="#4A90E2" />
      <rect x="12" y="8" width="4" height="4" fill="#fff" />
      <rect x="8" y="12" width="4" height="4" fill="#fff" />
      <rect x="12" y="12" width="4" height="4" fill="#4A90E2" />
    </svg>
  ),

  CoinbaseWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#0052FF" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="#fff" />
    </svg>
  ),

  CoinbaseOne: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#0052FF" />
      <circle cx="12" cy="12" r="6" stroke="#fff" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" fill="#fff" />
    </svg>
  ),

  CryptoWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#1E3A8A" />
      <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="#3B82F6" />
      <circle cx="12" cy="12" r="2" fill="#fff" />
    </svg>
  ),

  ExodusWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#0B1E3D" />
      <path d="M12 6L17 10L12 14L7 10L12 6Z" fill="#4B71FC" />
      <path d="M12 14L17 18L12 22L7 18L12 14Z" fill="#6B8FFF" />
    </svg>
  ),

  Gemini: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#00DCFA" />
      <path d="M8 8L12 4L16 8L12 12L8 8Z" fill="#0E1E3D" />
      <path d="M8 16L12 12L16 16L12 20L8 16Z" fill="#0E1E3D" />
    </svg>
  ),

  Imtoken: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#11C4D1" />
      <path
        d="M12 7V17M9 10L12 7L15 10"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  InfinitoWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#E8F5E9" />
      <path
        d="M8 12C8 10 9 8 12 8C15 8 16 10 16 12C16 14 15 16 12 16C9 16 8 14 8 12Z"
        stroke="#4CAF50"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  ),

  InfinityWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#00A8E1" />
      <path
        d="M7 12C7 12 9 9 12 12C15 15 17 12 17 12C17 12 15 15 12 12C9 9 7 12 7 12Z"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  ),

  KeyringproWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#FF6B6B" />
      <circle cx="12" cy="10" r="3" stroke="#fff" strokeWidth="2" fill="none" />
      <path
        d="M12 13V17M10 17H14"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  Metamask: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 8L13 3L6 8L8 14L13 16L18 14L20 8Z" fill="#F6851B" />
      <path d="M13 3L11 8L13 16L15 8L13 3Z" fill="#E2761B" />
      <path d="M8 14L6 18L11 20L13 16L8 14Z" fill="#CD6116" />
      <path d="M18 14L13 16L15 20L20 18L18 14Z" fill="#CD6116" />
    </svg>
  ),

  OwnbitWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#2196F3" />
      <path
        d="M12 6C8 6 6 8 6 12C6 16 8 18 12 18C16 18 18 16 18 12C18 8 16 6 12 6Z"
        fill="#1976D2"
      />
      <circle cx="12" cy="12" r="4" fill="#fff" />
    </svg>
  ),

  PhantomWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#AB9FF2" />
      <circle cx="9" cy="11" r="1.5" fill="#000" />
      <circle cx="15" cy="11" r="1.5" fill="#000" />
      <path
        d="M7 15C7 15 9 17 12 17C15 17 17 15 17 15"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  PulseWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#9333EA" />
      <path
        d="M7 12H9L11 8L13 16L15 12H17"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),

  Rainbow: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="url(#rainbow-gradient)" />
      <defs>
        <linearGradient id="rainbow-gradient" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#FF0080" />
          <stop offset="33%" stopColor="#7928CA" />
          <stop offset="66%" stopColor="#0070F3" />
          <stop offset="100%" stopColor="#00DFD8" />
        </linearGradient>
      </defs>
    </svg>
  ),

  RobinhoodWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#00C805" />
      <path
        d="M8 14C8 14 10 10 12 10C14 10 16 14 16 14"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 10V6M10 8L12 6L14 8"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  SafepalWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#4A90E2" />
      <path
        d="M12 6L16 9V15L12 18L8 15V9L12 6Z"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M10 12L11.5 13.5L14 10.5"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  SparkpointWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#FF6B35" />
      <path d="M12 4L16 12L12 16L8 12L12 4Z" fill="#FFD23F" />
      <path d="M12 16L14 20H10L12 16Z" fill="#FFA500" />
    </svg>
  ),

  TrustWallet: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#3375BB" />
      <path
        d="M12 4L18 8V12C18 16 15 19 12 20C9 19 6 16 6 12V8L12 4Z"
        fill="#fff"
      />
      <path d="M12 4L18 8V12C18 16 15 19 12 20" fill="#3375BB" />
    </svg>
  ),

  Uniswap: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#FF007A" />
      <path
        d="M12 6C14 6 16 7 16 9C16 11 14 12 12 12C10 12 8 13 8 15C8 17 10 18 12 18"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="6" r="1.5" fill="#fff" />
      <circle cx="12" cy="18" r="1.5" fill="#fff" />
    </svg>
  ),

  WalletIo: () => (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#6366F1" />
      <rect
        x="7"
        y="9"
        width="10"
        height="6"
        rx="1"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="14" cy="12" r="1" fill="#fff" />
    </svg>
  ),
};

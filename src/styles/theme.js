//fnc
//필요하시면 이걸로 객체만드셔서 theme에 넣으시면 됩니다.
const createFontFormat = ({ font, size, weight, lineHeight = 1 }) => {
  return `
    font-family: ${font};
    font-size: ${size};
    font-weight: ${weight};
    line-height: ${lineHeight}px;
  `;
};

const deviceSize = {
  mobile: "screen and (min-width: 360px)",
  tablet: "screen and (min-width: 768px)",
  lowDesktop: "screen and (min-width: 1280px)",
  desktop: "screen and (min-width: 1440px)",
};

const colors = {
  primary: "#6EdCC8",
  secondary: "#19D4B2",
  black: "#000000",
  white: "#FFFFFF",
  gray: {
    100: "#212121",
    80: "#626273",
    60: "#9090A0",
    40: "#C6C6CD",
    20: "#E9E9EE",
    0: "#F5F5F9",
  },
};

const typo = {
  // 1440size 기준 1rem = 16px
  size: {
    sm: "0.75rem", //14px
    md: "1rem", //16px
    lg: "1.25rem", //20px
    xl: "1.5rem", //24px
    xxl: "2rem", //32px
  },
  weight: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
};

export const theme = {
  colors,
  deviceSize,
  typo,
};

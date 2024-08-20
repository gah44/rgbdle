export const calculateContrast = (arr) => {
  //from here: https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
  const rgbArr = [...arr];
  const adjArr = [];
  rgbArr.forEach((color) => {
    color = color / 255;
    if (color <= 0.03928) {
      color = color / 12.92;
    } else {
      color = ((color + 0.055) / 1.055) ^ 2.4;
    }
    adjArr.push(color);
  });
  let luminance = 0.2126 * adjArr[0] + 0.7152 * adjArr[1] + 0.0722 * adjArr[2];
  let contrastVal = "";
  if (luminance > 1.79) {
    contrastVal = "black";
  } else {
    contrastVal = "white";
  }
  return contrastVal;
};

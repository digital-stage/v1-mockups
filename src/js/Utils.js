export const stageWidth = (width, totalStages) => {
  if (totalStages === 1) {
    return { width: "100%", minWidth: "auto" };
  } else {
    switch (width) {
      case 12:
      case 11:
      case 10:
      case 9:
        return { width: "50%", minWidth: "50%" };
      case 8:
      case 7:
      case 6:
      case 5:
        return { width: "30%", minWidth: "30%" };
      case 4:
      case 3:
      case 2:
      case 1:
        return { width: "20%", minWidth: "20%" };
      default:
        return { width: "auto", minWidth: "auto" };
    }
  }
};

export const splitArray = (arrayToSplit) => {
  if (arrayToSplit.length > 6) {
    const first = arrayToSplit.slice(0, 6);
    const second = arrayToSplit.slice(6);
    return { first, second };
  } else {
    return arrayToSplit;
  }
};

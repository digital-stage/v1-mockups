export const stageWidth = (width, preview, breakpoints, totalStages) => {
  if (totalStages === 1) {
    return { width: "100%", minWidth: "100%" };
  }
  if (totalStages === 2) {
    if (breakpoints.mobile) return { width: "100%", minWidth: "100%" };
    else return { width: "50%", minWidth: "50%" };
  }
  if (totalStages === 3 && width<2) {
    if (breakpoints.mobile) return { width: "100%", minWidth: "100%" };
    else return { width: "35%", minWidth: "35%" };
  }
  if (preview === "portrait") {
    if (breakpoints.mobile) {
      switch (width) {
        case 6:
        case 5:
        case 4:
        case 3:
        case 2:
        case 1:
          return { width: "100%", minWidth: "100%" };
        default:
          return { width: "auto", minWidth: "auto" };
      }
    } else if (breakpoints.xs) {
      switch (width) {
        case 6:
        case 5:
          return { width: "60%", minWidth: "60%" };
        case 4:
        case 3:
          return { width: "55%", minWidth: "55%" };
        case 2:
        case 1:
          return { width: "50%", minWidth: "50%" };
        default:
          return { width: "auto", minWidth: "auto" };
      }
    } else if (breakpoints.sm) {
      switch (width) {
        case 6:
        case 5:
          return { width: "50%", minWidth: "50%" };
        case 4:
        case 3:
          return { width: "45%", minWidth: "45%" };
        case 2:
        case 1:
          return { width: "40%", minWidth: "40%" };
        default:
          return { width: "auto", minWidth: "auto" };
      }
    } else {
      switch (width) {
        case 6:
        case 5:
          return { width: "40%", minWidth: "40%" };
        case 4:
        case 3:
        case 2:
          return { width: "35%", minWidth: "35%" };
        case 1:
          return { width: "25%", minWidth: "25%" };
        default:
          return { width: "auto", minWidth: "auto" };
      }
    }
  } else if (preview === "landscape") {
    if (breakpoints.mobile) {
      switch (width) {
        case 6:
        case 5:
        case 4:
        case 3:
        case 2:
        case 1:
          return { width: "100%", minWidth: "100%" };
        default:
          return { width: "auto", minWidth: "auto" };
      }
    } else if (breakpoints.xs) {
      switch (width) {
        case 6:
        case 5:
          return { width: "70%", minWidth: "70%" };
        case 4:
        case 3:
          return { width: "45%", minWidth: "45%" };
        case 2:
        case 1:
          return { width: "50%", minWidth: "50%" };
        default:
          return { width: "auto", minWidth: "auto" };
      }
    } else if (breakpoints.sm) {
      switch (width) {
        case 6:
        case 5:
          return { width: "50%", minWidth: "50%" };
        case 4:
        case 3:
          return { width: "45%", minWidth: "45%" };
        case 2:
        case 1:
          return { width: "40%", minWidth: "40%" };
        default:
          return { width: "auto", minWidth: "auto" };
      }
    } else {
      switch (width) {
        case 6:
        case 5:
          return { width: "40%", minWidth: "40%" };
        case 4:
        case 3:
          return { width: "25%", minWidth: "25%" };
        case 2:
        case 1:
          return { width: "25%", minWidth: "25%" };
        default:
          return { width: "auto", minWidth: "auto" };
      }
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

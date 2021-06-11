export const splitValue = (value: string, showAll?: boolean) => {
  let val = value;
  let viewValue = '';

  for (let i = 0; i < value.length; i++) {
    viewValue += value[i];

    if (i >= 600) {
      viewValue += '...';
      break;
    }
  }

  if (showAll) {
    return {
      value,
      viewValue: value,
      hasView: value.length > viewValue.length,
    };
  }

  return { value: val, viewValue, hasView: value.length > viewValue.length };
};

export const getEnumKeyByEnumValue = (myEnum: any, enumValue: any) => {
  let keys = Object.keys(myEnum).filter((x) => x === enumValue);
  return keys.length > 0 ? myEnum[keys[0]] : null;
};

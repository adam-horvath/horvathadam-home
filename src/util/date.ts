export const formatDate = (date: string | Date | null, separator = '-') => {
  if (!date) {
    return '';
  }
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${d.getFullYear()}${separator}${d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)}${separator}${
    d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
  }`;
};

export const formatDateAndTime = (date: string | Date | null, separator = '-') => {
  if (!date) {
    return '';
  }
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${d.getFullYear()}${separator}${d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)}${separator}${
    d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
  }${' '}${d.getHours() > 9 ? d.getHours() : '0' + d.getHours()}:${
    d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()
  }`;
};

/* eslint-disable default-case */
/* eslint-disable react/destructuring-assignment */
export default function arrayToDate(year: number, arr: string) {
  const validDate = (i: number) => {
    return arr[i].length === 1 ? 0 + arr[i] : arr[i];
  };
  switch (arr.length) {
    case 2:
      return {
        start_date: `${year}-${validDate(0)}-${validDate(1)}`,
        end_date: undefined,
      };
    case 3:
      return {
        start_date: `${year}-${validDate(0)}-${validDate(1)}`,
        end_date: `${year}-${validDate(0)}-${validDate(2)}`,
      };
    case 4:
      return {
        start_date:
          arr[0].length === 4
            ? `${arr[0]}-${validDate(1)}-${validDate(2)}`
            : `${year}-${validDate(0)}-${validDate(1)}`,
        end_date:
          arr[0].length === 4
            ? `${arr[0]}-${validDate(1)}-${validDate(3)}`
            : `${year}-${validDate(2)}-${validDate(3)}`,
      };
    case 5:
      return {
        start_date:
          arr[0].length === 4
            ? `${arr[0]}-${validDate(1)}-${validDate(2)}`
            : `${year}-${validDate(0)}-${validDate(1)}`,
        end_date:
          arr[0].length === 4
            ? `${arr[0]}-${validDate(3)}-${validDate(4)}`
            : `${arr[2]}-${validDate(3)}-${validDate(4)}`,
      };
  }

  throw new Error(`[ArrayToDate] ${year} ${arr}`);
}

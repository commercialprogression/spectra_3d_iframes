// Initial, wide-open mask.
const initMask = [
  /[A-Za-z]/,
  /[A-Za-z]/,
  /[A-Za-z]/,
  /[A-Za-z0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  "-",
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/
];

// Mask array to match three leading SKU numbers.
const threeMask = [
  /[Ee]/,
  /[Ee]/,
  /[Kk]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  "-",
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/
];

// Mask array to match three leading SKU numbers.
const fourMask = [
  /[Dd]/,
  /[Dd]/,
  /[Ll]/,
  /[Pp]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  "-",
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/
];

export default function serialNumberMask({} = {}) {
  function numberMask(rawValue) {
    let mask = initMask;

    // Toggle the SKU masks depending on their pattern so far.
    if (rawValue && rawValue.length && rawValue.length >= 3) {
      const rawCheck = rawValue.substring(0, 3).toLowerCase();

      if (rawCheck === "ddl") {
        mask = fourMask;
      }
      else if (rawCheck === "eek") {
        mask = threeMask;
      }
    }

    return mask;
  }

  numberMask.instanceOf = "serialNumberMask";
  return numberMask;
}

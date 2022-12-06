const args = process.argv.slice(2);
if (args.length !== 2) {
  console.log("Unexpected number of arguments. Expected 2, got " + args.length);
  console.log("Usage: node test.js <expected.json> <actual.json>");
  process.exit(1);
}

const expected = require("./" + args[0]);
const actual = require("./" + args[1]);

const percentage = percentMatch(expected.assessments, actual.assessments);
console.log(`${(percentage * 100).toFixed(2)}% match`);

/**
 * Calculates the percentage match of two arrays of objects.
 *
 * @param {Array[Object]} expected
 * @param {Array[Object]} actual
 * @returns the percentage match of the two arrays
 */
function percentMatch(expected, actual) {
  let total = 0;
  let match = 0;

  const larger = expected.length > actual.length ? expected : actual;
  const smaller = expected.length > actual.length ? actual : expected;

  larger.forEach((expectedAssessment) => {
    total += 1;
    smaller.forEach((actualAssessment) => {
      if (
        strictMatch(expectedAssessment, actualAssessment, [
          "name",
          "weight",
          "date",
        ])
      ) {
        match += 1;
      }
    });
  });

  console.log("Matched " + match + " out of " + total + " assessments.");
  return match / total;
}

/**
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @param {Array[String]} properties
 * @returns true iff the two objects have the same values for the given keys
 */
function strictMatch(obj1, obj2, properties) {
  let match = true;

  properties.forEach((prop) => {
    if (!(obj1[prop] === obj2[prop])) {
      match = false;
    }
  });

  return match;
}

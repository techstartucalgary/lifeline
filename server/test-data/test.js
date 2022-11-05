const expected = require("./CPSC413/expected.json")[0]
const actual = require("./CPSC413/actual.json")[0]

/**
 * Returns the total weight of all assessments in the assessment given array.
 * 
 * @param {Array} assessments
 * @returns {Number} total weight of all assessments
 */
function totalWeight(assessments) {
    let total = 0;
    assessments.forEach(assessment => {
        total += parseFloat(assessment.weight);
    });

    return total;
}

function percentMatch(expected, actual) {
    let total = 0;
    let match = 0;

    expected.forEach(expectedAssessment => {
        total += 1;
        actual.forEach(actualAssessment => {
            if (strictMatch(expectedAssessment, actualAssessment, ["name", "weight", "grade"])) {
                match += 1;
            }
        });
    });

    console.log("Matched " + match + " out of " + total + " assessments.");
    return match / total;
}

function strictMatch(obj1, obj2, properties) {
    // console.log(obj1, obj2)
    properties.forEach(prop => {
        // console.log(obj1[prop] + " == " + obj2[prop] + " : " + (obj1[prop] == obj2[prop]));
        if (obj1[prop] !== obj2[prop]) {
            return false;
        }
    });
    return true;
}



console.log(percentMatch(expected.assessments, actual.assessments));
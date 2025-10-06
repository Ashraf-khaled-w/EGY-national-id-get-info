// Constant for century prefixes and validation
const ID_CONFIG = {
  LENGTH: 14,
  VALID_CENTURIES: {
    2: "19",
    3: "20",
  },
};

// Using Map for slightly better performance with large datasets
const governorates = new Map([
  ["01", "Cairo"],
  ["02", "Alexandria"],
  ["03", "Port Said"],
  ["04", "Suez"],
  ["11", "Damietta"],
  ["12", "Dakahlia"],
  ["13", "Sharqia"],
  ["14", "Qalyubia"],
  ["15", "Kafr El Sheikh"],
  ["16", "Gharbia"],
  ["17", "Monufia"],
  ["18", "Beheira"],
  ["19", "Ismailia"],
  ["21", "Giza"],
  ["22", "Beni Suef"],
  ["23", "Fayoum"],
  ["24", "Minya"],
  ["25", "Assiut"],
  ["26", "Sohag"],
  ["27", "Qena"],
  ["28", "Aswan"],
  ["29", "Luxor"],
  ["31", "Red Sea"],
  ["32", "New Valley"],
  ["33", "Matrouh"],
  ["34", "North Sinai"],
  ["35", "South Sinai"],
  ["88", "Outside Egypt"],
]);

function validateID(nationalID) {
  return nationalID.length === ID_CONFIG.LENGTH && /^\d+$/.test(nationalID);
}

function extractDateInfo(nationalID) {
  const century = ID_CONFIG.VALID_CENTURIES[nationalID[0]];
  if (!century) {
    throw new Error("Invalid birth century digit (should be 2 or 3)");
  }

  const year = `${century}${nationalID.slice(1, 3)}`;
  const month = nationalID.slice(3, 5);
  const day = nationalID.slice(5, 7);

  // Validate month and day
  if (parseInt(month) < 1 || parseInt(month) > 12) {
    throw new Error("Invalid birth month");
  }
  if (parseInt(day) < 1 || parseInt(day) > 31) {
    throw new Error("Invalid birth day");
  }

  return {
    century: `${century}00s`,
    year,
    month,
    day,
  };
}

function getGovernorateInfo(nationalID) {
  const governorateCode = nationalID.slice(7, 9);
  const governorateName = governorates.get(governorateCode);

  if (!governorateName) {
    throw new Error(`Unknown governorate code: ${governorateCode}`);
  }

  return {
    code: governorateCode,
    name: governorateName,
  };
}

function getBirthOrderAndGender(nationalID) {
  const birthOrder = nationalID.slice(9, 13);
  const lastDigit = parseInt(birthOrder[3]);
  return {
    order: birthOrder,
    gender: lastDigit % 2 === 0 ? "Female" : "Male",
  };
}

function nationalIDinfogetter(nationalID) {
  // Early validation
  if (!validateID(nationalID)) {
    throw new Error("Invalid national ID format. Must be exactly 14 digits.");
  }

  try {
    // Extract all information
    const dateInfo = extractDateInfo(nationalID);
    const govInfo = getGovernorateInfo(nationalID);
    const orderAndGender = getBirthOrderAndGender(nationalID);

    // Format output for UI
    console.log("=== Birth Date Information ===");
    console.log(`Person born in ${dateInfo.century}`);
    console.log(`Year of birth: ${dateInfo.year}`);
    console.log(`Month of birth: ${dateInfo.month}`);
    console.log(`Day of birth: ${dateInfo.day}`);

    console.log("\n=== Governorate Information ===");
    console.log(`Governorate: ${govInfo.name} (code: ${govInfo.code})`);

    console.log("\n=== Birth Order and Gender Information ===");
    console.log(`Birth Order Number: ${orderAndGender.order}`);
    console.log(`Gender: ${orderAndGender.gender}`);

    // Return structured data
    return {
      isValid: true,
      birthDate: dateInfo,
      governorate: govInfo,
      personalInfo: orderAndGender,
    };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

// Add event listeners if we're in a browser environment
if (typeof window !== "undefined") {
  // Input field validation
  const nationalIdInput = document.getElementById("nationalId");
  if (nationalIdInput) {
    nationalIdInput.addEventListener("input", function (e) {
      // Remove any non-digit characters
      this.value = this.value.replace(/\D/g, "");

      // Limit to 14 digits
      if (this.value.length > 14) {
        this.value = this.value.slice(0, 14);
      }
    });
  }
}

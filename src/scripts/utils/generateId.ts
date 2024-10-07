const ID_LENGTH = 8;

const generateId = (): string => {
  let result = "";

  for (let i = 0; i < ID_LENGTH; i++) {
    // Randomly generate an ASCII code between 65-90 (A-Z) or 97-122 (a-z)
    // 50/50 chance between upper or lower case char
    const charCode =
      Math.random() < 0.5
        ? Math.floor(Math.random() * 26) + 65 // A-Z
        : Math.floor(Math.random() * 26) + 97; // a-z

    result += String.fromCharCode(charCode);
  }

  return result;
};

export default generateId;

function errorsValidatingUser(errors) {
  const translated = {
    id: "ID",
    name: "Ten",
    age: "Tuoi",
    gender: "Gioi tinh",
    email: "Email",
  };
  return errors
    .array()
    .map(
      ({ param, msg }) =>
        `${translated[param] || param} ${
          msg === "Invalid value" ? userErrorMsg[2] : msg
        }`
    );
}

const userErrorMsg = [
  "la thong tin bat buoc.",
  "da duoc su dung.",
  "khong hop le.",
  "Khong ton tai nguoi dung voi id",
];

module.exports = { userErrorMsg, errorsValidatingUser };

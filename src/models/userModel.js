const User = {
  users: [
    {
      id: "1",
      age: 18,
      email: "nguyenvana@gmail.com",
      name: "Nguyen Van A",
      gender: 0,
    },
    {
      id: "2",
      age: 35,
      email: "lethib@gmail.com",
      name: "Le Thi B",
      gender: 1,
    },
    { id: "3", age: 24, email: "abc@gmail.com", name: "A B C", gender: 2 },
  ],
  findUserById(id) {
    return this.users.find((user) => user.id === id);
  },
  findUserByEmail(email) {
    return this.users.find((user) => user.email === email);
  },
  addUser(info) {
    const { name, email, age, gender } = info;
    this.users.push({
      id: (this.users.length + 1).toString(),
      name,
      email,
      age,
      gender,
    });
    return this.users;
  },
  removeUser(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error("Khong ton tai.");
    this.users.splice(index, 1);
  },
};

module.exports = User;

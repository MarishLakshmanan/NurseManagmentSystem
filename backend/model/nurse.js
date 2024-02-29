import logger from "../utils/logger.js";

class Nurse {
  #name;
  #license;
  #dob;
  #age;
  constructor(license, name, dob, age) {
    this.#name = name;
    this.#license = license;
    this.#dob = dob;
    this.#age = age;
  }

  print() {
    console.log(`
    Name : ${this.#name} \n 
    License no : ${this.#license} \n
    Date of Birth : ${this.#dob} \n
    Age : ${this.#age}`);
  }

  convert() {
    return {
      name: this.#name,
      license: this.#license,
      dob: this.#dob,
      age: this.#age,
    };
  }

  save(connection) {
    const query = `insert into nurse values  (?,?,?,?)`;
    const attr = [this.#license, this.#name, this.#dob, this.#age];
    return connection.executeQuery(query, attr);
  }

  update(connection) {
    const query = `update nurse set name = ?, dob = ?,age = ? where license = ?`;
    const attr = [this.#name, this.#dob, this.#age, this.#license];
    return connection.executeQuery(query, attr);
  }

  delete(connection, license) {
    const query = ` delete from nurse where license = ?;`;
    const attr = [license];
    return connection.executeQuery(query, attr);
  }
}

export default Nurse;

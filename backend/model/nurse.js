class Nurse {
  #id;
  #name;
  #license;
  #dob;
  #age;
  constructor(id, name, license, dob, age) {
    this.#id = id;
    this.#name = name;
    this.#license = license;
    this.#dob = dob;
    this.#age = age;
  }

  print() {
    console.log(`ID : ${this.#id} \n
    Name : ${this.#name} \n 
    License no : ${this.#license} \n
    Date of Birth : ${this.#dob} \n
    Age : ${this.#age}`);
  }

  convert() {
    return {
      id: this.#id,
      name: this.#name,
      license: this.#license,
      dob: this.#dob,
      age: this.#age,
    };
  }

  save(connection) {}

  update(connection) {}

  delete(connection) {}
}

export default Nurse;

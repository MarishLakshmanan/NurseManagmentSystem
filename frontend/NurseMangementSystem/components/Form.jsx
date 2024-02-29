import { Button } from "@mui/material";
import axios from "axios";

export default function Form({
  closeModal,
  success,
  error,
  formData,
  dataRows,
}) {
  async function handleSubmit(e) {
    e.preventDefault();
    const fData = new FormData(e.target);
    const data = {
      license: fData.get("license"),
      name: fData.get("name"),
      age: fData.get("age"),
      dob: fData.get("dob"),
    };
    try {
      if (formData) {
        data.license = formData.license;
        const res = await axios.patch("http://localhost:3000/nurse", data);
        if (res.data == "OK") {
          success("Succesfully updated the Database");
          data.dob = new Date(data.dob);
          dataRows((prev) => {
            let filtered = prev.filter(
              (nurse) => nurse.license != data.license
            );
            return [...filtered, data];
          });
        } else {
          error(res.data);
        }
      } else {
        const res = await axios.post("http://localhost:3000/nurse", data);
        if (res.data == "OK") {
          success("Successfully added to the Database");
          data.dob = new Date(data.dob);
          dataRows((prev) => {
            return [...prev, data];
          });
        } else {
          error(res.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="form-container" onSubmit={handleSubmit}>
      <form action="POST">
        <div>
          <label>License.no</label>
          <br />
          <input
            defaultValue={formData?.license}
            type="number"
            id="license"
            name="license"
            disabled={formData}
          />
        </div>
        <div>
          <label>Name</label>
          <br />
          <input
            defaultValue={formData?.name}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div>
          <label>DOB</label>
          <br />
          <input
            defaultValue={formData?.dob?.toISOString()?.split("T")[0]}
            type="date"
            id="dob"
            name="dob"
            required
          />
        </div>
        <div>
          <label>AGE</label>
          <br />
          <input
            defaultValue={formData?.age}
            type="number"
            id="age"
            name="age"
            required
          />
        </div>
        <div className="btn-container">
          <Button type="submit" color="secondary">
            Save
          </Button>
          <Button onClick={closeModal} color="secondary">
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}

import { useState, useLayoutEffect } from "react";
import Container from "../components/Container.jsx";
import Header from "../components/Header.jsx";
import Table from "../components/Table.jsx";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function HomePage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setLoading(true);
    async function getEntries() {
      try {
        const res = await axios.get("http://localhost:3000/nurse/");
        let nurses = [];
        res.data.map((data) => {
          nurses.push({ ...data, dob: new Date(data.dob) });
        });

        setRows(() => {
          return nurses;
        });
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getEntries();
  }, []);

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Container>
      <Header />
      <Table rows={rows} />
    </Container>
  );
}

// <Button
//   onClick={() => {
//     colorMode.toggleColorMode();
//   }}
// >
//   Hello world
// </Button>

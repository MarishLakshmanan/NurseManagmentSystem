import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useLayoutEffect, useState } from "react";
import Form from "./Form";
import axios from "axios";
import config from "../config.json";

export default function Table({ rows }) {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [goodSnack, setgoodSnack] = useState(false);
  const [badSnack, setbadSnack] = useState(false);
  const [message, setMessage] = useState("Not able to add the entry");
  const columns = [
    { field: "license", headerName: "License no.", flex: 1, minWidth: 50 },
    { field: "name", headerName: "Name", flex: 3, minWidth: 100 },
    { field: "dob", headerName: "DOB", flex: 1, type: "date", minWidth: 50 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div>
            <IconButton
              onClick={() => {
                setFormData(params.row);
                setModal(true);
              }}
              aria-label="Edit"
            >
              <EditIcon color="secondary" />
            </IconButton>
            <IconButton
              onClick={() => {
                deleteEntry(params.row.license);
              }}
              color="secondary"
              aria-label="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  const [dataRows, setDataRows] = useState(rows);
  useLayoutEffect(() => {}, []);

  async function deleteEntry(license) {
    const res = await axios.delete(`${config.proxy}${license}`);
    if (res.data == "OK") {
      setgoodSnack(true);
      setDataRows((prev) => {
        return prev.filter((nurse) => nurse.license != license);
      });
      setMessage("Successfully deleted");
    } else {
      setgoodSnack(true);
      setMessage(res.data);
    }
  }

  function getRowId(row) {
    return row.license;
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          onClick={() => {
            setFormData(false);
            setModal(true);
          }}
          color="secondary"
        >
          Add
        </Button>
        <GridToolbarExport />
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <div className="table-container">
        <DataGrid
          checkboxSelection={false}
          sx={{
            boxShadow: 2,
            border: 2,
            borderRadius: 0,
            borderColor: "#fff",
          }}
          slots={{ toolbar: CustomToolbar }}
          getRowId={getRowId}
          rows={dataRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          autoPageSize
          disableRowSelectionOnClick
        />
        {modal && (
          <Form
            formData={formData}
            closeModal={() => {
              setModal(false);
            }}
            dataRows={setDataRows}
            success={(msg) => {
              setgoodSnack(true);
              setMessage(msg);
            }}
            error={(msg) => {
              setbadSnack(true);
              setMessage(msg);
            }}
          />
        )}
      </div>
      <Snackbar
        open={goodSnack}
        autoHideDuration={3000}
        severity={"Success"}
        message={message}
        onClose={() => {
          setgoodSnack(false);
        }}
      />
      <Snackbar
        open={badSnack}
        autoHideDuration={3000}
        severity={"Error"}
        message={message}
        onClose={() => {
          setbadSnack(false);
        }}
      />
    </>
  );
}

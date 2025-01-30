import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import Delete from "../../../components/common/Delete";
import PropTypes from "prop-types";

function Helper() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      name: "Saran",
      phone_no: "9876543212",
      email: "company@gmail.com",
      nation: "India",
      nationality: "Indian",
      working_hrs: "11 am - 5 pm",
      created_by: "Admin",
      created_at: "2024-01-06",
      updated_by: "Admin",
      updated_at: "2024-01-06",
    },
    {
      id: 2,
      name: "Ramesh",
      phone_no: "9876543213",
      email: "company2@gmail.com",
      nation: "Singapore",
      nationality: "Singaporian",
      working_hrs: "10 am - 6 pm",
      created_by: "Admin",
      created_at: "2024-01-06",
      updated_by: "Admin",
      updated_at: "2024-01-06",
    },
  ];

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        enableSorting: true,
        enableHiding: false,
        size: 40,
        cell: ({ cell }) => (
          <span style={{ textAlign: "center" }}>{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "name",
        enableHiding: false,
        header: "Name",
        size: 40,
      },
      {
        accessorKey: "phone_no",
        header: "Phone Number",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "working_hrs",
        header: "Working Hours",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "nation",
        header: "Nation",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "nationality",
        header: "Nationality",
        enableHiding: false,
        size: 40,
      },
      { accessorKey: "created_by", header: "Created By" },
      {
        accessorKey: "created_at",
        header: "Created At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "updated_by",
        header: "Updated By",
        Cell: ({ cell }) => cell.getValue() || "",
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10) || "",
      },
    ],
    []
  );

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            color: "#535454 !important",
            backgroundColor: "#e6edf7 !important",
            fontWeight: "400 !important",
            fontSize: "13px !important",
            textAlign: "center !important",
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            "&.Mui-disabled .MuiSwitch-track": {
              backgroundColor: "#f5e1d0",
              opacity: 1,
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              color: "#eb862a",
            },
          },
          track: {
            backgroundColor: "#e0e0e0",
          },
          thumb: {
            color: "#eb862a",
          },
          switchBase: {
            "&.Mui-checked": {
              color: "#eb862a",
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#eb862a",
            },
          },
        },
      },
    },
  });

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container-fluid mb-4 px-0">
      <ol
        className="breadcrumb my-3"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Helper
        </li>
      </ol>
      <div className="card">
        <div className="d-flex justify-content-between align-items-center card_header mb-3 p-1">
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <div className="dot active"></div>
            </div>
            <span className="me-2 text-muted">
              This database shows the list of&nbsp;
              <span className="database_name">Helper</span>
            </span>
          </div>
        </div>
        {/* <div className="mb-3 d-flex justify-content-end">
          <Link to="/helper/add">
            <button
              type="button"
              className="btn btn-button btn-sm me-2"
              style={{ fontWeight: "600px !important" }}
            >
              &nbsp; Add &nbsp;&nbsp; <i className="bi bi-plus-lg"></i>
            </button>
          </Link>
        </div> */}
        <>
          <ThemeProvider theme={theme}>
            <MaterialReactTable
              columns={columns}
              data={data}
              enableColumnActions={false}
              enableColumnFilters={false}
              enableDensityToggle={false}
              enableFullScreenToggle={false}
              initialState={{
                columnVisibility: {
                  created_by: false,
                  created_at: false,
                  updated_by: false,
                  updated_at: false,
                },
              }}
              muiTableBodyRowProps={() => ({
                onClick: () => navigate(`/helper/view`),
                style: { cursor: "pointer" },
              })}
            />
          </ThemeProvider>
          <Menu
            id="action-menu"
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate(`/helper/edit`)}>Edit</MenuItem>
            <MenuItem>
              <Delete
                path={`vendor/helper/delete`}
                onOpen={handleMenuClose}
              />
            </MenuItem>
          </Menu>
        </>
      </div>
    </div>
  );
}

Helper.propTypes = {
  row: PropTypes.func.isRequired,
  cell: PropTypes.func.isRequired,
};

export default Helper;

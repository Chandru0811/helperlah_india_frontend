import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import Delete from "../../../components/common/Delete";
import api from "../../../config/URL";
import PropTypes from "prop-types";

function Service() {
  const [selectedId, setSelectedId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        accessorKey: "id",
        header: "",
        enableHiding: false,
        enableSorting: false,
        size: 20,
        Cell: ({ cell }) => (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setMenuAnchor(e.currentTarget);
              setSelectedId(cell.getValue());
            }}
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "status",
        enableHiding: false,
        header: "Status",
        Cell: ({ row }) => {
          const status = row.original.active;
          return status === 1 ? (
            <div className="d-flex align-items-center">
              <div className="active_dot"></div>
              <span>Active</span>
            </div>
          ) : status === 0 ? (
            <div className="d-flex align-items-center">
              <div className="inactive_dot"></div>
              <span>Inactive</span>
            </div>
          ) : null;
        },
      },
      {
        accessorKey: "service_group.name",
        enableHiding: false,
        header: "Service Group Name",
      },
      { accessorKey: "name", enableHiding: false, header: "Name" },
      {
        accessorKey: "order",
        enableHiding: false,
        header: "Order",
      },
      {
        accessorKey: "price",
        header: "Price",
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`admin/services`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    <div className="container-fluid px-0 mb-4 center">
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
          &nbsp;Service
        </li>
      </ol>
      <div className="card">
        <div className="mb-3 d-flex justify-content-between align-items-center card_header p-1">
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <div className="dot active"></div>
            </div>
            <span className="me-2 text-muted">
              This database shows the list of&nbsp;
              <span className="database_name">Service</span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-end">
          <Link to="/service/add">
            <button
              type="button"
              className="btn btn-button btn-sm me-2"
              style={{ fontWeight: "600px !important" }}
            >
              &nbsp; Add &nbsp;&nbsp; <i className="bi bi-plus-lg"></i>
            </button>
          </Link>
        </div>
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
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
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () => navigate(`/service/view/${row.original.id}`),
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
              <MenuItem onClick={() => navigate(`/service/edit/${selectedId}`)}>
                Edit
              </MenuItem>
              <MenuItem>
                <Delete
                  path={`admin/service/delete/${selectedId}`}
                  onDeleteSuccess={fetchData}
                  onOpen={handleMenuClose}
                />
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
}

Service.propTypes = {
  row: PropTypes.func.isRequired,
  cell: PropTypes.func.isRequired,
};

export default Service;

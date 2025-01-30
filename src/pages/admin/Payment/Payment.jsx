import { useMemo, useState, useEffect } from "react";
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
import api from "../../../config/URL";
import PropTypes from "prop-types";

function Payment() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
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
          const status = row.original.payment_status;
          return status === 1 ? (
            <div className="d-flex align-items-center">
              <div className="active_dot"></div>
              <span>Paid</span>
            </div>
          ) : status === 2 ? (
            <div className="d-flex align-items-center">
              <div className="onprocess_dot"></div>
              <span>Paid Patial</span>
            </div>
          ) : status === 3 ? (
            <div className="d-flex align-items-center">
              <div className="inactive_dot"></div>
              <span>Not Paid</span>
            </div>
          ) : null;
        },
      },
      { accessorKey: "order.order_number", enableHiding: false, header: "Order Number" },
      {
        accessorKey: "helper.name",
        enableHiding: false,
        header: "Helper Name",
      },
      {
        accessorKey: "company.company_name",
        enableHiding: false,
        header: "Company Name",
      },
      {
        accessorKey: "booking_type",
        enableHiding: false,
        header: "Booking Type",
      },
      {
        accessorKey: "amount_paid",
        enableHiding: false,
        header: "Amount Paid",
      },
      {
        accessorKey: "balance_amount",
        header: "Balance Amount",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "total_amount",
        header: "Total Amount",
        enableHiding: false,
        size: 40,
      },
      { accessorKey: "createdBy", header: "Created By" },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        Cell: ({ cell }) => cell.getValue() || "",
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10) || "",
      },
    ],
    []
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("admin/payments");
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
          &nbsp;Payment
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
              <span className="database_name">Payment</span>
            </span>
          </div>
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
                    createdBy: false,
                    createdAt: false,
                    updatedBy: false,
                    updatedAt: false,
                  },
                }}
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () => navigate(`/payment/view/${row.original.id}`),
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
              <MenuItem onClick={() => navigate(`/payment/edit/${selectedId}`)}>
                Edit
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
}

Payment.propTypes = {
  row: PropTypes.func.isRequired,
  cell: PropTypes.func.isRequired,
};

export default Payment;

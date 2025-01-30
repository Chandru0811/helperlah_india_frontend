import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material";
import api from "../../../config/URL";
import PropTypes from "prop-types";

function Orders() {
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
        accessorKey: "status",
        enableHiding: false,
        header: "Status",
        Cell: ({ row }) => {
          const status = row.original.status;
          return status === "Assigned" ? (
            <div className="d-flex align-items-center">
              <div className="active_dot"></div>
              <span>Assigned</span>
            </div>
          ) : status === "notAssigned" ? (
            <div className="d-flex align-items-center">
              <div className="inactive_dot"></div>
              <span>Not Assigned</span>
            </div>
          ) : null;
        },
      },
      {
        accessorKey: "order.order_number",
        enableHiding: false,
        header: "Order Number",
      },
      {
        accessorKey: "helper.name",
        enableHiding: false,
        header: "Helper Name",
      },
      {
        accessorKey: "assigned_at",
        header: "Assigned At",
        enableHiding: false,
        size: 40,
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorFn: (row) =>
          row.order.order_details.map((detail) => detail.start_date).join(", "),
        enableHiding: false,
        header: "Start Date",
      },
      {
        accessorFn: (row) =>
          row.order.order_details.map((detail) => detail.end_date).join(", "),
        enableHiding: false,
        header: "End Date",
      },
      {
        accessorKey: "order.total_amount",
        enableHiding: false,
        header: "Total Amount",
      },
      { accessorKey: "paid_amount", header: "Paid Amount" },
      { accessorKey: "balance_amount", header: "Balance Amount" },
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
      const response = await api.get(`vendor/orders/1`);
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

  return (
    <div className="container-fluid px-2 mb-4 center">
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
          &nbsp;Orders
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
              <span className="database_name">Orders</span>
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
                    paid_amount: false,
                    balance_amount: false,
                    createdBy: false,
                    createdAt: false,
                    updatedBy: false,
                    updatedAt: false,
                  },
                }}
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () => navigate(`/orders/view/${row.original.id}`),
                  style: { cursor: "pointer" },
                })}
              />
            </ThemeProvider>
          </>
        )}
      </div>
    </div>
  );
}

Orders.propTypes = {
  row: PropTypes.func.isRequired,
};

export default Orders;

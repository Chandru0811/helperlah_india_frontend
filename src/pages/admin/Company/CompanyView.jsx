import { createTheme, ThemeProvider } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../config/URL";

function CompanyView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`admin/company/${id}`);
      setData(response.data.data);
    } catch (error) {
      toast.error("Error Fetching Data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <section>
      <div className="container-fluid px-0">
        <ol
          className="breadcrumb my-2 px-2"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          <li>
            <Link to="/" className="custom-breadcrumb">
              Home
            </Link>
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li>
            <Link to="/company" className="custom-breadcrumb">
              &nbsp;Company
            </Link>
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            &nbsp;Company View
          </li>
        </ol>
        <div className="card" style={{ border: "1px solid #dbd9d0" }}>
          <div
            className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
            style={{ background: "#f5f7f9" }}
          >
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <div className="dot active"></div>
              </div>
              <span className="me-2 text-muted">View Company</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/company">
                <button type="button " className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
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
              <div className="container-fluid px-4">
                <div className="row pb-3">
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">
                          Company Registration Number
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.company_registration_no}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Owner Name</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.owner_name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Company Name</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.company_name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Address</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">: {data.address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Phone Number</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">: {data.mobile}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Email</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm text-break ">
                          : {data.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">No of Employees</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm text-break ">
                          : {data.no_of_employees}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Nation</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm text-break ">
                          : {data.citizenship}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Nationality</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm text-break ">
                          : {data.nationality}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Service Offering</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm text-break ">
                          : {data.services_offering}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Availability</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm text-break ">
                          :{" "}
                          {data.availablity
                            ? JSON.parse(data.availablity).join(", ")
                            : " --"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Working Hours</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm text-break ">
                          : {data.working_hrs}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Payment Mode</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm text-break ">
                          : {data.paymentModeName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 my-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium text-sm">Other Details</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm text-break ">
                          : {data.other_details}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 my-5">
                    <h4 className="fw-medium">Service</h4>
                  </div>
                  {Object.entries(JSON.parse(data.providing_services)).map(
                    ([service, experience], index) => (
                      <div key={index} className="row">
                        <div className="col-md-6 col-12 my-2">
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-medium text-sm">Service</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm text-break">
                                : {service}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 my-2">
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-medium text-sm">Experience</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm text-break">
                                : {experience}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  <>
                    <div className="my-5 py-5">
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
                            onClick: () => navigate(`/company/view`),
                            style: { cursor: "pointer" },
                          })}
                        />
                      </ThemeProvider>
                    </div>
                  </>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default CompanyView;

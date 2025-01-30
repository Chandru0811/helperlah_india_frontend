import ApexCharts from "react-apexcharts";

function VendorDashboard() {
  const datas = {
    status: "success",
    message: "All reports fetched successfully",
    productionSalesComparisonReport: {
      progressValues: [
        { centerId: 654, centerName: "House clean", value: 86 },
        { centerId: 639, centerName: "Laundry", value: 100 },
        { centerId: 7, centerName: "Home Service", value: 0 },
      ],
    },
    revenueOverTimeReport: {
      lineChartData: {
        categories: [
          "29 Dec",
          "30 Dec",
          "31 Dec",
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
        ],
        series: [
          { name: "Total Lead", data: [1, 2, 2, 0, 4, 2, 0] },
          { name: "Total Enrollment", data: [6, 7, 6, 1, 14, 4, 1] },
          { name: "Total Invoice", data: [6, 5, 7, 1, 12, 4, 1] },
        ],
      },
    },
    registeredUsersReport: { gaugeChartData: { value: 3 } },
    revenueGrowthByDay: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      series: [
        {
          name: "Registration Fee",
          data: [45830, 411940, 211520, 116105, 102765, 1700, 0],
        },
        { name: "Deposit Fee", data: [5160, 6548, 14173, 9445, 64813, 300, 0] },
        { name: "Course Fee", data: [1200, 0, 2332, 2200, 1200, 0, 0] },
      ],
    },
    revenueGrowthByMonth: [
      {
        title: "House Clean Count",
        current: 6,
        percentageChange: -79.31,
        comparison: "Compared to last month",
      },
      {
        title: "laundry Count",
        current: 20,
        percentageChange: -71.43,
        comparison: "Compared to last month",
      },
      {
        title: "Home Service Count",
        current: 5,
        percentageChange: -91.94,
        comparison: "Compared to last month",
      },
      {
        title: "Revenue",
        current: 1020,
        percentageChange: 100,
        comparison: "Compared to last month",
      },
    ],
  };

  const fontFamily =
    "'Outfit', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

  const lineChartOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 5,
      curve: "straight",
      dashArray: [0],
    },
    legend: {
      show: true,
      labels: {
        useSeriesColors: false,
        fontSize: "14px",
        fontFamily: fontFamily,
      },
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: datas?.revenueOverTimeReport?.lineChartData?.categories,
      labels: {
        style: {
          fontFamily: fontFamily,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: fontFamily,
        },
      },
    },
    tooltip: {
      style: {
        fontFamily: fontFamily,
      },
      y: [
        {
          title: {
            formatter: (val) => `${val}`,
          },
        },
        {
          title: {
            formatter: (val) => `${val}`,
          },
        },
        {
          title: {
            formatter: (val) => val,
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    colors: ["#ABBDD3", "#287F71", "#EB862A"],
  };

  const lineChartSeries = datas?.revenueOverTimeReport?.lineChartData?.series;

  const gaugeChartOptions = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    series: [datas?.registeredUsersReport?.gaugeChartData?.value],
    colors: ["#287F71"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: "#ABBDD3",
          startAngle: -135,
          endAngle: 135,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "30px",
            fontFamily: fontFamily,
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "butt",
    },
    labels: ["Progress"],
  };

  const gaugeChartSeries = [
    datas?.registeredUsersReport?.gaugeChartData?.value,
  ];

  const lineChartOptions1 = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 5,
      curve: "straight",
      dashArray: [0],
    },
    legend: {
      show: true,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: datas?.revenueGrowthByDay?.categories,
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: (val) => `${val}`,
          },
        },
        {
          title: {
            formatter: (val) => `${val}`,
          },
        },
        {
          title: {
            formatter: (val) => val,
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    colors: ["#ABBDD3", "#287F71", "#EB862A"],
  };

  const lineChartSeries1 = datas?.revenueGrowthByDay?.series;

  return (
    <section className="dashboard_chart">
      <div className="container mt-4">
        <div className="row mt-3">
          {datas.revenueGrowthByMonth?.map((data, index) => (
            <div key={index} className="col-md-3 mb-3">
              <div
                className="card shadow-sm border-0"
                style={{ borderRadius: "10px" }}
              >
                <div className="card-body">
                  <h6 className="card-title" style={{ color: "#6c757d" }}>
                    {data.title}
                  </h6>
                  <h5 className="card-text fw-bold text-dark my-2">
                    {data.title === "Revenue"
                      ? `$ ${data.current}`
                      : data.current}
                  </h5>
                  <span className="d-flex align-items-center justify-content-between">
                    {data.percentageChange >= 0 ? (
                      <span
                        className="text-success fw-bold me-2"
                        style={{
                          backgroundColor: "#e6f8eb",
                          padding: "2px 5px",
                          borderRadius: "5px",
                          fontSize: "13px",
                        }}
                      >
                        ↑{data.percentageChange}%
                      </span>
                    ) : (
                      <span
                        className="text-danger fw-bold me-2"
                        style={{
                          backgroundColor: "#fdeaea",
                          padding: "2px 5px",
                          borderRadius: "5px",
                          fontSize: "13px",
                        }}
                      >
                        ↓{Math.abs(data.percentageChange)}%
                      </span>
                    )}
                    <small
                      style={{ fontSize: "8px", color: "#6c757d" }}
                    >
                      {data.comparison}
                    </small>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-md-8 mb-4">
            <div
              className="card shadow-sm p-3 h-100 shadow-sm border-0"
              style={{ borderRadius: "10px" }}
            >
              <div className="d-flex justify-content-between">
                <h6 className="card-title">Service Trend</h6>
                <i className="fas fa-ellipsis-h"></i> {/* Triple dot icon */}
              </div>
              {lineChartSeries && lineChartSeries.length > 0 && (
                <ApexCharts
                  options={lineChartOptions}
                  series={lineChartSeries}
                  type="line"
                  height={200}
                />
              )}
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className="card shadow-sm p-3 h-100 shadow-sm border-0"
              style={{
                borderRadius: "10px",
                maxHeight: "270px",
                overflowY: "auto",
              }}
            >
              <div className="d-flex justify-content-between">
                <h6 className="card-title">Capacity Status</h6>
              </div>
              {datas?.productionSalesComparisonReport?.progressValues &&
                datas?.productionSalesComparisonReport?.progressValues.map(
                  (center, index) => (
                    <div key={index}>
                      <div className="d-flex justify-content-between">
                        <p
                          className="text-secondary m-1"
                          style={{ fontSize: "14px" }}
                        >
                          {center.centerName}
                        </p>
                        <span style={{ fontSize: "13px" }} className="fw-bold">
                          {center.value}%
                        </span>
                      </div>
                      <div className="progress mb-3" style={{ height: "7px" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${center.value}%`,
                            backgroundColor:
                              center.value === 0 ? "#f8d7da" : "#287F71",
                          }}
                          aria-valuenow={center.value}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VendorDashboard;

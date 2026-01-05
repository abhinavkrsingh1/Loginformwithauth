import { useEffect, useState } from "react";

// Date Widget Component
const DateWidget = ({ widget }) => {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await fetch("http://localhost:8000/india-time");
        const data = await response.json();
        if (data.success) {
          setDate(data.date);
        }
      } catch (err) {
        console.error("Error fetching date:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDate();
    const interval = setInterval(fetchDate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="widget" style={{ marginBottom: "12px" }}>
      <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>{widget.label}</h4>
      <p style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>
        {loading ? "Loading..." : date}
      </p>
    </div>
  );
};

// Time Widget Component
const TimeWidget = ({ widget }) => {
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch("http://localhost:8000/india-time");
        const data = await response.json();
        if (data.success) {
          setTime(data.time);
        }
      } catch (err) {
        console.error("Error fetching time:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTime();
    const interval = setInterval(fetchTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="widget" style={{ marginBottom: "12px" }}>
      <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>{widget.label}</h4>
      <p style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>
        {loading ? "Loading..." : time}
      </p>
    </div>
  );
};

// Widget Renderer - renders widget based on type
const WidgetRenderer = ({ widget }) => {
  switch (widget.type) {
    case "date":
      return <DateWidget widget={widget} />;
    case "time":
      return <TimeWidget widget={widget} />;
    default:
      return null;
  }
};

const Dashboard = () => {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const response = await fetch("http://localhost:8000/widgets");
        const data = await response.json();
        if (data.success) {
          setWidgets(data.widgets);
        }
      } catch (err) {
        setError("Failed to fetch widgets");
        console.error("Error fetching widgets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWidgets();
  }, []);

  if (loading) {
    return (
      <div className="widget">
        <p>Loading widgets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="widget">
        <p className="error">{error}</p>
      </div>
    );
  }

  // Sort widgets by position (row first, then column)
  const sortedWidgets = [...widgets]
    .filter((w) => w.enabled)
    .sort((a, b) => {
      if (a.position.row !== b.position.row) {
        return a.position.row - b.position.row;
      }
      return a.position.col - b.position.col;
    });

  // Group widgets by row
  const widgetsByRow = sortedWidgets.reduce((acc, widget) => {
    const row = widget.position.row;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(widget);
    return acc;
  }, {});

  return (
    <div className="dashboard">
      {Object.entries(widgetsByRow).map(([row, rowWidgets]) => (
        <div
          key={row}
          className="widget-row"
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          {rowWidgets.map((widget) => (
            <div
              key={widget.id}
              style={{
                flex:
                  widget.size.width === 2 ? "1 1 100%" : "1 1 calc(50% - 8px)",
                minWidth: "200px",
              }}
            >
              <WidgetRenderer widget={widget} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

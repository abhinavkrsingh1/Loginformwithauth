// Widget configuration with positions
const widgetConfig = [
  {
    id: "date-widget",
    type: "date",
    label: "📅 Date",
    position: { row: 1, col: 1 },
    size: { width: 1, height: 1 },
    enabled: true,
  },
  {
    id: "time-widget",
    type: "time",
    label: "🕐 Time",
    position: { row: 1, col: 2 },
    size: { width: 1, height: 1 },
    enabled: true,
  },
];

// Get widget configuration with positions
const getWidgets = (req, res) => {
  try {
    res.status(201).json({
      success: true,
      widgets: widgetConfig,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching widget configuration",
    });
  }
};

// Get current date and time in India Standard Time (IST)
const getIndiaTime = (req, res) => {
  try {
    const indiaTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const [datePart, timePart] = indiaTime.split(", ");
    const [day, month, year] = datePart.split("/");
    const formattedDate = `${day}/${month}/${year}`;

    res.status(200).json({
      success: true,
      date: formattedDate,
      time: timePart,
      fullDateTime: indiaTime,
      timezone: "IST (Asia/Kolkata)",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching India time",
    });
  }
};

// Simple greeting route
const greeting = (req, res) => {
  res.send("Hello Ankit chole wala 😄");
};

module.exports = { getIndiaTime, greeting, getWidgets };

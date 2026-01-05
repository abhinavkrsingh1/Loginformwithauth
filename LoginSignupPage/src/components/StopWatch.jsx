import React, { useEffect, useState, useRef } from "react";

function StopWatch() {
  const [data, setData] = useState({
    minutes: 0,
    seconds: 0,
    millisecond: 0,
  });
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  const startStopWatch = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setData((prevData) => {
        let { minutes, seconds, millisecond } = prevData;
        millisecond += 10;
        if (millisecond >= 1000) {
          millisecond = 0;
          seconds += 1;
        }
        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
        }
        return { minutes, seconds, millisecond };
      });
    }, 10);
  };

  const stopStopWatch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const resumeStopWatch = () => {
    setIsRunning(true);
    startStopWatch();
  };

  const resetStopWatch = () => {
    stopStopWatch();
    setData({ minutes: 0, seconds: 0, millisecond: 0 });
  };

  useEffect(() => {
    startStopWatch();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (value, digits = 2) => {
    return String(value).padStart(digits, "0");
  };

//   const timeData = [
//     { label: "⏱️ Minutes", value: formatTime(data.minutes) },
//     { label: "⏲️ Seconds", value: formatTime(data.seconds) },
//     { label: "⚡ Milliseconds", value: formatTime(data.millisecond, 3) },
//   ];

  return (
    <div>
      {/* {timeData.map((item, index) => (
        <div key={index} className="widget" style={{ marginBottom: "12px" }}>
          <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
            {item.label}
          </h4>
          <p style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>
            {item.value}
          </p>
        </div>
      ))} */}
      <div className="widget">
        <h4 style={{ margin: "0 0 0 0", fontSize: "14px" }}>🕐 Total Time</h4>
        <p
          style={{
            margin: "0",
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
        >
          {formatTime(data.minutes)}:{formatTime(data.seconds)}:
          {formatTime(data.millisecond, 3)}
        </p>
        <div style={{ marginTop: "16px", display: "flex", gap: "10px", justifyContent: "center" }}>
          {isRunning ? (
            <button
              onClick={stopStopWatch}
              style={{
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Stop
            </button>
          ) : (
            <button
              onClick={resumeStopWatch}
              style={{
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Resume
            </button>
          )}
          <button
            onClick={resetStopWatch}
            style={{
              padding: "8px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default StopWatch;

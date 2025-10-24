"use client";
import { css } from "../../styled-system/css";
import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon, Clock, Zap } from "lucide-react";

type RequestData = {
  id: number;
  method: string;
  status_code: number;
  path: string;
  response_time: number;
  created_at: string;
};

export default function Data() {
  const [view, setView] = useState<"list" | "table">("list");
  const [indexes, setIndexes] = useState([0, 0, 0]);
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);

  const rightButtons = [
    ["Last 24h", "Last month", "Last year"],
    ["All", "POST", "GET", "DELETE", "PUT"],
    ["All", "500", "200", "404"],
  ];

  useEffect(() => {
    fetch("http://localhost:8080/api/return/requests")
      .then(res => res.json())
      .then(result => {
        if (result.success && Array.isArray(result.data)) {
          setRequests(result.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleClick = (btnIdx: number) => {
    setIndexes(prev =>
      prev.map((val, idx) => (idx === btnIdx ? (val + 1) % rightButtons[idx].length : val))
    );
  };

  const filteredRequests = requests.filter(req => {
    const now = new Date();
    const createdAt = new Date(req.created_at);

    switch (indexes[0]) {
      case 0: 
        if ((now.getTime() - createdAt.getTime()) > 24 * 60 * 60 * 1000) return false;
        break;
      case 1:
        if ((now.getTime() - createdAt.getTime()) > 30 * 24 * 60 * 60 * 1000) return false;
        break;
      case 2: 
        if ((now.getTime() - createdAt.getTime()) > 365 * 24 * 60 * 60 * 1000) return false;
        break;
    }

    const methodFilter = rightButtons[1][indexes[1]];
    if (methodFilter !== "All" && req.method !== methodFilter) return false;

    const statusFilter = rightButtons[2][indexes[2]];
    if (statusFilter !== "All" && req.status_code.toString() !== statusFilter) return false;

    return true;
  });

  const getPathAfterFirstSlash = (path: string) => {
    const index = path.indexOf("/", 8);
    if (index === -1) return path;
    return path.slice(index).replace(/\/+/g, "/");
  };

  const formatHrDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("hr-HR", { 
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    }).format(date);
  };

  const methodColor = (method: string) => {
    switch (method) {
      case "GET": return "#3b83f6";
      case "POST": return "#facc15";
      case "PUT": return "#8b5cf6";
      case "DELETE": return "#f91616";
      default: return "#6b7280";
    }
  };

  const statusColor = (status: number) => {
    switch (status) {
      case 200:
      case 201: return "#22c55e";
      case 404: return "#f91616";
      case 500: return "#ef4444";
      default: return "#6b7280";
    }
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const renderBadge = (text: string, color: string) => (
    <span
      style={{
        fontWeight: "bold",
        padding: view === "list" ? "0.25rem 0.5rem" : "0.15rem 0.35rem",
        borderRadius: "9999px",
        backgroundColor: hexToRgba(color, 0.2),
        color: color,
        textAlign: "center",
      }}
    >
      {text}
    </span>
  );

  return (
    <div className={css({ display: "flex", flexDirection: "column", gap: "4", width: "80%", marginTop: "28" })}>
      {/* GLASSY BAR */}
      <div className={css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingY: "1.5",
        paddingX: "4",
        borderRadius: "3xl",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
      })}>
        <span className={css({ fontSize: "md", fontWeight: "bold", color: "white" })}>Requests</span>

        <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
          <div className={css({ display: "flex", borderRadius: "3xl", overflow: "hidden", border: "1px solid rgba(255,255,255,0.25)" })}>
            {["list", "table"].map(type => (
              <button
                key={type}
                onClick={() => setView(type as "list" | "table")}
                className={css({
                  paddingY: "1",
                  paddingX: "3",
                  fontSize: "sm",
                  fontWeight: "bold",
                  color: "white",
                  cursor: "pointer",
                  backgroundColor: view === type ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.15)",
                  transition: "all 0.2s",
                  _active: { transform: "scale(0.95)" }
                })}
              >
                {type === "list" ? "List" : "Table"}
              </button>
            ))}
          </div>

          {rightButtons.map((btnOpts, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className={css({
                position: "relative",
                fontSize: "sm",
                fontWeight: "bold",
                color: "white",
                width: "120px",
                borderRadius: "3xl",
                backgroundColor: "#333741",
                border: "1px solid #ffffff33",
                transition: "all 0.2s",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingY: "1.5",
                paddingLeft: "10px",
                paddingRight: "25px",
                _active: { transform: "scale(0.95)" },
                _hover: { backgroundColor: "#444859" }
              })}
            >
              <span className={css({ flexGrow: 1, textAlign: "center" })}>
                {btnOpts[indexes[idx]]}
              </span>
              <div className={css({ position: "absolute", right: "8px", display: "flex", flexDirection: "column", gap: "1px" })}>
                <ChevronUpIcon size={10} />
                <ChevronDownIcon size={10} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div id="holder" className={css({
        backgroundColor: "rgba(46, 47, 55, 0.6)",
        backdropFilter: "blur(10px)",
        borderRadius: "3xl",
        padding: "4",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "3",
        overflowY: "auto",
        border: "1px solid rgba(255,255,255,0.25)",
        marginBottom: "40px",
      })}>
        {loading ? (
          <div className={css({ color: "white", textAlign: "center", fontSize: "sm", margin: "auto" })}>Loading...</div>
        ) : filteredRequests.length === 0 ? (
          <div className={css({ color: "white", textAlign: "center", fontSize: "sm", margin: "auto" })}>No data</div>
        ) : view === "list" ? (
          filteredRequests.map(req => (
            <div key={req.id} className={css({
              display: "flex",
              flexDirection: "column",
              gap: "1",
              backgroundColor: "rgba(46, 47, 55, 0.6)",
              backdropFilter: "blur(6px)",
              borderRadius: "2xl",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "3",
              color: "white",
              fontSize: "sm",
              _hover: { backgroundColor: "rgba(70, 71, 80, 0.6)" },
            })}>
              <div className={css({ display: "flex", gap: "2", alignItems: "center" })}>
                {renderBadge(req.method, methodColor(req.method))}
                {renderBadge(req.status_code.toString(), statusColor(req.status_code))}
                <span className={css({ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" })}>
                  {getPathAfterFirstSlash(req.path)}
                </span>
              </div>
              <div className={css({ display: "flex", gap: "4", color: "#cccccc", alignItems: "center", fontSize: "sm" })}>
                <span className={css({ display: "flex", gap: "1", alignItems: "center" })}><Zap size={14} /> {req.response_time}ms</span>
                <span className={css({ display: "flex", gap: "1", alignItems: "center" })}><Clock size={14} /> {formatHrDateTime(req.created_at)}</span>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className={css({
              display: "grid",
              gridTemplateColumns: "1fr 1fr 2fr 1fr 1fr",
              fontWeight: "bold",
              fontSize: "sm",
              color: "white",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              paddingBottom: "2",
              alignItems: "center",
            })}>
              <span>Method</span>
              <span>Response</span>
              <span>Name</span>
              <span>LoadTime</span>
              <span>Time</span>
            </div>

            {filteredRequests.map(req => (
              <div key={req.id} className={css({
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr 1fr 1fr",
                gap: "8px",
                alignItems: "center",
                backgroundColor: "rgba(46, 47, 55, 0.6)",
                backdropFilter: "blur(6px)",
                borderRadius: "2xl",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "3",
                color: "white",
                fontSize: "sm",
                _hover: { backgroundColor: "rgba(70, 71, 80, 0.6)" },
              })}>
                {renderBadge(req.method, methodColor(req.method))}
                {renderBadge(req.status_code.toString(), statusColor(req.status_code))}
                <span className={css({ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" })}>
                  {getPathAfterFirstSlash(req.path)}
                </span>
                <span>{req.response_time}ms</span>
                <span>{formatHrDateTime(req.created_at)}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

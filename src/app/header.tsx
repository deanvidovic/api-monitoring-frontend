"use client";
import { css } from "../../styled-system/css";

export default function Header() {
    return (
        <header
            className={css({
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(149, 150, 156, 0.2)",
                borderRadius: "3xl",
                padding: "2",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
            })}
        >
            {/* Left section (icon + title) */}
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "3",
                    fontWeight: "lighter",
                    letterSpacing: "wide",
                    textTransform: "uppercase",
                })}
            >
                <img
                    src="./logo.png"
                    className={css({
                        height: "40px",
                    })}
                />
                <h4
                    className={css({
                        fontSize: "large ",
                        fontFamily: "var(--font-dm-sans)",
                    })}
                >
                    RUNTIME
                </h4>
            </div>

            {/* Right section (button link) */}
            <a 
                onClick={(e) => {
                    e.preventDefault(); 
                    const element = document.getElementById("holder");
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }}
                className={css({
                    backgroundColor: "#e1207a",
                    paddingY: "2",
                    paddingX: "5",
                    borderRadius: "3xl",
                    fontSize: "sm",
                    fontWeight: "semibold",
                    transition: "all 0.3s ease",
                    _hover: {
                        cursor: "pointer",
                        backgroundColor: "#e1207a37",
                        transform: "scale(1.02)",
                    },
                })}

                
            >
                Start Monitoring Now
            </a>
        </header>
    );
}

"use client";
import { css } from "../../styled-system/css";

export default function Body() {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "4",
                marginTop: "40",
            })}
        >
            <span
                className={css({
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "2",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "3xl",
                    paddingY: "1",
                    paddingX: "3",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                })}>
                <span
                    className={css({
                        backgroundColor: "#e1207a",
                        borderRadius: "3xl",
                        paddingY: "1",
                        paddingX: "2",
                        fontSize: "xs",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "white",
                    })}
                >
                    NEW
                </span>

                <span
                    className={css({
                        fontWeight: "thin",
                        fontSize: "sm",
                        color: "white",
                        letterSpacing: "widest",
                        paddingY: "1",
                    })}
                >
                    Live Performance Boosts
                </span>
            </span>

            <h1
                className={css({
                    fontSize: "5xl",
                    fontWeight: "extrabold",
                    fontFamily: "var(--font-michroma)",
                })}
            >
                Smarter API Performance. <br /> Real-Time Insights
            </h1>

            <p
                className={css({
                    fontSize: "lg",
                    fontWeight: "normal",
                    maxWidth: "2xl",
                    color: "rgba(255,255,255,0.8)",
                })}
            >
                RunTime AI monitors, analyzes and optimizes your APIs so you can
                focus on building — not debugging.
            </p>

            <a
                onClick={(e) => {
                    e.preventDefault(); 
                    const element = document.getElementById("holder");
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }}
                className={css({
                    backgroundColor: "rgba(255,255,255,0.15)",
                    paddingY: "3",
                    paddingX: "8",
                    borderRadius: "3xl",
                    fontSize: "lg",
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                    _hover: {
                        cursor: "pointer",
                        backgroundColor: "rgba(255,255,255,0.3)",
                        transform: "scale(1.05)",
                    },
                })}
            >
                Start Monitoring Now
            </a>
        </div>
    );
}

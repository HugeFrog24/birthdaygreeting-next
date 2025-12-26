import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const to = searchParams.get("to");

    if (!to) {
      return new ImageResponse(
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to bottom right, #FF8C42, #FFD700)",
            fontSize: 60,
            letterSpacing: -2,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          <div style={{ marginTop: 40 }}>Birthday Greetings</div>
        </div>,
        {
          width: 1200,
          height: 630,
        },
      );
    }

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #FF8C42, #FFD700)",
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        <div style={{ marginTop: 40 }}>
          Birthday Greetings for {decodeURIComponent(to)}
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 20,
            color: "#333",
          }}
        >
          🎉 Celebrate with us! 🎂
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

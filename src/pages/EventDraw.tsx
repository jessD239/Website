import { useState, type FormEvent } from "react";
import { EVENT_WEBHOOK_ENDPOINT } from "../functions/Utility";
import "./EventDraw.css";
import TextField from "../components/ui/TextField";

type Winner = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
};

type DrawStatus = "idle" | "loading" | "success" | "error";

type DrawResponse = {
  success?: boolean;
  message?: string;
  winners?: unknown[];
  result?: unknown[];
};

function parseWinners(payload: unknown): Winner[] {
  const rawWinners = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { winners?: unknown[] } | null)?.winners)
      ? (payload as { winners: unknown[] }).winners
      : Array.isArray((payload as { result?: unknown[] } | null)?.result)
        ? (payload as { result: unknown[] }).result
        : [];

  return rawWinners
    .map((item: unknown, index: number) => {
      const row = Array.isArray((item as { row?: unknown[] } | null)?.row)
        ? ((item as { row: unknown[] }).row as unknown[])
        : Array.isArray(item)
          ? (item as unknown[])
          : [];

      return {
        id: (row[0] ?? (item as { id?: string | number } | null)?.id ?? index + 1) as string | number,
        firstName: (row[1] ?? (item as { firstName?: string } | null)?.firstName ?? "") as string,
        lastName: (row[2] ?? (item as { lastName?: string } | null)?.lastName ?? "") as string,
        email: (row[3] ?? (item as { email?: string } | null)?.email ?? "") as string,
      };
    })
    .filter((winner) => winner.firstName || winner.lastName || winner.email || winner.id !== "");
}

export default function EventDraw() {
  const [count, setCount] = useState("5");
  const [status, setStatus] = useState<DrawStatus>("idle");
  const [message, setMessage] = useState("");
  const [winners, setWinners] = useState<Winner[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedCount = Number.parseInt(count, 10);
    if (!Number.isInteger(parsedCount) || parsedCount < 1) {
      setStatus("error");
      setMessage("Please enter a whole number greater than zero.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(EVENT_WEBHOOK_ENDPOINT, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: "draw", count: parsedCount }),
      });

      const responseText = await response.text();
      let payload: DrawResponse = {};

      if (responseText) {
        try {
          payload = JSON.parse(responseText) as DrawResponse;
        } catch {
          throw new Error("The draw endpoint returned a non-JSON response.");
        }
      }

      if (!response.ok) {
        throw new Error(payload.message || `The draw request failed with status ${response.status}.`);
      }

      if (payload.success === false) {
        throw new Error(payload.message || "The draw endpoint returned an unsuccessful result.");
      }

      const parsedWinners = parseWinners(payload);

      if (!parsedWinners.length) {
        throw new Error("No winners were returned by the endpoint.");
      }

      setWinners(parsedWinners);
      setStatus("success");
      setMessage(`Draw complete. ${parsedWinners.length} winner${parsedWinners.length === 1 ? "" : "s"} returned.`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong while drawing winners.");
      setWinners([]);
    }
  };

  return (
    <div className="draw-page">
      <div className="draw-page__card">
        <p className="draw-page__eyebrow">Admin tools</p>
        <h1 className="draw-page__title">Prize Draw</h1>
        <p className="draw-page__subtitle">
          Trigger the same event endpoint and display the winners as soon as the prize giving starts.
        </p>

        <form className="draw-page__form" onSubmit={handleSubmit}>
          <label className="draw-page__label" htmlFor="draw-count">
            Number of winners
          </label>
          <TextField
            id="draw-count"
            label="Number of draws"
            value={count}
            onChange={(event) => setCount(event.target.value)}
          />

          <button className="draw-page__button" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Drawing…" : "Draw Winners"}
          </button>
        </form>

        {message ? <div className={`draw-page__status draw-page__status--${status}`}>{message}</div> : null}

        {winners.length ? (
          <div className="draw-page__results">
            <h2 className="draw-page__results-title">Winners</h2>
            <ul className="draw-page__list">
              {winners.map((winner, index) => (
                <li key={`${winner.email}-${index}`} className="draw-page__item">
                  <span className="draw-page__item-name">
                    {winner.firstName} {winner.lastName}
                  </span>
                  <span className="draw-page__item-meta">{winner.email}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

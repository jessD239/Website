import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TextField from "../components/ui/TextField";
import PWILogo from "../components/ui/PWILogo";
import type { PIWError } from "../components/ui/types";
import "./Subscribe.css";

// ── Set this once the "remove from list" App Script is deployed ────────────
const UNSUBSCRIBE_ENDPOINT = "https://script.google.com/macros/s/AKfycbyesi0Vxa4FQZJfuJhTbQNXFQXInyPnsVevQFUnsu01eWWAcnn4Y0zyJompaV8EWquxnA/exec";

type Status = "idle" | "submitting" | "success" | "error";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<PIWError | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError({ field: "email", message: "Email is required" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError({ field: "email", message: "Please enter a valid email address" });
      return;
    }
    setError(null);

    setStatus("submitting");
    try {
      if (UNSUBSCRIBE_ENDPOINT) {
        await fetch(UNSUBSCRIBE_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ action: "unsubscribe", email }),
        });
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="event-page event-page--qr">
      <a href="/" className="event-logo" aria-label="Back to People With Ideas">
        <PWILogo scrolled />
      </a>

      {status === "success" ? (
        <div className="qr-success">
          <svg className="qr-success__tick" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              className="tick-path"
              d="M14 27C14 27 19.5 32.5 21 34C22.5 35.5 24 34 24 34C26 31 34.5 19 38 16"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="transparent"
            />
          </svg>
          <h1 className="qr-success__title">You're unsubscribed.</h1>
          <div className="qr-success__line" aria-hidden="true" />
          <p className="qr-success__sub">You won't receive any more emails from us.<br/> Sorry to see you go.</p>
        </div>
      ) : (
        <div className="qr-wrap">
          <div className="qr-header">
            <p className="qr-header__eyebrow">Newsletter</p>
            <h1 className="qr-header__title">Unsubscribe</h1>
            <p className="qr-header__sub">
              Enter the email address you signed up with and we'll remove you from our mailing list.
            </p>
          </div>

          <form className="event-form" onSubmit={handleSubmit} noValidate>
            <TextField
              name="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              required
              fullWidth
              disabled={status === "submitting"}
              error={error}
            />

            {status === "error" && <p className="event-form__submit-error">Something went wrong — please try again.</p>}

            <div className="event-form__actions">
              <button type="submit" className="event-btn event-btn--primary" disabled={status === "submitting"}>
                {status === "submitting" ? <span className="event-btn__spinner" aria-hidden="true" /> : null}
                {status === "submitting" ? "Submitting…" : "Unsubscribe"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

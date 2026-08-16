import { useState } from "react";
import TextField from "../components/ui/TextField";
import PWILogo from "../components/ui/PWILogo";
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";
import Socials from "../components/ui/Socials";
import type { PIWError } from "../components/ui/types";
import "./Subscribe.css";

// ── Swap this for your real webhook URL when ready ──────────────────────────
const WEBHOOK_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyesi0Vxa4FQZJfuJhTbQNXFQXInyPnsVevQFUnsu01eWWAcnn4Y0zyJompaV8EWquxnA/exec";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
}

const EMPTY_FORM: FormState = { firstName: "", lastName: "", email: "" };

// ─────────────────────────────────────────────────────────────────────────────
// Signup form
// ─────────────────────────────────────────────────────────────────────────────
function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<PIWError[]>([]);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const getError = (field: string) => errors.find((e) => e.field === field) ?? null;

  const validate = () => {
    const errs: PIWError[] = [];
    if (!form.email.trim()) errs.push({ field: "email", message: "Email is required" });
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.push({ field: "email", message: "Please enter a valid email address" });
    setErrors(errs);
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length) return;

    setStatus("submitting");
    try {
      await fetch(WEBHOOK_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({...form, action: "subscribe" }),
      });
      setStatus("success");
      onSuccess();
    } catch {
      setStatus("error");
    }
  };

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <form className="event-form" onSubmit={handleSubmit} noValidate>
      <div className="event-form__row">
        <TextField
          name="firstName"
          label="First Name (optional)"
          value={form.firstName}
          onChange={set("firstName")}
          fullWidth
          disabled={status === "submitting"}
          error={getError("firstName")}
        />
        <TextField
          name="lastName"
          label="Last Name (optional)"
          value={form.lastName}
          onChange={set("lastName")}
          fullWidth
          disabled={status === "submitting"}
          error={getError("lastName")}
        />
      </div>
      <TextField
        name="email"
        label="Email Address"
        type="email"
        value={form.email}
        onChange={set("email")}
        required
        fullWidth
        disabled={status === "submitting"}
        error={getError("email")}
      />

      {status === "error" && <p className="event-form__submit-error">Something went wrong — please try again.</p>}

      <div className="event-form__actions">
        <button type="submit" className="event-btn event-btn--primary" disabled={status === "submitting"}>
          {status === "submitting" ? <span className="event-btn__spinner" aria-hidden="true" /> : null}
          {status === "submitting" ? "Submitting…" : "Sign Up"}
        </button>
      </div>

      <Socials />

      <div className="subscribe-subtext">
        <p>
          By signing up, you agree to receive promotional emails from PwI. We collect your email address solely to send
          you these updates. We do not share your information, and you can unsubscribe at any time.
        </p>
        <div>
          See our{" "}
          <button type="button" className="subscribe-subtext__link" onClick={() => setPrivacyOpen(true)}>
            Privacy Policy
          </button>{" "}
          here.
        </div>
      </div>

      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Success screen
// ─────────────────────────────────────────────────────────────────────────────
function SignupSuccess() {
  return (
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
      <h1 className="qr-success__title">You're in.</h1>
      <div className="qr-success__line" aria-hidden="true" />
      <p className="qr-success__sub">Thanks for subscribing — we'll keep you updated.</p>

      <div className="qr-success__socials">
        <Socials />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page root
// ─────────────────────────────────────────────────────────────────────────────
export default function Subscribe() {
  const [succeeded, setSucceeded] = useState(false);

  return (
    <div className="event-page event-page--qr">
      <a href="/" className="event-logo" aria-label="Back to People With Ideas">
        <PWILogo scrolled />
      </a>

      {succeeded ? (
        <SignupSuccess />
      ) : (
        <div className="qr-wrap">
          <div className="qr-header">
            <p className="qr-header__eyebrow">Newsletter</p>
            <h1 className="qr-header__title">Newsletter Signup</h1>
            <p className="qr-header__sub">Register your details to stay updated with our latest news and events.</p>
          </div>
          <SignupForm onSuccess={() => setSucceeded(true)} />
        </div>
      )}
    </div>
  );
}

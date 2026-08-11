import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TextField from "../components/ui/TextField";
import PWILogo from "../components/ui/PWILogo";
import type { PIWError } from "../components/ui/types";
import "./EventSignup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVimeo, faLinkedin } from "@fortawesome/free-brands-svg-icons";

// ── Swap this for your real webhook URL when ready ──────────────────────────
const WEBHOOK_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyesi0Vxa4FQZJfuJhTbQNXFQXInyPnsVevQFUnsu01eWWAcnn4Y0zyJompaV8EWquxnA/exec";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subscribe?: boolean;
}

const EMPTY_FORM: FormState = { firstName: "", lastName: "", email: "", phone: "" };

// ─────────────────────────────────────────────────────────────────────────────
// Shared form fields
// ─────────────────────────────────────────────────────────────────────────────
function SignupForm({
  onSuccess,
  onCancel,
  dark = false,
}: {
  onSuccess: () => void;
  onCancel?: () => void;
  dark?: boolean;
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<PIWError[]>([]);

  const getError = (field: string) => errors.find((e) => e.field === field) ?? null;

  const validate = () => {
    const errs: PIWError[] = [];
    if (!form.firstName.trim()) errs.push({ field: "firstName", message: "First name is required" });
    if (!form.lastName.trim()) errs.push({ field: "lastName", message: "Last name is required" });
    if (!form.email.trim()) errs.push({ field: "email", message: "Email is required" });
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.push({ field: "email", message: "Please enter a valid email address" });
    if (!form.phone.trim()) errs.push({ field: "phone", message: "Phone number is required" });
    setErrors(errs);
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length) return;

    setStatus("submitting");
    try {
      if (WEBHOOK_ENDPOINT) {
        await fetch(WEBHOOK_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(form),
        });
      } else {
        // Placeholder — simulate a network round-trip until webhook is wired up
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("success");
      onSuccess();
    } catch {
      setStatus("error");
    }
  };

  const set = (field: keyof FormState, value?: any) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: value ?? e.target.value }));

  return (
    <form className={`event-form${dark ? " event-form--dark" : ""}`} onSubmit={handleSubmit} noValidate>
      <div className="event-form__row">
        <TextField
          name="firstName"
          label="First Name"
          value={form.firstName}
          onChange={set("firstName")}
          required
          fullWidth
          disabled={status === "submitting"}
          error={getError("firstName")}
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={form.lastName}
          onChange={set("lastName")}
          required
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
      <TextField
        name="phone"
        label="Phone Number"
        type="phone"
        value={form.phone}
        onChange={set("phone")}
        required
        fullWidth
        disabled={status === "submitting"}
        error={getError("phone")}
      />

      <label className="event-form__optin">
        <input
          type="checkbox"
          name="subscribe"
          className="event-form__optin-input"
          onChange={(e) => set("subscribe", e.target.checked)(e)}
        />
        <span className="event-form__optin-text">Add me to the PwI newsletter list.</span>
      </label>

      {status === "error" && <p className="event-form__submit-error">Something went wrong — please try again.</p>}

      <div className="event-form__actions">
        {onCancel && (
          <button
            type="button"
            className="event-btn event-btn--ghost"
            onClick={onCancel}
            disabled={status === "submitting"}
          >
            Cancel
          </button>
        )}
        <button type="submit" className="event-btn event-btn--primary" disabled={status === "submitting"}>
          {status === "submitting" ? <span className="event-btn__spinner" aria-hidden="true" /> : null}
          {status === "submitting" ? "Submitting…" : "Enter Prize Draw"}
        </button>
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Kiosk — modal overlay
// ─────────────────────────────────────────────────────────────────────────────
function KioskModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 320);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`kiosk-modal${visible ? " kiosk-modal--open" : ""}`}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Prize draw registration"
    >
      <div className={`kiosk-modal__card${visible ? " kiosk-modal__card--open" : ""}`}>
        <div className="kiosk-modal__header">
          <h2 className="kiosk-modal__title">Your Details</h2>
          <p className="kiosk-modal__subtitle">Fill in your details below to be entered into the prize draw.</p>
        </div>
        <SignupForm onSuccess={onSuccess} onCancel={onClose} dark />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Kiosk — success screen (auto-resets)
// ─────────────────────────────────────────────────────────────────────────────
function KioskSuccess({ onReset }: { onReset: () => void }) {
  const RESET_SECS = 8;
  const [count, setCount] = useState(RESET_SECS);

  useEffect(() => {
    if (count <= 0) {
      onReset();
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onReset]);

  const circumference = 2 * Math.PI * 28;
  const offset = circumference * (1 - count / RESET_SECS);

  return (
    <div className="kiosk-success">
      <svg className="kiosk-success__tick" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
      <h1 className="kiosk-success__title">You're entered.</h1>
      <p className="kiosk-success__sub">
        Good luck tonight! <br /> We'll be in touch if you win.
      </p>
      <div className="kiosk-success__reset-wrap" aria-label={`Resetting in ${count} seconds`}>
        <svg className="kiosk-success__ring" viewBox="0 0 64 64" aria-hidden="true">
          <circle className="kiosk-success__ring-track" cx="32" cy="32" r="28" />
          <circle
            className="kiosk-success__ring-progress"
            cx="32"
            cy="32"
            r="28"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="kiosk-success__count">{count}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QR / mobile — success screen
// ─────────────────────────────────────────────────────────────────────────────
function QRSuccess() {
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
      <p className="qr-success__sub">
        Good luck tonight! <br /> We'll be in touch if you win.
      </p>

      <div className="footer__social">
        <p className="qr-success__sub">Need more ideas? Follow our socials:</p>
        {/* <a
              href="https://www.instagram.com/peoplewithideas_"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
              Instagram
            </a> */}
        <a
          href="https://vimeo.com/user257644529"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-link"
          aria-label="Vimeo"
        >
          <FontAwesomeIcon icon={faVimeo} />
          Vimeo
        </a>
        <a
          href="https://www.linkedin.com/company/people-with-ideasnz"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-link"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedin} />
          LinkedIn
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page root
// ─────────────────────────────────────────────────────────────────────────────
export default function EventSignup() {
  const [searchParams] = useSearchParams();
  const isKiosk = searchParams.get("mode") === "kiosk";

  const [modalOpen, setModalOpen] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSuccess = () => {
    setModalOpen(false);
    setSucceeded(true);
  };

  const handleReset = () => setSucceeded(false);

  // ── Kiosk ─────────────────────────────────────────────────────────────────
  if (isKiosk) {
    return (
      <div className="event-page event-page--kiosk">
        <a href="/" className="event-logo" aria-label="Back to People With Ideas">
          <PWILogo />
        </a>

        {succeeded ? (
          <KioskSuccess onReset={handleReset} />
        ) : (
          <div className="kiosk-welcome">
            <p className="kiosk-welcome__eyebrow">Launch Event — Prize Draw</p>
            <h1 className="kiosk-welcome__title">Enter to Win</h1>
            <p className="kiosk-welcome__sub">Register your details for a chance to walk away with a prize tonight.</p>
            <button className="event-btn event-btn--hero" onClick={() => setModalOpen(true)}>
              Register Now
            </button>
          </div>
        )}

        <KioskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSuccess={handleSuccess} />
      </div>
    );
  }

  // ── QR / mobile ───────────────────────────────────────────────────────────
  return (
    <div className="event-page event-page--qr">
      <a href="/" className="event-logo" aria-label="Back to People With Ideas">
        <PWILogo scrolled />
      </a>

      {succeeded ? (
        <QRSuccess />
      ) : (
        <div className="qr-wrap">
          <div className="qr-header">
            <p className="qr-header__eyebrow">Launch Event</p>
            <h1 className="qr-header__title">Enter to Win</h1>
            <p className="qr-header__sub">Register your details for a chance to walk away with a prize tonight.</p>
          </div>
          <SignupForm onSuccess={() => setSucceeded(true)} />
        </div>
      )}
    </div>
  );
}

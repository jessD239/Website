import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import TextField from "./ui/TextField";
import TextArea from "./ui/TextArea";
import "./ContactModal.css";
import type { PIWError } from "./ui/types";

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxWmddAxQg7HeLIB4CoPIHRY0gy967znU06xzmbSX6tNCclYwB8BvVUi5_hcqMf9-jm/exec";

const ANIMATION_DURATION = 300;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [mounted, setMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<PIWError[]>([]);
  const backdropPointerDown = useRef(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setStatus("idle");
    setErrors([]);
  };

  useEffect(() => {
    let timer;

    if (isOpen) {
      // ENTRY: Mount first, then fade in
      setMounted(true);
      // 10ms is enough to let the browser register the initial "hidden" state
      timer = setTimeout(() => setIsVisible(true), 10);
    } else {
      // EXIT: Fade out first, then unmount
      setIsVisible(false);
      timer = setTimeout(() => {
        setMounted(false);
        resetForm();
      }, ANIMATION_DURATION);
    }

    // Cleanup prevents memory leaks if isOpen changes mid-animation
    return () => clearTimeout(timer);
  }, [isOpen, ANIMATION_DURATION]);

  if (!mounted) return null;

  const handleBackdropPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    backdropPointerDown.current = e.target === e.currentTarget;
  };

  const handleBackdropPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const releasedOnBackdrop = e.target === e.currentTarget;
    if (backdropPointerDown.current && releasedOnBackdrop) {
      handleClose();
    }
    backdropPointerDown.current = false;
  };

  const handleClose = () => {
    if (status === "submitting") return;
    onClose();
  };

  const getError = (field: string) => {
    const error = errors.find((err) => err.field === field);
    return error;
  };

  const checkForm = () => {
    const errors = [];
    if (!name.trim()) errors.push({ field: "name", message: "Name is required" });
    if (!email.trim()) errors.push({ field: "email", message: "Email is required" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) errors.push({ field: "email", message: "Email is invalid" });
    if (!message.trim()) errors.push({ field: "message", message: "Message is required" });
    setErrors(errors);
    return errors;
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setStatus("idle");

    const errors = checkForm();
    if (errors.length > 0) {
      setStatus("error");
      return;
    }

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      // console.log(JSON.stringify(data));
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(data),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return createPortal(
    <div
      className={`contact-modal${isVisible ? " contact-modal--open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
      onPointerDown={handleBackdropPointerDown}
      onPointerUp={handleBackdropPointerUp}
    >
      <div className={`contact-modal__content${isVisible ? " contact-modal__content--open" : ""}`}>
        {status === "success" ? (
          <div className="contact-modal__success">
            {/* <p className="contact-modal__success-icon">✓</p> */}
            {/** Make this bigger */}
            <svg className="contact-modal__success-tick" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
              <path
                className="tick-path"
                d="M14 27C14 27 19.5 32.5 21 34C22.5 35.5 24 34 24 34C26 31 34.5 19 38 16"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="transparent"
              />
            </svg>
            <h2 className="contact-modal__title">Message sent</h2>
            <p className="contact-modal__subtitle">We'll be in touch shortly.</p>
            <div className="contact-modal__actions">
              <button className="contact-modal__submit" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="contact-modal__header">
              <h2 className="contact-modal__title">Get in Touch</h2>
              <p className="contact-modal__subtitle">Tell us about your project. We'll get back to you shortly.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <TextField
                name="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                disabled={status === "submitting"}
                error={getError("name")}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                autoComplete="email"
                disabled={status === "submitting"}
                error={getError("email")}
              />
              <TextField
                name="phone"
                label="Phone (optional)"
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                disabled={status === "submitting"}
              />
              <TextArea
                name="message"
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                fullWidth
                minHeight={120}
                disabled={status === "submitting"}
                error={getError("message")}
              />

              {status === "error" && <p className="contact-modal__error">Something went wrong. Please try again.</p>}

              <div className="contact-modal__actions">
                <button
                  type="button"
                  className="contact-modal__close"
                  onClick={handleClose}
                  disabled={status === "submitting"}
                >
                  Cancel
                </button>
                <button type="submit" className="contact-modal__submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default ContactModal;

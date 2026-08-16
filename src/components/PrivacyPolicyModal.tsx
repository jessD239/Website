import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./PrivacyPolicyModal.css";

const ANIMATION_DURATION = 300;

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
  const [mounted, setMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const backdropPointerDown = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isOpen) {
      setMounted(true);
      timer = setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      timer = setTimeout(() => setMounted(false), ANIMATION_DURATION);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (mounted) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [mounted]);

  if (!mounted) return null;

  const handleBackdropPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    backdropPointerDown.current = e.target === e.currentTarget;
  };

  const handleBackdropPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const releasedOnBackdrop = e.target === e.currentTarget;
    if (backdropPointerDown.current && releasedOnBackdrop) {
      onClose();
    }
    backdropPointerDown.current = false;
  };

  return createPortal(
    <div
      className={`privacy-modal${isVisible ? " privacy-modal--open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Privacy policy"
      onPointerDown={handleBackdropPointerDown}
      onPointerUp={handleBackdropPointerUp}
    >
      <div className={`privacy-modal__content${isVisible ? " privacy-modal__content--open" : ""}`}>
        <div className="privacy-modal__header">
          <h2 className="privacy-modal__title">Privacy Policy</h2>
          <p className="privacy-modal__subtitle">Last updated: August 2026</p>
        </div>

        <div className="privacy-modal__body">
          <h3>1. Introduction</h3>
          <p>
            We value your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal
            information when you subscribe to our newsletter.
          </p>
          <p>
            We comply with the New Zealand <strong>Privacy Act 2020</strong> and the{" "}
            <strong>Unsolicited Electronic Messages Act 2007</strong>.
          </p>

          <h3>2. Information We Collect</h3>
          <p>We only collect personal information that you voluntarily provide to us. This includes:</p>
          <ul>
            <li>
              <strong>Email Address:</strong> Collected when you fill out our newsletter sign-up form.
            </li>
            <li>
              <strong>Name (if provided):</strong> Collected to personalise our communication with you.
            </li>
          </ul>

          <h3>3. How We Use Your Information</h3>
          <p>We use your personal information strictly for the following purposes:</p>
          <ul>
            <li>To send you our newsletter, business updates, marketing materials, or promotional offers.</li>
            <li>To manage and maintain our subscriber distribution list.</li>
          </ul>

          <h3>4. How We Protect and Store Your Information</h3>
          <p>
            We take reasonable security steps to protect your personal information from unauthorised access,
            modification, or disclosure.
          </p>
          <ul>
            <li>
              <strong>No Third-Party Sharing:</strong> We do not sell, rent, trade, or share your personal information
              with any third parties for their marketing purposes.
            </li>
            <li>
              <strong>Data Hosting:</strong> Your data is securely stored within our website database or our secure
              email service provider platform.
            </li>
          </ul>

          <h3>5. Your Rights (Access and Correction)</h3>
          <p>Under the Privacy Act 2020, you have the right to:</p>
          <ul>
            <li>Request a copy of the personal information we hold about you.</li>
            <li>Request correction of your information if you believe it is inaccurate or out of date.</li>
            <li>
              Opt-out or unsubscribe at any time. Every newsletter we send includes a functional, one-click
              'Unsubscribe' link. We will process your opt-out request immediately and no later than 5 working days from
              submission.
            </li>
          </ul>

          <h3>6. How to Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, wish to access your data, or want to make a correction,
            please contact our Privacy Officer at:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> info@peoplewithideas.com
            </li>
            <li>
              <strong>Business Name:</strong> People With Ideas
            </li>
          </ul>
        </div>

        <div className="privacy-modal__actions">
          <button className="privacy-modal__close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default PrivacyPolicyModal;

import { X } from "lucide-react";
import { useEffect, type MouseEvent, type ReactNode } from "react";
import { gsap } from "gsap";
import "./Modal.css";

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  width?: string;
};

export default function Modal({
  open,
  title,
  children,
  onClose,
  width = "520px",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const el = document.querySelector(".modal-card");
    if (el)
      gsap.fromTo(
        el,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
      );
  }, [open]);
  if (!open) return null;
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e: MouseEvent<HTMLDivElement>) =>
        e.target === e.currentTarget && onClose()
      }
    >
      <div className="modal-card" style={{ maxWidth: width }}>
        <div className="modal__head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={17} />
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}

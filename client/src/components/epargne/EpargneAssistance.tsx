import { useEffect, useRef, useState } from "react";
import {
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";

type SimulationDialogProps = { open: boolean; onClose: () => void };

export function SimulationDialog({ open, onClose }: SimulationDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="epargne-simulation-dialog"
      aria-labelledby="epargne-dialog-title"
      onClose={onClose}
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="epargne-dialog-heading">
        <div>
          <span className="epargne-dialog-kicker">Épargne Digiassur</span>
          <h2 id="epargne-dialog-title">Parlons de votre projet</h2>
        </div>
        <button
          type="button"
          className="epargne-dialog-close"
          aria-label="Fermer"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <p>
        Continuez vers le formulaire officiel de devis Épargne ou contactez
        directement notre équipe si vous préférez être accompagné.
      </p>
      <div className="epargne-dialog-actions">
        <a
          className="epargne-button epargne-button-coral"
          href="https://digiassur.ma/epargne/obtenir-un-devis"
          target="_blank"
          rel="noreferrer"
        >
          Obtenir mon devis
        </a>
        <a
          className="epargne-button epargne-button-outline"
          href="tel:+212522368182"
        >
          <Phone size={18} /> (+212) 522 36 81 82
        </a>
      </div>
    </dialog>
  );
}

export default function EpargneAssistance() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  return (
    <>
      <nav className="epargne-help-rail" aria-label="Raccourcis d’assistance">
        <a href="tel:+212522368182" aria-label="Appeler Digiassur">
          <Headphones size={21} />
        </a>
        <a
          href="https://maps.google.com/?q=27+Rue+Ain+Asserdoune+CIL+Casablanca+Maroc"
          target="_blank"
          rel="noreferrer"
          aria-label="Trouver Digiassur"
        >
          <MapPin size={21} />
        </a>
        <a href="mailto:contact@digiassur.ma" aria-label="Écrire à Digiassur">
          <Mail size={21} />
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=212711454567&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noreferrer"
          aria-label="Contacter Digiassur sur WhatsApp"
        >
          <MessageCircle size={21} />
        </a>
      </nav>
      <div className="epargne-chat-widget">
        {assistantOpen && (
          <section
            className="epargne-chat-panel"
            aria-label="Digibot à l’écoute"
          >
            <div className="epargne-chat-heading">
              <strong>Digibot à l’écoute</strong>
              <button
                type="button"
                onClick={() => setAssistantOpen(false)}
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>
            <p>
              Une question sur votre épargne ? Choisissez le moyen de contact
              qui vous convient.
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=212711454567&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
            >
              Écrire sur WhatsApp <MessageCircle size={16} />
            </a>
            <a href="mailto:contact@digiassur.ma">
              Envoyer un e-mail <Mail size={16} />
            </a>
          </section>
        )}
        <button
          className="epargne-chat-button"
          type="button"
          aria-expanded={assistantOpen}
          aria-label={
            assistantOpen ? "Fermer Digibot" : "Ouvrir Digibot à l’écoute"
          }
          onClick={() => setAssistantOpen(open => !open)}
        >
          <span className="epargne-chat-icon">
            <MessageCircle size={19} />
          </span>
          <span>Digibot à l’écoute</span>
        </button>
      </div>
    </>
  );
}

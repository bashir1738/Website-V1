"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { FormKey } from "@/lib/forms";
import { FormModal } from "./form-modal";

/** Field label → value, for opening a form with an answer already chosen. */
export type Prefill = Record<string, string>;

interface ModalContextValue {
  openModal: (key: FormKey, prefill?: Prefill) => void;
  closeModal: () => void;
  activeModal: FormKey | null;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}

/**
 * Holds which form (if any) is open and renders it in a portal on document.body.
 * The dialog itself — layout, validation, submit — lives in ./form-modal.
 */
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<FormKey | null>(null);
  const [prefill, setPrefill] = useState<Prefill>({});

  const openModal = useCallback((key: FormKey, values: Prefill = {}) => {
    setPrefill(values);
    setActiveModal(key);
  }, []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  const value = useMemo(
    () => ({ openModal, closeModal, activeModal }),
    [openModal, closeModal, activeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {activeModal &&
        createPortal(
          <FormModal
            key={activeModal}
            formKey={activeModal}
            prefill={prefill}
            onClose={closeModal}
          />,
          document.body,
        )}
    </ModalContext.Provider>
  );
}

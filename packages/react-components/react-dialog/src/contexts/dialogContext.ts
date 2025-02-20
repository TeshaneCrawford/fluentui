import { createContext, ContextSelector, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';

import type { DialogModalType, DialogOpenChangeData } from '../Dialog';
import * as React from 'react';
import { DialogSurfaceElement } from '../DialogSurface';

export type DialogContextValue = {
  open: boolean;
  dialogBodyID?: string;
  dialogTitleID?: string;
  isNestedDialog: boolean;
  dialogRef: React.Ref<DialogSurfaceElement>;
  modalType: DialogModalType;
  /**
   * Requests dialog main component to update it's internal open state
   */
  requestOpenChange: (data: DialogOpenChangeData) => void;
};

const defaultContextValue: DialogContextValue = {
  open: false,
  modalType: 'modal',
  isNestedDialog: false,
  dialogRef: { current: null },
  requestOpenChange() {
    /* noop */
  },
};

// Contexts should default to undefined
export const DialogContext: Context<DialogContextValue | undefined> = createContext<DialogContextValue | undefined>(
  undefined,
);

export const DialogProvider = DialogContext.Provider;
export const useDialogContext_unstable = <T>(selector: ContextSelector<DialogContextValue, T>): T =>
  useContextSelector(DialogContext, (ctx = defaultContextValue) => selector(ctx));

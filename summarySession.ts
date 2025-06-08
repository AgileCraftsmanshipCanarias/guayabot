type DropdownOption = {
  id: string;
  text: string;
};

type FormField = {
  key: string;
  label: string;
};

type DropdownField = FormField & {
  type: "DROPDOWN";
  value: string[];
  options: DropdownOption[];
};

function isDropdownField(field: ConcreteFormField): field is DropdownField {
  return field.type === "DROPDOWN";
}

type InputTextField = FormField & {
  type: "INPUT_TEXT";
  value: null | string;
};

type FileUploadField = FormField & {
  type: "FILE_UPLOAD";
  value: null | unknown;
};

function isFileUploadField(field: ConcreteFormField): field is FileUploadField {
    return field.type === "FILE_UPLOAD";
}

type TextareaField = FormField & {
  type: "TEXTAREA";
  value: null | string;
};

type ConcreteFormField =
  | DropdownField
  | InputTextField
  | FileUploadField
  | TextareaField;

export type SessionReceivedPayload = {
  eventId: string;
  eventType: "FORM_RESPONSE";
  /**
   * ISO 8601 date format
   */
  createdAt: string;
  data: {
    responseId: string;
    submissionId: string;
    respondentId: string;
    formId: string;
    formName: string;
    /**
     * ISO 8601 date format
     */
    createdAt: string;
    fields: ConcreteFormField[];
  };
};

function hasValue(value:{label: string; value: string | null}): value is {label: string; value: string} {
  return value.value !== null;  
}

export function summarySession(sessionReceived: SessionReceivedPayload) {
  return sessionReceived.data.fields.map(summarizeField).filter(hasValue).map(f => `**${f.label}**: ${f.value}`).join("\n");
}

function summarizeField(field: ConcreteFormField) {
  if (isDropdownField(field)) {
    return {
      label: field.label,
      value:
        field.options.find((option) => field.value.includes(option.id))?.text ??
        "No seleccionado",
    };
  }

  if (isFileUploadField(field)) {
    console.log("File upload field", field);
    return {
      label: field.label,
      value: field.value ? "Ha subido imágenes (hay que ir a Tally a verlas)" : "No adjuntado",
    };
  }

  return {
    label: field.label,
    value: field.value,
  };
}

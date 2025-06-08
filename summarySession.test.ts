const event = {
  "eventId": "f95c0595-4b45-44e7-82da-60bf58b5ff27",
  "eventType": "FORM_RESPONSE",
  "createdAt": "2025-06-07T23:34:31.149Z",
  "data": {
    "responseId": "LZWWg0l",
    "submissionId": "LZWWg0l",
    "respondentId": "1akazp",
    "formId": "mDEVlZ",
    "formName": "Propuesta para Agile Canarias",
    "createdAt": "2025-06-07T23:34:31.000Z",
    "fields": [
      {
        "key": "question_lOaPdk",
        "label": "¿Qué tipo de propuesta tienes?",
        "type": "DROPDOWN",
        "value": [
          "dc7315aa-bee2-4826-8aeb-8eef79bf2616"
        ],
        "options": [
          {
            "id": "4335a7e8-5eaf-4dd2-9011-5257631a6a1e",
            "text": "📢 Charla"
          },
          {
            "id": "020a041c-de79-4da1-bfeb-c7cb42ba188e",
            "text": "👥 Workshop"
          },
          {
            "id": "dc7315aa-bee2-4826-8aeb-8eef79bf2616",
            "text": "🥋 Coding Dojo"
          },
          {
            "id": "3fe31f92-28b4-4297-8b26-07b588164bd1",
            "text": "😱 Otro!"
          }
        ]
      },
      {
        "key": "question_RoW759",
        "label": "¿Quién o quiénes facilitan la sesión?",
        "type": "INPUT_TEXT",
        "value": "Pepe y Fer"
      },
      {
        "key": "question_oR94MP",
        "label": "¿Cómo titularías la sesión?",
        "type": "INPUT_TEXT",
        "value": "La importancia de los Baby Steps"
      },
      {
        "key": "question_Gpe2dZ",
        "label": "Comparte con nosotros una imagen de perfil",
        "type": "FILE_UPLOAD",
        "value": null
      },
      {
        "key": "question_OXQW5R",
        "label": "Cuéntanos de que trata la sesión",
        "type": "TEXTAREA",
        "value": null
      },
      {
        "key": "question_VPpk5g",
        "label": "¿Qué Kata quieres proponer?",
        "type": "TEXTAREA",
        "value": "La ATM Machine"
      }
    ]
  }
} satisfies SessionReceivedPayload;

import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { SessionReceivedPayload, summarySession } from "./summarySession.ts";

describe("summarySession", () => {
  it("formats a single name", () => {
    const result = summarySession(event);

    expect(result).toBe(`**¿Qué tipo de propuesta tienes?**: 🥋 Coding Dojo
**¿Quién o quiénes facilitan la sesión?**: Pepe y Fer
**¿Cómo titularías la sesión?**: La importancia de los Baby Steps
**Comparte con nosotros una imagen de perfil**: No adjuntado
**¿Qué Kata quieres proponer?**: La ATM Machine`);
  });
});

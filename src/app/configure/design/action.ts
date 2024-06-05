import { db } from "@/db";
import {
  PhoneModel,
  CaseFinish,
  CaseColor,
  CaseMaterial,
} from "@prisma/client";

export type saveConfiguration = {
  phoneModel: PhoneModel;
  caseFinish: CaseFinish;
  caseColor: CaseColor;
  caseMaterial: CaseMaterial;
  confidId: string;
};

export const saveConfiguration = async ({
  phoneModel,
  caseFinish,
  caseColor,
  caseMaterial,
  confidId,
}: saveConfiguration) => {
  const configuration = await db.configuration.update({
    where: { id: confidId },
    data: {
      model: phoneModel,
      finish: caseFinish,
      color: caseColor,
      material: caseMaterial,
    },
  });
};

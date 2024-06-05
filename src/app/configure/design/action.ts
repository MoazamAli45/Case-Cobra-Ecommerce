"use server";
import { db } from "@/db";
import {
  PhoneModel,
  CaseFinish,
  CaseColor,
  CaseMaterial,
} from "@prisma/client";

export type SaveConfigArgs = {
  phoneModel: PhoneModel;
  caseFinish: CaseFinish;
  caseColor: CaseColor;
  caseMaterial: CaseMaterial;
  configId: string;
};

const saveConfig = async ({
  phoneModel,
  caseFinish,
  caseColor,
  caseMaterial,
  configId,
}: SaveConfigArgs) => {
  const configuration = await db.configuration.update({
    where: { id: configId },
    data: {
      model: phoneModel,
      finish: caseFinish,
      color: caseColor,
      material: caseMaterial,
    },
  });
};

export default saveConfig;

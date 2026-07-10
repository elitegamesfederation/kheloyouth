export const affiliationFees: Record<number, number> = {
  1: 999,
  2: 1799,
  3: 2499,
};

const stateCodes: Record<string, string> = {
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  Assam: "AS",
  Bihar: "BR",
  Chhattisgarh: "CG",
  Delhi: "DL",
  Goa: "GA",
  Gujarat: "GJ",
  Haryana: "HR",
  "Himachal Pradesh": "HP",
  Jharkhand: "JH",
  Karnataka: "KA",
  Kerala: "KL",
  "Madhya Pradesh": "MP",
  Maharashtra: "MH",
  Manipur: "MN",
  Meghalaya: "ML",
  Mizoram: "MZ",
  Nagaland: "NL",
  Odisha: "OD",
  Punjab: "PB",
  Rajasthan: "RJ",
  Sikkim: "SK",
  "Tamil Nadu": "TN",
  Telangana: "TS",
  Tripura: "TR",
  "Uttar Pradesh": "UP",
  Uttarakhand: "UK",
  "West Bengal": "WB",
};

export const getStateCode = (value: string) =>
  stateCodes[value] || value.trim().slice(0, 2).toUpperCase() || "EG";

export function getAffiliationNumber(
  existing: string | undefined,
  state: string,
  academyId: string
) {
  if (existing) return existing;

  const year = new Date().getFullYear().toString().slice(-2);
  const uidSeed = academyId
    .replace(/[^a-z0-9]/gi, "")
    .slice(-6)
    .toUpperCase()
    .padStart(6, "0");

  return `${getStateCode(state)}/${year}/${uidSeed}`;
}

export function getCertificateVerificationId(
  existing: string | undefined,
  affiliationNumber: string
) {
  return (existing || affiliationNumber)
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toUpperCase();
}

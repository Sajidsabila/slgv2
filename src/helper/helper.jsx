export const convertDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  return `${day}-${month}-${year}`;
};

export const capitalAtWords = (string) => {
  if (typeof string !== "string") return "";
  return string.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};

export const currencyFormat = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const formatDateIndonesia = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("id-ID", options);
};

export const getDriveFileId = (url) => {
  if (!url) return null;
  const regex = /[-\w]{25,}/;
  const match = url.match(regex);
  return match ? match[0] : null;
};

export const generateKarakter = (length) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generatePreviewGDriveImage = (url) => {
  const match = url.match(/\/d\/([^/]+)\//);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}`;
  }
  return url;
};

export const generatePreviewGDriveVideo = (url) => {
  const api_key = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
  const match = url.match(/\/d\/([^/]+)\//);
  if (match && match[1]) {
    return `https://www.googleapis.com/drive/v3/files/${match[1]}?alt=media&key=${api_key}`;
  }
  return url;
};

export const sanitizeText = (text) => {
  return text.replace(/<[^>]+>/g, "");
};

export const firstLetterFunction = (string) => {
  if (!string || typeof string !== "string") {
    return "S";
  }

  const clean = string.trim();

  if (clean.length === 0) {
    return "S";
  }

  return clean.charAt(0).toUpperCase();
};

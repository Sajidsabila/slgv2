
const site = window.location.hostname;
const apiSite =
  site === "localhost"
    ? "https://sister.sekolahmusik.co.id/"
    : "https://sister.sekolahmusik.co.id/";
const waSite = "https://wa.sekolahmusik.co.id/api/sendv2"; 
const urlLink = {
  url: apiSite,
  wa: waSite,
};

export { urlLink, apiSite, waSite };

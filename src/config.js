let domainName;

if (typeof window !== "undefined") {
  domainName = window.location.hostname;
}
const config = {
  apiUrl:
    domainName === "localhost"
      ? "http://localhost:5000"
      : "https://portfolio-servidor.herokuapp.com",
};
// Client-side-only code
export default config;

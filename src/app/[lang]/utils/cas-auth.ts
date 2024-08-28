import axios from "axios";
import convert from "xml-js";

export async function casLogin() {
  try {
    // Extract the ticket from the URL
    const serviceUrl = window.location.href;
    const urlSearchParams = new URLSearchParams(new URL(serviceUrl).search);
    const ticket: string | null = urlSearchParams.get("ticket");

    if (ticket) {
      // Validate the CAS ticket with the CAS server
      console.log(
        "validate ticket " +
          `https://cas.sfu.ca/cas/serviceValidate?service=${serviceUrl}&ticket=${ticket}`
      );
      const response = await axios.get(
        `https://cas.sfu.ca/cas/serviceValidate?service=${serviceUrl}&ticket=${ticket}`
      );

      // Parse the response XML
      const responseDataObject = JSON.parse(
        convert.xml2json(response.data, {
          compact: true,
          spaces: 4,
        })
      );

      const serviceResponse = responseDataObject["cas:serviceResponse"];

      if ("cas:authenticationSuccess" in serviceResponse) {
        const userData = serviceResponse["cas:authenticationSuccess"];
        // const userID: string = userData["cas:user"]["_text"];
        console.log(userData);
        return userData;
      } else {
        // CAS authentication failure
        console.error("CAS authentication failed");
        return { status: 401, message: "CAS Authentication Failure" };
      }
    } else {
      // Ticket not found in URL
      console.error("Ticket not found in URL");
      return { status: 400, message: "Ticket not found in URL" };
    }
  } catch (error) {
    // Unknown error
    console.error("Error handling login session:", error);
    return { status: 500, message: "Error handling login session" };
  }
}

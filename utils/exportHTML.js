// exportHTML.js
import JSZip from "jszip";
import { saveAs } from "file-saver";

export function exportHTML(components) {
    const zip = new JSZip();
    let htmlContent = `<!DOCTYPE html>
    <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <title>Hybrid Flexible PNAV Email Template</title>

    <!--[if mso]>
	<style type="text/css">
        table {border-collapse:collapse;border:0;border-spacing:0;margin:0;}
        div, td {padding:0;}
        div {margin:0 !important;}
	</style>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
    <style type="text/css">
        @media screen and (max-width: 350px) {
            .three-col .column {
                max-width: 100% !important;
            }

            .footer .column {
                max-width: 100% !important;
            }
        }

        @media screen and (min-width: 351px) and (max-width: 460px) {
            .three-col .column {
                max-width: 50% !important;
            }

            .footer .column {
                max-width: 100% !important;
            }
        }

        @media screen and (max-width: 460px) {
            .two-col .column {
                max-width: 100% !important;
            }

            .two-col img {
                width: 100% !important;
            }
        }

        @media screen and (min-width: 461px) {
            .three-col .column {
                max-width: 33.3% !important;
            }

            .footer .column p {
                text-align: left !important;
            }

            .two-col .column {
                max-width: 50% !important;
            }

            .uneven .small {
                max-width: 25% !important;
            }

            .uneven .large {
                max-width: 75% !important;
            }
        }
    </style>
</head>

<!-- Set Background Fill Color for outside of email in body and email bg color in first MSO table AND div.outer -->

<body style="margin:0;padding:0;word-spacing:normal;background-color:#cdcdcd;">
    <div role="article" aria-roledescription="email" lang="en"
        style="-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
        <table role="presentation" style="width:100%;border:0;border-spacing:0;">
            <tr>
                <td align="center">
                    <!-- Outer Container START -->
                    <!--[if mso]>
                        <table role="presentation" align="center" style="width:600px;background-color: #ffffff;">
                            <tr>
                                <td style="padding: 0;">
                    <![endif]-->
                    <div class="outer" style="width:96%;max-width:600px;margin:10px auto; background-color: #ffffff;">`;

    components.forEach((comp, index) => {
        if (comp.type === "FullWidthImage" && comp.props.imageURL) {
            const imgData = comp.props.imageURL;
            console.log("FullWidthImage data:", imgData); // Debugging image URL or Base64

            if (imgData.startsWith("data:image")) {
                // Convert Base64 Image to Blob and add to ZIP
                const base64Data = imgData.split(",")[1]; // Remove data:image/png;base64,
                const mimeType = imgData.match(/data:(.*?);base64/)[1];
                const ext = mimeType.split("/")[1] || "png"; // Get file extension
                const fileName = `image_${index}.${ext}`;

                zip.file(fileName, base64Data, { base64: true });

                // Update HTML to reference the saved file
                htmlContent += `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #000000; padding: 0;">
                  <img src="${fileName}" alt="Exported Image" style="width: 100%; height: auto; display: block;">
                  </td>
                </tr>
              </table>`;
            } else {
                // External Image URL - Just link it directly
                htmlContent += `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #000000; padding: 20px;">
                  <img src="${imgData}" alt="External Image" style="width: 100%; height: auto; display: block;">
                  </td>
                </tr>
              </table>`;
            }
        } else if (comp.type === "FullWidthText") {
            const { headerText, bodyText } = comp.props;
            htmlContent += `<table role="presentation" style="width:100%;border:0;border-spacing:0;">
            <tr>
                <td style="padding:20px;text-align:left;">
                    <h1
                        style="margin-top:0;margin-bottom:16px;font-family:Arial,sans-serif;font-size:24px;line-height:32px;font-weight:bold;">
                        ${headerText || "Sample Text"}</h1>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:18px;">
                    ${bodyText || "This email template library is your go-to catalog for stunning designs."}
                    </p>
                </td>
            </tr>
        </table>
        <h1></h1>
        <p></p>
      </div>`;
        }

    });

    htmlContent += `</div>
    <!--[if mso]>
                </td>
            </tr>
        </table>
    <![endif]-->

        <!-- Outer Container END -->
    </td>
    </tr>
    </table>
    </div>

    </body>

    </html>`

    zip.file("index.html", htmlContent);

    zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "email_template.zip");
    });
}
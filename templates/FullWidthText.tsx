import React, { useState, useEffect } from "react";

interface FullWidthTextProps {
    headerText?: string;
    bodyText?: string;
    backgroundColor?: string;
    onUpdate: (newHeader: string, newBody: string) => void;
}

const FullWidthText: React.FC<FullWidthTextProps> = ({
    headerText = "Creating responsive email magic",
    bodyText = "This email template library is your go-to catalog for stunning designs. Think of it as a design menu à la carte! Found a style you love? Simply pick it from here and structure your projects with ease. This streamlined approach will make the development process smoother, faster, and more efficient.",
    backgroundColor = "white",
    onUpdate,
}) => {
    const [header, setHeader] = useState(headerText);
    const [body, setBody] = useState(bodyText);

    // Handle text input changes
    const handleHeaderChange = (e: React.ChangeEvent<HTMLHeadingElement>) => {
        const newHeaderText = e.target.innerText;
        setHeader(newHeaderText);
        onUpdate(newHeaderText, body);
    };

    const handleBodyChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
        const newBodyText = e.target.innerText;
        setBody(newBodyText);
        onUpdate(header, newBodyText);
    };

    return (
        <table
            role="presentation"
            style={{
                width: "100%",
                border: "0",
                borderSpacing: "0px",
                backgroundColor: backgroundColor,
            }}
        >
            <tbody>
                <tr>
                    <td style={{ padding: "20px", textAlign: "left" }}>
                        <h1
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleHeaderChange}
                            style={{
                                marginTop: "0",
                                marginBottom: "16px",
                                fontFamily: "Arial, sans-serif",
                                fontSize: "24px",
                                lineHeight: "32px",
                                fontWeight: "bold",
                                cursor: "text",
                                direction: "ltr", // Force text to be left-to-right
                                textAlign: "left", // Align the text to the left
                            }}
                        >
                            {header}
                        </h1>
                        <p
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleBodyChange}
                            style={{
                                margin: "0",
                                fontFamily: "Arial, sans-serif",
                                fontSize: "14px",
                                lineHeight: "18px",
                                fontWeight: "normal",
                                cursor: "text",
                                direction: "ltr", // Force text to be left-to-right
                                textAlign: "left", // Align the text to the left
                            }}
                        >
                            {body}
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default FullWidthText;

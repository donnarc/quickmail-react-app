import React, { useState } from "react";

interface FullWidthImageProps {
    imageURL: string;
    backgroundColor: string;
    onUpdate: (newProps: { imageURL: string }) => void; // Callback to notify the parent component
}

const FullWidthImage: React.FC<FullWidthImageProps> = ({ imageURL, backgroundColor, onUpdate }) => {
    const defaultImage = "https://ohiosigmachapter.org/wp-content/uploads/2022/09/Placeholder-Logo-white-BASE.png"; // Default image URL
    const [imageSrc, setImageSrc] = useState(imageURL || defaultImage); // Use default image if no URL is passed

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImageURL = reader.result as string;
                setImageSrc(newImageURL); // Update the local image preview
                onUpdate({ imageURL: newImageURL }); // Call the onUpdate function to notify the parent component
            };
            reader.readAsDataURL(file); // Convert the file to base64 string
        }
    };

    return (
        <div style={{ position: "relative", backgroundColor }}>
            <img src={imageSrc} alt="FullWidth" className="w-full" />
            <input id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload} // Trigger the upload handler
                style={{
                    display: 'none',
                }}
            />
            <label htmlFor="image" style={{
                position: 'absolute',
                top: '40%',
                left: '30%',
                width: '40%',
                textAlign: 'center',
                zIndex: 10,
                opacity: 1,
                cursor: 'pointer',
            }}
                className="w-full bg-gray-800 text-white p-2 rounded mb-2"
            >Upload an Image</label>
        </div>
    );
};

export default FullWidthImage;

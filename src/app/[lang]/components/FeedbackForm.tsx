import { useState } from "react";
import axios from "axios";

interface LeadForm {
    contactPlaceholder: string;  // Placeholder text for the contact input (e.g., "E-mail")
    contactTitle: string;        // Title or label for the contact input (e.g., "E-mail")
    firstPlaceholder: string;    // Placeholder text for the first name input (e.g., "FirstName")
    firstTitle: string;          // Title or label for the first name input (e.g., "First Name")
    id: number;                  // Unique identifier for the form (e.g., 3)
    messagePlaceholder: string;  // Placeholder text for the message input (e.g., "Your message here...")
    messageTitle: string;        // Title or label for the message input (e.g., "Message")
    secondPlaceholder: string;   // Placeholder text for the last name input (e.g., "Last Name")
    secondTitle: string;         // Title or label for the last name input (e.g., "Last Name")
    submitButton: {              // Information about the submit button
        id: number;                // Unique identifier for the submit button (e.g., 3)
        text: string;              // Text displayed on the submit button (e.g., "Send")
        type: string;              // Type of the submit button (e.g., "primary")
    };
    title: string;               // Title of the form (e.g., "Contact Us")
    sendSuccessMsg: string;
    sendFailMsg: string;
}

export default function FeedbackForm({ formData }: { formData: LeadForm }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendFeedback = async () => {
        const mail = {
            firstName,
            lastName,
            email,
            message,
        };

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/proxy/feedback`, mail, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert(formData.sendSuccessMsg);
        } catch (error) {
            console.error("Error sending feedback:", error);
            alert(formData.sendFailMsg);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        sendFeedback();
    };

    return (
        <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8">
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center text-black">{formData.title}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name">
                        {formData.firstTitle}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="first-name"
                        type="text"
                        placeholder={formData.firstPlaceholder}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last-name">
                        {formData.secondTitle}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="last-name"
                        type="text"
                        placeholder={formData.secondPlaceholder}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        {formData.contactTitle}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder={formData.contactPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        {formData.messageTitle}
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        placeholder={formData.messagePlaceholder}
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-sfuLightRed hover:bg-sfuDarkRed text-white mx-8 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        {formData.submitButton.text}
                    </button>
                </div>
            </form>
        </div>
    );
}


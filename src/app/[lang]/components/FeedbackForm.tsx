import { useState } from "react";
import axios from "axios";

export default function FeedbackForm() {
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
            alert("Feedback sent successfully! Thank you for your feedback.");
        } catch (error) {
            console.error("Error sending feedback:", error);
            alert("There was an error sending your feedback. Please try again.");
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        sendFeedback();
    };

    return (
        <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8">
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Contact Us</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name">
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="first-name"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last-name">
                        Last Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="last-name"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        E-mail
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        placeholder="Your message here..."
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
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}


import { CgHome, CgWebsite } from 'react-icons/cg';
import { MdEmail } from 'react-icons/md';
import { IoMdCall } from 'react-icons/io';
import { FaFacebookF, FaInstagram, FaDiscord } from 'react-icons/fa';
import { AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';
import { BiInfoCircle } from 'react-icons/bi';

export function RenderIcon({ type }: { type: String | undefined }): JSX.Element {
    console.log("icontype:" + type)
    switch (type) {
        case 'ADDRESS':
            return <CgHome />;
        case 'EMAIL':
            return <MdEmail />;
        case 'PHONE':
            return <IoMdCall />;
        case 'FACEBOOK':
            return <FaFacebookF />;
        case 'INSTAGRAM':
            return <FaInstagram />;
        case 'WEBSITE':
            return <CgWebsite />;
        case 'TWITTER':
            return <AiFillTwitterCircle />;
        case 'YOUTUBE':
            return <AiFillYoutube />;
        case 'DISCORD':
            return <FaDiscord />;
        default:
            return <BiInfoCircle />;
    }
}

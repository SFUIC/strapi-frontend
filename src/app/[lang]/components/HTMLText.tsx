interface HTMLTextProps {
    data: {
        body: string;
    };
}

export default function HTMLText({ data }: HTMLTextProps) {
    return (
        <section className="rich-text py-6 dark:bg-black dark:text-gray-50">
            <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </section>
    );
}
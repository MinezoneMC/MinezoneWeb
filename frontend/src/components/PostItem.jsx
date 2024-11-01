export default function PostItem({ detail, id }) {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');  // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');

        let hour = date.getUTCHours();
        const minute = String(date.getUTCMinutes()).padStart(2, '0');

        const ampm = hour >= 12 ? 'PM' : 'AM';

        hour = hour % 12;
        hour = hour ? String(hour).padStart(2, '0') : '12'; // the hour '0' should be '12'

        return `${year}-${month}-${day} at ${hour}:${minute} ${ampm} (UTC)`;
    }

    return (
        <div className="bg-gray-200 rounded-lg p-4 shadow-md m-4 flex flex-col gap-4">
            {detail ? (
                <>
                    <h1 className="text-4xl font-semibold">{detail.title}</h1>
                    <div>
                        <img
                            src={`http://minezone.site${detail.image}`}
                            alt=''
                            className="max-h-[16rem]"
                        />
                    </div>
                    <p>{detail.content}</p>
                    <div className="bg-gray-400 p-2">
                        <p>Posted by {detail.author} on {formatDate(detail.created_at)}</p>
                    </div>
                </>
            ) : (
                <h1 className="text-4xl font-semibold">
                    There are currently no posts available :(
                </h1>
            )}
        </div>
    );

}
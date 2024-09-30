export default function ProfilePage({ name, email, profilePicture }) {
    return (
        <div className="flex flex-col gap-4 bg-gray-900 text-white rounded-md">
            <span>
                <img src={profilePicture} className="w-32 rounded-full hover:"/>
                <p>Username: {name}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
            </span>
            <span>
                <p>Email: {email}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
            </span>
            <button>Save</button>
        </div>
    );
}
import CommentImg from '../assets/comment.svg';
import LikeImg from '../assets/like.svg';

export default function ForumCard({author, title, content, date}) {
    return (
        <div className="bg-[#D9D9D9] w-full rounded-md shadow-md p-4">
            <p className="text-lg text-gray-700">author</p>
            <h1 className="text-4xl font-semibold">{title}TITLE</h1>
            <p>{content}alskdjalsdjla alskdjlkajsdlkj alskdj lasjdlkas dlka sdkla sdlkja lksd aslkdkld aldad lakd </p>
            <p>{date}</p>
            <span className="flex gap-2">
                <img src={LikeImg} alt="like" className="w-6 h-6" />
                <img src={CommentImg} alt="comment" className="w-6 h-6" />
            </span>
        </div>
    );
}
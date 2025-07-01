import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import NoFriendsFound from "../components/NoFriendsFound";
import { Link } from "react-router";

const FriendListItem = ({ friend }) => (
  <Link
    to={`/chat/${friend._id}`}
    className="flex items-center gap-4 px-4 py-3 hover:bg-base-300 transition rounded-lg cursor-pointer"
  >
    <div className="avatar size-12">
      <img src={friend.profilePic} alt={friend.fullName} className="rounded-full" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-semibold truncate">{friend.fullName}</div>
      {/* Placeholder for last message or status */}
      <div className="text-xs text-base-content opacity-70 truncate">Online</div>
    </div>
  </Link>
);

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="flex flex-col h-full max-h-[80vh] bg-base-100 rounded-lg shadow p-0 sm:p-0 mx-auto w-full max-w-xl mt-8">
      <div className="px-6 py-4 border-b border-base-300">
        <h2 className="text-xl font-bold tracking-tight">Chats</h2>
      </div>
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <NoFriendsFound />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto divide-y divide-base-200">
          {friends.map((friend) => (
            <FriendListItem key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;

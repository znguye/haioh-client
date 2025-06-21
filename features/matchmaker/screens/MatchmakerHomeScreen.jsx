export default function MatchmakerHomeScreen() {
    return (
        <div className="matchmaker-home-screen">
        <h1 className="text-2xl font-bold mb-4">Matchmaker Home</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder for profile cards */}
            {[...Array(6)].map((_, index) => (
            <div key={index} className="profile-card bg-white p-4 rounded shadow">
                <img
                src={`https://picsum.photos/200?random=${index}`}
                alt={`Profile ${index + 1}`}
                className="w-full h-32 object-cover rounded mb-2"
                />
                <h2 className="text-lg font-semibold">Profile {index + 1}</h2>
                <p className="text-sm text-gray-600">Tagline for profile {index + 1}</p>
            </div>
            ))}
        </div>
        </div>
    );
    }
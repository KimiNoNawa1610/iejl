import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function LibrariesPage() {
  // Fetch all topics
  const topics = await prisma.topic.findMany({
    include: {
      contributedBy: true, // if you want user info
    },
  });

  if (!topics) {
    return notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Library / Learning Center</h1>

      {/* Button to go to the "Create Topic" page */}
      <Link
        href="/libraries/new"
        className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Create Topic
      </Link>

      {/* Grid of Topics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link key={topic.id} href={`/libraries/${topic.id}`}>
            <div className="bg-white rounded-lg p-5 shadow hover:shadow-md transition cursor-pointer">
              <h2 className="text-xl font-semibold">{topic.title}</h2>
              <p className="text-gray-500 mt-2 line-clamp-2">
                {topic.description ?? "No description available"}
              </p>
              <div className="mt-2 text-sm text-gray-400">
                Contributed by {topic.contributedBy.displayName}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

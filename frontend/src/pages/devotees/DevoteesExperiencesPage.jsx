import DevoteeStoryCard from "@/components/devotees/DevoteeStoryCard";
import DevoteesCornerIntro from "@/components/devotees/DevoteesCornerIntro";
import DevoteesShareInvite from "@/components/devotees/DevoteesShareInvite";
import { usePublishedDevoteeStories } from "@/context/CmsContext";

export default function DevoteesExperiencesPage() {
  const stories = usePublishedDevoteeStories();

  return (
    <div className="devotees-page bg-sanctum-surface text-sanctum-on-surface antialiased font-[Work_Sans,system-ui,sans-serif]">
      <main className="max-w-7xl mx-auto w-full px-sanctum-margin-mobile md:px-sanctum-margin pt-4 pb-10 md:pt-6 md:pb-12">
        <DevoteesCornerIntro active="experiences" />

        <div className="mb-8 md:mb-10" aria-label="Published devotee experiences">
          {stories.length === 0 ? (
            <p
              className="text-center font-sanctum text-sanctum-body-md text-sanctum-on-surface-variant max-w-lg mx-auto"
              data-testid="devotees-empty"
            >
              No stories are published yet. When the team approves submissions, they will appear here.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <DevoteeStoryCard
                  key={story.id}
                  name={story.name}
                  location={story.location}
                  message={story.message}
                  tag={story.tag}
                  date={story.date}
                />
              ))}
            </div>
          )}
        </div>

        <DevoteesShareInvite />
      </main>
    </div>
  );
}

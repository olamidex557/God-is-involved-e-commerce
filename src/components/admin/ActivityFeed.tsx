import {
  useEffect,
  useState,
} from "react";

import {
  getActivity,
} from "../../services/api/admin";

import WorkspaceCard from "./WorkspaceCard";

interface ActivityItem {
  type: string;
  title: string;
  date: string;
}

const ActivityFeed = () => {
  const [
    activities,
    setActivities,
  ] = useState<
    ActivityItem[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    const loadActivity =
      async () => {
        try {
          const response =
            await getActivity();

          setActivities(
            response.activities
          );
        } catch (
          error
        ) {
          console.error(
            error
          );
        } finally {
          setLoading(false);
        }
      };

    loadActivity();
  }, []);

  return (
    <WorkspaceCard
      title="Live Activity"
    >
      {loading ? (
        <p>
          Loading activity...
        </p>
      ) : activities.length ===
        0 ? (
        <p>
          No activity found.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="
                flex
                items-start
                gap-3
                "
              >
                <div
                  className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#D4AF37]
                  mt-2
                  "
                />

                <div>
                  <p>
                    {
                      item.title
                    }
                  </p>

                  <p
                    className="
                    text-xs
                    text-white/50
                    "
                  >
                    {new Date(
                      item.date
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </WorkspaceCard>
  );
};

export default ActivityFeed;
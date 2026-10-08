
import {
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Heart,
  Landmark,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Technology",
    description: "Programming, software and technology",
    icon: Code2,
  },
  {
    name: "Business",
    description: "Business, finance and entrepreneurship",
    icon: BriefcaseBusiness,
  },
  {
    name: "Education",
    description: "Learning, academics and study",
    icon: GraduationCap,
  },
  {
    name: "Self Development",
    description: "Personal growth and productivity",
    icon: Sparkles,
  },
  {
    name: "History",
    description: "Historical books and knowledge",
    icon: Landmark,
  },
  {
    name: "Health",
    description: "Health and wellness resources",
    icon: Heart,
  },
];

function Categories() {
  return (
    <section id="categories" className="bg-gray-50 px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Browse
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-950 sm:text-4xl">
            Explore by Category
          </h2>

          <p className="mt-3 text-gray-500">
            Find books based on what you want to learn or discover.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to={`/books?category=${encodeURIComponent(
                  category.name
                )}`}
                className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white">
                  <Icon size={23} />
                </span>

                <span>
                  <span className="block font-bold text-gray-900">
                    {category.name}
                  </span>

                  <span className="mt-1 block text-sm text-gray-500">
                    {category.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;

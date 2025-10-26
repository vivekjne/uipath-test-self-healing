import Image from "next/image";
import JobForm from "./components/JobForm";

export default function Page() {
  const gallery = [
    {
      src: "/images/work-1.jpg",
      alt: "Candidates collaborating during a team brainstorming session",
    },
    {
      src: "/images/work-2.jpg",
      alt: "Focused applicant preparing for an interview on a laptop",
    },
    {
      src: "/images/work-3.jpg",
      alt: "Modern workspace where new hires begin their onboarding journey",
    },
  ];
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Background accent blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-gray-200 to-gray-50 blur-3xl opacity-70" />
        <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-gray-200 to-white blur-3xl opacity-70" />
      </div>

      {/* Header */}
      <header className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between rounded-2xl border border-gray-200/70 bg-white/70 p-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold tracking-tight">
              JobPoint
            </span>
          </div>
          <nav className="hidden gap-6 text-sm text-gray-600 md:flex">
            <a className="hover:text-gray-900" href="#features">
              Features
            </a>
            <a className="hover:text-gray-900" href="#gallery">
              Gallery
            </a>
            <a className="hover:text-gray-900" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero + Form */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-6 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
            Apply Now
          </span>

          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Take the first step toward your next opportunity.
          </h1>

          <p className="mt-3 text-gray-600">
            You bring the talent, ambition, and passion — we bring the
            opportunity. Fill in your details below, and let’s start building
            something extraordinary together.
          </p>
        </div>

        <div id="contact" className="md:pl-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-2 shadow-lg">
            <div className="rounded-2xl bg-gray-50 p-1">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <JobForm />
                <p className="mt-3 text-xs text-gray-500">
                  By submitting, you agree to our terms and that we may contact
                  you about your application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image gallery / social proof */}
      <section id="gallery" className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          A vibe that suits modern teams
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {gallery.map((g, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={i === 0}
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700">{g.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-gray-600 md:flex-row">
          <p>© {new Date().getFullYear()} FormFlow. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-gray-900" href="#">
              Privacy
            </a>
            <a className="hover:text-gray-900" href="#">
              Terms
            </a>
            <a className="hover:text-gray-900" href="#">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
